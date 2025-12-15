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
      const result = await coursesService.getAllCourses();
      
      if (Array.isArray(result)) {
        courses.value = result;
      } else {
        error.value = 'Invalid response format: expected array of courses';
        courses.value = [];
      }
    } catch (e: any) {
      error.value = handleApiError(e);
      courses.value = [];
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
      error.value = handleApiError(e);
      throw e;
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




