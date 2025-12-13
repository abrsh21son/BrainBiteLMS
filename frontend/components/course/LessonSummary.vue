<template>
  <div class="mt-6 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/30 p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-semibold text-white">Quick Summary</h3>
      </div>
      <div class="flex gap-2">
        <button
          v-for="type in summaryTypes"
          :key="type.value"
          @click="generateSummary(type.value)"
          :disabled="loading"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded transition-all',
            loading
              ? 'bg-dark-card text-gray-500 cursor-not-allowed'
              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
          ]"
        >
          {{ type.label }}
        </button>
      </div>
    </div>

    <div v-if="summary" class="mt-4">
      <div class="bg-dark-card rounded-lg p-4 border border-dark-border">
        <p class="text-gray-300 leading-relaxed whitespace-pre-wrap">{{ summary }}</p>
      </div>
    </div>
    <div v-else-if="loading" class="mt-4 text-center py-4">
      <div class="inline-flex items-center space-x-2 text-gray-400">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
        <span>Generating summary...</span>
      </div>
    </div>
    <div v-else class="text-sm text-gray-400 text-center py-2">
      Click a button above to generate a summary
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  lessonContent: string
}>()

const summary = ref('')
const loading = ref(false)

const summaryTypes = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'sentence', label: 'One Sentence' },
  { value: 'bullets', label: 'Bullet Points' }
] as const

const apiClient = useApiClient()

const generateSummary = async (type: 'paragraph' | 'sentence' | 'bullets') => {
  try {
    loading.value = true
    summary.value = ''

    const response = await apiClient.post<{ summary: string }>(`/api/courses/generate-summary?type=${type}`, {
      lessonContent: props.lessonContent
    })

    summary.value = response.summary
  } catch (error: any) {
    console.error('Error generating summary:', error)
    summary.value = 'Unable to generate summary at this time. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

