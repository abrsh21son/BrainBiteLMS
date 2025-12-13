<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p class="text-gray-400">Loading lesson...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 py-20">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-4">Error Loading Course</h2>
        <p class="text-red-400 mb-6">{{ error }}</p>
        <NuxtLink 
          :to="`/courses/${courseId}`" 
          class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </NuxtLink>
      </div>
    </div>

    <!-- Course Content -->
    <div v-else-if="course && course.pages && currentPage" :key="`lesson-${courseId}-${lessonIndex}`" class="flex flex-col min-h-screen">
      <!-- Enhanced Top Bar -->
      <header class="sticky top-0 z-50 bg-dark-surface/95 backdrop-blur-sm border-b border-dark-border shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Breadcrumb & Course Info -->
            <div class="flex items-center space-x-4 flex-1 min-w-0">
              <NuxtLink 
                :to="`/courses/${courseId}`" 
                class="flex items-center text-sm text-gray-400 hover:text-green-400 transition-colors group"
              >
                <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span class="hidden sm:inline truncate max-w-xs">{{ course.title }}</span>
              </NuxtLink>
              <svg class="w-4 h-4 text-gray-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-semibold text-white">Lesson {{ lessonIndex + 1 }}</span>
                <span class="text-xs text-gray-500">of {{ course.pages.length }}</span>
              </div>
            </div>

            <!-- Progress & Actions -->
            <div class="flex items-center space-x-6">
              <!-- Progress Bar -->
              <ClientOnly>
                <div class="hidden md:flex items-center space-x-3">
                  <div class="w-40 bg-dark-card rounded-full h-2.5 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500 shadow-lg" 
                      :style="{ width: `${getProgress(courseId.value, totalLessons)}%` }"
                    ></div>
                  </div>
                  <span class="text-xs text-green-400 font-bold min-w-[3rem]">{{ getProgress(courseId.value, totalLessons) }}%</span>
                </div>
                <template #fallback>
                  <div class="hidden md:flex items-center space-x-3">
                    <div class="w-40 bg-dark-card rounded-full h-2.5 overflow-hidden">
                      <div class="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500 shadow-lg" style="width: 0%"></div>
                    </div>
                    <span class="text-xs text-green-400 font-bold min-w-[3rem]">0%</span>
                  </div>
                </template>
              </ClientOnly>

              <!-- Mobile Menu Button -->
              <button 
                @click="showMobileMenu = !showMobileMenu"
                class="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-dark-card transition-all"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Progress Bar Section -->
      <ClientOnly>
        <div class="bg-dark-surface/50 border-b border-dark-border">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-400 font-medium">Course Progress</span>
              <span class="text-sm text-green-400 font-bold">{{ getProgress(courseId.value, totalLessons) }}%</span>
            </div>
            <div class="w-full bg-dark-card rounded-full h-3 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                :style="{ width: `${getProgress(courseId.value, totalLessons)}%` }"
              ></div>
            </div>
          </div>
        </div>
        <template #fallback>
          <div class="bg-dark-surface/50 border-b border-dark-border">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-400 font-medium">Course Progress</span>
                <span class="text-sm text-green-400 font-bold">0%</span>
              </div>
              <div class="w-full bg-dark-card rounded-full h-3 overflow-hidden">
                <div class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-lg" style="width: 0%"></div>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>

      <!-- Mobile Menu Overlay -->
      <div 
        v-if="showMobileMenu"
        class="lg:hidden fixed inset-0 z-50 bg-dark-bg/95 backdrop-blur-sm"
        @click="showMobileMenu = false"
      >
        <div class="w-80 h-full bg-dark-surface border-r border-dark-border overflow-y-auto shadow-2xl" @click.stop>
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-white">Course Content</h2>
              <button 
                @click="showMobileMenu = false" 
                class="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-dark-card transition-all"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CourseSidebar 
              :course="course" 
              :current-lesson-index="lessonIndex"
              :course-id="courseId.value"
            />
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:block w-80 bg-dark-surface border-r border-dark-border overflow-y-auto sticky top-0 h-screen">
          <div class="p-6">
            <CourseSidebar 
              :course="course" 
              :current-lesson-index="lessonIndex"
              :course-id="courseId.value"
            />
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto bg-dark-bg">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <!-- Lesson Content Card -->
            <div class="bg-dark-card rounded-2xl border border-dark-border shadow-xl overflow-hidden">
              <CourseContent :page="currentPage" />
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-8 flex items-center justify-between gap-4">
              <button
                v-if="lessonIndex > 0"
                @click.prevent="goToLesson(lessonIndex - 1)"
                type="button"
                class="group inline-flex items-center px-6 py-3.5 bg-dark-card hover:bg-dark-surface border border-dark-border hover:border-green-500/50 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer font-medium"
              >
                <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous Lesson
              </button>
              <div v-else></div>

              <div class="flex items-center space-x-2 text-sm text-gray-400">
                <span>{{ lessonIndex + 1 }} / {{ course.pages.length }}</span>
              </div>

              <button
                v-if="lessonIndex < course.pages.length - 1"
                @click.prevent="goToLesson(lessonIndex + 1)"
                type="button"
                class="group inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all font-semibold cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Next Lesson
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <NuxtLink
                v-else
                :to="`/courses/${courseId.value}/assessment`"
                class="group inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Take Assessment
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { currentCourse, loading, error, fetchCourseById } = useCourses()
const { enroll, updateProgress, getProgress, getEnrollment } = useEnrollment()

const courseId = computed(() => route.params.id as string)
const lessonIndex = computed(() => parseInt(route.params.lessonIndex as string) || 0)
const totalLessons = computed(() => (course.value?.pages?.length || 0) + 1) // +1 for assessment

// Watch for route changes and fetch course if needed
watch(() => route.params.id, async (newId) => {
  if (newId && newId !== currentCourse.value?.id) {
    try {
      await fetchCourseById(newId as string)
    } catch (e) {
      // Error is handled by the composable
    }
  }
}, { immediate: true })

// Initial fetch
try {
  await fetchCourseById(courseId.value)
} catch (e) {
  // Error is handled by the composable
}

const course = computed(() => currentCourse.value)
const pending = computed(() => loading.value)
const showMobileMenu = ref(false)

const currentPage = computed(() => {
  if (!course.value?.pages || lessonIndex.value < 0 || lessonIndex.value >= course.value.pages.length) {
    return null
  }
  return course.value.pages[lessonIndex.value]
})

// Track progress when lesson is viewed
watch([course, lessonIndex, courseId], () => {
  if (course.value && course.value.pages && lessonIndex.value >= 0 && lessonIndex.value < course.value.pages.length) {
    const totalLessons = course.value.pages.length + 1 // +1 for assessment
    // Auto-enroll if not already enrolled
    enroll(courseId.value, totalLessons)
    // Update progress
    updateProgress(courseId.value, lessonIndex.value, totalLessons)
  }
  
  // Redirect if invalid lesson index
  if (course.value && course.value.pages && (lessonIndex.value < 0 || lessonIndex.value >= course.value.pages.length)) {
    navigateTo(`/courses/${courseId.value}/lesson/0`)
  }
}, { immediate: true })

const goToLesson = async (index: number) => {
  showMobileMenu.value = false
  await navigateTo(`/courses/${courseId.value}/lesson/${index}`)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
