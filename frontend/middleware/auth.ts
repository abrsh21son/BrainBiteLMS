export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()
    const publicPages = ['/', '/login', '/signup', '/welcome', '/reset-password']
    
    if (!publicPages.includes(to.path) && !user.value) {
        return navigateTo('/login')
    }
})
