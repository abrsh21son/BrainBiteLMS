# Backend Routes Guide

## Important: Global API Prefix

The backend uses a **global prefix `/api`** for all routes. This means:

### ✅ Correct URLs (Use These):

| Route | URL | Description |
|-------|-----|-------------|
| API Root | `http://localhost:3000/api` | API information |
| Swagger Docs | `http://localhost:3000/api/docs` | Interactive API documentation |
| Health Check | `http://localhost:3000/api/health` | Server health status |
| List Courses | `http://localhost:3000/api/courses` | Get all courses |
| Course by ID | `http://localhost:3000/api/courses/:id` | Get course details |
| Generate Course | `http://localhost:3000/api/courses/generate` | Create new course (POST, requires auth) |

### ❌ Won't Work:

- `http://localhost:3000/` → Returns 404 (root route doesn't exist)

## Why Swagger Works But Root Doesn't

This is **expected behavior**:

- ✅ **Swagger works** because it's configured at `/api/docs`
- ❌ **Root (`/`) doesn't work** because all routes are prefixed with `/api`
- ✅ **Use `/api` instead** to access the root endpoint

## Testing in Browser

### Option 1: Access API Root
```
http://localhost:3000/api
```
Expected response:
```json
{
  "success": true,
  "data": {
    "message": "Hello World!",
    "version": "1.0.0",
    "documentation": "/api/docs",
    "health": "/api/health",
    "endpoints": {
      "courses": "/api/courses",
      "swagger": "/api/docs"
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Option 2: Use Swagger UI (Best Option)
```
http://localhost:3000/api/docs
```
- Interactive API testing
- See all available endpoints
- Test requests directly

## Does This Affect Frontend?

**No! The frontend works perfectly fine.**

The frontend is already configured to use the `/api` prefix:

```typescript
// frontend/utils/constants.ts
API_ENDPOINTS = {
  COURSES: '/api/courses',
  COURSE_BY_ID: (id: string) => `/api/courses/${id}`,
  GENERATE_COURSE: '/api/courses/generate',
  HEALTH: '/api/health',
}
```

All frontend API calls will work correctly because they already include the `/api` prefix.

## Summary

- ✅ Backend is working correctly
- ✅ Swagger is accessible
- ✅ All API endpoints are functional
- ✅ Frontend is configured correctly
- ℹ️ Root (`/`) returns 404 (this is normal)
- ✅ Use `/api` to test the backend in browser

**The backend is functioning correctly - just remember to use `/api` prefix for all routes!**


