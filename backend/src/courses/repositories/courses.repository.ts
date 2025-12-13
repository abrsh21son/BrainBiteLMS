import { Injectable, Inject, Logger } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  Course,
  CoursePage,
  Question,
  QuestionOption,
  CourseDetails,
  QuestionWithOptions,
} from '../entities/course.entity';

@Injectable()
export class CoursesRepository {
  private readonly logger = new Logger(CoursesRepository.name);

  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

  async findAll(): Promise<Course[]> {
    const { data, error } = await this.supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      this.logger.error(`Failed to fetch courses: ${error.message}`, error);
      throw new Error(`Failed to fetch courses: ${error.message}`);
    }

    return data || [];
  }

  async findById(id: string): Promise<Course | null> {
    const { data, error } = await this.supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      this.logger.error(`Failed to fetch course ${id}: ${error.message}`, error);
      throw new Error(`Failed to fetch course: ${error.message}`);
    }

    return data;
  }

  async findCourseDetails(id: string): Promise<CourseDetails | null> {
    const course = await this.findById(id);
    if (!course) {
      return null;
    }

    const [pages, questionsWithOptions] = await Promise.all([
      this.findPagesByCourseId(id),
      this.findQuestionsWithOptionsByCourseId(id),
    ]);

    return {
      ...course,
      pages,
      questions: questionsWithOptions,
    };
  }

  async findPagesByCourseId(courseId: string): Promise<CoursePage[]> {
    const { data, error } = await this.supabase
      .from('course_pages')
      .select('*')
      .eq('course_id', courseId)
      .order('page_index', { ascending: true });

    if (error) {
      this.logger.error(`Failed to fetch pages for course ${courseId}: ${error.message}`, error);
      throw new Error(`Failed to fetch course pages: ${error.message}`);
    }

    return data || [];
  }

  async findQuestionsWithOptionsByCourseId(courseId: string): Promise<QuestionWithOptions[]> {
    const { data: questions, error: questionsError } = await this.supabase
      .from('questions')
      .select('*')
      .eq('course_id', courseId);

    if (questionsError) {
      this.logger.error(`Failed to fetch questions for course ${courseId}: ${questionsError.message}`, questionsError);
      throw new Error(`Failed to fetch questions: ${questionsError.message}`);
    }

    if (!questions || questions.length === 0) {
      return [];
    }

    const questionIds = questions.map((q) => q.id);
    const { data: options, error: optionsError } = await this.supabase
      .from('question_options')
      .select('*')
      .in('question_id', questionIds);

    if (optionsError) {
      this.logger.error(`Failed to fetch options for course ${courseId}: ${optionsError.message}`, optionsError);
      throw new Error(`Failed to fetch question options: ${optionsError.message}`);
    }

    // Map options to questions
    const questionsWithOptions: QuestionWithOptions[] = questions.map((question) => ({
      ...question,
      options: (options || []).filter((opt) => opt.question_id === question.id),
    }));

    return questionsWithOptions;
  }

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const { data, error } = await this.supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to create course: ${error.message}`, error);
      throw new Error(`Failed to create course: ${error.message}`);
    }

    return data;
  }

  async createPages(pages: Partial<CoursePage>[]): Promise<CoursePage[]> {
    if (pages.length === 0) {
      return [];
    }

    const { data, error } = await this.supabase
      .from('course_pages')
      .insert(pages)
      .select();

    if (error) {
      this.logger.error(`Failed to create pages: ${error.message}`, error);
      throw new Error(`Failed to create course pages: ${error.message}`);
    }

    return data || [];
  }

  async createQuestion(questionData: Partial<Question>): Promise<Question> {
    const { data, error } = await this.supabase
      .from('questions')
      .insert(questionData)
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to create question: ${error.message}`, error);
      throw new Error(`Failed to create question: ${error.message}`);
    }

    return data;
  }

  async createQuestionOptions(options: Partial<QuestionOption>[]): Promise<QuestionOption[]> {
    if (options.length === 0) {
      return [];
    }

    const { data, error } = await this.supabase
      .from('question_options')
      .insert(options)
      .select();

    if (error) {
      this.logger.error(`Failed to create question options: ${error.message}`, error);
      throw new Error(`Failed to create question options: ${error.message}`);
    }

    return data || [];
  }
}


