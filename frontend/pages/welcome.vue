<template>
  <div class="min-h-screen bg-dark-bg flex items-center justify-center px-4">
    <div class="max-w-2xl w-full">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="h-1.5 bg-dark-surface rounded-full overflow-hidden">
          <div 
            class="h-full bg-green-500 transition-all duration-300 rounded-full"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Welcome Screen -->
      <div v-if="currentStep === 0" class="text-center space-y-6">
        <div class="space-y-4">
          <h1 class="text-3xl md:text-4xl font-bold text-white font-display">
            Welcome to BrainBite
          </h1>
          <p class="text-lg text-gray-300 max-w-xl mx-auto">
            Let's personalize your learning experience by discovering your unique learning style.
          </p>
        </div>
        <button
          @click="startQuiz"
          class="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-base hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Discover Your Learning Style
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Quiz Questions -->
      <div v-else class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            class="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div class="flex-1"></div>
          <h2 class="text-xl md:text-2xl font-bold text-white font-display">
            Learning Style Discovery
          </h2>
          <div class="flex-1"></div>
        </div>

        <!-- Question Content -->
        <div class="space-y-6">
          <p class="text-lg text-gray-300 text-center mb-6">
            {{ questions[currentStep - 1].question }}
          </p>

          <div class="grid gap-3">
            <button
              v-for="(option, index) in questions[currentStep - 1].options"
              :key="index"
              @click="selectOption(option.value)"
              class="p-5 bg-dark-card border-2 border-dark-border rounded-xl text-left hover:border-green-500 hover:bg-dark-surface transition-all transform hover:scale-[1.02] group"
            >
              <div class="flex items-start space-x-3">
                <span class="text-2xl">{{ option.emoji }}</span>
                <div class="flex-1">
                  <h3 class="text-base font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
                    {{ option.title }}
                  </h3>
                  <p class="text-gray-300 text-sm">
                    {{ option.description }}
                  </p>
                </div>
                <svg 
                  class="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-if="showResults" class="text-center space-y-6">
        <div class="space-y-4">
          <div class="text-5xl mb-4">{{ getResultEmoji() }}</div>
          <h1 class="text-3xl md:text-4xl font-bold text-white font-display">
            {{ getResultTitle() }}
          </h1>
          <p class="text-lg text-gray-300 max-w-xl mx-auto">
            {{ getResultDescription() }}
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/signup"
            class="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-base hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Continue to Sign Up
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const currentStep = ref(0)
const showResults = ref(false)
const answers = ref<Record<string, string>>({})

const totalSteps = 5

