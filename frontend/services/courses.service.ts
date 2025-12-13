import { getApiClient } from '~/utils/api-client';
import type { Course, CourseDetails, GenerateCourseForm } from '~/types';
import { API_ENDPOINTS } from '~/utils/constants';

export class CoursesService {
  async getAllCourses(): Promise<Course[]> {
    return getApiClient().get<Course[]>(API_ENDPOINTS.COURSES);
  }

  async getCourseById(id: string): Promise<CourseDetails> {
    return getApiClient().get<CourseDetails>(API_ENDPOINTS.COURSE_BY_ID(id));
  }

  async generateCourse(form: GenerateCourseForm): Promise<Course> {
    return getApiClient().post<Course>(API_ENDPOINTS.GENERATE_COURSE, {
      subject: form.subject,
      level: form.level || undefined,
      ageRange: form.ageRange || undefined,
      language: form.language || undefined,
    });
  }
}

export const coursesService = new CoursesService();

