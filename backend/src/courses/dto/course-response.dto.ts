import { CourseDetails } from '../entities/course.entity';

export class CourseResponseDto implements CourseDetails {
  id: string;
  title: string;
  subject: string;
  description: string | null;
  created_by: string | null;
  is_published: boolean;
  created_at: string;
  pages: any[];
  questions: any[];
}




