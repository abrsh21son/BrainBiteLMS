export interface AICoursePage {
  title: string;
  content: string;
}

export interface AICourseOption {
  text: string;
  is_correct: boolean;
}

export interface AICourseQuestion {
  question_text: string;
  options: AICourseOption[];
}

export interface AICourseContent {
  title: string;
  description: string;
  pages: AICoursePage[];
  questions: AICourseQuestion[];
}



