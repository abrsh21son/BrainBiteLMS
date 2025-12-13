# Quick Deployment Reference

## 🚀 Fast Track Deployment

### Step 1: Backend (5 minutes)

1. **Go to [Render.com](https://render.com)**
2. **New → Web Service**
3. **Connect GitHub repo**
4. **Settings:**
   - Build: `cd backend && npm install && npm run build`
   - Start: `cd backend && npm run start:prod`
5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   SUPABASE_URL=your_url
   SUPABASE_SERVICE_ROLE_KEY=your_key
   SUPABASE_JWT_SECRET=your_secret
   AI_API_KEY=your_key
   AI_API_URL=https://api.groq.com/openai/v1
   AI_MODEL=llama-3.1-8b-instant
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
6. **Deploy** → Copy backend URL

### Step 2: Frontend (3 minutes)

1. **Go to [Vercel.com](https://vercel.com)**
2. **New Project → Import GitHub repo**
3. **Settings:**
   - Root Directory: `frontend`
   - Framework: Nuxt.js (auto)
4. **Environment Variables:**
   ```
   NUXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
   NUXT_PUBLIC_SUPABASE_URL=your_url
   NUXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
5. **Deploy** → Copy frontend URL

### Step 3: Update Backend CORS (1 minute)

1. **Go back to Render**
2. **Update `FRONTEND_URL`** with your Vercel URL
3. **Redeploy** (auto or manual)

### Step 4: Test (2 minutes)

- [ ] Visit frontend URL
- [ ] Sign up / Login
- [ ] Generate a course
- [ ] View course details
- [ ] Take assessment

**Total Time: ~11 minutes**

---

## 📝 Environment Variables Cheat Sheet

### Backend (Render)
```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
SUPABASE_JWT_SECRET=your-secret
AI_API_KEY=your-key
AI_API_URL=https://api.groq.com/openai/v1
AI_MODEL=llama-3.1-8b-instant
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
NUXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
NUXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

---

## 🔗 Important URLs

- **Backend API:** `https://your-backend.onrender.com/api`
- **Swagger Docs:** `https://your-backend.onrender.com/api/docs`
- **Health Check:** `https://your-backend.onrender.com/api/health`
- **Frontend:** `https://your-app.vercel.app`

---

## ⚠️ Common Mistakes

1. ❌ Adding `/api` to `NUXT_PUBLIC_BACKEND_URL` (frontend adds it)
2. ❌ Using wrong Supabase key (anon vs service_role)
3. ❌ Forgetting to update `FRONTEND_URL` after frontend deploy
4. ❌ Wrong build/start commands in Render
5. ❌ Not setting root directory in Vercel

---

## 🆘 Quick Fixes

**CORS Error?**
- Check `FRONTEND_URL` matches frontend URL exactly
- No trailing slashes

**API Not Found?**
- Verify backend URL doesn't include `/api`
- Check backend is running (health endpoint)

**Build Fails?**
- Check Node version (should be 18+)
- Verify all dependencies in package.json
- Check build logs for errors

---

For detailed instructions, see `DEPLOYMENT_GUIDE.md`
