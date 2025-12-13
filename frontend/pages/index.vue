<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-center lg:text-left space-y-6 animate-fade-in-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
              <span class="text-green-400 inline-block animate-fade-in-up animate-delay-100">Studying</span> <span class="inline-block animate-fade-in-up animate-delay-200">Online is</span><br />
              <span class="text-white inline-block animate-fade-in-up animate-delay-300">now much easier</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animate-delay-400">
              BrainBite is an interesting platform that will teach you in a more interactive way.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animate-delay-500">
              <NuxtLink
                to="/welcome"
                class="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover-lift"
              >
                Get Started/Sign up
                <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
              <button
                class="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white hover:text-green-400 transition-all transform hover:scale-105 border-2 border-transparent hover:border-green-400/50 rounded-lg"
              >
                <svg class="mr-2 h-5 w-5 transform hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch how it works
              </button>
            </div>
            
            <!-- Stats Section -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div class="text-center lg:text-left hover-lift animate-fade-in-up animate-delay-100">
                <div class="text-2xl md:text-3xl font-bold text-green-400 transition-all hover:scale-110">15K+</div>
                <div class="text-sm text-gray-400">Active Students</div>
              </div>
              <div class="text-center lg:text-left hover-lift animate-fade-in-up animate-delay-200">
                <div class="text-2xl md:text-3xl font-bold text-green-400 transition-all hover:scale-110">10K+</div>
                <div class="text-sm text-gray-400">Courses</div>
              </div>
              <div class="text-center lg:text-left hover-lift animate-fade-in-up animate-delay-300">
                <div class="text-2xl md:text-3xl font-bold text-green-400 transition-all hover:scale-110">5K+</div>
                <div class="text-sm text-gray-400">Graduates</div>
              </div>
              <div class="text-center lg:text-left hover-lift animate-fade-in-up animate-delay-400">
                <div class="text-2xl md:text-3xl font-bold text-green-400 transition-all hover:scale-110">250k</div>
                <div class="text-sm text-gray-400">Assisted Student</div>
              </div>
            </div>
          </div>

          <!-- Right Content - Student Image with Notification Cards -->
          <div class="hidden lg:block relative w-full flex justify-center">
            <!-- Main Student Image Container -->
            <div class="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
              <img
                src="/student.png"
                alt="Happy student with books showing online learning"
                class="w-full h-auto object-contain"
                style="display: block; max-width: 100%; height: auto;"
                loading="eager"
                @error="handleImageError"
                @load="imageLoaded = true"
              />

              <!-- Floating Card 1: 250k Assisted Student - Top Left -->
              <div class="absolute top-48 left-2 z-20 max-w-xs animate-scale-in animate-delay-300 hover-lift">
                <div class="bg-dark-card/90 backdrop-blur-lg rounded-2xl shadow-xl border border-dark-border p-4 space-y-2">
                  <div class="flex items-center">
                    <svg class="w-6 h-6 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p class="font-semibold text-white text-lg">250k</p>
                  <p class="text-sm text-gray-300">Assisted Student</p>
                </div>
              </div>

              <!-- Floating Card 2: Congratulations - Top Right -->
              <div class="absolute top-72 right-4 z-20 max-w-xs animate-scale-in animate-delay-400 hover-lift">
                <div class="bg-dark-card/90 backdrop-blur-lg rounded-2xl shadow-xl border border-dark-border p-4 space-y-2">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-semibold text-white">Congratulations</span>
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </div>
                  <p class="font-semibold text-white text-sm">Your admission completed</p>
                  <button class="text-orange-400 hover:text-orange-300 text-xs font-medium flex items-center mt-1 transition-colors">
                    View details
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Floating Card 3: UX Class - Bottom Left -->
              <div class="absolute bottom-32 left-4 z-20 max-w-xs animate-scale-in animate-delay-500 hover-lift">
                <div class="bg-dark-card/90 backdrop-blur-lg rounded-2xl shadow-xl border border-dark-border p-4 space-y-3">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      UX
            </div>
                <div>
                      <p class="font-semibold text-white text-sm">User Experience Class</p>
                      <p class="text-xs text-gray-400">Today at 12.00 PM</p>
                    </div>
                  </div>
                  <button class="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg text-xs font-bold shadow-lg transition-all transform hover:scale-105">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All-In-One Cloud Software Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">All-In-One Cloud Software.</h2>
          <p class="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            BrainBite is one powerful online software suite that combines all the tools needed to run a successful school or office.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Online Billing -->
          <div class="bg-dark-card p-6 rounded-xl border border-dark-border hover:border-green-500/50 transition-all hover-lift animate-fade-in-up animate-delay-100">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-110 hover:rotate-3">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 transition-colors hover:text-green-400">Online Billing, Invoicing, & Contracts</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Simple and secure control of your organization's financial and legal transactions. Send customized invoices and contracts.
            </p>
          </div>

          <!-- Easy Scheduling -->
          <div class="bg-dark-card p-6 rounded-xl border border-dark-border hover:border-green-500/50 transition-all hover-lift animate-fade-in-up animate-delay-200">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-110 hover:rotate-3">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 transition-colors hover:text-green-400">Easy Scheduling & Attendance Tracking</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance.
            </p>
          </div>

          <!-- Customer Tracking -->
          <div class="bg-dark-card p-6 rounded-xl border border-dark-border hover:border-green-500/50 transition-all hover-lift animate-fade-in-up animate-delay-300">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-110 hover:rotate-3">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 transition-colors hover:text-green-400">Customer Tracking</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Automate and track emails to individuals or groups. BrainBite's built-in system helps organize your organization.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses Section -->
    <section id="featured-courses" class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface border-t border-dark-border">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Featured Courses</h2>
          <p class="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our AI-powered courses and start your learning journey today
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="coursesLoading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="bg-dark-card rounded-2xl border border-dark-border p-6 animate-pulse">
            <div class="h-32 bg-dark-surface rounded-lg mb-4"></div>
            <div class="h-4 bg-dark-surface rounded w-1/4 mb-3"></div>
            <div class="h-6 bg-dark-surface rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-dark-surface rounded w-full mb-2"></div>
            <div class="h-10 bg-dark-surface rounded mt-4"></div>
          </div>
        </div>

        <!-- Courses Grid -->
        <div v-else-if="featuredCourses.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="course in featuredCourses" 
            :key="course.id" 
            class="group relative flex flex-col rounded-2xl shadow-xl overflow-hidden bg-dark-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-dark-border hover:border-green-500/50 cursor-pointer"
            @click="handleCourseClick(course.id)"
          >
            <!-- Course Header with Gradient -->
            <div class="relative h-32 bg-gradient-to-br from-green-500/20 via-green-600/10 to-transparent border-b border-dark-border">
              <div class="absolute top-4 left-4">
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/30 text-green-400 capitalize border border-green-500/50 backdrop-blur-sm">
                  {{ course.subject }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <div class="w-10 h-10 rounded-full bg-dark-card/80 backdrop-blur-sm border border-dark-border flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all">
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Course Content -->
            <div class="flex-1 p-6 flex flex-col">
              <div class="flex-1 mb-6">
                <h3 class="text-xl font-bold text-white font-display mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                  {{ course.title }}
                </h3>
                <p class="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4">
                  {{ course.description || 'No description available.' }}
                </p>
                
                <!-- Course Meta -->
                <div class="flex items-center space-x-4 text-xs text-gray-500">
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ formatDate(course.created_at) }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <button
                @click.stop="handleCourseClick(course.id)"
                class="w-full flex justify-center items-center px-6 py-3.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all transform group-hover:scale-105 shadow-lg group-hover:shadow-xl"
              >
                <span>Start Learning</span>
                <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">No courses available yet</h3>
          <p class="text-gray-400 mb-8">Check back soon for new courses!</p>
        </div>

        <!-- View All Courses Link -->
        <div v-if="featuredCourses.length > 0" class="text-center mt-12">
          <NuxtLink
            to="/courses"
            class="inline-flex items-center px-6 py-3 border border-dark-border text-sm font-semibold rounded-xl text-gray-300 hover:text-white hover:bg-dark-card transition-all"
          >
            View All Courses
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- What is BrainBite Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold text-white">What is BrainBite?</h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              BrainBite is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
            </p>
          </div>
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
              alt="Modern classroom"
              class="w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Instructors and Students Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center mb-16">
          <!-- Instructors Card -->
          <div class="space-y-6">
            <div class="relative group">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Professional instructor"
                class="w-full rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
              />
              <div class="absolute -bottom-4 -right-4 bg-green-500 text-white p-6 rounded-xl shadow-2xl max-w-xs">
                <h3 class="text-xl font-bold mb-3">FOR INSTRUCTORS</h3>
                <NuxtLink
                  to="/login"
                  class="inline-block px-5 py-2.5 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-lg text-sm"
                >
                  Start a class today
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Students Card -->
          <div class="space-y-6">
            <div class="relative group">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                alt="Students studying"
                class="w-full rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
              />
              <div class="absolute -bottom-4 -left-4 bg-dark-card p-6 rounded-xl shadow-2xl border border-dark-border max-w-xs">
                <h3 class="text-xl font-bold mb-3 text-white">FOR STUDENTS</h3>
                <button class="w-full px-5 py-2.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-lg text-sm">
                  Enter access code
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="text-center max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Everything you can do in a physical classroom, you can do with BrainBite</h2>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            BrainBite's school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
          </p>
          <button class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-green-400 bg-green-500/20 hover:bg-green-500/30 transition-all transform hover:scale-105">
            Learn more
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Modern Classroom Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div class="max-w-7xl mx-auto">
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop"
            alt="Modern classroom with students and instructor"
            class="w-full rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>

    <!-- Tools For Teachers And Learners Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Tools For Teachers And Learners</h2>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto">
            BrainBite has a dynamic set of teaching tools built to be deployed and used during class. Teachers can handout assignments in real-time for students to complete and submit.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
              alt="Professional teacher with educational tools"
              class="w-full rounded-xl shadow-2xl"
            />
          </div>
          <div class="space-y-6">
            <div class="bg-dark-card p-6 rounded-xl border border-dark-border">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white">Assignment</h3>
              </div>
            </div>
            <div class="bg-dark-card p-6 rounded-xl border border-dark-border">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white">Grade</h3>
              </div>
            </div>
            <div class="bg-dark-card p-6 rounded-xl border border-dark-border">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white">Class Management</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools for Educators Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Tools for Educators</h2>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto">
            BrainBite provides tools to help you run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and add grade tests and quizzes in real-time.
          </p>
        </div>

        <div class="bg-dark-card rounded-xl p-8 border border-dark-border">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white">Gradebook</h3>
            <button class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
              Export
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-dark-border">
                  <th class="text-left py-3 px-4 text-gray-400 font-medium text-sm">Student</th>
                  <th class="text-left py-3 px-4 text-gray-400 font-medium text-sm">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-dark-border">
                  <td class="py-3 px-4 text-white">SE - Samuel Esubalew</td>
                  <td class="py-3 px-4 text-green-400 font-semibold">A</td>
                </tr>
                <tr class="border-b border-dark-border">
                  <td class="py-3 px-4 text-white">ST - Samuel Tale</td>
                  <td class="py-3 px-4 text-green-400 font-semibold">B+</td>
                </tr>
                <tr class="border-b border-dark-border">
                  <td class="py-3 px-4 text-white">AB - Abreham belay</td>
                  <td class="py-3 px-4 text-green-400 font-semibold">A-</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-white">DK - Daniel Kumilachew</td>
                  <td class="py-3 px-4 text-green-400 font-semibold">B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- One-on-One Discussions Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div class="max-w-7xl mx-auto">
        <div class="bg-dark-card rounded-xl p-8 border border-dark-border">
          <h2 class="text-2xl font-bold text-white mb-6">One-on-One Discussions</h2>
          <p class="text-gray-300 mb-6">
            Teachers and teacher assistants can talk with students privately without leaving the Zoom environment.
          </p>
          
          <div class="bg-dark-surface rounded-lg p-6 mb-4">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span class="text-green-400 font-semibold">MT</span>
                </div>
                <div>
                  <div class="text-white font-semibold">Ms. Teacher</div>
                  <div class="text-gray-400 text-sm">Instructor</div>
                </div>
              </div>
              <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">Active</span>
            </div>
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-dark-card rounded-full flex items-center justify-center">
                  <span class="text-gray-400 text-xs">SN</span>
                </div>
                <div class="text-gray-300 text-sm">Student Name</div>
                <span class="text-gray-500 text-xs">Participant</span>
              </div>
            </div>
            <div class="flex gap-3 mt-4">
              <button class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                Chat
              </button>
              <button class="px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg text-sm font-medium hover:bg-dark-bg transition-colors">
                End Discussion
              </button>
            </div>
          </div>
          
          <button class="text-green-400 hover:text-green-300 font-semibold text-sm">
            See more features
          </button>
        </div>
      </div>
    </section>

    <!-- Integrations Section -->
    <section id="integrations" class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">INTEGRATIONS</h2>
          <p class="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            200+ educational tools and platform integrations
          </p>
          <p class="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            BrainBite has every tool your classroom needs and comes pre-integrated with more than 200+ tools, student information systems, LMS, and education platforms.
          </p>
        </div>
        
        <!-- Integration Logos -->
        <div class="flex flex-wrap justify-center items-center gap-8 mb-12">
          <div class="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-green-500/50 transition-all">
            <div class="text-white font-semibold">OneDrive</div>
          </div>
          <div class="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-green-500/50 transition-all">
            <div class="text-white font-semibold">Dropbox</div>
          </div>
          <div class="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-green-500/50 transition-all">
            <div class="text-white font-semibold">Google Drive</div>
          </div>
          <div class="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-green-500/50 transition-all">
            <div class="text-white font-semibold">Microsoft Teams</div>
          </div>
        </div>
        
        <div class="flex justify-center">
          <button class="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-green-500 hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
            See All Integrations
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">TESTIMONIAL</h2>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto mb-2">
            What They Say?
          </p>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
            BrainBite has got more than <span class="text-green-400 font-semibold">100k positive ratings</span> from our users around the world.
          </p>
          <p class="text-gray-400 text-sm mb-8">
            Some of the students and teachers were greatly helped by BrainBite.
          </p>
          <p class="text-gray-400 text-sm mb-8">
            Are you too? Please give your assessment
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <NuxtLink
              to="/testimonials"
              class="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              View All Testimonials
            </NuxtLink>
            <button class="px-6 py-3 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:bg-dark-surface hover:border-green-500/50 transition-all">
              Write your assessment
            </button>
          </div>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <!-- Testimonial 1 - Gloria Rose -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-100">
            <div class="flex items-center gap-2 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 text-lg italic">
              "Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. BrainBite is exactly what our business has been lacking."
            </p>
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                alt="Gloria Rose"
                class="w-16 h-16 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-500 transition-all ring-4 ring-green-500/20"
              />
              <div>
                <div class="text-white font-bold text-lg">Gloria Rose</div>
                <div class="text-gray-400 text-sm">12 reviews in total</div>
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

          <!-- Testimonial 3 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-300">
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

          <!-- Testimonial 4 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-100">
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

          <!-- Testimonial 5 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-200">
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

          <!-- Testimonial 6 -->
          <div class="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-green-500/50 transition-all hover-lift group animate-fade-in-up animate-delay-300">
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
        </div>
      </div>
    </section>

    <!-- Latest News and Resources Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Latest News and Resources</h2>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto">
            See the developments that have occurred to BrainBite in the world
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- News Card 1 -->
          <div class="bg-dark-card rounded-xl p-6 border border-dark-border hover:border-green-500/50 transition-all">
            <span class="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold mb-3">NEWS</span>
            <h3 class="text-lg font-bold text-white mb-3">
              Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
            </h3>
            <p class="text-gray-300 text-sm leading-relaxed mb-4">
              Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
            </p>
            <NuxtLink to="#" class="inline-flex items-center text-green-400 hover:text-green-300 font-semibold group text-sm">
              Read more
              <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- News Card 2 -->
          <div class="bg-dark-card rounded-xl p-6 border border-dark-border hover:border-green-500/50 transition-all">
            <span class="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold mb-3">PRESS RELEASE</span>
            <h3 class="text-lg font-bold text-white mb-3">
              Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand
            </h3>
            <p class="text-gray-300 text-sm leading-relaxed mb-4">
              Class Technologies Inc., the company that created Class,...
            </p>
            <NuxtLink to="#" class="inline-flex items-center text-green-400 hover:text-green-300 font-semibold group text-sm">
              Read more
              <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- News Card 3 -->
          <div class="bg-dark-card rounded-xl p-6 border border-dark-border hover:border-green-500/50 transition-all">
            <span class="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold mb-3">NEWS</span>
            <h3 class="text-lg font-bold text-white mb-3">
              Zoom's earliest investors are betting millions on a better Zoom for schools
            </h3>
            <p class="text-gray-300 text-sm leading-relaxed mb-4">
              Zoom was never created to be a consumer product. Nonetheless, the...
            </p>
            <NuxtLink to="#" class="inline-flex items-center text-green-400 hover:text-green-300 font-semibold group text-sm">
              Read more
              <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- News Card 4 -->
          <div class="bg-dark-card rounded-xl p-6 border border-dark-border hover:border-green-500/50 transition-all">
            <span class="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold mb-3">NEWS</span>
            <h3 class="text-lg font-bold text-white mb-3">
              Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms
            </h3>
            <p class="text-gray-300 text-sm leading-relaxed mb-4">
              This year, investors have reaped big financial returns from betting on Zoom...
            </p>
            <NuxtLink to="#" class="inline-flex items-center text-green-400 hover:text-green-300 font-semibold group text-sm">
              Read more
              <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

