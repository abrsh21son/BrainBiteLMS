import { coursesService } from '~/services/courses.service';
import { handleApiError } from '~/utils/error-handler';
import type { GenerateCourseForm } from '~/types';

export const useCourseGeneration = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const router = useRouter();

  const generateCourse = async (form: GenerateCourseForm) => {
    if (!form.subject?.trim()) {
      error.value = 'Subject is required';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const course = await coursesService.generateCourse(form);

      if (course?.id) {
        await router.push(`/courses/${course.id}`);
      } else {
        throw new Error('No course ID returned from server');
      }
    } catch (e: any) {
      console.error('Course generation error:', e);
      error.value = handleApiError(e);
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
    generateCourse,
    clearError,
  };
};
