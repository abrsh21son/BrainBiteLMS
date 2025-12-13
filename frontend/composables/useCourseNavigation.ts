/**
 * Handles course navigation with authentication flow
 */
export const useCourseNavigation = () => {
  const user = useSupabaseUser()
  const router = useRouter()

  const navigateToCourse = (courseId: string) => {
    // If user is logged in, go directly to course
    if (user.value) {
      return router.push(`/courses/${courseId}`)
    }

    // If not logged in, redirect to login with return URL
    // Store the course ID in sessionStorage for after login
    sessionStorage.setItem('redirectAfterLogin', `/courses/${courseId}`)
    return router.push('/login?redirect=signup')
  }

  const getRedirectPath = (): string | null => {
    const redirect = sessionStorage.getItem('redirectAfterLogin')
    if (redirect) {
      sessionStorage.removeItem('redirectAfterLogin')
      return redirect
    }
    return null
  }

  return {
    navigateToCourse,
    getRedirectPath,
  }
}