const { courses, loading: coursesLoading, fetchCourses } = useCourses()
const { navigateToCourse } = useCourseNavigation()

// Fetch courses on page load (no auth required for listing)
await fetchCourses()

// Show latest 3 courses as featured (sorted by created_at DESC)
const featuredCourses = computed(() => {
  const sorted = [...courses.value].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return dateB - dateA // Latest first
  })
  return sorted.slice(0, 3) // Only show 3 latest courses
})

const handleCourseClick = (courseId: string) => {
  navigateToCourse(courseId)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

const imageLoaded = ref(false)

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Image failed to load from:', img.src)
  console.error('💡 Make sure student.png exists in frontend/public/ folder')
  img.style.display = 'none'
  imageLoaded.value = false
}

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Intersection Observer for scroll animations
onMounted(() => {
  // Check if image exists
  const img = new Image()
  img.onload = () => {
    console.log('✅ Student image verified and ready')
    imageLoaded.value = true
  }
  img.onerror = () => {
    console.error('❌ Student image not found at /student.png')
    console.error('💡 Please check:')
    console.error('   1. File exists at: frontend/public/student.png')
    console.error('   2. Restart dev server: npm run dev')
    console.error('   3. Check browser console for 404 errors')
  }
  img.src = '/student.png'

  // Add scroll-triggered animations
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

  // Observe all sections except hero
  document.querySelectorAll('section:not(:first-child)').forEach((section) => {
    section.classList.add('opacity-0')
    observer.observe(section)
  })
})
</script>
