<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p class="text-gray-400">Loading assessment...</p>
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
          :to="`/courses/${route.params.id}`" 
          class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </NuxtLink>
      </div>
    </div>

    <!-- Assessment Content -->
    <div v-else-if="course" class="flex flex-col min-h-screen">
      <!-- Enhanced Top Bar -->
      <header class="sticky top-0 z-50 bg-dark-surface/95 backdrop-blur-sm border-b border-dark-border shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Breadcrumb & Course Info -->
            <div class="flex items-center space-x-4 flex-1 min-w-0">
              <NuxtLink 
                :to="`/courses/${route.params.id}`" 
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
                <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span class="text-sm font-semibold text-white">Assessment</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Progress Bar Section -->
      <div class="bg-dark-surface/50 border-b border-dark-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-400 font-medium">Course Progress</span>
            <span class="text-sm text-green-400 font-bold">{{ getProgress(courseId, totalLessons) }}%</span>
          </div>
          <div class="w-full bg-dark-card rounded-full h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-lg"
              :style="{ width: `${getProgress(courseId, totalLessons)}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:block w-80 bg-dark-surface border-r border-dark-border overflow-y-auto">
          <div class="p-6">
            <CourseSidebar 
              :course="course" 
              :current-lesson-index="course.pages?.length || 0"
              :course-id="courseId"
            />
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto bg-dark-bg">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <!-- Assessment Card -->
            <div class="bg-dark-card rounded-2xl border border-dark-border shadow-xl overflow-hidden">
              <CourseAssessment 
                :questions="course.questions || []" 
                :course-id="courseId" 
              />
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
const { enroll, updateProgress, getProgress } = useEnrollment()

const courseId = route.params.id as string

try {
  await fetchCourseById(courseId)
} catch (e) {
  // Error is handled by the composable
}

const course = computed(() => currentCourse.value)
const pending = computed(() => loading.value)
const totalLessons = computed(() => (course.value?.pages?.length || 0) + 1) // +1 for assessment

// Track assessment access - auto-enroll if not enrolled
watch(course, () => {
  if (course.value && course.value.pages) {
    enroll(courseId, totalLessons.value)
    // Mark that user accessed the assessment (index = pages.length = 4)
    updateProgress(courseId, course.value.pages.length, totalLessons.value)
  }
}, { immediate: true })
</script>
