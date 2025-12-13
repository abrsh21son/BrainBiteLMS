<template>
  <div v-if="recommendations.length > 0" class="mt-8 border-t border-dark-border pt-8">
    <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/30 p-6">
      <div class="flex items-center space-x-3 mb-4">
        <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h3 class="text-xl font-bold text-white">Continue Learning</h3>
      </div>
      <p class="text-gray-300 mb-4">AI recommends these related courses to deepen your knowledge:</p>
      <div class="grid md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="(subject, index) in recommendations"
          :key="index"
          :to="`/generate-course?subject=${encodeURIComponent(subject)}`"
          class="bg-dark-card hover:bg-dark-surface border border-dark-border hover:border-purple-500/50 rounded-lg p-4 transition-all group"
        >
          <div class="flex items-center justify-between">
            <span class="text-white font-medium group-hover:text-purple-400 transition-colors">{{ subject }}</span>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  recommendations: string[]
}>()
</script>


