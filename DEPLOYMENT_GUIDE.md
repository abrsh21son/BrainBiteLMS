# Complete Deployment Guide - BrainBite LMS

This guide covers step-by-step deployment of both frontend (Nuxt 3) and backend (NestJS) to production.

## 📋 Prerequisites

- GitHub account with repository access
- Supabase account and project
- Vercel/Netlify account (for frontend)
- Render/Railway/Fly.io account (for backend)
- OpenAI API key (or Groq API key)
- Domain name (optional)

---

## 🎯 Part 1: Backend Deployment (NestJS)

### Option A: Deploy to Render (Recommended)

#### Step 1: Prepare Backend for Deployment

1. **Update `backend/package.json`** to ensure build scripts are correct:

```json
{
  "scripts": {
    "build": "nest build",
    "start": "node dist/main",
    "start:prod": "node dist/main"
  }
}
```

2. **Create `backend/.env.production`** (for reference, don't commit this):

```env
NODE_ENV=production
PORT=3000

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# AI Configuration
AI_API_KEY=your_openai_or_groq_api_key
AI_API_URL=https://api.groq.com/openai/v1  # or OpenAI URL
AI_MODEL=llama-3.1-8b-instant  # or gpt-3.5-turbo

# CORS - Add your frontend URL after deployment
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

#### Step 2: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name:** `brainbite-backend` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install && npm run build`
   - **Start Command:** `cd backend && npm run start:prod`
   - **Root Directory:** Leave empty (or set to `backend` if you want)

5. **Add Environment Variables:**
   - Click "Environment" tab
   - Add all variables from `.env.production`:
     ```
     NODE_ENV=production
     PORT=3000
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     SUPABASE_JWT_SECRET=your_jwt_secret
     AI_API_KEY=your_api_key
     AI_API_URL=https://api.groq.com/openai/v1
     AI_MODEL=llama-3.1-8b-instant
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     ```

6. **Click "Create Web Service"**
7. **Wait for deployment** (first build takes 5-10 minutes)
8. **Copy your backend URL** (e.g., `https://brainbite-backend.onrender.com`)

#### Step 3: Update CORS Configuration

1. **Go to your backend service on Render**
2. **Update `FRONTEND_URL` environment variable** with your frontend URL
3. **Redeploy** (or it will auto-redeploy)

---

### Option B: Deploy to Railway

1. **Go to [Railway Dashboard](https://railway.app/)**
2. **Click "New Project" → "Deploy from GitHub"**
3. **Select your repository**
4. **Add service:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`

5. **Add Environment Variables** (same as Render)
6. **Deploy**

---

### Option C: Deploy to Fly.io

1. **Install Fly CLI:**
   ```bash
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Create app:**
   ```bash
   cd backend
   fly launch
   ```

4. **Configure `fly.toml`:**
   ```toml
   app = "brainbite-backend"
   primary_region = "iad"

   [build]
     builder = "paketobuildpacks/builder:base"

   [http_service]
     internal_port = 3000
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0
     processes = ["app"]

   [[services]]
     http_checks = []
     internal_port = 3000
     processes = ["app"]
     protocol = "tcp"
     script_checks = []
   ```

5. **Set secrets:**
   ```bash
   fly secrets set SUPABASE_URL=your_url
   fly secrets set SUPABASE_SERVICE_ROLE_KEY=your_key
   fly secrets set AI_API_KEY=your_key
   # ... etc
   ```

6. **Deploy:**
   ```bash
   fly deploy
   ```

---

## 🎨 Part 2: Frontend Deployment (Nuxt 3)

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Prepare Frontend for Deployment

1. **Verify `frontend/nuxt.config.ts`** has correct configuration:

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  // ... existing config
  
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
})
```

2. **Create `frontend/.env.production`** (for reference):

```env
# Note: Backend URL should NOT include /api - the frontend adds it automatically
NUXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
NUXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Step 2: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository**
4. **Configure Project:**
   - **Framework Preset:** Nuxt.js (auto-detected)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (or leave default)
   - **Output Directory:** `.output/public` (Nuxt 3 default)
   - **Install Command:** `npm install`

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     NUXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
     NUXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NUXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

6. **Click "Deploy"**
7. **Wait for deployment** (2-5 minutes)
8. **Copy your frontend URL** (e.g., `https://brainbite-lms.vercel.app`)

#### Step 3: Update Backend CORS

1. **Go back to your backend service (Render/Railway/Fly.io)**
2. **Update `FRONTEND_URL` environment variable** with your Vercel URL
3. **Redeploy backend** (or it will auto-redeploy)

---

### Option B: Deploy to Netlify

