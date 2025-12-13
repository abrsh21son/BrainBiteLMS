<template>
  <div class="mb-10">
    <NuxtLink 
      to="/courses" 
      class="inline-flex items-center text-sm text-gray-400 hover:text-green-400 mb-6 transition-colors group"
    >
      <svg class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Courses
    </NuxtLink>
    <h1 class="text-4xl md:text-5xl font-bold text-white font-display mb-4 leading-tight">{{ title }}</h1>
    <p class="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">{{ description }}</p>
    <div class="flex flex-wrap items-center gap-4">
      <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 capitalize border border-green-500/30">
        {{ subject }}
      </span>
      <span class="text-sm text-gray-400 flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Generated on {{ new Date(createdAt).toLocaleDateString() }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  subject: string
  createdAt: string
}>()
</script>
