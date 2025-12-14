# 🚀 Complete BrainBite Deployment Guide - Copy & Paste Ready

This is a complete, step-by-step deployment guide with all code, commands, and configurations you need to copy and paste.

---

## 📋 STEP 1: Prepare Your Code

### 1.1 Git Commands - Pull and Push

**If you're starting fresh or need to pull latest changes:**

```bash
# Pull latest changes from GitHub
git pull origin main
```

**If you have local changes to push:**

```bash
# Check what files have changed
git status

# Add all changes
git add .

# Or add specific files
git add filename.txt

# Commit your changes
git commit -m "Your commit message here"

# Push to GitHub
git push origin main
```

**If you get errors about being behind:**

```bash
# First pull latest changes
git pull origin main

# If there are conflicts, resolve them, then:
git add .
git commit -m "Merge conflicts resolved"
git push origin main
```

**If you need to set up remote (first time):**

```bash
# Check if remote is set
git remote -v

# If not set, add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Then push
git push -u origin main
```

**Complete workflow before deployment:**

```bash
# 1. Pull latest changes
git pull origin main

# 2. Check status
git status

# 3. Add all changes
git add .

# 4. Commit
git commit -m "Ready for deployment"

# 5. Push to GitHub
git push origin main
```

---

## 📋 STEP 2: Set Up Supabase Database

### 2.1 Create Supabase Project

1. Go to: https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Name:** `brainbite`
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes

### 2.2 Get Supabase Credentials

1. Go to: **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon public** key → This is your `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → This is your `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

3. Go to: **Settings** → **Auth** → **JWT Settings**
4. Copy:
   - **JWT Secret** → This is your `SUPABASE_JWT_SECRET`

### 2.3 Run Database Schema

1. In Supabase Dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Copy and paste this ENTIRE SQL script:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Courses Table
create table courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subject text not null,
  description text,
  created_by uuid references auth.users(id),
  is_published boolean default true,
  created_at timestamp with time zone default now()
);

-- Course Pages Table
create table course_pages (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  page_index int not null,
  title text not null,
  content_md text not null,
  created_at timestamp with time zone default now()
);

-- Questions Table
create table questions (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  question_text text not null,
  type text default 'mcq',
  created_at timestamp with time zone default now()
);

-- Question Options Table
create table question_options (
  id uuid primary key default uuid_generate_v4(),
  question_id uuid references questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean default false
);

-- RLS Policies
alter table courses enable row level security;
alter table course_pages enable row level security;
alter table questions enable row level security;
alter table question_options enable row level security;

-- Policy: Everyone can view published courses
create policy "Public courses are viewable by everyone" on courses
  for select using (is_published = true);

-- Policy: Creators can view their own courses (published or not)
create policy "Creators can view own courses" on courses
  for select using (auth.uid() = created_by);

-- For frontend read access to related tables (pages, questions, options)
create policy "Public course pages are viewable" on course_pages
  for select using (exists (select 1 from courses where id = course_pages.course_id and is_published = true));

create policy "Public course questions are viewable" on questions
  for select using (exists (select 1 from courses where id = questions.course_id and is_published = true));

create policy "Public course options are viewable" on question_options
  for select using (exists (select 1 from questions join courses on questions.course_id = courses.id where questions.id = question_options.question_id and courses.is_published = true));
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see: **"Success. No rows returned"**

### 2.4 Verify Tables Created

1. Click **"Table Editor"** (left sidebar)
2. Verify these tables exist:
   - ✅ `courses`
   - ✅ `course_pages`
   - ✅ `questions`
   - ✅ `question_options`

---

## 📋 STEP 3: Get Groq API Key

1. Go to: https://console.groq.com
2. Sign up or log in
3. Go to: **API Keys** section
4. Click **"Create API Key"**
5. Copy the key (starts with `gsk_`)
6. Save it - you'll need it for backend deployment

---

## 📋 STEP 4: Deploy Backend to Render

### 4.1 Create Render Account

1. Go to: https://render.com
2. Click **"Get Started"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your GitHub
5. Verify your email

### 4.2 Create Web Service

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. **Connect Repository:**
   - If not connected, click **"Connect account"** and authorize
   - Select your **BrainBite** repository
   - Click **"Connect"**

3. **Configure Service:**
   - **Name:** `brainbite-backend`
   - **Environment:** `Node`
   - **Region:** `Oregon (US West)` (or closest to you)
   - **Branch:** `main`
   - **Root Directory:** (leave empty)
   - **Runtime:** `Node`
   - **Build Command:** Copy and paste this:
     ```
     cd backend && npm install && npm run build
     ```
   - **Start Command:** Copy and paste this:
     ```
     cd backend && npm run start:prod
     ```

