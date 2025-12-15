export const useCourseNavigation = () => {
  const user = useSupabaseUser()
  const router = useRouter()

  const navigateToCourse = (courseId: string) => {
    if (user.value) {
      return router.push(`/courses/${courseId}`)
    }

    sessionStorage.setItem('redirectAfterLogin', `/courses/${courseId}`)
    return router.push('/login')
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




