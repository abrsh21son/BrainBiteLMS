import { coursesService } from '~/services/courses.service';
import { handleApiError } from '~/utils/error-handler';
import type { Course, CourseDetails } from '~/types';

export const useCourses = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const courses = ref<Course[]>([]);
  const currentCourse = ref<CourseDetails | null>(null);

  const fetchCourses = async () => {
    loading.value = true;
    error.value = null;

    try {
      courses.value = await coursesService.getAllCourses();
    } catch (e: any) {
      console.error('Failed to fetch courses:', e);
      error.value = handleApiError(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchCourseById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      currentCourse.value = await coursesService.getCourseById(id);
    } catch (e: any) {
      console.error(`Failed to fetch course ${id}:`, e);
      error.value = handleApiError(e);
      throw e; // Re-throw so pages can handle 404s
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    loading: readonly(loading),
    error: readonly(error),
    courses: readonly(courses),
    currentCourse: readonly(currentCourse),
    fetchCourses,
    fetchCourseById,
    clearError,
  };
};



