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

    this.model = this.configService.get<string>('AI_MODEL') || 'llama-3.1-8b-instant';
    this.logger.log(`Using Groq model: ${this.model}`);
  }

  async generateCourseContent(subject: string, level?: string, ageRange?: string, language?: string): Promise<AICourseContent> {
    try {
      const prompt = this.buildPrompt(subject, level, ageRange, language);

      this.logger.log(`Generating course content for subject: ${subject}, level: ${level || 'default'}, ageRange: ${ageRange || 'default'}, language: ${language || 'default'}`);

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
      
      if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('Incorrect API key')) {
        const helpfulMessage = 
          'Groq API key is incorrect or invalid. ' +
          'Please check your AI_API_KEY in the backend/.env file. ' +
          'Get a free Groq API key from https://console.groq.com/keys (keys must start with "gsk_"). ' +
          'After updating, restart the backend server.';
        
        throw new InternalServerErrorException(helpfulMessage);
      }

      if (error?.status === 404 || (error?.status === 400 && error?.message?.includes('does not exist'))) {
        const helpfulMessage = 
          `The Groq model "${this.model}" does not exist or you don't have access to it. ` +
          'Please update AI_MODEL in your .env file to an available model. ' +
          'Common models: llama-3.1-8b-instant, llama-3.1-70b-versatile, llama-3.3-70b-versatile. ' +
          'Check available models at https://console.groq.com/docs/models';
        
        throw new InternalServerErrorException(helpfulMessage);
      }

      if (error?.status === 400 && error?.message?.includes('decommissioned')) {
        const helpfulMessage = 
          `The Groq model "${this.model}" has been decommissioned. ` +
          'Please update AI_MODEL in your .env file to a current model. ' +
          'Common models: llama-3.1-8b-instant, llama-3.1-70b-versatile, llama-3.3-70b-versatile. ' +
          'See https://console.groq.com/docs/models for available models.';
        
        throw new InternalServerErrorException(helpfulMessage);
      }

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

Content Structure Guidelines:
- Include EXACTLY 4 pages of content
- Each page must cover a distinct, logically progressive topic that builds upon previous pages
- Structure the 4 pages as a learning progression:
  * Page 1: Introduction/Getting Started - Cover basics, overview, and fundamental concepts
  * Page 2: Core Concepts - Dive into the main components or foundational elements
  * Page 3: Advanced Topics - Explore more complex features or practical applications
  * Page 4: Best Practices/Summary - Cover best practices, common patterns, and key takeaways
- For technical subjects (e.g., Django, React, Python), structure pages by major components:
  * Example for Django: "Introduction to Django" → "Django Models" → "Django Views" → "Django Templates"
  * Example for React: "React Basics" → "Components & Props" → "State & Hooks" → "Advanced Patterns"
- Each page title should be clear and descriptive (e.g., "Django Models", "Understanding State Management")
- Each page content should be comprehensive (at least 300-500 words) with:
  * Clear explanations
  * Practical examples
  * Code snippets where relevant
  * Real-world use cases
  * Visual structure with headings and subheadings

Assessment Guidelines:
- Include EXACTLY 2 assessment questions
- Each question must have exactly 3-4 options with exactly one correct answer (is_correct: true)
- Questions should test understanding of key concepts from across all 4 pages
- Use boolean true/false (not strings) for is_correct
- Ensure all strings are properly escaped for JSON

Formatting:
- Use proper markdown formatting in page content (headings, lists, code blocks, bold, italic)
- Ensure content is accurate and educational
- Make content engaging and easy to follow

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

  async generateAnswerExplanation(question: string, correctAnswer: string, userAnswer: string, isCorrect: boolean): Promise<{ explanation: string; suggestions: string[] }> {
    try {
      const prompt = `You are an expert tutor providing detailed feedback on a quiz answer.

Question: ${question}
Student's Answer: "${userAnswer}"
Correct Answer: "${correctAnswer}"
Is the student correct? ${isCorrect ? 'Yes' : 'No'}

Provide a comprehensive response in JSON format with two fields:
1. "explanation": A detailed, educational explanation (4-6 sentences) that:
   ${isCorrect 
     ? '- Congratulates the student warmly\n     - Explains WHY their answer is correct in detail\n     - Highlights the key concepts they understood\n     - Reinforces their learning with specific examples or connections to the course material'
     : '- Acknowledges their attempt positively\n     - Clearly explains WHY their answer is incorrect\n     - Provides a detailed explanation of the correct answer\n     - Breaks down the key concepts they should focus on\n     - Uses examples or analogies to help them understand better'}
   - Uses encouraging, supportive language
   - Is educational and helps deepen understanding

2. "suggestions": An array of 2-3 specific, actionable suggestions (each as a string) that help the student:
   ${isCorrect 
     ? '- Build on this knowledge\n     - Explore related concepts\n     - Apply this understanding in practice'
     : '- Improve their understanding\n     - Review specific concepts\n     - Practice related topics'}

Return ONLY valid JSON in this format:
{
  "explanation": "Your detailed explanation here...",
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert, friendly tutor who provides detailed, educational feedback. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 600,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('AI service returned empty response');
      }

      let cleanedContent = content
        .replace(/```json\n?/gi, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const firstBrace = cleanedContent.indexOf('{');
      const lastBrace = cleanedContent.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanedContent = cleanedContent.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(cleanedContent) as { explanation: string; suggestions: string[] };

      if (!parsed.explanation || !Array.isArray(parsed.suggestions)) {
        throw new Error('Invalid response structure');
      }

      return {
        explanation: parsed.explanation,
        suggestions: parsed.suggestions.slice(0, 3),
      };
    } catch (error) {
      this.logger.error(`Failed to generate explanation: ${error.message}`, error.stack);
      return {
        explanation: isCorrect 
          ? 'Correct! Great job! You understood this concept well. Keep up the excellent work!' 
          : 'Not quite right, but that\'s okay! The correct answer is: ' + correctAnswer + '. Review the course material to strengthen your understanding.',
        suggestions: isCorrect
          ? ['Continue practicing similar questions', 'Explore related topics to deepen your knowledge']
          : ['Review the course material on this topic', 'Try similar practice questions to reinforce learning'],
      };
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
      let cleanedContent = content
        .replace(/```json\n?/gi, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const firstBrace = cleanedContent.indexOf('{');
      const lastBrace = cleanedContent.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanedContent = cleanedContent.substring(firstBrace, lastBrace + 1);
      }
      
      const parsed = JSON.parse(cleanedContent) as AICourseContent;

      if (!parsed.title || !parsed.description || !Array.isArray(parsed.pages) || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid response structure: missing required fields');
      }

      if (parsed.pages.length !== 4) {
        throw new Error(`Course must have exactly 4 pages, but got ${parsed.pages.length}`);
      }

      if (parsed.questions.length !== 2) {
        throw new Error(`Course must have exactly 2 questions, but got ${parsed.questions.length}`);
      }

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
