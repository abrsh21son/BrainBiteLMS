import { Course } from '../entities/course.entity';

export class CreateCourseResponseDto implements Course {
  id: string;
  title: string;
  subject: string;
  description: string | null;
  created_by: string | null;
  is_published: boolean;
  created_at: string;
}


