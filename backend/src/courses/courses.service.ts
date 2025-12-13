import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { AiService } from '../ai/ai.service';
import { CoursesRepository } from './repositories/courses.repository';
import { GenerateCourseDto } from './dto/generate-course.dto';
import { Course, CourseDetails } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly aiService: AiService,
  ) {}

  async findAll(): Promise<Course[]> {
    try {
      return await this.coursesRepository.findAll();
    } catch (error) {
      this.logger.error(`Failed to fetch all courses: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch courses');
    }
  }

  async findOne(id: string): Promise<CourseDetails> {
    try {
      const courseDetails = await this.coursesRepository.findCourseDetails(id);

      if (!courseDetails) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }

      return courseDetails;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to fetch course ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch course details');
    }
  }

  async generate(dto: GenerateCourseDto, user?: User): Promise<Course> {
    try {
      this.logger.log(`Generating course for subject: ${dto.subject}, level: ${dto.level || 'default'}, ageRange: ${dto.ageRange || 'default'}, language: ${dto.language || 'default'}`);

      // 1. Generate content via AI
      const aiContent = await this.aiService.generateCourseContent(dto.subject, dto.level, dto.ageRange, dto.language);

      // 2. Create Course in DB
      const course = await this.coursesRepository.createCourse({
        title: aiContent.title,
        subject: dto.subject,
        description: aiContent.description,
        is_published: true,
        created_by: user?.id || null,
      });

      const courseId = course.id;
      this.logger.log(`Created course ${courseId}, now creating pages and questions`);

      // 3. Create Pages
      const pagesToInsert = aiContent.pages.map((page, index) => ({
        course_id: courseId,
        page_index: index,
        title: page.title,
        content_md: page.content,
      }));

      await this.coursesRepository.createPages(pagesToInsert);
      this.logger.log(`Created ${pagesToInsert.length} pages for course ${courseId}`);

      // 4. Create Questions & Options
      const questionPromises = aiContent.questions.map(async (question) => {
        try {
          const questionEntity = await this.coursesRepository.createQuestion({
            course_id: courseId,
            question_text: question.question_text,
            type: 'mcq',
          });

          const optionsToInsert = question.options.map((option) => ({
            question_id: questionEntity.id,
            option_text: option.text,
            is_correct: option.is_correct,
          }));

          await this.coursesRepository.createQuestionOptions(optionsToInsert);
        } catch (error) {
          this.logger.warn(`Failed to create question: ${error.message}`, error.stack);
          // Continue with other questions instead of failing the entire operation
        }
      });

      await Promise.all(questionPromises);
      this.logger.log(`Created questions for course ${courseId}`);

      this.logger.log(`Successfully generated course ${courseId}`);
      return course;
    } catch (error) {
      this.logger.error(`Failed to generate course: ${error.message}`, error.stack);
      
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      
      throw new InternalServerErrorException(
        `Failed to generate course: ${error.message}`,
      );
    }
  }

  async askQuestionAboutLesson(lessonContent: string, question: string): Promise<{ answer: string }> {
    try {
      const answer = await this.aiService.askQuestionAboutLesson(lessonContent, question);
      return { answer };
    } catch (error) {
      this.logger.error(`Failed to answer question: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to get AI response');
    }
  }

  async generateLessonSummary(lessonContent: string, type: 'paragraph' | 'sentence' | 'bullets'): Promise<{ summary: string }> {
    try {
      const summary = await this.aiService.generateLessonSummary(lessonContent, type);
      return { summary };
    } catch (error) {
      this.logger.error(`Failed to generate summary: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to generate summary');
    }
  }

  async explainAnswer(question: string, correctAnswer: string, userAnswer: string, isCorrect: boolean): Promise<{ explanation: string }> {
    try {
      const explanation = await this.aiService.generateAnswerExplanation(question, correctAnswer, userAnswer, isCorrect);
      return { explanation };
    } catch (error) {
      this.logger.error(`Failed to generate explanation: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to generate explanation');
    }
  }

  async getCourseRecommendations(courseId: string): Promise<{ recommendations: string[] }> {
    try {
      const course = await this.findOne(courseId);
      const recommendations = await this.aiService.generateCourseRecommendations(course.subject);
      return { recommendations };
    } catch (error) {
      this.logger.error(`Failed to get recommendations: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to get recommendations');
    }
  }
}
