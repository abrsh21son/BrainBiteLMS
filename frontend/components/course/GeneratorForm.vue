<template>
  <div class="bg-dark-card rounded-2xl shadow-2xl overflow-hidden border border-dark-border">
    <!-- Header Section -->
    <div class="relative px-8 py-10 border-b border-dark-border bg-gradient-to-br from-green-500/20 via-green-600/10 to-purple-500/10 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-size: 60px 60px; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px);"></div>
      </div>
      <div class="relative z-10">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <h2 class="text-4xl font-extrabold text-center text-white mb-3 font-display">
          Generate New Course
        </h2>
        <p class="text-center text-gray-300 text-lg">
          Harness the power of AI to create custom learning materials in seconds
        </p>
      </div>
    </div>
    
    <!-- Form Section -->
    <div class="px-8 py-10 bg-dark-bg/50">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Subject Field (Required) -->
        <div class="space-y-2">
          <label for="subject" class="flex items-center text-sm font-semibold text-gray-300">
            <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Course Subject
            <span class="ml-2 text-red-400">*</span>
          </label>
          <div class="relative">
            <input 
              type="text" 
              name="subject" 
              id="subject" 
              v-model="subject" 
              class="w-full pl-4 pr-12 py-4 text-base bg-dark-surface border-2 border-dark-border text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-lg hover:border-green-500/50" 
              placeholder="e.g. Introduction to Quantum Physics, How to Bake Sourdough..." 
              required
            />
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <p class="text-sm text-gray-400 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Be as specific as you like! The more details, the better the course.
          </p>
        </div>

        <!-- Optional Fields Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Level Field -->
          <div class="space-y-2">
            <label for="level" class="flex items-center text-sm font-semibold text-gray-300">
              <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Difficulty Level
              <span class="ml-2 text-xs text-gray-500 font-normal">(Optional)</span>
            </label>
            <div class="relative">
              <select 
                id="level" 
                name="level" 
                v-model="level" 
                class="w-full pl-4 pr-10 py-4 text-base bg-dark-surface border-2 border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all shadow-lg appearance-none cursor-pointer hover:border-blue-500/50"
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Age Range Field -->
          <div class="space-y-2">
            <label for="ageRange" class="flex items-center text-sm font-semibold text-gray-300">
              <svg class="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Age Range
              <span class="ml-2 text-xs text-gray-500 font-normal">(Optional)</span>
            </label>
            <div class="relative">
              <select 
                id="ageRange" 
                name="ageRange" 
                v-model="ageRange" 
                class="w-full pl-4 pr-10 py-4 text-base bg-dark-surface border-2 border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all shadow-lg appearance-none cursor-pointer hover:border-purple-500/50"
              >
                <option value="">Select Age Range</option>
                <option value="5-8">5-8 years (Early Elementary)</option>
                <option value="9-12">9-12 years (Late Elementary)</option>
                <option value="13-17">13-17 years (Teen)</option>
                <option value="18-25">18-25 years (Young Adult)</option>
                <option value="26-40">26-40 years (Adult)</option>
                <option value="41+">41+ years (Mature Adult)</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Language Field -->
          <div class="space-y-2 md:col-span-2">
            <label for="language" class="flex items-center text-sm font-semibold text-gray-300">
              <svg class="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Language
              <span class="ml-2 text-xs text-gray-500 font-normal">(Optional)</span>
            </label>
            <div class="relative">
              <select 
                id="language" 
                name="language" 
                v-model="language" 
                class="w-full pl-4 pr-10 py-4 text-base bg-dark-surface border-2 border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 rounded-xl transition-all shadow-lg appearance-none cursor-pointer hover:border-yellow-500/50"
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
                <option value="portuguese">Portuguese</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="arabic">Arabic</option>
                <option value="hindi">Hindi</option>
                <option value="russian">Russian</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-6">
          <button 
            type="submit" 
            :disabled="loading || !subject.trim()"
            class="w-full group relative flex justify-center items-center py-5 px-6 border border-transparent rounded-xl shadow-2xl text-lg font-bold text-white bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] hover:shadow-green-500/50 overflow-hidden"
          >
            <!-- Animated background -->
            <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <span v-if="loading" class="relative z-10 flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating Course Magic...</span>
            </span>
            <span v-else class="relative z-10 flex items-center">
              <svg class="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Course
            </span>
          </button>
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4 text-red-400 text-sm font-medium flex items-start">
          <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <strong>Error:</strong> {{ error }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (e: 'generate', payload: { subject: string, level?: string, ageRange?: string, language?: string }): void
}>()

const subject = ref('')
const level = ref('')
const ageRange = ref('')
const language = ref('')

const handleSubmit = () => {
  emit('generate', { 
    subject: subject.value, 
    level: level.value || undefined,
    ageRange: ageRange.value || undefined,
    language: language.value || undefined
  })
}
</script>

<style scoped>
/* Custom select arrow styling */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

select:focus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
}
</style>
