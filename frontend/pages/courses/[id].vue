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
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left: Course Info -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/30 text-green-400 capitalize border border-green-500/50">
                  {{ course.subject }}
                </span>
                <!-- Gem Badge -->
                <div class="relative">
                  <svg class="w-6 h-6 text-yellow-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg"></div>
                </div>
                <!-- Status Badge -->
                <ClientOnly>
                  <template #default>
                    <span 
                      v-if="getStatus(courseId) === 'completed'"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-600/30 text-green-400 border border-green-500/50"
                    >
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      Completed
                    </span>
                    <span 
                      v-else-if="getStatus(courseId) === 'in_progress'"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-400 border border-blue-500/50"
                    >
                      In Progress
                    </span>
                    <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 pointer-events-none">
                      &nbsp;
                    </span>
                  </template>
                  <template #fallback>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 pointer-events-none">
                      &nbsp;
                    </span>
                  </template>
                </ClientOnly>
              </div>

              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-display">
                {{ course.title }}
              </h1>
              <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
                {{ course.description }}
              </p>
              
              <!-- Course Stats -->
              <div class="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span class="text-white font-semibold">{{ course.pages?.length || 0 }}</span>
                  <span class="ml-1">Lessons</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-white font-semibold">{{ (course.pages?.length || 0) * 10 }}</span>
                  <span class="ml-1">minutes</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span class="text-white font-semibold">English</span>
                </div>
              </div>

              <!-- Progress Bar (if enrolled) -->
              <ClientOnly>
                <template #default>
                  <div v-if="isEnrolled(courseId)" class="mb-8">
                    <div class="flex items-center justify-between text-sm mb-2">
                      <span class="text-gray-400 font-medium">Your Progress</span>
                      <span class="text-green-400 font-bold">{{ getProgress(courseId, totalLessons) }}%</span>
                    </div>
                    <div class="w-full bg-dark-surface rounded-full h-3 overflow-hidden">
                      <div 
                        class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                        :style="{ width: `${getProgress(courseId, totalLessons)}%` }"
                      ></div>
                    </div>
                  </div>
                  <div v-else class="mb-8 opacity-0 pointer-events-none">
                    <div class="flex items-center justify-between text-sm mb-2">
                      <span class="text-gray-400 font-medium">Your Progress</span>
                      <span class="text-green-400 font-bold">0%</span>
                    </div>
                    <div class="w-full bg-dark-surface rounded-full h-3 overflow-hidden">
                      <div class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-lg" style="width: 0%"></div>
                    </div>
                  </div>
                </template>
                <template #fallback>
                  <div class="mb-8 opacity-0 pointer-events-none">
                    <div class="flex items-center justify-between text-sm mb-2">
                      <span class="text-gray-400 font-medium">Your Progress</span>
                      <span class="text-green-400 font-bold">0%</span>
                    </div>
                    <div class="w-full bg-dark-surface rounded-full h-3 overflow-hidden">
                      <div class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-lg" style="width: 0%"></div>
                    </div>
                  </div>
                </template>
              </ClientOnly>

              <!-- Course Info Section (Above Progress) -->
              <div class="bg-dark-card rounded-2xl border border-dark-border p-6 mb-6">
                <h3 class="text-lg font-bold text-white mb-4 font-display">Course Info</h3>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-white mb-0.5">Full Lifetime Access</p>
                      <p class="text-xs text-gray-400">Access anytime, anywhere</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-white mb-0.5">Certificate of Completion</p>
                      <p class="text-xs text-gray-400">Upon course completion</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-white mb-0.5">100% Online</p>
                      <p class="text-xs text-gray-400">Learn at your own pace</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- What You'll Learn Section -->
              <div class="bg-dark-card rounded-2xl border border-dark-border p-6 mb-8">
                <h3 class="text-lg font-bold text-white mb-4 font-display">What You'll Learn</h3>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-sm text-gray-300">Comprehensive understanding of {{ course.subject }}</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-sm text-gray-300">Practical knowledge and real-world applications</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-sm text-gray-300">Assessment to validate your learning</span>
                  </li>
                </ul>
              </div>

              <!-- Progress Bar (Below Course Info) - Removed duplicate -->

              <!-- Action Buttons -->
              <ClientOnly>
                <template #default>
                  <div class="flex flex-wrap gap-4">
                    <NuxtLink
                      v-if="!isEnrolled(courseId)"
                      :to="`/courses/${courseId}/lesson/0`"
                      @click="handleEnroll()"
                      class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Enroll Now
                    </NuxtLink>
                    <button
                      v-else-if="!isCompleted(courseId)"
                      @click="handleContinueLearning()"
                      type="button"
                      class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Continue Learning
                    </button>
                    <NuxtLink
                      v-else
                      :to="`/courses/${courseId}/lesson/0`"
                      class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Review Course
                    </NuxtLink>
                  </div>
                </template>
                <template #fallback>
                  <div class="flex flex-wrap gap-4">
                    <NuxtLink
                      :to="`/courses/${courseId}/lesson/0`"
                      class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Enroll Now
                    </NuxtLink>
                  </div>
                </template>
              </ClientOnly>
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
const { enroll, isEnrolled, isCompleted, getProgress, getNextLessonIndex, getStatus, getEnrollment } = useEnrollment()

const courseId = route.params.id as string

try {
  await fetchCourseById(courseId)
} catch (e) {
  // Error is handled by the composable
}

const course = computed(() => currentCourse.value)
const pending = computed(() => loading.value)
const totalLessons = computed(() => (course.value?.pages?.length || 0) + 1) // +1 for assessment

const handleEnroll = () => {
  if (!isEnrolled(courseId)) {
    enroll(courseId, totalLessons.value)
  }
}

const getContinueLearningUrl = () => {
  handleEnroll() // Ensure enrolled
  const nextIndex = getNextLessonIndex(courseId)
  const maxLessonIndex = (course.value?.pages?.length || 1) - 1
  // Ensure we have a valid lesson index (0 to maxLessonIndex)
  // If nextIndex is >= pages.length, it means assessment is next, so go to last lesson
  const validIndex = Math.max(0, Math.min(nextIndex, maxLessonIndex))
  return `/courses/${courseId}/lesson/${validIndex}`
}

const handleContinueLearning = async () => {
  try {
    handleEnroll() // Ensure enrolled
    const nextIndex = getNextLessonIndex(courseId)
    const maxLessonIndex = (course.value?.pages?.length || 1) - 1
    // Ensure we have a valid lesson index (0 to maxLessonIndex)
    // If nextIndex is >= pages.length, it means assessment is next, so go to last lesson
    const validIndex = Math.max(0, Math.min(nextIndex, maxLessonIndex))
    await navigateTo(`/courses/${courseId}/lesson/${validIndex}`)
  } catch (error) {
    console.error('Error in handleContinueLearning:', error)
    // Fallback to first lesson if there's an error
    await navigateTo(`/courses/${courseId}/lesson/0`)
  }
}

const isLessonCompleted = (lessonIndex: number): boolean => {
  const enrollment = getEnrollment(courseId)
  if (!enrollment) return false
  return enrollment.completedLessons.includes(lessonIndex)
}

const isAssessmentCompleted = (): boolean => {
  return isCompleted(courseId)
}
</script>
