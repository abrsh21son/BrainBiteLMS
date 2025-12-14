# 🚀 Deployment Steps Only - Render & Vercel

**Quick reference for adding environment variables during deployment.**

---

## ⚠️ About SUPABASE_JWT_SECRET

**Answer: It's NOT required for the current codebase.**

The backend uses `SUPABASE_SERVICE_ROLE_KEY` which handles JWT verification automatically. However, if you want to add it for future use or completeness, you can add it.

---

## 📋 STEP 1: Deploy Backend to Render

### 1.1 Create Web Service in Render

1. Go to: https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:

   **Name:** `brainbite-backend`
   
   **Build Command:**
   ```
   cd backend && npm install && npm run build
   ```
   
   **Start Command:**
   ```
   cd backend && npm run start:prod
   ```

### 1.2 Add Environment Variables in Render

**Click "Advanced" → Scroll to "Environment Variables" section**

**Click "Add Environment Variable" for each:**

#### Variable 1:
- **Key:** `NODE_ENV`
- **Value:** `production`

#### Variable 2:
- **Key:** `PORT`
- **Value:** `3000`

#### Variable 3:
- **Key:** `SUPABASE_URL`
- **Value:** `https://YOUR_PROJECT_ID.supabase.co`
  - Get from: Supabase Dashboard → Settings → API → Project URL

#### Variable 4:
- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - Get from: Supabase Dashboard → Settings → API → service_role key

#### Variable 5 (OPTIONAL - Not Required):
- **Key:** `SUPABASE_JWT_SECRET`
- **Value:** `your-jwt-secret-here`
  - Get from: Supabase Dashboard → Settings → Auth → JWT Settings → JWT Secret
  - **Note:** This is optional - the code doesn't use it currently

#### Variable 6:
- **Key:** `AI_API_KEY`
- **Value:** `gsk_YOUR_GROQ_API_KEY`
  - Get from: https://console.groq.com → API Keys

#### Variable 7:
- **Key:** `AI_API_URL`
- **Value:** `https://api.groq.com/openai/v1`

#### Variable 8:
- **Key:** `AI_MODEL`
- **Value:** `llama-3.1-8b-instant`

#### Variable 9:
- **Key:** `FRONTEND_URL`
- **Value:** `https://placeholder.vercel.app`
  - **Update this later** after frontend deployment

### 1.3 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes
3. Copy your backend URL: `https://brainbite-backend.onrender.com`

---

## 📋 STEP 2: Deploy Frontend to Vercel

### 2.1 Import Project in Vercel

1. Go to: https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Select your repository
4. Click **"Import"**

### 2.2 Configure Project

- **Framework Preset:** `Nuxt.js` (auto-detected)
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.output/public` (auto-detected)

### 2.3 Add Environment Variables in Vercel

**Click "Environment Variables" → Click "Add" for each:**

#### Variable 1:
- **Key:** `NUXT_PUBLIC_BACKEND_URL`
- **Value:** `https://YOUR-BACKEND-URL.onrender.com`
  - Use your actual Render backend URL (NO `/api` suffix!)

#### Variable 2:
- **Key:** `NUXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://YOUR_PROJECT_ID.supabase.co`
  - Get from: Supabase Dashboard → Settings → API → Project URL

#### Variable 3:
- **Key:** `NUXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - Get from: Supabase Dashboard → Settings → API → anon public key

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 2-5 minutes
3. Copy your frontend URL: `https://brainbite-lms.vercel.app`

---

## 📋 STEP 3: Update Backend CORS

1. Go back to **Render Dashboard**
2. Click your **backend service**
3. Click **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Click **"Edit"** (pencil icon)
6. Change value to your actual Vercel URL:
   ```
   https://YOUR-FRONTEND-URL.vercel.app
   ```
7. Click **"Save Changes"**
8. Render will auto-redeploy (2-3 minutes)

---

## 📝 Environment Variables Summary

### Backend (Render) - Required

| Key | Value | Where to Get |
|-----|-------|--------------|
| `NODE_ENV` | `production` | - |
| `PORT` | `3000` | - |
| `SUPABASE_URL` | `https://xxx.supabase.co` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase → Settings → API → service_role |
| `AI_API_KEY` | `gsk_xxx` | Groq Console → API Keys |
| `AI_API_URL` | `https://api.groq.com/openai/v1` | - |
| `AI_MODEL` | `llama-3.1-8b-instant` | - |
| `FRONTEND_URL` | `https://xxx.vercel.app` | After frontend deployment |

### Backend (Render) - Optional

| Key | Value | Where to Get |
|-----|-------|--------------|
| `SUPABASE_JWT_SECRET` | `xxx` | Supabase → Settings → Auth → JWT Settings |

**Note:** `SUPABASE_JWT_SECRET` is optional - not used in current code.

### Frontend (Vercel) - Required

| Key | Value | Where to Get |
|-----|-------|--------------|
| `NUXT_PUBLIC_BACKEND_URL` | `https://xxx.onrender.com` | Your Render backend URL |
| `NUXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase → Settings → API |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase → Settings → API → anon |

---

## 🎯 Quick Checklist

### Backend Deployment
- [ ] Render account created
- [ ] Web service created
- [ ] 8 environment variables added (9 if including optional JWT_SECRET)
- [ ] Build command: `cd backend && npm install && npm run build`
- [ ] Start command: `cd backend && npm run start:prod`
- [ ] Deployment successful
- [ ] Backend URL copied

### Frontend Deployment
- [ ] Vercel account created
- [ ] Project imported
- [ ] Root directory set to `frontend`
- [ ] 3 environment variables added
- [ ] Deployment successful
- [ ] Frontend URL copied

### Final Step
- [ ] Backend `FRONTEND_URL` updated with Vercel URL
- [ ] Backend redeployed
- [ ] Test frontend → backend connection

---

## ✅ Test After Deployment

### Test Backend
```
https://YOUR-BACKEND.onrender.com/api/health
```
Should return: `{"status":"ok"}`

### Test Frontend
```
https://YOUR-FRONTEND.vercel.app
```
Should load homepage

---

**That's it! Your deployment is complete.**

