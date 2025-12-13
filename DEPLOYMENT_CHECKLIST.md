# Deployment Checklist

Use this checklist to ensure everything is configured correctly before and after deployment.

## Pre-Deployment Checklist

### Backend Setup
- [ ] Backend code is pushed to GitHub
- [ ] `backend/package.json` has correct build and start scripts
- [ ] All environment variables are documented
- [ ] CORS configuration is ready
- [ ] Database schema is applied to Supabase

### Frontend Setup
- [ ] Frontend code is pushed to GitHub
- [ ] `frontend/nuxt.config.ts` is configured correctly
- [ ] All environment variables are documented
- [ ] Build command works locally (`npm run build`)

### Supabase Setup
- [ ] Supabase project is created
- [ ] Database schema is applied (`schema.sql`)
- [ ] RLS policies are active
- [ ] API keys are copied:
  - [ ] Project URL
  - [ ] Anon key
  - [ ] Service role key
  - [ ] JWT secret

### API Keys
- [ ] OpenAI or Groq API key is obtained
- [ ] API key has sufficient credits/quota

---

## Backend Deployment Checklist

### Render/Railway/Fly.io
- [ ] Service is created
- [ ] GitHub repository is connected
- [ ] Build command is set: `cd backend && npm install && npm run build`
- [ ] Start command is set: `cd backend && npm run start:prod`
- [ ] Root directory is set (if needed)

### Environment Variables (Backend)
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `SUPABASE_URL` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] `SUPABASE_JWT_SECRET` is set
- [ ] `AI_API_KEY` is set
- [ ] `AI_API_URL` is set
- [ ] `AI_MODEL` is set
- [ ] `FRONTEND_URL` is set (can be updated after frontend deployment)

### Backend Testing
- [ ] Service builds successfully
- [ ] Service starts without errors
- [ ] Health endpoint works: `GET /api/health`
- [ ] API endpoints are accessible
- [ ] Swagger docs are accessible: `/api/docs`

---

## Frontend Deployment Checklist

### Vercel/Netlify
- [ ] Project is created
- [ ] GitHub repository is connected
- [ ] Root directory is set to `frontend`
- [ ] Build command is set: `npm run build`
- [ ] Output directory is set: `.output/public`

### Environment Variables (Frontend)
- [ ] `NUXT_PUBLIC_BACKEND_URL` is set to backend URL
- [ ] `NUXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NUXT_PUBLIC_SUPABASE_ANON_KEY` is set

### Frontend Testing
- [ ] Build completes successfully
- [ ] Frontend loads without errors
- [ ] No console errors in browser
- [ ] Environment variables are accessible

---

## Post-Deployment Checklist

### Update Backend CORS
- [ ] Update `FRONTEND_URL` in backend with actual frontend URL
- [ ] Backend redeploys automatically or manually trigger redeploy

### Functional Testing
- [ ] User can sign up
- [ ] User can log in
- [ ] User can view courses list
- [ ] User can generate a new course
- [ ] Generated course appears in list
- [ ] User can open course details
- [ ] All 4 content pages display correctly
- [ ] Tabs work correctly
- [ ] Assessment tab shows 2 questions
- [ ] User can answer questions
- [ ] Feedback displays correctly
- [ ] TTS (Listen button) works
- [ ] Navigation works correctly

### API Testing
- [ ] `GET /api/courses` returns courses
- [ ] `GET /api/courses/:id` returns course details
- [ ] `POST /api/courses/generate` creates new course
- [ ] All endpoints return correct data
- [ ] Error handling works

### Security Testing
- [ ] CORS is configured correctly
- [ ] API keys are not exposed in frontend
- [ ] Authentication works
- [ ] RLS policies are active

### Performance Testing
- [ ] Pages load quickly
- [ ] API responses are fast
- [ ] No memory leaks
- [ ] Build size is reasonable

---

## Monitoring Checklist

### Backend Monitoring
- [ ] Logs are accessible
- [ ] Error tracking is set up (optional)
- [ ] Uptime monitoring is configured (optional)

### Frontend Monitoring
- [ ] Analytics are set up (optional)
- [ ] Error tracking is set up (optional)
- [ ] Performance monitoring is configured (optional)

---

## Documentation Checklist

- [ ] Deployment URLs are documented
- [ ] Environment variables are documented
- [ ] API endpoints are documented (Swagger)
- [ ] Troubleshooting guide is available
- [ ] Team has access to deployment platforms

---

## Rollback Plan

- [ ] Know how to rollback backend deployment
- [ ] Know how to rollback frontend deployment
- [ ] Previous working version is tagged in Git
- [ ] Database backups are available (Supabase)

---

## Final Verification

- [ ] All tests pass
- [ ] Application is accessible
- [ ] No critical errors
- [ ] Performance is acceptable
- [ ] Security is configured
- [ ] Documentation is complete

---

## Quick Reference

### Backend URL
```
https://your-backend.onrender.com
```

### Frontend URL
```
https://your-app.vercel.app
```

### API Base URL
```
https://your-backend.onrender.com/api
```

### Swagger Docs
```
https://your-backend.onrender.com/api/docs
```

### Health Check
```
https://your-backend.onrender.com/api/health
```