4. **Add Environment Variables:**
   
   Click **"Advanced"** → Click **"Add Environment Variable"** for each:

   **Variable 1:**
   - Key: `NODE_ENV`
   - Value: `production`

   **Variable 2:**
   - Key: `PORT`
   - Value: `3000`

   **Variable 3:**
   - Key: `SUPABASE_URL`
   - Value: `https://YOUR_PROJECT_ID.supabase.co` (replace with your actual Supabase URL)

   **Variable 4:**
   - Key: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (replace with your actual service_role key)

   **Variable 5:**
   - Key: `SUPABASE_JWT_SECRET`
   - Value: `your-jwt-secret-here` (replace with your actual JWT secret from Supabase)

   **Variable 6:**
   - Key: `AI_API_KEY`
   - Value: `gsk_YOUR_GROQ_API_KEY` (replace with your actual Groq API key)

   **Variable 7:**
   - Key: `AI_API_URL`
   - Value: `https://api.groq.com/openai/v1`

   **Variable 8:**
   - Key: `AI_MODEL`
   - Value: `llama-3.1-8b-instant`

   **Variable 9:**
   - Key: `FRONTEND_URL`
   - Value: `https://placeholder.vercel.app` (we'll update this after frontend deployment)

5. Click **"Create Web Service"**

6. **Wait for Deployment:**
   - First build takes 5-10 minutes
   - Watch the logs for any errors
   - When complete, you'll see: **"Your service is live at https://brainbite-backend.onrender.com"**

7. **Copy Your Backend URL:**
   - Example: `https://brainbite-backend.onrender.com`
   - Save this URL - you'll need it for frontend!

### 4.3 Test Backend

Open a new browser tab and test:

1. **Health Check:**
   ```
   https://YOUR-BACKEND-URL.onrender.com/api/health
   ```
   Should return: `{"status":"ok"}`

2. **API Docs:**
   ```
   https://YOUR-BACKEND-URL.onrender.com/api/docs
   ```
   Should show Swagger documentation

---

## 📋 STEP 5: Deploy Frontend to Vercel

### 5.1 Create Vercel Account

1. Go to: https://vercel.com
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended)
4. Authorize Vercel to access your GitHub
5. Verify your email

### 5.2 Import Project

1. In Vercel Dashboard, click **"Add New..."** → **"Project"**

2. **Import Repository:**
   - Select your **BrainBite** repository
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** `Nuxt.js` (should be auto-detected)
   - **Root Directory:** Click **"Edit"** and set to: `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.output/public` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Add Environment Variables:**
   
   Click **"Environment Variables"** → Click **"Add"** for each:

   **Variable 1:**
   - Key: `NUXT_PUBLIC_BACKEND_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com` (replace with your actual Render backend URL - NO /api suffix!)

   **Variable 2:**
   - Key: `NUXT_PUBLIC_SUPABASE_URL`
   - Value: `https://YOUR_PROJECT_ID.supabase.co` (replace with your actual Supabase URL)

   **Variable 3:**
   - Key: `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (replace with your actual anon key)

5. Click **"Deploy"**

6. **Wait for Deployment:**
   - Build takes 2-5 minutes
   - Watch build logs for errors
   - When complete: **"Your deployment is ready"**

7. **Copy Your Frontend URL:**
   - Example: `https://brainbite-lms.vercel.app`
   - Save this URL!

### 5.3 Update Backend CORS

1. Go back to **Render Dashboard**
2. Click on your **backend service**
3. Click **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Click **"Edit"**
6. Change value to your actual Vercel URL:
   ```
   https://YOUR-FRONTEND-URL.vercel.app
   ```
7. Click **"Save Changes"**
8. Render will automatically redeploy (takes 2-3 minutes)

---

## 📋 STEP 6: Test Everything

### 6.1 Test Backend

Open these URLs in your browser:

1. **Health Check:**
   ```
   https://YOUR-BACKEND-URL.onrender.com/api/health
   ```
   Expected: `{"status":"ok"}`

2. **API Documentation:**
   ```
   https://YOUR-BACKEND-URL.onrender.com/api/docs
   ```
   Expected: Swagger UI with API documentation

3. **Courses Endpoint:**
   ```
   https://YOUR-BACKEND-URL.onrender.com/api/courses
   ```
   Expected: `[]` (empty array) or list of courses

### 6.2 Test Frontend

1. Visit your frontend URL:
   ```
   https://YOUR-FRONTEND-URL.vercel.app
   ```

2. Test these features:
   - ✅ Homepage loads correctly
   - ✅ Click "Sign Up" → Create an account
   - ✅ Log in with your account
   - ✅ View courses list (should be empty initially)
   - ✅ Click "Generate Course" → Fill form → Generate a course
   - ✅ View the generated course
   - ✅ Navigate through course pages/lessons
   - ✅ Take the assessment/quiz
   - ✅ Test "Listen" button (TTS feature)

