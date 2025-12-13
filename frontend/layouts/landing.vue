<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Navigation -->
    <header class="bg-dark-surface/80 backdrop-blur-md border-b border-dark-border sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <!-- Enhanced Logo Icon - Green Pill Shape with glow effect -->
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

          <!-- Centered Navigation Links -->
          <div class="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <NuxtLink 
              to="/" 
              class="text-gray-300 hover:text-green-400 font-medium transition-all duration-200 relative group"
              active-class="text-green-400"
            >
              Home
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-200"></span>
            </NuxtLink>
            <NuxtLink 
              to="/courses" 
              class="text-gray-300 hover:text-green-400 font-medium transition-all duration-200 relative group transform hover:scale-105"
            >
              Courses
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-200"></span>
            </NuxtLink>
            <a 
              href="#integrations" 
              @click.prevent="scrollToSection('integrations')"
              class="text-gray-300 hover:text-green-400 font-medium transition-all duration-200 relative group transform hover:scale-105"
            >
              Integrations
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-200"></span>
            </a>
            <NuxtLink 
              to="/testimonials" 
              class="text-gray-300 hover:text-green-400 font-medium transition-all duration-200 relative group transform hover:scale-105"
              active-class="text-green-400"
            >
              Testimonials
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-200"></span>
            </NuxtLink>
          </div>

          <!-- Right Side - Login Button -->
          <div class="flex items-center">
            <!-- Mobile Menu Button -->
            <button class="lg:hidden text-gray-300 hover:text-white transition-colors mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <!-- Login Button -->
            <NuxtLink
              to="/login"
              class="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:scale-105"
            >
              Login
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-dark-surface text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <!-- Enhanced Logo Icon -->
              <div class="relative">
                <div class="absolute inset-0 bg-green-500/20 rounded-full blur-md"></div>
                <div class="relative w-10 h-10 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <span class="text-2xl font-bold font-display">
                <span class="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Brain</span><span class="text-white">Bite</span>
              </span>
            </div>
            <p class="text-gray-400 text-sm mb-4">Virtual Class for Zoom</p>
            <h3 class="text-xl font-bold text-white mb-4">Subscribe to get our Newsletter</h3>
            <div class="flex gap-2">
              <input
                type="email"
                placeholder="Your Email"
                class="flex-1 px-4 py-2 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
              />
              <button class="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div class="flex flex-col justify-between">
            <div class="flex flex-wrap gap-6 mb-4">
              <span class="text-gray-400">Careers</span>
              <span class="text-gray-400">Privacy Policy</span>
              <span class="text-gray-400">Terms & Conditions</span>
            </div>
            <div class="text-sm text-gray-400">
              <p>© 2024 BrainBite Technologies Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

