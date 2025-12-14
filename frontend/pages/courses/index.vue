<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-green-500/10 via-dark-bg to-dark-bg border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div class="flex-1">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-display mb-4">
              Explore Courses
            </h1>
            <p class="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl">
              Discover AI-generated courses tailored to your learning needs. Start your journey today!
            </p>
            <div class="flex flex-wrap gap-4 items-center">
              <div class="flex items-center space-x-2 text-gray-400">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="text-sm">{{ courses.length }} {{ courses.length === 1 ? 'Course' : 'Courses' }}</span>
              </div>
              <div class="flex items-center space-x-2 text-gray-400">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="text-sm">AI-Powered</span>
              </div>
            </div>
          </div>
          <NuxtLink 
            to="/generate-course" 
            class="group inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Generate New Course
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Search and Filter Bar -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search courses by title, subject, or description..."
              class="block w-full pl-12 pr-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            v-model="filterSubject"
            class="px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="">All Subjects</option>
            <option v-for="subject in uniqueSubjects" :key="subject" :value="subject">
              {{ subject }}
            </option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="bg-dark-card rounded-2xl border border-dark-border p-6 animate-pulse">
          <div class="h-4 bg-dark-surface rounded w-1/4 mb-4"></div>
          <div class="h-6 bg-dark-surface rounded w-3/4 mb-3"></div>
          <div class="h-4 bg-dark-surface rounded w-full mb-2"></div>
          <div class="h-4 bg-dark-surface rounded w-5/6 mb-6"></div>
          <div class="h-10 bg-dark-surface rounded"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Error Loading Courses</h3>
          <p class="text-gray-400 mb-6 whitespace-pre-line">{{ error }}</p>
          <button
            v-if="user"
            @click="fetchCourses()"
            class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
          >
            Try Again
          </button>
          <NuxtLink
            v-else
            to="/login"
            class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
          >
            Log In
          </NuxtLink>
        </div>
      </div>

      <!-- Courses Grid -->
      <div v-else-if="filteredCourses.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="course in filteredCourses" 
          :key="course.id" 
          class="group relative flex flex-col rounded-2xl shadow-xl overflow-hidden bg-dark-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-dark-border hover:border-green-500/50"
        >
          <!-- Course Header with Gradient -->
          <div class="relative h-32 bg-gradient-to-br from-green-500/20 via-green-600/10 to-transparent border-b border-dark-border">
            <div class="absolute top-4 left-4 flex items-center gap-2">
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/30 text-green-400 capitalize border border-green-500/50 backdrop-blur-sm">
                {{ course.subject }}
              </span>
              <!-- Gem Badge -->
              <div class="relative">
                <svg class="w-6 h-6 text-yellow-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-card"></div>
              </div>
            </div>
            <!-- Status Badge -->
            <ClientOnly>
              <template #default>
                <div class="absolute top-4 right-4">
                  <span 
                    v-if="getStatus(course.id) === 'completed'"
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-600/30 text-green-400 border border-green-500/50 backdrop-blur-sm"
                  >
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Completed
                  </span>
                  <span 
                    v-else-if="getStatus(course.id) === 'in_progress'"
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-400 border border-blue-500/50 backdrop-blur-sm"
                  >
                    In Progress
                  </span>
                  <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 pointer-events-none">
                    &nbsp;
                  </span>
                </div>
              </template>
              <template #fallback>
                <div class="absolute top-4 right-4">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 pointer-events-none">
                    &nbsp;
                  </span>
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- Course Content -->
          <div class="flex-1 p-6 flex flex-col">
            <div class="flex-1 mb-4">
              <h3 class="text-xl font-bold text-white font-display mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                {{ course.title }}
              </h3>
              <p class="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4">
                {{ course.description || 'No description available.' }}
              </p>
              
              <!-- Progress Bar (if enrolled) -->
              <ClientOnly>
                <template #default>
                  <div v-if="isEnrolled(course.id)" class="mb-4">
                    <div class="flex items-center justify-between text-xs mb-1.5">
                      <span class="text-gray-400">Progress</span>
                      <span class="text-green-400 font-semibold">{{ getProgress(course.id, 5) }}%</span>
                    </div>
                    <div class="w-full bg-dark-surface rounded-full h-2 overflow-hidden">
                      <div 
                        class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${getProgress(course.id, 5)}%` }"
                      ></div>
                    </div>
                  </div>
                  <div v-else class="mb-4 opacity-0 pointer-events-none">
                    <div class="flex items-center justify-between text-xs mb-1.5">
                      <span class="text-gray-400">Progress</span>
                      <span class="text-green-400 font-semibold">0%</span>
                    </div>
                    <div class="w-full bg-dark-surface rounded-full h-2 overflow-hidden">
                      <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                  </div>
                </template>
                <template #fallback>
                  <div class="mb-4 opacity-0 pointer-events-none">
                    <div class="flex items-center justify-between text-xs mb-1.5">
                      <span class="text-gray-400">Progress</span>
                      <span class="text-green-400 font-semibold">0%</span>
                    </div>
                    <div class="w-full bg-dark-surface rounded-full h-2 overflow-hidden">
                      <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                  </div>
                </template>
              </ClientOnly>
              
              <!-- Course Meta -->
              <div class="flex items-center space-x-4 text-xs text-gray-500">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ formatDate(course.created_at) }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2">
              <!-- Open Course Button -->
              <button
                @click="handleViewCourse(course.id)"
                type="button"
                class="w-full flex justify-center items-center px-6 py-3.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all transform group-hover:scale-105 shadow-lg group-hover:shadow-xl"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Open Course</span>
              </button>

              <!-- Generate Course Button (always available) -->
              <NuxtLink
                to="/generate-course"
                class="w-full flex justify-center items-center px-6 py-3.5 border border-dark-border text-sm font-semibold rounded-xl text-gray-300 bg-dark-surface hover:bg-dark-surface/80 hover:text-white transition-all transform group-hover:scale-105"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Generate Course</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">
            {{ searchQuery || filterSubject ? 'No courses found' : 'No courses yet' }}
          </h3>
          <p class="text-gray-400 mb-8">
            {{ searchQuery || filterSubject 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Be the first to create an amazing course! Generate one now and start learning.' 
            }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              v-if="searchQuery || filterSubject"
              @click="clearFilters"
              class="inline-flex items-center justify-center px-6 py-3 border border-dark-border text-sm font-semibold rounded-xl text-gray-300 hover:text-white hover:bg-dark-surface transition-all"
            >
              Clear Filters
            </button>
            <NuxtLink 
              to="/generate-course" 
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Generate New Course
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  ssr: false, // Disable SSR to prevent auth/session mismatch
  // Note: Courses listing doesn't require auth, but generation does
})

const { courses, loading, error, fetchCourses } = useCourses()
const { enroll, isEnrolled, isCompleted, getProgress, getNextLessonIndex, getStatus } = useEnrollment()

// Get user for enrollment features (but courses can be fetched without auth)
const user = useSupabaseUser()

// Fetch courses immediately - backend allows GET /api/courses without auth
// Only course generation requires authentication
const hasAttemptedFetch = ref(false)

// Fetch courses on mount (no auth required for listing)
onMounted(async () => {
  if (hasAttemptedFetch.value) return
  
  try {
    hasAttemptedFetch.value = true
    await fetchCourses()
  } catch (error) {
    console.error('Error fetching courses:', error)
  }
})

const pending = computed(() => loading.value)
const searchQuery = ref('')
const filterSubject = ref('')

// Get unique subjects for filter
const uniqueSubjects = computed(() => {
  const subjects = new Set(courses.value.map(c => c.subject).filter(Boolean))
  return Array.from(subjects).sort()
})

// Filter courses based on search and subject
const filteredCourses = computed(() => {
  let result = courses.value

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.subject.toLowerCase().includes(query) ||
      (course.description && course.description.toLowerCase().includes(query))
    )
  }

  // Filter by subject
  if (filterSubject.value) {
    result = result.filter(course => course.subject === filterSubject.value)
  }

  return result
})

const clearFilters = () => {
  searchQuery.value = ''
  filterSubject.value = ''
}

const handleEnroll = async (courseId: string, event?: Event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  // Get course to know total lessons
  const course = courses.value.find(c => c.id === courseId)
  const totalLessons = (course?.pages?.length || 4) + 1 // +1 for assessment
  enroll(courseId, totalLessons)
  
  // Redirect to course detail page
  const router = useRouter()
  const courseUrl = `/courses/${courseId}`
  
  // Use router.push for explicit navigation
  await router.push(courseUrl)
}

const handleViewCourse = (courseId: string) => {
  navigateTo(`/courses/${courseId}`)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
