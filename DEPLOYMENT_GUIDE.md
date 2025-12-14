# 🚀 BrainBite Deployment Guide

Complete step-by-step guide to deploy BrainBite backend to Render and frontend to Vercel.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Testing & Verification](#testing--verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- ✅ GitHub account with your BrainBite repository
- ✅ Supabase account and project created
- ✅ Vercel account (free tier available)
- ✅ Render account (free tier available)
- ✅ Groq API key ([console.groq.com](https://console.groq.com)) or OpenAI API key

---

## Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. **Ensure your code is pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify backend structure:**
   - `backend/package.json` exists
   - `backend/src/main.ts` exists
   - `backend/schema.sql` exists

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended for easy integration)
3. Verify your email

### Step 3: Create New Web Service

1. **Click "New +" → "Web Service"**
2. **Connect GitHub Repository:**
   - Click "Connect account" if not connected
   - Select your BrainBite repository
   - Click "Connect"

3. **Configure Service Settings:**
   - **Name:** `brainbite-backend` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users (e.g., `Oregon (US West)`)
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** Leave empty (or set to `backend` if you prefer)
   - **Runtime:** `Node`
   - **Build Command:** `cd backend && npm install && npm run build`
   - **Start Command:** `cd backend && npm run start:prod`

4. **Click "Advanced" → Add Environment Variables:**
   
   Click "Add Environment Variable" for each:

   ```
   NODE_ENV = production
   PORT = 3000
   SUPABASE_URL = https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_JWT_SECRET = your-jwt-secret-from-supabase
   AI_API_KEY = gsk_your_groq_api_key_here
   AI_API_URL = https://api.groq.com/openai/v1
   AI_MODEL = llama-3.1-8b-instant
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
   
   **⚠️ Important:** 
   - Get `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Supabase Dashboard → Settings → API
   - Get `SUPABASE_JWT_SECRET` from Supabase Dashboard → Settings → Auth → JWT Settings
   - For `FRONTEND_URL`, you'll update this after deploying frontend (use placeholder for now)

5. **Click "Create Web Service"**

6. **Wait for Deployment:**
   - First deployment takes 5-10 minutes
   - Watch the build logs for any errors
   - Once deployed, you'll see: "Your service is live at https://brainbite-backend.onrender.com"

7. **Copy Your Backend URL:**
   - Example: `https://brainbite-backend.onrender.com`
   - Save this URL - you'll need it for frontend configuration

### Step 4: Verify Backend Deployment

1. **Test Health Endpoint:**
   ```bash
   curl https://your-backend-url.onrender.com/api/health
   ```
   Should return: `{"status":"ok"}`

2. **Test API Endpoint:**
   ```bash
   curl https://your-backend-url.onrender.com/api/courses
   ```
   Should return: `[]` (empty array) or list of courses

3. **Check Swagger Documentation:**
   - Visit: `https://your-backend-url.onrender.com/api/docs`
   - Should see API documentation

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Verify `frontend/vercel.json` exists** (should already be in repo)

2. **Ensure `frontend/nuxt.config.ts` is configured correctly** (should already be correct)

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Verify your email

### Step 3: Import Project

1. **Click "Add New..." → "Project"**

2. **Import Git Repository:**
   - Select your BrainBite repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** `Nuxt.js` (auto-detected)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.output/public` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Add Environment Variables:**
   
   Click "Add" for each variable:

   ```
   NUXT_PUBLIC_BACKEND_URL = https://your-backend-url.onrender.com
   NUXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NUXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
   **⚠️ Important:**
   - `NUXT_PUBLIC_BACKEND_URL` should be your Render backend URL (without `/api` suffix)
   - Get Supabase values from Supabase Dashboard → Settings → API
   - Use `anon` key (not `service_role` key) for frontend

5. **Click "Deploy"**

6. **Wait for Deployment:**
   - Build takes 2-5 minutes
   - Watch build logs for errors
   - Once deployed: "Your deployment is ready"

7. **Copy Your Frontend URL:**
   - Example: `https://brainbite-lms.vercel.app`
   - Save this URL

### Step 4: Update Backend CORS

1. **Go back to Render Dashboard**
2. **Select your backend service**
3. **Go to "Environment" tab**
4. **Update `FRONTEND_URL` variable:**
   - Change from placeholder to your actual Vercel URL
   - Example: `https://brainbite-lms.vercel.app`
5. **Save changes** (Render will auto-redeploy)

### Step 5: Verify Frontend Deployment

1. **Visit your frontend URL**
2. **Test the following:**
   - ✅ Homepage loads
   - ✅ Can navigate to login/signup
   - ✅ Can sign up and login
   - ✅ Can view courses list
   - ✅ Can generate a course
   - ✅ Can view course details
   - ✅ Can take assessment

---

## Environment Variables

### Backend (Render) - Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` |
| `SUPABASE_URL` | Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_JWT_SECRET` | Supabase JWT secret | `your-jwt-secret` |
| `AI_API_KEY` | Groq or OpenAI API key | `gsk_xxxxx` or `sk-xxxxx` |
| `AI_API_URL` | AI API endpoint | `https://api.groq.com/openai/v1` |
| `AI_MODEL` | AI model name | `llama-3.1-8b-instant` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

### Frontend (Vercel) - Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NUXT_PUBLIC_BACKEND_URL` | Backend API URL (no `/api` suffix) | `https://backend.onrender.com` |
| `NUXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxxxx.supabase.co` |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### Where to Find Supabase Values

1. **Go to Supabase Dashboard** → Your Project
2. **Settings** → **API**
   - **Project URL** → `SUPABASE_URL` and `NUXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (backend only!)
3. **Settings** → **Auth** → **JWT Settings**
   - **JWT Secret** → `SUPABASE_JWT_SECRET`

---

## Database Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name:** `brainbite` (or your choice)
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for project setup

### Step 2: Run Database Schema

1. **Go to Supabase Dashboard** → Your Project
2. **Click "SQL Editor"** (left sidebar)
3. **Click "New query"**
4. **Open `backend/schema.sql`** from your local project
5. **Copy entire contents** and paste into SQL Editor
6. **Click "Run"** (or press Ctrl+Enter)
7. **Verify success:** Should see "Success. No rows returned"

### Step 3: Verify Tables Created

1. **Go to "Table Editor"** (left sidebar)
2. **Verify these tables exist:**
   - ✅ `courses`
   - ✅ `course_pages`
   - ✅ `questions`
   - ✅ `question_options`
   - ✅ `attempts` (optional)

### Step 4: Verify RLS Policies

1. **Go to "Authentication"** → **"Policies"**
2. **Verify policies exist for:**
   - `courses` table
   - `course_pages` table
   - `questions` table
   - `question_options` table

---

## Testing & Verification

### Backend Tests

```bash
# Health check
curl https://your-backend.onrender.com/api/health

# List courses
curl https://your-backend.onrender.com/api/courses

# Swagger docs
# Visit: https://your-backend.onrender.com/api/docs
```

### Frontend Tests

1. **Visit:** `https://your-app.vercel.app`
2. **Test flow:**
   - ✅ Homepage loads
   - ✅ Sign up → Create account
   - ✅ Login → Access dashboard
   - ✅ View courses → See course list
   - ✅ Generate course → Create new course
   - ✅ View course → See course details
   - ✅ Take assessment → Answer questions
   - ✅ TTS → Listen to content

### Common Issues

#### ❌ CORS Errors

**Problem:** Frontend can't call backend API

**Solution:**
1. Check `FRONTEND_URL` in Render matches your Vercel URL exactly
2. Ensure no trailing slashes
3. Verify backend allows your frontend domain
4. Check browser console for exact error

#### ❌ Environment Variables Not Working

**Problem:** Frontend shows `undefined` for env vars

**Solution:**
1. Ensure variables start with `NUXT_PUBLIC_` for frontend
2. Redeploy after adding variables
3. Clear browser cache
4. Check Vercel deployment logs

#### ❌ Database Connection Issues

**Problem:** Backend can't connect to Supabase

**Solution:**
1. Verify `SUPABASE_URL` is correct
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (not anon key)
3. Check Supabase project is active
4. Verify RLS policies allow service role access

#### ❌ Build Failures

**Problem:** Deployment fails during build

**Solution:**
1. Check build logs for specific errors
2. Verify all dependencies in `package.json`
3. Ensure Node.js version is compatible
4. Check for TypeScript errors locally first

---

## Troubleshooting

### View Logs

**Render (Backend):**
- Go to service → "Logs" tab
- Real-time logs available

**Vercel (Frontend):**
- Go to project → "Deployments" → Click deployment
- View build logs and runtime logs

### Redeploy

**Render:**
- Go to service → "Manual Deploy" → "Deploy latest commit"

**Vercel:**
- Go to project → "Deployments" → Click "..." → "Redeploy"

### Update Environment Variables

**Render:**
- Go to service → "Environment" tab
- Edit variables → Save (auto-redeploys)

**Vercel:**
- Go to project → "Settings" → "Environment Variables"
- Edit variables → Save → Redeploy

---

## 🎉 Deployment Complete!

Your application is now live:

- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **API Docs:** `https://your-backend.onrender.com/api/docs`

### Next Steps

1. ✅ Test all features
2. ✅ Monitor error logs
3. ✅ Set up custom domain (optional)
4. ✅ Configure error tracking (optional: Sentry)
5. ✅ Set up monitoring (optional)

### Security Checklist

- ✅ Never commit `.env` files
- ✅ Use service role key only in backend
- ✅ Use anon key in frontend
- ✅ Keep API keys secure
- ✅ Enable RLS policies in Supabase
- ✅ Monitor API usage

---

## 📞 Support

If you encounter issues:

1. Check deployment logs
2. Verify environment variables
3. Test endpoints with curl
4. Check browser console for frontend errors
5. Review this guide's troubleshooting section

---

**Happy Deploying! 🚀**

