export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()

    // Allow access to public pages
    const publicPages = ['/', '/login', '/welcome']
    
    if (!publicPages.includes(to.path) && !user.value) {
        return navigateTo('/')
    }
})
