<template>
  <header class="bg-dark-surface/95 backdrop-blur-md border-b border-dark-border sticky top-0 z-50 shadow-lg">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo - Links to Home -->
        <NuxtLink 
          to="/" 
          class="flex items-center space-x-3 group flex-shrink-0"
        >
          <!-- Enhanced Logo Icon - Same as Landing Page -->
          <div class="relative">
            <div class="absolute inset-0 bg-green-500/30 rounded-full blur-lg group-hover:bg-green-500/50 transition-all"></div>
            <div class="relative w-10 h-10 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all transform group-hover:scale-110">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <span class="text-2xl font-bold font-display">
            <span class="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-green-400 transition-all">Brain</span><span class="text-white">Bite</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1 flex-1 justify-center">
          <a 
            v-if="route.path === '/'" 
            href="#featured-courses"
            @click.prevent="scrollToSection('featured-courses')"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all relative group text-gray-300 hover:text-white hover:bg-dark-card"
          >
            <span class="relative z-10">Featured Courses</span>
          </a>
          
          <NuxtLink 
            to="/courses" 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all relative group"
            active-class="text-white"
            :class="isActive('/courses') ? 'text-white' : 'text-gray-300 hover:text-white hover:bg-dark-card'"
          >
            <span class="relative z-10">Courses</span>
            <span 
              v-if="isActive('/courses')"
              class="absolute inset-0 bg-green-500/20 rounded-lg border border-green-500/30"
            ></span>
          </NuxtLink>
          
          <NuxtLink 
            to="/generate-course" 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all relative group"
            active-class="text-white"
            :class="isActive('/generate-course') ? 'text-white' : 'text-gray-300 hover:text-white hover:bg-dark-card'"
          >
            <span class="relative z-10">Generate</span>
            <span 
              v-if="isActive('/generate-course')"
              class="absolute inset-0 bg-green-500/20 rounded-lg border border-green-500/30"
            ></span>
          </NuxtLink>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Sign Out Button -->
          <button 
            @click="handleLogout" 
            class="inline-flex items-center px-4 py-2 border border-dark-border text-sm font-medium rounded-lg text-gray-300 bg-dark-card hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all group"
          >
            <svg class="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="hidden sm:inline">Sign out</span>
            <span class="sm:hidden">Out</span>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-card transition-all"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden pb-4 border-t border-dark-border mt-2 pt-4 space-y-1"
      >
        <a 
          v-if="route.path === '/'" 
          href="#featured-courses"
          @click.prevent="scrollToSection('featured-courses'); mobileMenuOpen = false"
          class="block px-4 py-3 rounded-lg text-base font-medium transition-all text-gray-300 hover:text-white hover:bg-dark-card"
        >
          Featured Courses
        </a>
        
        <NuxtLink 
          to="/courses" 
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 rounded-lg text-base font-medium transition-all"
          :class="isActive('/courses') ? 'text-white bg-green-500/20 border border-green-500/30' : 'text-gray-300 hover:text-white hover:bg-dark-card'"
        >
          Courses
        </NuxtLink>
        
        <NuxtLink 
          to="/generate-course" 
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 rounded-lg text-base font-medium transition-all"
          :class="isActive('/generate-course') ? 'text-white bg-green-500/20 border border-green-500/30' : 'text-gray-300 hover:text-white hover:bg-dark-card'"
        >
          Generate
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const client = useSupabaseClient()
const router = useRouter()
const mobileMenuOpen = ref(false)

const isActive = (path: string) => {
  return route.path.startsWith(path)
}

const scrollToSection = (sectionId: string) => {
  if (route.path !== '/') {
    // If not on home page, navigate to home first, then scroll
    router.push('/').then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    })
  } else {
    // Already on home page, just scroll
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const handleLogout = async () => {
  try {
    await client.auth.signOut()
    await router.push('/login')
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error signing out:', error)
    }
  }
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>


