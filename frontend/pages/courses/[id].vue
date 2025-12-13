<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p class="text-gray-400">Loading course...</p>
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
        <NuxtLink to="/courses" class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </NuxtLink>
      </div>
    </div>

    <!-- Course Content -->
    <div v-else-if="course" class="bg-dark-bg min-h-screen">
      <!-- Breadcrumb Navigation -->
      <div class="bg-dark-surface/50 border-b border-dark-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav class="flex items-center space-x-2 text-sm">
            <NuxtLink to="/courses" class="text-gray-400 hover:text-green-400 transition-colors">Courses</NuxtLink>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-300 truncate max-w-md">{{ course.title }}</span>
          </nav>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="bg-gradient-to-br from-green-500/10 via-dark-bg to-dark-bg border-b border-dark-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div class="flex items-center gap-3 mb-4">
            <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/30 text-green-400 capitalize border border-green-500/50">
              {{ course.subject }}
            </span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-display">
            {{ course.title }}
          </h1>
          
          <p v-if="course.description" class="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
            {{ course.description }}
          </p>
        </div>
      </div>

      <!-- Main Content: Tabs for Content Pages + Assessment -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <!-- Tabs Navigation -->
        <div class="mb-8">
          <div class="border-b border-dark-border">
            <nav class="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
              <!-- Content Page Tabs -->
              <button
                v-for="(page, index) in sortedPages"
                :key="page.id"
                @click="activeTab = `page-${index}`"
                :class="[
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === `page-${index}`
                    ? 'border-green-500 text-green-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                ]"
              >
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {{ page.title }}
                </span>
              </button>
              
              <!-- Assessment Tab -->
              <button
                v-if="course.questions && course.questions.length > 0"
                @click="activeTab = 'assessment'"
                :class="[
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === 'assessment'
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                ]"
              >
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Assessment
                </span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="mt-8">
          <!-- Content Pages -->
          <div
            v-for="(page, index) in sortedPages"
            :key="page.id"
            v-show="activeTab === `page-${index}`"
            class="bg-dark-card rounded-2xl border border-dark-border shadow-xl overflow-hidden"
          >
            <CourseContentPage
              :page="page"
              :page-number="index + 1"
              :total-pages="sortedPages.length"
            />
          </div>

          <!-- Assessment -->
          <div
            v-if="course.questions && course.questions.length > 0"
            v-show="activeTab === 'assessment'"
            class="bg-dark-card rounded-2xl border border-dark-border shadow-xl overflow-hidden"
          >
            <div class="p-6 md:p-8">
              <CourseAssessment
                :questions="course.questions"
                :course-id="courseId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ 
  middleware: 'auth',
  layout: 'default'
})

const route = useRoute()
const { currentCourse, loading, error, fetchCourseById } = useCourses()

const courseId = route.params.id as string
const activeTab = ref<string>('page-0')

// Fetch course data
try {
  await fetchCourseById(courseId)
} catch (e) {
  // Error is handled by the composable
}

const course = computed(() => currentCourse.value)
const pending = computed(() => loading.value)

// Sort pages by page_index
const sortedPages = computed(() => {
  if (!course.value?.pages) return []
  return [...course.value.pages].sort((a, b) => a.page_index - b.page_index)
})

// Set default tab to first page
watch(sortedPages, (pages) => {
  if (pages.length > 0 && activeTab.value === 'page-0') {
    activeTab.value = 'page-0'
  }
}, { immediate: true })
</script>
