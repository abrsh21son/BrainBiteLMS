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
      console.log('[useCourses] Fetching courses...');
      const result = await coursesService.getAllCourses();
      console.log('[useCourses] Courses fetched:', {
        count: Array.isArray(result) ? result.length : 'not an array',
        type: typeof result,
        result: result,
      });
      
      // Ensure result is an array
      if (Array.isArray(result)) {
        courses.value = result;
        console.log(`[useCourses] Successfully loaded ${result.length} courses`);
      } else {
        console.error('[useCourses] Expected array but got:', typeof result, result);
        error.value = 'Invalid response format: expected array of courses';
        courses.value = [];
      }
    } catch (e: any) {
      console.error('[useCourses] Failed to fetch courses:', {
        error: e,
        message: e?.message,
        stack: e?.stack,
      });
      error.value = handleApiError(e);
      courses.value = []; // Clear courses on error
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



