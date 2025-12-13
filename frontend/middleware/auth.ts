export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()

    // Allow access to public pages
    const publicPages = ['/', '/login', '/signup', '/welcome', '/reset-password']
    
    if (!publicPages.includes(to.path) && !user.value) {
        return navigateTo('/login')
    }
})
