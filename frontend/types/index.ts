// API Types
export interface Course {
  id: string;
  title: string;
  subject: string;
  description: string | null;
  created_by: string | null;
  is_published: boolean;
  created_at: string;
}

export interface CoursePage {
  id: string;
  course_id: string;
  page_index: number;
  title: string;
  content_md: string;
  created_at: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  course_id: string;
  question_text: string;
  type: string;
  created_at: string;
  options?: QuestionOption[];
}

export interface CourseDetails extends Course {
  pages: CoursePage[];
  questions: Question[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp?: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error?: string;
}

// Form Types
export interface GenerateCourseForm {
  subject: string;
  level?: string;
  ageRange?: string;
  language?: string;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedOptionId: string;
}

// User Types
export interface User {
  id: string;
  email?: string;
  [key: string]: any;
}