---

## 📋 STEP 7: Environment Variables Checklist

### Backend (Render) - All Required Variables

Copy this checklist and fill in your values:

```
✅ NODE_ENV = production
✅ PORT = 3000
✅ SUPABASE_URL = https://YOUR_PROJECT_ID.supabase.co
✅ SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ SUPABASE_JWT_SECRET = your-jwt-secret-here
✅ AI_API_KEY = gsk_YOUR_GROQ_API_KEY
✅ AI_API_URL = https://api.groq.com/openai/v1
✅ AI_MODEL = llama-3.1-8b-instant
✅ FRONTEND_URL = https://YOUR-FRONTEND-URL.vercel.app
```

### Frontend (Vercel) - All Required Variables

Copy this checklist and fill in your values:

```
✅ NUXT_PUBLIC_BACKEND_URL = https://YOUR-BACKEND-URL.onrender.com
✅ NUXT_PUBLIC_SUPABASE_URL = https://YOUR_PROJECT_ID.supabase.co
✅ NUXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🐛 Troubleshooting

### Problem: CORS Errors

**Symptoms:** Frontend can't call backend API, browser console shows CORS error

**Solution:**
1. Go to Render → Your backend service → Environment tab
2. Check `FRONTEND_URL` matches your Vercel URL exactly
3. No trailing slashes!
4. Example: `https://brainbite-lms.vercel.app` (correct)
5. Example: `https://brainbite-lms.vercel.app/` (wrong - has trailing slash)
6. Save and wait for redeploy

### Problem: Environment Variables Not Working

**Symptoms:** Frontend shows `undefined` or errors about missing env vars

**Solution:**
1. In Vercel, ensure all variables start with `NUXT_PUBLIC_`
2. After adding variables, click **"Redeploy"**
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check Vercel deployment logs for errors

### Problem: Database Connection Fails

**Symptoms:** Backend logs show Supabase connection errors

**Solution:**
1. Verify `SUPABASE_URL` is correct in Render
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is the **service_role** key (not anon key!)
3. Check Supabase project is active (not paused)
4. Verify RLS policies are set up (run schema.sql again if needed)

### Problem: AI Generation Fails

**Symptoms:** Course generation returns error

**Solution:**
1. Verify `AI_API_KEY` is a valid Groq key (starts with `gsk_`)
2. Check Groq API quota/limits
3. Verify `AI_API_URL` is `https://api.groq.com/openai/v1`
4. Check Render logs for specific error messages

### Problem: Build Fails

**Symptoms:** Deployment fails during build step

**Solution:**
1. Check build logs in Render/Vercel
2. Verify all dependencies in `package.json`
3. Check for TypeScript errors locally:
   ```bash
   cd backend
   npm run build
   ```
4. Ensure Node.js version is compatible (v18+)

---

## 📝 Quick Reference Commands

### Test Backend Health
```bash
curl https://YOUR-BACKEND-URL.onrender.com/api/health
```

### Test Backend Courses
```bash
curl https://YOUR-BACKEND-URL.onrender.com/api/courses
```

### View Backend Logs (Render)
1. Go to Render Dashboard
2. Click your backend service
3. Click "Logs" tab

### View Frontend Logs (Vercel)
1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click on a deployment
5. View build logs

### Redeploy Backend (Render)
1. Go to Render Dashboard
2. Click your backend service
3. Click "Manual Deploy" → "Deploy latest commit"

### Redeploy Frontend (Vercel)
1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click "..." on latest deployment
5. Click "Redeploy"

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] Supabase database created and schema.sql run successfully
- [ ] Backend deployed to Render and health check passes
- [ ] Frontend deployed to Vercel and loads correctly
- [ ] Backend CORS updated with frontend URL
- [ ] Can sign up and log in
- [ ] Can view courses (even if empty)
- [ ] Can generate a new course
- [ ] Can view course details
- [ ] Can navigate through course pages
- [ ] Can take assessment/quiz
- [ ] TTS (Listen button) works
- [ ] All environment variables are set correctly

---

## 🎉 You're Done!

Your BrainBite application is now live:

- **Frontend:** `https://YOUR-FRONTEND-URL.vercel.app`
- **Backend:** `https://YOUR-BACKEND-URL.onrender.com`
- **API Docs:** `https://YOUR-BACKEND-URL.onrender.com/api/docs`

### Next Steps (Optional)

1. Set up custom domain in Vercel
2. Configure error tracking (Sentry, etc.)
3. Set up monitoring and alerts
4. Configure CI/CD for automatic deployments

---

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment logs in Render/Vercel
3. Verify all environment variables are correct
4. Test endpoints with curl commands
5. Check browser console for frontend errors

---

**Happy Deploying! 🚀**

