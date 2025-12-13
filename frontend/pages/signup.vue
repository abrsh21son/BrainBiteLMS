<template>
  <div class="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <!-- Floating leaves -->
      <div class="absolute top-20 left-10 text-green-500/20 text-6xl animate-float" style="animation-delay: 0s;">🍃</div>
      <div class="absolute top-40 right-20 text-green-500/20 text-5xl animate-float" style="animation-delay: 1.5s;">🌿</div>
      <div class="absolute bottom-32 left-20 text-green-500/20 text-4xl animate-float" style="animation-delay: 2s;">🍃</div>
      <div class="absolute bottom-20 right-32 text-green-500/20 text-5xl animate-float" style="animation-delay: 0.5s;">🌿</div>
    </div>

    <div class="max-w-md w-full relative z-10">
      <div class="w-full bg-dark-card p-8 rounded-2xl shadow-2xl border border-dark-border">
        <!-- Logo and Header -->
        <div class="text-center mb-8">
            <NuxtLink to="/" class="inline-block mb-6">
              <span class="text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                BrainBite
              </span>
            </NuxtLink>
            <h2 class="text-3xl font-extrabold text-white mb-2">Create Account</h2>
            <p class="text-gray-300 text-sm mb-1">Start your learning journey today</p>
            <div class="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">
              <span class="flex items-center">
                <svg class="w-3 h-3 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                AI-Powered Courses
              </span>
              <span class="text-gray-600">•</span>
              <span class="flex items-center">
                <svg class="w-3 h-3 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Interactive Learning
              </span>
              <span class="text-gray-600">•</span>
              <span class="flex items-center">
                <svg class="w-3 h-3 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Track Progress
              </span>
            </div>
            <p class="mt-4 text-sm text-gray-400">
              Already have an account?
              <NuxtLink to="/login" class="font-medium text-green-400 hover:text-green-300 transition-colors">
                Sign in
              </NuxtLink>
            </p>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="email" 
                @blur="validateEmail"
                :class="[
                  'appearance-none relative block w-full px-4 py-3 bg-dark-surface border placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 sm:text-sm transition-all',
                  emailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-dark-border focus:ring-green-500 focus:border-green-500'
                ]"
                placeholder="Enter your email" 
              />
              <p v-if="emailError" class="mt-1 text-sm text-red-400">{{ emailError }}</p>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div class="relative">
                <input 
                  id="password" 
                  name="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  autocomplete="new-password" 
                  required 
                  v-model="password" 
                  @blur="validatePassword"
                  @input="validatePasswordMatch"
                  :class="[
                    'appearance-none relative block w-full px-4 py-3 bg-dark-surface border placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 sm:text-sm transition-all pr-10',
                    passwordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-dark-border focus:ring-green-500 focus:border-green-500'
                  ]"
                  placeholder="Create a password (min. 6 characters)" 
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="passwordError" class="mt-1 text-sm text-red-400">{{ passwordError }}</p>
              <p v-else class="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div class="relative">
                <input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  autocomplete="new-password" 
                  required 
                  v-model="confirmPassword" 
                  @blur="validatePasswordMatch"
                  @input="validatePasswordMatch"
                  :class="[
                    'appearance-none relative block w-full px-4 py-3 bg-dark-surface border placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 sm:text-sm transition-all',
                    confirmPasswordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-dark-border focus:ring-green-500 focus:border-green-500'
                  ]"
                  placeholder="Confirm your password" 
                />
              </div>
              <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-400">{{ confirmPasswordError }}</p>
            </div>

            <!-- Success Message -->
            <div v-if="successMsg" class="rounded-lg bg-green-500/20 border border-green-500/50 p-4 animate-fade-in-up">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3 flex-1">
                  <p class="text-sm text-green-400 font-medium">{{ successMsg }}</p>
                  <div v-if="successMsg.includes('check your email')" class="mt-2">
                    <button
                      @click="handleResendEmail"
                      :disabled="loading"
                      class="text-xs text-green-400 hover:text-green-300 underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Resend confirmation email
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMsg" class="rounded-lg bg-red-500/20 border border-red-500/50 p-4 animate-fade-in-up">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3 flex-1">
                  <p class="text-sm text-red-400">{{ errorMsg }}</p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <button 
                type="submit" 
                :disabled="loading || !email || !password || !confirmPassword || !!emailError || !!passwordError || !!confirmPasswordError" 
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-green-300 group-hover:text-green-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                </span>
                {{ loading ? 'Creating account...' : 'Create Account' }}
              </button>
            </div>

            <!-- Back to Home -->
            <div class="text-center">
              <NuxtLink to="/" class="text-sm text-gray-400 hover:text-green-400 transition-colors inline-flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </NuxtLink>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const { loading, errorMsg, successMsg, handleSignUp, resendConfirmationEmail, clearMessages } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email.value && !emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (password.value && password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters long'
  } else {
    passwordError.value = ''
  }
  // Revalidate match when password changes
  validatePasswordMatch()
}

const validatePasswordMatch = () => {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match'
  } else {
    confirmPasswordError.value = ''
  }
}

const handleSubmit = async () => {
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  clearMessages()
  
  validateEmail()
  validatePassword()
  validatePasswordMatch()
  
  if (emailError.value || passwordError.value || confirmPasswordError.value) {
    return
  }
  
  if (!password.value || !confirmPassword.value) {
    if (!password.value) passwordError.value = 'Password is required'
    if (!confirmPassword.value) confirmPasswordError.value = 'Please confirm your password'
    return
  }
  
  await handleSignUp(email.value, password.value)
}

const handleResendEmail = async () => {
  if (email.value) {
    await resendConfirmationEmail(email.value)
  }
}
</script>
