import { ref, computed } from 'vue'
import type { Course } from '~/types'

export interface EnrollmentProgress {
  courseId: string
  enrolledAt: string
  lastAccessedAt: string
  currentLessonIndex: number
  completedLessons: number[]
  isCompleted: boolean
  totalLessons: number
}

export const useEnrollment = () => {
  const enrollments = ref<Map<string, EnrollmentProgress>>(new Map())

  // Load enrollments from localStorage on mount
  if (process.client) {
    const stored = localStorage.getItem('course_enrollments')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        enrollments.value = new Map(Object.entries(data))
      } catch (e) {
        // Silently fail - enrollment data will be empty, user can re-enroll
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to load enrollments:', e)
        }
      }
    }
  }

  // Save enrollments to localStorage
  const saveEnrollments = () => {
    if (process.client) {
      const data = Object.fromEntries(enrollments.value)
      localStorage.setItem('course_enrollments', JSON.stringify(data))
    }
  }

  // Enroll in a course
  const enroll = (courseId: string, totalLessons: number = 4) => {
    const existing = enrollments.value.get(courseId)
    if (existing) return // Already enrolled

    const enrollment: EnrollmentProgress = {
      courseId,
      enrolledAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      currentLessonIndex: 0,
      completedLessons: [],
      isCompleted: false,
      totalLessons,
    }

    enrollments.value.set(courseId, enrollment)
    saveEnrollments()
  }

  // Update progress
  const updateProgress = (courseId: string, lessonIndex: number, totalLessons: number) => {
    let enrollment = enrollments.value.get(courseId)
    if (!enrollment) {
      enroll(courseId, totalLessons)
      enrollment = enrollments.value.get(courseId)!
    }

    enrollment.lastAccessedAt = new Date().toISOString()
    enrollment.currentLessonIndex = Math.max(enrollment.currentLessonIndex, lessonIndex)
    
    if (!enrollment.completedLessons.includes(lessonIndex)) {
      enrollment.completedLessons.push(lessonIndex)
      enrollment.completedLessons.sort((a, b) => a - b)
    }

    // Check if course is completed (all lessons + assessment)
    if (enrollment.completedLessons.length >= totalLessons + 1) {
      enrollment.isCompleted = true
    }

    enrollments.value.set(courseId, enrollment)
    saveEnrollments()
  }

  // Mark course as completed
  const markCompleted = (courseId: string, totalLessons: number) => {
    const enrollment = enrollments.value.get(courseId)
    if (!enrollment) {
      enroll(courseId, totalLessons)
      const newEnrollment = enrollments.value.get(courseId)!
      newEnrollment.isCompleted = true
      newEnrollment.currentLessonIndex = totalLessons
      newEnrollment.completedLessons = Array.from({ length: totalLessons + 1 }, (_, i) => i)
      saveEnrollments()
      return
    }

    enrollment.isCompleted = true
    enrollment.completedLessons = Array.from({ length: totalLessons + 1 }, (_, i) => i)
    enrollment.currentLessonIndex = totalLessons
    saveEnrollments()
  }

  // Get enrollment status
  const getEnrollment = (courseId: string): EnrollmentProgress | null => {
    return enrollments.value.get(courseId) || null
  }

  // Check if enrolled
  const isEnrolled = (courseId: string): boolean => {
    return enrollments.value.has(courseId)
  }

  // Check if completed
  const isCompleted = (courseId: string): boolean => {
    const enrollment = enrollments.value.get(courseId)
    return enrollment?.isCompleted || false
  }

  // Get progress percentage
  const getProgress = (courseId: string, totalLessons: number): number => {
    const enrollment = enrollments.value.get(courseId)
    if (!enrollment) return 0
    if (enrollment.isCompleted) return 100
    return Math.round((enrollment.completedLessons.length / (totalLessons + 1)) * 100)
  }

  // Get next lesson index (first uncompleted lesson)
  const getNextLessonIndex = (courseId: string): number => {
    const enrollment = enrollments.value.get(courseId)
    if (!enrollment) return 0
    if (enrollment.isCompleted) return 0 // Return to first lesson if completed
    
    // Find the first lesson that hasn't been completed
    // totalLessons - 1 because assessment is separate (e.g., 5 total = 4 lessons + 1 assessment)
    const maxLessonIndex = enrollment.totalLessons - 2 // -2 because: totalLessons includes assessment, and arrays are 0-indexed
    for (let i = 0; i <= maxLessonIndex; i++) {
      if (!enrollment.completedLessons.includes(i)) {
        return i
      }
    }
    
    // If all lessons completed, return the last lesson index (assessment will be handled separately)
    return maxLessonIndex
  }

  // Get enrollment status text
  const getStatus = (courseId: string): 'not_enrolled' | 'in_progress' | 'completed' => {
    if (isCompleted(courseId)) return 'completed'
    if (isEnrolled(courseId)) return 'in_progress'
    return 'not_enrolled'
  }

  return {
    enroll,
    updateProgress,
    markCompleted,
    getEnrollment,
    isEnrolled,
    isCompleted,
    getProgress,
    getNextLessonIndex,
    getStatus,
    enrollments: computed(() => enrollments.value),
  }
}

