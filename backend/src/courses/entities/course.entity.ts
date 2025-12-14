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

export interface Question {
  id: string;
  course_id: string;
  question_text: string;
  type: string;
  created_at: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
}

export interface QuestionWithOptions extends Question {
  options: QuestionOption[];
}

export interface CourseDetails extends Course {
  pages: CoursePage[];
  questions: QuestionWithOptions[];
}



