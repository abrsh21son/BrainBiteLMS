<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center space-y-6 animate-fade-in-up">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            <span class="text-green-400 inline-block">What Our</span>
            <span class="text-white inline-block"> Community Says</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join over <span class="text-green-400 font-semibold">250,000+</span> students and educators who have transformed their learning experience with BrainBite
          </p>
          <div class="flex items-center justify-center gap-2 text-yellow-400 text-2xl">
            <svg v-for="i in 5" :key="i" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p class="text-gray-400 text-sm">4.9/5 average rating from 100,000+ reviews</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Grid -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-100">
            <div class="flex items-center gap-2 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 text-lg italic">
              "BrainBite transformed how I learn! The AI-generated courses are incredibly engaging and personalized. I've improved my grades significantly since using this platform. The interactive content keeps me motivated, and I love how I can learn at my own pace."
            </p>
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                alt="Sarah Chen"
                class="w-16 h-16 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-500 transition-all ring-4 ring-green-500/20"
              />
              <div>
                <div class="text-white font-bold text-lg">Sarah Chen</div>
                <div class="text-gray-400 text-sm">Computer Science Student</div>
                <div class="text-green-400 text-xs mt-1">⭐ Verified Learner</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-200">
            <div class="flex items-center gap-2 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 text-lg italic">
              "As an educator, BrainBite is a game-changer! Creating courses has never been easier. The AI helps me structure content perfectly, and my students are more engaged than ever. The platform's intuitive design saves me hours of preparation time."
            </p>
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Dr. Michael Rodriguez"
                class="w-16 h-16 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-500 transition-all ring-4 ring-green-500/20"
              />
              <div>
                <div class="text-white font-bold text-lg">Dr. Michael Rodriguez</div>
                <div class="text-gray-400 text-sm">Professor of Mathematics</div>
                <div class="text-green-400 text-xs mt-1">⭐ Verified Educator</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-300">
            <div class="flex items-center gap-2 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 text-lg italic">
              "I've tried many learning platforms, but BrainBite stands out! The AI-generated content is fresh, relevant, and perfectly tailored. The assessment features help me track my progress, and I can access everything from any device. Best investment in my education!"
            </p>
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                alt="Emily Johnson"
                class="w-16 h-16 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-500 transition-all ring-4 ring-green-500/20"
              />
              <div>
                <div class="text-white font-bold text-lg">Emily Johnson</div>
                <div class="text-gray-400 text-sm">Business Administration</div>
                <div class="text-green-400 text-xs mt-1">⭐ Verified Learner</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 4 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-100">
            <div class="flex items-center gap-2 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 text-lg italic">
              "BrainBite's innovative approach to online learning is revolutionary! The platform combines cutting-edge AI technology with intuitive design. My students love the interactive assessments, and I appreciate how easy it is to customize courses for different learning styles."
            </p>
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="James Wilson"
                class="w-16 h-16 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-500 transition-all ring-4 ring-green-500/20"
              />
              <div>
                <div class="text-white font-bold text-lg">James Wilson</div>
                <div class="text-gray-400 text-sm">High School Teacher</div>
                <div class="text-green-400 text-xs mt-1">⭐ Verified Educator</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 5 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-200">
            <div class="flex items-center gap-2 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 text-lg italic">
              "The personalized learning experience on BrainBite is unmatched! Every course feels like it was created just for me. The AI adapts to my learning pace and style, making complex topics easy to understand. I've recommended it to all my friends!"
            </p>
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                alt="Alex Thompson"
                class="w-16 h-16 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-500 transition-all ring-4 ring-green-500/20"
              />
              <div>
                <div class="text-white font-bold text-lg">Alex Thompson</div>
                <div class="text-gray-400 text-sm">Psychology Student</div>
                <div class="text-green-400 text-xs mt-1">⭐ Verified Learner</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 6 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-300">
            <div class="flex items-center gap-2 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 text-lg italic">
              "BrainBite has revolutionized my online teaching! The AI course generation feature is incredible - it creates comprehensive, well-structured content in minutes. My students are more engaged, and I've seen a significant improvement in their performance."
            </p>
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
                alt="Dr. Lisa Park"
                class="w-16 h-16 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-500 transition-all ring-4 ring-green-500/20"
              />
              <div>
                <div class="text-white font-bold text-lg">Dr. Lisa Park</div>
                <div class="text-gray-400 text-sm">Online Course Creator</div>
                <div class="text-green-400 text-xs mt-1">⭐ Verified Educator</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Testimonial Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div class="max-w-6xl mx-auto">
        <div class="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-3xl p-12 border border-green-500/30 relative overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
          
          <div class="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <svg v-for="i in 5" :key="i" class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight">
                Why <span class="text-green-400">BrainBite</span> is Changing Online Education
              </h2>
              <p class="text-lg text-gray-300 leading-relaxed">
                BrainBite isn't just another learning platform—it's a complete educational ecosystem powered by advanced AI technology. Our platform makes learning engaging, teaching effortless, and knowledge accessible to everyone, everywhere.
              </p>
              <p class="text-lg text-gray-300 leading-relaxed">
                With BrainBite, educators can create comprehensive courses in minutes, while students enjoy personalized learning experiences that adapt to their unique needs and pace. The result? Better outcomes, happier learners, and more effective teaching.
              </p>
              <div class="flex flex-wrap gap-4 pt-4">
                <div class="flex items-center gap-2 text-green-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm font-medium">AI-Powered Course Generation</span>
                </div>
                <div class="flex items-center gap-2 text-green-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm font-medium">Interactive Assessments</span>
                </div>
                <div class="flex items-center gap-2 text-green-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm font-medium">Progress Tracking</span>
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop"
                  alt="Students learning with BrainBite"
                  class="w-full rounded-2xl shadow-2xl border-2 border-green-500/30"
                />
                <!-- Floating badge -->
                <div class="absolute -bottom-6 -right-6 bg-dark-card p-6 rounded-2xl border border-green-500/50 shadow-xl animate-float">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-green-400">250K+</div>
                    <div class="text-sm text-gray-300">Happy Learners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center hover-lift animate-fade-in-up animate-delay-100">
            <div class="text-4xl md:text-5xl font-bold text-green-400 mb-2">250K+</div>
            <div class="text-gray-400 text-sm">Active Students</div>
          </div>
          <div class="text-center hover-lift animate-fade-in-up animate-delay-200">
            <div class="text-4xl md:text-5xl font-bold text-green-400 mb-2">50K+</div>
            <div class="text-gray-400 text-sm">Courses Created</div>
          </div>
          <div class="text-center hover-lift animate-fade-in-up animate-delay-300">
            <div class="text-4xl md:text-5xl font-bold text-green-400 mb-2">4.9/5</div>
            <div class="text-gray-400 text-sm">Average Rating</div>
          </div>
          <div class="text-center hover-lift animate-fade-in-up animate-delay-400">
            <div class="text-4xl md:text-5xl font-bold text-green-400 mb-2">98%</div>
            <div class="text-gray-400 text-sm">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          Ready to Transform Your Learning Journey?
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Join thousands of students and educators who are already experiencing the future of online education with BrainBite.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/signup"
            class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Get Started Free
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white hover:text-green-400 transition-all transform hover:scale-105 border-2 border-dark-border hover:border-green-500/50 rounded-lg"
          >
            Learn More
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

// Add scroll animations on mount
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up')
        entry.target.classList.remove('opacity-0')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.animate-fade-in-up').forEach((element) => {
    element.classList.add('opacity-0')
    observer.observe(element)
  })
})
</script>



