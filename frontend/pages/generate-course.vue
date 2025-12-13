<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Main content -->
    <div class="relative max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <CourseGeneratorForm 
        :loading="loading" 
        :error="error" 
        @generate="onGenerate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { loading, error, generateCourse } = useCourseGeneration()

const onGenerate = ({ subject, level, ageRange, language }: { subject: string, level?: string, ageRange?: string, language?: string }) => {
  generateCourse({
    subject,
    level: level || undefined,
    ageRange: ageRange || undefined,
    language: language || undefined,
  })
}
</script>
