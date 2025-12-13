# Backend-Frontend Connection Guide

## Overview
This document outlines the connection setup between the NestJS backend and Nuxt.js frontend, ensuring proper integration and communication.

## Configuration

### Backend Configuration

#### Port & URL
- **Default Port**: `3000`
- **Base URL**: `http://localhost:3000`
- **API Prefix**: `/api` (all routes prefixed)
- **Health Check**: `http://localhost:3000/api/health`
- **Swagger Docs**: `http://localhost:3000/api/docs`

#### CORS Setup
```typescript
// backend/src/main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

#### Global Prefix
All backend routes are prefixed with `/api`:
- `/api/courses` - List all courses
- `/api/courses/:id` - Get course by ID
- `/api/courses/generate` - Generate new course (requires auth)
- `/api/health` - Health check

### Frontend Configuration

#### Port & URL
- **Default Port**: `3001`
- **Base URL**: `http://localhost:3001`
- **Backend URL**: `http://localhost:3000` (configured in `nuxt.config.ts`)

#### Runtime Config
```typescript
// frontend/nuxt.config.ts
runtimeConfig: {
  public: {
    backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
  },
}
```

## API Communication Flow

### Request Flow
1. **Frontend** → API Client (`frontend/utils/api-client.ts`)
2. **API Client** → Service Layer (`frontend/services/courses.service.ts`)
3. **Service** → Backend API (`http://localhost:3000/api/*`)
4. **Backend** → Response Interceptor → Transform to `{ success, data, timestamp }`
5. **Frontend** → Extract `data` from response

### Response Format

#### Success Response
```typescript
{
  success: true,
  data: T,  // Your actual data
  timestamp: "2024-01-01T00:00:00.000Z"
}
```

#### Error Response
```typescript
{
  success: false,
  statusCode: 400,
  timestamp: "2024-01-01T00:00:00.000Z",
  path: "/api/courses",
  message: "Error message here",
  error?: "Error type"
}
```

## Authentication

### Flow
1. User logs in via Supabase (frontend handles this)
2. Frontend stores JWT token in Supabase session
3. API Client extracts token from Supabase session
4. Token is sent in `Authorization: Bearer <token>` header
5. Backend `AuthGuard` validates token with Supabase
6. User is attached to request as `request.user`

### Protected Endpoints
- `POST /api/courses/generate` - Requires authentication

### Public Endpoints
- `GET /api/courses` - Public (returns only published courses)
- `GET /api/courses/:id` - Public
- `GET /api/health` - Public

## Service Layer Usage

### Frontend Services
All API calls go through the service layer:

```typescript
// frontend/services/courses.service.ts
import { coursesService } from '~/services/courses.service';

// Get all courses
const courses = await coursesService.getAllCourses();

// Get course by ID
const course = await coursesService.getCourseById(courseId);

// Generate course (requires auth)
const newCourse = await coursesService.generateCourse({
  subject: 'Math',
  level: 'beginner'
});
```

### Composables
Use composables for reactive state management:

```typescript
// Frontend composables
const { courses, loading, error, fetchCourses } = useCourses();
const { loading, error, generateCourse } = useCourseGeneration();
```

## Environment Variables

### Backend (.env)
```env
PORT=3000
FRONTEND_URL=http://localhost:3001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
AI_API_KEY=your_openai_api_key
```

### Frontend (.env)
```env
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Common Issues & Solutions

### Issue 1: CORS Errors
**Symptom**: `Access-Control-Allow-Origin` errors in browser console

**Solution**:
1. Check `FRONTEND_URL` in backend `.env` matches frontend URL
2. Ensure frontend URL includes port (e.g., `http://localhost:3001`)
3. Verify CORS configuration in `backend/src/main.ts`

### Issue 2: 401 Unauthorized
**Symptom**: API calls return 401 even when logged in

**Solution**:
1. Verify Supabase session is active: `useSupabaseUser()` in frontend
2. Check token is being sent: Inspect network tab for `Authorization` header
3. Verify backend `AuthGuard` is correctly validating tokens
4. Check Supabase service role key is correct

