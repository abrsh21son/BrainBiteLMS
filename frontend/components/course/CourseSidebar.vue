<template>
  <div>
    <!-- Back to Course Link -->
    <NuxtLink 
      :to="`/courses/${courseId}`" 
      class="inline-flex items-center text-sm text-gray-400 hover:text-green-400 mb-6 transition-colors group"
    >
      <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Course
    </NuxtLink>

    <!-- Course Info -->
    <div class="mb-6">
      <h2 class="text-lg font-bold text-white mb-1">Course Content</h2>
      <p class="text-xs text-gray-400">{{ course.pages?.length || 0 }} lessons</p>
    </div>

    <!-- Progress Bar -->
    <ClientOnly>
      <div class="mb-6">
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="text-gray-400 font-medium">Course Progress</span>
          <span class="text-green-400 font-bold">{{ progressPercentage }}%</span>
        </div>
        <div class="w-full bg-dark-surface rounded-full h-2 overflow-hidden">
          <div 
            class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
      <template #fallback>
        <div class="mb-6">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="text-gray-400 font-medium">Course Progress</span>
            <span class="text-green-400 font-bold">0%</span>
          </div>
          <div class="w-full bg-dark-surface rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" style="width: 0%"></div>
          </div>
        </div>
      </template>
    </ClientOnly>

    <!-- Lessons List -->
    <div class="space-y-1 mb-4">
      <NuxtLink
        v-for="(page, index) in course.pages"
        :key="page.id"
        :to="`/courses/${courseId}/lesson/${index}`"
        :class="[
          'flex items-center justify-between p-3 rounded-xl transition-all group relative',
          index === currentLessonIndex
            ? 'bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 border-2 border-green-500/50 shadow-lg'
            : 'text-gray-300 hover:bg-dark-card border-2 border-transparent hover:border-dark-border'
        ]"
        @click="$emit('close-menu')"
      >
        <div class="flex items-center flex-1 min-w-0">
          <!-- Lesson Number Badge -->
          <ClientOnly>
            <div :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 transition-all',
              index === currentLessonIndex
                ? 'bg-green-500 text-white shadow-md'
                : isLessonCompleted(index)
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-dark-card text-gray-500'
            ]">
              <svg v-if="isLessonCompleted(index)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <template #fallback>
              <div :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 transition-all',
                index === currentLessonIndex
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-dark-card text-gray-500'
              ]">
                <span>{{ index + 1 }}</span>
              </div>
            </template>
          </ClientOnly>
          <span class="text-sm font-medium truncate flex-1">{{ page.title }}</span>
        </div>
        
        <!-- Active Indicator -->
        <div v-if="index === currentLessonIndex" class="w-2 h-2 bg-green-400 rounded-full ml-2 flex-shrink-0 animate-pulse"></div>
      </NuxtLink>
    </div>

    <!-- Assessment Link -->
    <div
      :class="[
        'flex items-center justify-between p-3 rounded-xl transition-all mt-4 pt-4 border-t border-dark-border',
        isAssessmentPage
          ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-400 border-2 border-purple-500/50 shadow-lg'
          : 'text-gray-300 hover:bg-dark-card border-2 border-transparent hover:border-purple-500/50'
      ]"
    >
      <NuxtLink
        :to="`/courses/${courseId}/assessment`"
        class="flex items-center flex-1 min-w-0 group"
        @click="$emit('close-menu')"
      >
        <div :class="[
          'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0',
          isAssessmentPage
            ? 'bg-purple-500 text-white shadow-md'
            : 'bg-gradient-to-br from-purple-500/30 to-purple-600/20 text-purple-400'
        ]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <span class="text-sm font-semibold">Assessment</span>
      </NuxtLink>
      <div v-if="isAssessmentPage" class="w-2 h-2 bg-purple-400 rounded-full ml-2 flex-shrink-0 animate-pulse"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  course: any
  currentLessonIndex: number
  courseId: string
}>()

defineEmits<{
  'close-menu': []
}>()

const route = useRoute()
const { getEnrollment, getProgress, isCompleted } = useEnrollment()

const totalLessons = computed(() => (props.course?.pages?.length || 0) + 1)

const progressPercentage = computed(() => {
  return getProgress(props.courseId, totalLessons.value)
})

const isLessonCompleted = (lessonIndex: number): boolean => {
  const enrollment = getEnrollment(props.courseId)
  if (!enrollment) return false
  return enrollment.completedLessons.includes(lessonIndex)
}

// Check if we're on the assessment page
const isAssessmentPage = computed(() => {
  return route.path.includes('/assessment')
})
</script>

