import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { AICourseContent } from './interfaces/ai-response.interface';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('AI_API_KEY');
    if (!apiKey) {
      throw new Error('AI_API_KEY is not configured. Please set AI_API_KEY in your .env file with a Groq API key (starts with "gsk_").');
    }

    // Validate Groq API key format
    if (!apiKey.startsWith('gsk_')) {
      const keyPreview = apiKey.substring(0, 4) + '...' + apiKey.substring(apiKey.length - 4);
      throw new Error(
        `Invalid Groq API key format. The key "${keyPreview}" does not start with "gsk_".\n` +
        `Please get a free Groq API key from https://console.groq.com/keys`
      );
    }

    this.logger.log('Using Groq API (free tier)');
    
    this.openai = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    // Current Groq models (check https://console.groq.com/docs/models for latest):
    // - llama-3.1-8b-instant (fast, commonly available)
    // - llama-3.1-70b-versatile (more capable, if available)
    // - llama-3.3-70b-versatile (newest, if available)
    // Using llama-3.1-8b-instant as default (most commonly available)
    // Can override with AI_MODEL env variable
    this.model = this.configService.get<string>('AI_MODEL') || 'llama-3.1-8b-instant';
    this.logger.log(`Using Groq model: ${this.model}`);
  }

  async generateCourseContent(subject: string, level?: string, ageRange?: string, language?: string): Promise<AICourseContent> {
    try {
      const prompt = this.buildPrompt(subject, level, ageRange, language);

      this.logger.log(`Generating course content for subject: ${subject}, level: ${level || 'default'}, ageRange: ${ageRange || 'default'}, language: ${language || 'default'}`);

      // Groq models work better without response_format constraint
      // The prompt itself instructs JSON format
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a friendly, engaging educator and expert content creator. Always respond with valid JSON only. Your teaching style is warm, motivating, and positive. Use simple language, real-world analogies, practical examples, and occasional memory tricks to make learning enjoyable and effective. Generate comprehensive, well-structured course content with clear explanations and appropriate assessments.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new InternalServerErrorException('AI service returned empty response');
      }

      const parsedContent = this.parseAndValidateResponse(content);
      this.logger.log(`Successfully generated course: ${parsedContent.title}`);
      
      return parsedContent;
    } catch (error) {
      this.logger.error(`Failed to generate course content: ${error.message}`, error.stack);
      
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      
      // Handle API key authentication errors specifically
      if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('Incorrect API key')) {
        const helpfulMessage = 
          'Groq API key is incorrect or invalid. ' +
          'Please check your AI_API_KEY in the backend/.env file. ' +
          'Get a free Groq API key from https://console.groq.com/keys (keys must start with "gsk_"). ' +
          'After updating, restart the backend server.';
        
        throw new InternalServerErrorException(helpfulMessage);
      }

      // Handle model not found or access denied errors
      if (error?.status === 404 || (error?.status === 400 && error?.message?.includes('does not exist'))) {
        const helpfulMessage = 
          `The Groq model "${this.model}" does not exist or you don't have access to it. ` +
          'Please update AI_MODEL in your .env file to an available model. ' +
          'Common models: llama-3.1-8b-instant, llama-3.1-70b-versatile, llama-3.3-70b-versatile. ' +
          'Check available models at https://console.groq.com/docs/models';
        
        throw new InternalServerErrorException(helpfulMessage);
      }

      // Handle model deprecation errors
      if (error?.status === 400 && error?.message?.includes('decommissioned')) {
        const helpfulMessage = 
          `The Groq model "${this.model}" has been decommissioned. ` +
          'Please update AI_MODEL in your .env file to a current model. ' +
          'Common models: llama-3.1-8b-instant, llama-3.1-70b-versatile, llama-3.3-70b-versatile. ' +
          'See https://console.groq.com/docs/models for available models.';
        
        throw new InternalServerErrorException(helpfulMessage);
      }

      // Handle JSON generation errors from Groq
      if (error?.status === 400 && (error?.message?.includes('Failed to generate JSON') || error?.message?.includes('JSON'))) {
        const helpfulMessage = 
          'Groq failed to generate JSON response. This may be due to model limitations. ' +
          'Try updating AI_MODEL in your .env file to a more capable model like "llama-3.1-70b-versatile" or "llama-3.3-70b-versatile". ' +
          'See https://console.groq.com/docs/models for available models.';
        
        throw new InternalServerErrorException(helpfulMessage);
      }
      
      throw new InternalServerErrorException(
        `Failed to generate course content: ${error.message}`,
      );
    }
  }

  private buildPrompt(subject: string, level?: string, ageRange?: string, language?: string): string {
    const levelContext = level ? ` tailored for ${level} level learners` : '';
    const ageContext = ageRange ? ` for ${ageRange} years old` : '';
    const languageContext = language ? ` in ${language}` : '';
    const contextParts = [levelContext, ageContext, languageContext].filter(Boolean);
    const fullContext = contextParts.length > 0 ? ` ${contextParts.join(',')}` : '';
    
    return `You must respond with ONLY valid JSON, no other text. Generate a comprehensive educational course about "${subject}"${fullContext}.

IMPORTANT: Your response must be valid JSON only. Start with { and end with }. Do not include markdown code blocks, explanations, or any text outside the JSON.

Requirements:
- Create engaging and informative content suitable for the target level
- Use clear explanations with examples where appropriate
- Structure content logically across multiple pages
- Include assessment questions to test understanding

Return a JSON object with this EXACT structure:
{
  "title": "Engaging Course Title",
  "description": "A concise description (2-3 sentences) of what the course covers and what learners will gain",
  "pages": [
    { 
      "title": "Page Title", 
      "content": "Markdown formatted content for the page. Include headings, paragraphs, lists, and code examples where relevant. Make it comprehensive but digestible." 
    }
  ],
  "questions": [
    {
      "question_text": "Clear and specific question that tests understanding",
      "options": [
        { "text": "Option text", "is_correct": true },
        { "text": "Option text", "is_correct": false },
        { "text": "Option text", "is_correct": false }
      ]
    }
  ]
}

Teaching Style Guidelines:
- Write in a friendly, conversational tone as if you're a caring teacher
- Use simple analogies and real-world examples to explain complex concepts
- Break down difficult topics into digestible chunks
- Add memory tricks or mnemonics when helpful
- Keep the tone motivating and encouraging
- Make content relatable and practical

Content Guidelines:
- Include EXACTLY 4 pages of content
- Each page should cover a distinct topic or concept
- Include EXACTLY 2 assessment questions
- Each question must have exactly 3-4 options with exactly one correct answer (is_correct: true)
- Use proper markdown formatting in page content
- Ensure content is accurate and educational
- Use boolean true/false (not strings) for is_correct
- Ensure all strings are properly escaped for JSON

Return ONLY the JSON object, nothing else.`;
  }

  async askQuestionAboutLesson(lessonContent: string, question: string): Promise<string> {
    try {
      const prompt = `You are a helpful and friendly tutor. Answer the student's question using ONLY the lesson content provided below. 

IMPORTANT RULES:
- Base your answer ONLY on the provided lesson content
- Do not make up information or hallucinate
- If the answer is not in the lesson content, politely say so
- Keep your answer clear, concise, and encouraging
- Use simple language and examples from the lesson

Lesson Content:
${lessonContent}

Student Question: ${question}

Provide a helpful, friendly answer:`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a friendly tutor who helps students understand course material. Always base your answers on the provided content only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';
    } catch (error) {
      this.logger.error(`Failed to answer question: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to get AI response to your question');
    }
  }

  async generateLessonSummary(lessonContent: string, type: 'paragraph' | 'sentence' | 'bullets' = 'paragraph'): Promise<string> {
    try {
      const summaryInstructions = {
        paragraph: 'a one-paragraph summary (3-4 sentences)',
        sentence: 'a one-sentence summary',
        bullets: 'a 3-bullet point summary with key takeaways'
      };

      const prompt = `Summarize the following lesson content in ${summaryInstructions[type]}. Keep it concise, clear, and easy to understand.

Lesson Content:
${lessonContent}

Summary:`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates clear, concise summaries of educational content.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      return completion.choices[0]?.message?.content || 'Unable to generate summary at this time.';
    } catch (error) {
      this.logger.error(`Failed to generate summary: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to generate summary');
    }
  }

  async generateAnswerExplanation(question: string, correctAnswer: string, userAnswer: string, isCorrect: boolean): Promise<string> {
    try {
      const prompt = `The student answered: "${userAnswer}"
Correct answer: "${correctAnswer}"
Was the student correct? ${isCorrect ? 'Yes' : 'No'}

Question: ${question}

Provide a friendly, educational explanation:
${isCorrect 
  ? 'Congratulate them and explain why their answer is correct.' 
  : 'Gently explain why their answer is incorrect and clarify the correct answer with a brief explanation.'}
Keep it encouraging and educational (2-3 sentences max).`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a friendly tutor providing feedback on quiz answers. Be encouraging and educational.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      return completion.choices[0]?.message?.content || 'Good attempt! Keep learning.';
    } catch (error) {
      this.logger.error(`Failed to generate explanation: ${error.message}`, error.stack);
      return isCorrect ? 'Correct! Great job!' : 'Not quite right, but keep learning!';
    }
  }

  async generateCourseRecommendations(subject: string): Promise<string[]> {
    try {
      const prompt = `Based on the course subject "${subject}", suggest 3 related course topics that would help students continue learning. 

Requirements:
- Return only 3 suggestions
- Each should be a simple, interesting topic name (1-4 words)
- Make them related but not identical to the original subject
- Keep them engaging and clear

Format as a simple list, one per line, no numbers or bullets:`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You suggest related educational course topics.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 100,
      });

      const suggestions = completion.choices[0]?.message?.content
        ?.split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .slice(0, 3) || [];

      return suggestions.length > 0 ? suggestions : [
        'Advanced ' + subject,
        subject + ' Applications',
        'Related Topics in ' + subject
      ];
    } catch (error) {
      this.logger.error(`Failed to generate recommendations: ${error.message}`, error.stack);
      return [
        'Advanced ' + subject,
        subject + ' Applications',
        'Related Topics'
      ];
    }
  }

  private parseAndValidateResponse(content: string): AICourseContent {
    try {
      // Clean up the content - remove markdown code blocks if present
      let cleanedContent = content
        .replace(/```json\n?/gi, '')
        .replace(/```\n?/g, '')
        .trim();
      
      // Try to extract JSON if there's extra text before/after
      // Look for first { and last }
      const firstBrace = cleanedContent.indexOf('{');
      const lastBrace = cleanedContent.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanedContent = cleanedContent.substring(firstBrace, lastBrace + 1);
      }
      
      const parsed = JSON.parse(cleanedContent) as AICourseContent;

      // Validate structure
      if (!parsed.title || !parsed.description || !Array.isArray(parsed.pages) || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid response structure: missing required fields');
      }

      // Validate pages - must have exactly 4 pages
      if (parsed.pages.length !== 4) {
        throw new Error(`Course must have exactly 4 pages, but got ${parsed.pages.length}`);
      }

      // Validate questions - must have exactly 2 questions
      if (parsed.questions.length !== 2) {
        throw new Error(`Course must have exactly 2 questions, but got ${parsed.questions.length}`);
      }

      // Validate questions structure
      for (const question of parsed.questions) {
        if (!question.question_text || !Array.isArray(question.options) || question.options.length < 2) {
          throw new Error('Each question must have question_text and at least 2 options');
        }

        const correctCount = question.options.filter((opt) => opt.is_correct === true).length;
        if (correctCount !== 1) {
          throw new Error('Each question must have exactly one correct answer');
        }
      }

      return parsed;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new InternalServerErrorException('Failed to parse AI response as JSON');
      }
      throw error;
    }
  }
}