### Issue 3: 404 Not Found
**Symptom**: Endpoints return 404

**Solution**:
1. Verify backend is running on port 3000
2. Check API endpoint includes `/api` prefix
3. Verify route exists in backend controller
4. Check backend logs for route registration

### Issue 4: Network Errors
**Symptom**: "Failed to fetch" or network errors

**Solution**:
1. Verify backend server is running: `curl http://localhost:3000/api/health`
2. Check firewall/antivirus isn't blocking connection
3. Verify `NUXT_PUBLIC_BACKEND_URL` in frontend config
4. Check both servers are on same network/localhost

### Issue 5: Response Format Issues
**Symptom**: Data not extracted correctly, undefined values

**Solution**:
1. Verify `TransformInterceptor` is wrapping responses correctly
2. Check API client `extractData` method is handling response format
3. Inspect actual response in browser DevTools Network tab
4. Verify response matches expected format: `{ success, data, timestamp }`

## Testing the Connection

### 1. Health Check
```bash
curl http://localhost:3000/api/health
# Should return: { status: 'ok', timestamp: '...', uptime: ... }
```

### 2. Get Courses (No Auth)
```bash
curl http://localhost:3000/api/courses
# Should return: { success: true, data: [...], timestamp: '...' }
```

### 3. Test from Frontend
Open browser console on frontend:
```javascript
// Should work if backend is running
fetch('http://localhost:3000/api/health')
  .then(r => r.json())
  .then(console.log)
```

## API Endpoints Reference

### Courses

#### GET /api/courses
- **Auth**: Not required
- **Response**: `Course[]`
- **Description**: Get all published courses

#### GET /api/courses/:id
- **Auth**: Not required
- **Response**: `CourseDetails`
- **Description**: Get course with pages and questions

#### POST /api/courses/generate
- **Auth**: Required (Bearer token)
- **Body**: `{ subject: string, level?: string }`
- **Response**: `Course`
- **Description**: Generate new course using AI

### Health

#### GET /api/health
- **Auth**: Not required
- **Response**: `{ status: 'ok', timestamp: string, uptime: number }`
- **Description**: Health check endpoint

## File Structure

```
backend/
├── src/
│   ├── main.ts                 # App bootstrap, CORS, global config
│   ├── courses/
│   │   ├── courses.controller.ts  # Route handlers
│   │   ├── courses.service.ts     # Business logic
│   │   └── repositories/
│   │       └── courses.repository.ts  # Data access
│   └── common/
│       ├── guards/
│       │   └── auth.guard.ts      # JWT validation
│       ├── interceptors/
│       │   └── transform.interceptor.ts  # Response wrapping
│       └── filters/
│           └── http-exception.filter.ts  # Error handling

frontend/
├── utils/
│   └── api-client.ts           # HTTP client with auth
├── services/
│   └── courses.service.ts      # API service layer
├── composables/
│   ├── useCourses.ts           # Courses state management
│   └── useCourseGeneration.ts  # Course generation logic
└── pages/
    └── courses/
        ├── index.vue           # Uses useCourses()
        └── [id].vue            # Uses useCourses()
```

## Best Practices

1. **Always use service layer** - Don't call API client directly from components
2. **Use composables** - For reactive state management
3. **Handle errors** - Use error components and proper error messages
4. **Type safety** - Use TypeScript types for all API responses
5. **Environment variables** - Use env vars for configuration
6. **Error logging** - Log errors for debugging but show user-friendly messages

## Next Steps

1. ✅ Backend API endpoints configured
2. ✅ Frontend API client configured
3. ✅ Service layer implemented
4. ✅ Composables created
5. ✅ Error handling in place
6. ✅ Type safety implemented
7. ⏳ Add request/response logging
8. ⏳ Add request retry logic
9. ⏳ Add request caching
10. ⏳ Add rate limiting


