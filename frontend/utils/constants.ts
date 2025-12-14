// Course Levels
export const COURSE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const;

export type CourseLevel = typeof COURSE_LEVELS[number]['value'];

// Validation Rules
export const VALIDATION_RULES = {
  subject: {
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  level: {
    maxLength: 50,
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  COURSES: '/courses',
  GENERATE_COURSE: '/generate-course',
  WELCOME: '/welcome',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  COURSES: '/api/courses',
  COURSE_BY_ID: (id: string) => `/api/courses/${id}`,
  GENERATE_COURSE: '/api/courses/generate',
  HEALTH: '/api/health',
} as const;

// UI Constants
export const UI = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  PAGE_TRANSITION_DURATION: 200,
} as const;



