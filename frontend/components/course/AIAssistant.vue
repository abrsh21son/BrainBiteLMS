<template>
  <div class="mt-8 border-t border-dark-border pt-8">
    <div class="bg-dark-surface rounded-lg border border-dark-border p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Ask AI About This Lesson</h3>
            <p class="text-sm text-gray-400">Get instant help with any questions</p>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="space-y-4 mb-4 max-h-96 overflow-y-auto pr-2" ref="messagesContainer">
        <div v-if="messages.length === 0" class="text-center py-8 text-gray-400">
          <p>Ask me anything about this lesson!</p>
        </div>
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'flex',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-[80%] rounded-lg p-4',
              message.role === 'user'
                ? 'bg-green-500/20 text-white border border-green-500/30'
                : 'bg-dark-card text-gray-300 border border-dark-border'
            ]"
          >
            <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
            <p v-if="message.loading" class="text-xs text-gray-400 mt-2">AI is thinking...</p>
          </div>
        </div>
      </div>

      <!-- Input Form -->
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          v-model="question"
          type="text"
          placeholder="Ask a question about this lesson..."
          class="flex-1 px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          :disabled="loading"
        />
        <button
          type="submit"
          :disabled="loading || !question.trim()"
          class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>Send</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  lessonContent: string
}>()

const question = ref('')
const loading = ref(false)
const messages = ref<Array<{ role: 'user' | 'assistant'; content: string; loading?: boolean }>>([])
const messagesContainer = ref<HTMLElement | null>(null)

const apiClient = useApiClient()

const sendMessage = async () => {
  if (!question.value.trim() || loading.value) return

  const userQuestion = question.value.trim()
  question.value = ''

  // Add user message
  messages.value.push({ role: 'user', content: userQuestion })
  
  // Add loading message
  messages.value.push({ role: 'assistant', content: '', loading: true })
  scrollToBottom()

  try {
    loading.value = true

    const response = await apiClient.post<{ answer: string }>('/api/courses/ask-question', {
      lessonContent: props.lessonContent,
      question: userQuestion
    })

    // Replace loading message with response
    const loadingIndex = messages.value.length - 1
    messages.value[loadingIndex] = {
      role: 'assistant',
      content: response.answer
    }
  } catch (error: any) {
    const loadingIndex = messages.value.length - 1
    messages.value[loadingIndex] = {
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again.'
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('Error asking question:', error)
    }
  } finally {
    loading.value = false
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>