const questions = [
  {
    question: "When do you prefer to learn?",
    options: [
      {
        emoji: "🌅",
        title: "Early Morning (6-9 AM)",
        description: "I'm a morning person and love starting fresh",
        value: "early_morning"
      },
      {
        emoji: "☀️",
        title: "Mid-Day (10 AM-2 PM)",
        description: "I hit my stride during regular work hours",
        value: "mid_day"
      },
      {
        emoji: "🌆",
        title: "Evening (6-9 PM)",
        description: "I prefer learning after work/school",
        value: "evening"
      },
      {
        emoji: "🌙",
        title: "Night Owl (9 PM-12 AM)",
        description: "I'm most creative and focused late at night",
        value: "night_owl"
      }
    ]
  },
  {
    question: "How do you learn best?",
    options: [
      {
        emoji: "👀",
        title: "Visual Learning",
        description: "Charts, diagrams, and visual aids help me understand",
        value: "visual"
      },
      {
        emoji: "👂",
        title: "Auditory Learning",
        description: "I learn best through listening and discussion",
        value: "auditory"
      },
      {
        emoji: "✋",
        title: "Hands-on Practice",
        description: "I need to do it myself to really understand",
        value: "kinesthetic"
      },
      {
        emoji: "📚",
        title: "Reading & Writing",
        description: "I prefer text-based learning and taking notes",
        value: "reading_writing"
      }
    ]
  },
  {
    question: "What motivates you most?",
    options: [
      {
        emoji: "🎯",
        title: "Achievement & Goals",
        description: "I'm driven by reaching milestones and completing objectives",
        value: "achievement"
      },
      {
        emoji: "💡",
        title: "Curiosity & Discovery",
        description: "I love exploring new ideas and solving problems",
        value: "curiosity"
      },
      {
        emoji: "🤝",
        title: "Collaboration",
        description: "Working with others energizes and motivates me",
        value: "collaboration"
      },
      {
        emoji: "🏆",
        title: "Recognition & Growth",
        description: "I'm motivated by progress and recognition of my efforts",
        value: "recognition"
      }
    ]
  },
  {
    question: "How do you prefer to consume content?",
    options: [
      {
        emoji: "📹",
        title: "Video & Interactive",
        description: "I love watching videos and interactive content",
        value: "video"
      },
      {
        emoji: "📖",
        title: "Reading & Text",
        description: "I prefer reading articles, books, and written content",
        value: "reading"
      },
      {
        emoji: "🎧",
        title: "Audio & Podcasts",
        description: "I learn well from audio content and podcasts",
        value: "audio"
      },
      {
        emoji: "🔄",
        title: "Mixed & Varied",
        description: "I like a combination of different content types",
        value: "mixed"
      }
    ]
  },
  {
    question: "What's your ideal learning pace?",
    options: [
      {
        emoji: "⚡",
        title: "Fast & Intensive",
        description: "I prefer quick, intensive learning sessions",
        value: "fast"
      },
      {
        emoji: "🚶",
        title: "Steady & Moderate",
        description: "I like a steady, moderate pace that I can maintain",
        value: "moderate"
      },
      {
        emoji: "🐢",
        title: "Slow & Thorough",
        description: "I need time to fully absorb and understand concepts",
        value: "slow"
      },
      {
        emoji: "🎯",
        title: "Adaptive & Flexible",
        description: "I adjust my pace based on the complexity of the topic",
        value: "adaptive"
      }
    ]
  }
]

const startQuiz = () => {
  currentStep.value = 1
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const selectOption = (value: string) => {
  answers.value[`question_${currentStep.value}`] = value
  
  if (currentStep.value < totalSteps) {
    currentStep.value++
  } else {
    showResults.value = true
    // Save learning style preferences (you can send to backend here)
    saveLearningPreferences()
  }
}

const saveLearningPreferences = async () => {
  // Save to backend or localStorage
  const preferences = {
    ...answers.value,
    timestamp: new Date().toISOString()
  }
  localStorage.setItem('learningPreferences', JSON.stringify(preferences))
}

const getResultEmoji = () => {
  const learningStyle = answers.value.question_2
  const emojiMap: Record<string, string> = {
    visual: "👀",
    auditory: "👂",
    kinesthetic: "✋",
    reading_writing: "📚"
  }
  return emojiMap[learningStyle] || "🎓"
}

const getResultTitle = () => {
  const learningStyle = answers.value.question_2
  const titleMap: Record<string, string> = {
    visual: "Visual Learner",
    auditory: "Auditory Learner",
    kinesthetic: "Hands-on Learner",
    reading_writing: "Reading & Writing Learner"
  }
  return titleMap[learningStyle] || "Your Learning Profile"
}

const getResultDescription = () => {
  const learningStyle = answers.value.question_2
  const descMap: Record<string, string> = {
    visual: "You learn best through visual aids, diagrams, and seeing information presented graphically. Our courses will include rich visual content tailored to your learning style.",
    auditory: "You excel at learning through listening and discussion. Our courses feature audio explanations, discussions, and interactive conversations.",
    kinesthetic: "You thrive with hands-on practice and doing things yourself. Our courses include practical exercises and interactive activities.",
    reading_writing: "You prefer text-based learning and taking notes. Our courses provide comprehensive written content and note-taking opportunities."
  }
  return descMap[learningStyle] || "Based on your preferences, we've personalized your learning experience."
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
