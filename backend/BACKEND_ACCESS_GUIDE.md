# Backend Access Guide

## Understanding Backend Routes

The backend uses a **global prefix `/api`** for all routes. This means:

### ✅ Working URLs:

1. **API Root** (Hello message):
   ```
   http://localhost:3000/api
   ```
   Returns: API information

2. **Swagger Documentation**:
   ```
   http://localhost:3000/api/docs
   ```
   Interactive API documentation

3. **Health Check**:
   ```
   http://localhost:3000/api/health
   ```
   Returns: `{ status: 'ok', timestamp: '...', uptime: ... }`

4. **Courses Endpoints**:
   ```
   GET  http://localhost:3000/api/courses          # List all courses
   GET  http://localhost:3000/api/courses/:id      # Get course by ID
   POST http://localhost:3000/api/courses/generate # Generate course (requires auth)
   ```

### ❌ NOT Working URLs:

1. **Root URL**:
   ```
   http://localhost:3000/
   ```
   **This will return 404** because all routes are under `/api`

## Why Swagger Works But Root Doesn't

- ✅ `/api/docs` works → Swagger is set up at this path
- ❌ `/` doesn't work → Global prefix `/api` means root route doesn't exist
- ✅ `/api` works → This is where the root controller responds

## Testing the Backend

### Option 1: Use Swagger UI (Recommended)
```
http://localhost:3000/api/docs
```
- Interactive interface
- Test all endpoints
- See request/response formats

### Option 2: Use Browser
```
http://localhost:3000/api
```
- Should show JSON: `{ message: "Hello World!", version: "1.0.0", documentation: "/api/docs" }`

### Option 3: Use curl/Postman
```bash
# Health check
curl http://localhost:3000/api/health

# Get courses
curl http://localhost:3000/api/courses
```

## Does This Affect Frontend?

**No, this does not affect the frontend!** 

The frontend is configured to use the `/api` prefix:

```typescript
// frontend/utils/constants.ts
export const API_ENDPOINTS = {
  COURSES: '/api/courses',
  COURSE_BY_ID: (id: string) => `/api/courses/${id}`,
  GENERATE_COURSE: '/api/courses/generate',
  HEALTH: '/api/health',
};
```

So all frontend API calls are correct and will work fine.

## Quick Fix: Add Root Redirect (Optional)

If you want `/` to redirect to `/api`, you can add this to `app.controller.ts`:

```typescript
@Get('/')
@Redirect('/api', 301)
redirectToApi() {
  // Redirects root to /api
}
```

But this is **not necessary** - the frontend works fine as-is!

## Summary

- ✅ Backend is working correctly
- ✅ Swagger is accessible at `/api/docs`
- ✅ All API endpoints are under `/api` prefix
- ✅ Frontend is configured correctly and will work
- ❌ `/` (root) returns 404 (expected behavior)
- ✅ Use `/api` instead of `/` to test backend

**The backend is working perfectly - you just need to access routes with the `/api` prefix!**


