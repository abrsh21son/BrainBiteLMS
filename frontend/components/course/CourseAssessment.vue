<template>
  <div class="space-y-8">
    <div class="border-b border-dark-border pb-6 mb-6">
      <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">
        Assessment
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Knowledge Check</h2>
      <p class="text-gray-400 text-base leading-relaxed">Test your understanding of the course material. Select the best answer for each question.</p>
      <div class="mt-4 flex items-center gap-4 text-sm text-gray-400">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ questions.length }} Questions
        </span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No Time Limit
        </span>
      </div>
    </div>

    <div v-for="(question, qIndex) in questions" :key="question.id" class="bg-dark-surface p-6 md:p-8 rounded-lg border border-dark-border hover:border-purple-500/30 transition-colors">
      <div class="flex items-start mb-6">
        <div class="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold text-sm mr-4">
          {{ qIndex + 1 }}
        </div>
        <p class="font-semibold text-lg md:text-xl text-white leading-relaxed flex-1">{{ question.question_text }}</p>
      </div>
      
      <div class="space-y-3 ml-12">
        <div 
          v-for="option in question.options" 
          :key="option.id"
          @click="selectOption(question.id, option.id)"
          :class="[
            'p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-between group',
            selectedOptions[question.id] === option.id 
              ? (isSubmitted 
                  ? (option.is_correct ? 'bg-green-500/20 border-green-500 ring-2 ring-green-500/50' : 'bg-red-500/20 border-red-500 ring-2 ring-red-500/50')
                  : 'bg-purple-500/20 border-purple-500 ring-2 ring-purple-500/50')
              : 'bg-dark-card border-dark-border hover:bg-dark-surface hover:border-gray-500'
          ]"
        >
          <div class="flex items-center flex-1">
            <div :class="[
              'w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0',
              selectedOptions[question.id] === option.id
                ? (isSubmitted 
                    ? (option.is_correct ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500')
                    : 'border-purple-500 bg-purple-500/20')
                : 'border-gray-500 group-hover:border-gray-400'
            ]">
              <svg v-if="selectedOptions[question.id] === option.id" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span :class="[
              'text-base md:text-lg leading-relaxed',
              selectedOptions[question.id] === option.id && isSubmitted
                ? (option.is_correct ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold')
                : 'text-gray-300'
            ]">
              {{ option.option_text }}
            </span>
          </div>
          
          <span v-if="isSubmitted && selectedOptions[question.id] === option.id" class="ml-4 flex-shrink-0">
            <svg v-if="option.is_correct" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
      </div>
      
      <!-- Feedback Message -->
      <div 
        v-if="isSubmitted && selectedOptions[question.id]"
        class="ml-12 mt-4 p-4 rounded-lg border"
        :class="getSelectedOption(question.id)?.is_correct ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'"
      >
        <div class="flex items-start space-x-3">
          <svg 
            :class="getSelectedOption(question.id)?.is_correct ? 'text-green-400' : 'text-red-400'"
            class="w-5 h-5 mt-0.5 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path v-if="getSelectedOption(question.id)?.is_correct" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">
            <p :class="getSelectedOption(question.id)?.is_correct ? 'text-green-400' : 'text-red-400'" class="text-sm font-semibold mb-1">
              {{ getSelectedOption(question.id)?.is_correct ? 'Correct!' : 'Incorrect' }}
            </p>
            <p class="text-sm text-gray-300 leading-relaxed">
              {{ getSelectedOption(question.id)?.is_correct 
                ? 'Great job! You got this one right.' 
                : `The correct answer is: ${getCorrectOption(question.id)?.option_text}` }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="pt-6 border-t border-dark-border">
      <!-- Results Card -->
      <div v-if="isSubmitted" class="mb-6 p-6 rounded-lg" :class="scorePercentage >= 50 ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-white">Your Results</h3>
          <span class="text-3xl font-bold" :class="scorePercentage >= 50 ? 'text-green-400' : 'text-red-400'">
            {{ scorePercentage }}%
          </span>
        </div>
        <p class="text-gray-300 mb-4">
          You answered <span class="font-semibold text-white">{{ score }}</span> out of <span class="font-semibold text-white">{{ questions.length }}</span> questions correctly.
        </p>
        <div class="w-full bg-dark-surface rounded-full h-3">
          <div 
            class="h-3 rounded-full transition-all duration-500" 
            :class="scorePercentage >= 50 ? 'bg-green-500' : 'bg-red-500'"
            :style="{ width: `${scorePercentage}%` }"
          ></div>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button 
          @click="submitAssessment" 
          :disabled="isSubmitted || !allQuestionsAnswered"
          class="w-full sm:w-auto px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg shadow-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
        >
          {{ isSubmitted ? 'Assessment Completed' : `Submit Answers (${Object.keys(selectedOptions).length}/${questions.length})` }}
        </button>
        
        <NuxtLink 
          to="/courses"
          class="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center"
        >
          Browse More Courses
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  questions: any[]
  courseId?: string
}>()

const selectedOptions = ref<Record<string, string>>({})
const isSubmitted = ref(false)

const selectOption = (questionId: string, optionId: string) => {
  if (isSubmitted.value) return
  selectedOptions.value[questionId] = optionId
}

const getSelectedOption = (questionId: string) => {
  const question = props.questions.find(q => q.id === questionId)
  if (!question) return null
  return question.options?.find((opt: any) => opt.id === selectedOptions.value[questionId])
}

const getCorrectOption = (questionId: string) => {
  const question = props.questions.find(q => q.id === questionId)
  if (!question) return null
  return question.options?.find((opt: any) => opt.is_correct)
}

const allQuestionsAnswered = computed(() => {
  return Object.keys(selectedOptions.value).length === props.questions.length
})

const submitAssessment = () => {
  isSubmitted.value = true
}

const score = computed(() => {
  let correct = 0
  props.questions.forEach((q) => {
    const selected = selectedOptions.value[q.id]
    const correctOption = q.options?.find((o: any) => o.is_correct)
    if (selected && correctOption && selected === correctOption.id) {
      correct++
    }
  })
  return correct
})

const scorePercentage = computed(() => {
  if (props.questions.length === 0) return 0
  return Math.round((score.value / props.questions.length) * 100)
})
</script>
