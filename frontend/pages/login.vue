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
            <h2 class="text-3xl font-extrabold text-white mb-2">Welcome Back!</h2>
            <p class="text-gray-300 text-sm mb-1">Sign in to continue your learning journey</p>
            <div class="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">
              <span class="flex items-center">
                <svg class="w-3 h-3 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Access Your Courses
              </span>
              <span class="text-gray-600">•</span>
              <span class="flex items-center">
                <svg class="w-3 h-3 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Track Progress
              </span>
              <span class="text-gray-600">•</span>
              <span class="flex items-center">
                <svg class="w-3 h-3 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Interactive Learning
              </span>
            </div>
            <p class="mt-4 text-sm text-gray-400">
              Don't have an account?
              <NuxtLink to="/signup" class="font-medium text-green-400 hover:text-green-300 transition-colors">
                Sign up
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
              <div class="flex items-center justify-between mb-2">
                <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
                <button
                  type="button"
                  @click="showForgotPassword = true"
                  class="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div class="relative">
                <input 
                  id="password" 
                  name="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  autocomplete="current-password" 
                  required 
                  v-model="password" 
                  class="appearance-none relative block w-full px-4 py-3 bg-dark-surface border border-dark-border placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all pr-10" 
                  placeholder="Enter your password" 
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
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  id="rememberMe" 
                  name="rememberMe" 
                  type="checkbox" 
                  v-model="rememberMe" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-dark-border rounded bg-dark-surface"
                />
                <label for="rememberMe" class="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="displaySuccessMsg" class="rounded-lg bg-green-500/20 border border-green-500/50 p-4 animate-fade-in-up">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3 flex-1">
                  <p class="text-sm text-green-400 font-medium">{{ displaySuccessMsg }}</p>
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
                  <div v-if="errorMsg.includes('check your email') && email" class="mt-3">
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

            <!-- Submit Button -->
            <div>
              <button 
                type="submit" 
                :disabled="loading || !email || !password" 
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
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
                {{ loading ? 'Signing in...' : 'Sign In' }}
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

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showForgotPassword = false">
      <div class="bg-dark-card rounded-2xl shadow-2xl border border-dark-border p-8 max-w-md w-full">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-white">Reset Password</h3>
          <button @click="showForgotPassword = false" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-300 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
        <div class="space-y-4">
          <div>
            <label for="resetEmail" class="block text-sm font-medium text-gray-300 mb-2">Email address</label>
            <input 
              id="resetEmail" 
              type="email" 
              v-model="resetEmail" 
              class="appearance-none relative block w-full px-4 py-3 bg-dark-surface border border-dark-border placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all" 
              placeholder="Enter your email" 
            />
          </div>
          <div class="flex gap-3">
            <button 
              @click="handlePasswordReset" 
              :disabled="loading || !resetEmail"
              class="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {{ loading ? 'Sending...' : 'Send Reset Link' }}
            </button>
            <button 
              @click="showForgotPassword = false" 
              class="px-4 py-3 bg-dark-surface border border-dark-border text-white rounded-lg font-medium hover:bg-dark-bg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const user = useSupabaseUser()
const router = useRouter()
const { loading, errorMsg, successMsg, handleLogin, resendConfirmationEmail, handlePasswordReset: resetPassword, clearMessages } = useAuth()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const showForgotPassword = ref(false)
const resetEmail = ref('')
const emailError = ref('')
const emailVerified = ref(false)

// Check if user just verified their email
onMounted(() => {
  if (process.client) {
    const urlParams = new URLSearchParams(window.location.search)
    const verified = urlParams.get('verified')
    if (verified === 'true') {
      emailVerified.value = true
      // Clean up URL
      router.replace({ query: {} })
    }
  }
})

// Computed success message that includes verification status
const displaySuccessMsg = computed(() => {
  if (emailVerified.value) {
    return 'Email verified successfully! Please sign in with your password.'
  }
  return successMsg.value
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email.value && !emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const handleSubmit = async () => {
  emailError.value = ''
  validateEmail()
  
  if (emailError.value) {
    return
  }
  
  await handleLogin(email.value, password.value)
}

const handleResendEmail = async () => {
  if (email.value) {
    await resendConfirmationEmail(email.value)
  }
}

const handlePasswordReset = async () => {
  if (resetEmail.value) {
    await resetPassword(resetEmail.value)
    if (successMsg.value) {
      setTimeout(() => {
        showForgotPassword.value = false
        resetEmail.value = ''
      }, 2000)
    }
  }
}
</script>