1. **Go to [Netlify Dashboard](https://app.netlify.com/)**
2. **Click "Add new site" → "Import an existing project"**
3. **Connect GitHub repository**
4. **Configure build:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/.output/public`

5. **Add Environment Variables:**
   - Go to "Site settings" → "Environment variables"
   - Add the same variables as Vercel

6. **Deploy**

---

## 🔧 Part 3: Supabase Configuration

### Step 1: Get Supabase Credentials

1. **Go to [Supabase Dashboard](https://app.supabase.com/)**
2. **Select your project**
3. **Go to Settings → API**
4. **Copy:**
   - **Project URL** → `SUPABASE_URL` and `NUXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

5. **Go to Settings → Auth → JWT Settings**
   - **JWT Secret** → `SUPABASE_JWT_SECRET`

### Step 2: Configure Supabase RLS Policies

Your `schema.sql` should already have RLS policies. Verify in Supabase:

1. **Go to SQL Editor**
2. **Run your `schema.sql`** if not already done
3. **Verify policies are active:**
   - Go to Authentication → Policies
   - Check that policies exist for `courses`, `course_pages`, `questions`, `question_options`

---

## 🔐 Part 4: Environment Variables Summary

### Backend Environment Variables

```env
# Required
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret-here
AI_API_KEY=your-api-key-here
AI_API_URL=https://api.groq.com/openai/v1  # or https://api.openai.com/v1
AI_MODEL=llama-3.1-8b-instant  # or gpt-3.5-turbo
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend Environment Variables

```env
# Required
# Note: Backend URL should NOT include /api - frontend adds it automatically
NUXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
NUXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🧪 Part 5: Testing Deployment

### Test Backend

1. **Check health endpoint:**
   ```bash
   curl https://your-backend.onrender.com/health
   ```

2. **Test API:**
   ```bash
   curl https://your-backend.onrender.com/courses
   ```

### Test Frontend

1. **Visit your frontend URL**
2. **Try to:**
   - Sign up / Login
   - View courses
   - Generate a course
   - View course details
   - Take assessment

### Common Issues

#### CORS Errors
- **Problem:** Frontend can't call backend API
- **Solution:** 
  1. Check `FRONTEND_URL` in backend matches frontend URL exactly
  2. Ensure backend allows your frontend domain
  3. Check browser console for exact error
  4. Verify backend is using `/api` prefix (e.g., `https://backend.com/api/courses`)

#### Environment Variables Not Working
- **Problem:** Frontend shows `undefined` for env vars
- **Solution:**
  1. Ensure variables start with `NUXT_PUBLIC_` for frontend
  2. Redeploy after adding variables
  3. Clear browser cache

#### Database Connection Issues
- **Problem:** Backend can't connect to Supabase
- **Solution:**
  1. Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct
  2. Check Supabase project is active
  3. Verify RLS policies allow service role access

---

## 📝 Part 6: Post-Deployment Checklist

- [ ] Backend is accessible and responding
- [ ] Frontend loads without errors
- [ ] User can sign up and login
- [ ] Courses list displays correctly
- [ ] Course generation works
- [ ] Course detail page shows tabs correctly
- [ ] Assessment works
- [ ] TTS (Listen button) works
- [ ] All environment variables are set
- [ ] CORS is configured correctly
- [ ] Supabase RLS policies are active
- [ ] API endpoints return correct data

---

## 🔄 Part 7: Continuous Deployment

Both Vercel and Render automatically deploy on git push to main branch.

### Manual Deployment

If you need to redeploy manually:

**Vercel:**
- Go to project → Deployments → Click "..." → Redeploy

**Render:**
- Go to service → Manual Deploy → Deploy latest commit

---

## 🚀 Quick Start Commands

### Backend (Render)
```bash
# Build command
cd backend && npm install && npm run build

# Start command
cd backend && npm run start:prod
```

### Frontend (Vercel)
```bash
# Build command (auto-detected)
npm run build

# Output directory
.output/public
```

---

## 📞 Support & Troubleshooting

### Backend Logs
- **Render:** Service → Logs tab
- **Railway:** Service → Deployments → View logs
- **Fly.io:** `fly logs`

### Frontend Logs
- **Vercel:** Project → Deployments → Click deployment → View logs
- **Netlify:** Site → Deploys → Click deploy → View logs

### Common Commands

```bash
# Check backend health
curl https://your-backend.onrender.com/health

# Test API endpoint
curl https://your-backend.onrender.com/courses

# View backend logs (Render)
# Use Render dashboard

# View frontend build logs (Vercel)
# Use Vercel dashboard
```

---

## 🎉 You're Done!

Your application should now be live! Share your URLs:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`

Remember to:
1. Keep your API keys secure
2. Monitor your usage (especially AI API)
3. Set up error tracking (optional: Sentry)
4. Configure custom domain (optional)
