# Frontend Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables (CRITICAL)

**In Vercel Dashboard → Settings → Environment Variables:**

```env
NUXT_PUBLIC_BACKEND_URL=https://brainbitelms-backend.onrender.com
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**⚠️ CRITICAL NOTES:**
- `NUXT_PUBLIC_BACKEND_URL` should **NOT** include `/api` suffix
- The API client automatically appends `/api` to the base URL
- Wrong: `https://brainbitelms-backend.onrender.com/api` ❌
- Correct: `https://brainbitelms-backend.onrender.com` ✅

### 2. Backend CORS Configuration

**In Render Dashboard → Your Backend Service → Environment:**

```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**For multiple origins (local + production):**
```env
FRONTEND_URL=http://localhost:3001,https://your-frontend-domain.vercel.app
```

### 3. Verify Backend is Working

Test these endpoints before deploying frontend:

```bash
# Root endpoint
curl https://brainbitelms-backend.onrender.com/

# Courses endpoint
curl https://brainbitelms-backend.onrender.com/api/courses

# Should return:
# {"success":true,"data":[...],"timestamp":"..."}
```

## 🔍 Post-Deployment Verification

### Step 1: Check Browser Console

1. Open your deployed frontend
2. Press F12 → Console tab
3. Look for these logs:

```
[API Client] Base URL configured: https://brainbitelms-backend.onrender.com/api
[API Client] GET https://brainbitelms-backend.onrender.com/api/courses
[API Client] Response from ...: {success: true, hasData: true, ...}
[useCourses] Successfully loaded X courses
```

### Step 2: Check Network Tab

1. F12 → Network tab
2. Reload page
3. Find request to `/api/courses`
4. Check:
   - ✅ Status: 200
   - ✅ Response: `{"success":true,"data":[...]}`
   - ✅ Request URL: `https://brainbitelms-backend.onrender.com/api/courses`

### Step 3: Common Issues & Fixes

#### Issue: "API Base URL configured: undefined/api"

**Cause:** `NUXT_PUBLIC_BACKEND_URL` not set in Vercel

**Fix:**
1. Vercel Dashboard → Settings → Environment Variables
2. Add: `NUXT_PUBLIC_BACKEND_URL=https://brainbitelms-backend.onrender.com`
3. Redeploy

#### Issue: CORS Error in Console

**Cause:** Frontend URL not in backend CORS whitelist

**Fix:**
1. Render Dashboard → Environment Variables
2. Set `FRONTEND_URL` to your Vercel domain
3. Restart backend service

#### Issue: "Network error: Could not connect"

**Cause:** Backend is sleeping (Render free tier)

**Fix:**
- Wait ~50 seconds for first request
- Or upgrade to paid Render plan

#### Issue: Courses array is empty but no error

**Cause:** Response parsing issue

**Fix:**
1. Check console for `[API Client] Response from...`
2. Verify response has `success: true` and `data: [...]`
3. Check `[useCourses] Courses fetched:` log

## 🚨 Emergency Debugging

### Quick Test Script

Open browser console on your deployed site and run:

```javascript
// Test API connection
fetch('https://brainbitelms-backend.onrender.com/api/courses')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Backend is reachable');
    console.log('Response:', data);
    console.log('Has courses:', Array.isArray(data?.data) && data.data.length > 0);
  })
  .catch(err => {
    console.error('❌ Backend connection failed:', err);
  });
```

### Check Environment Variables

In browser console:

```javascript
// Check if env vars are available (only works in browser)
console.log('Backend URL:', import.meta.env.NUXT_PUBLIC_BACKEND_URL);
```

Note: This might show `undefined` if not properly set in Vercel.

## 📋 Deployment Steps (Vercel)

1. **Connect Repository**
   - Vercel Dashboard → Add New Project
   - Import from GitHub
   - Set Root Directory: `frontend`

2. **Configure Build Settings**
   - Framework Preset: Nuxt.js
   - Build Command: `npm run build`
   - Output Directory: `.output`

3. **Add Environment Variables**
   - Settings → Environment Variables
   - Add all `NUXT_PUBLIC_*` variables
   - **Important:** No `/api` in `NUXT_PUBLIC_BACKEND_URL`

4. **Deploy**
   - Click Deploy
   - Wait for build to complete
   - Check deployment logs for errors

5. **Verify**
   - Visit deployed URL
   - Open browser console
   - Check for API calls and errors
   - Verify courses are loading

## 🔧 Manual Fixes

### Fix 1: Update Environment Variable

**Vercel:**
1. Go to Project → Settings → Environment Variables
2. Edit `NUXT_PUBLIC_BACKEND_URL`
3. Set to: `https://brainbitelms-backend.onrender.com` (no `/api`)
4. Redeploy

### Fix 2: Update Backend CORS

**Render:**
1. Go to Backend Service → Environment
2. Edit `FRONTEND_URL`
3. Set to your Vercel domain: `https://your-app.vercel.app`
4. Save and restart service

### Fix 3: Clear Cache

**Browser:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache completely

**Vercel:**
- Redeploy to clear any cached builds

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Browser console shows: `[API Client] Base URL configured: ...`
2. ✅ Network tab shows successful `200` response to `/api/courses`
3. ✅ Courses appear on the page
4. ✅ No CORS errors in console
5. ✅ No "Network error" messages

## 📞 Still Not Working?

1. **Check Backend Logs** (Render Dashboard → Logs)
2. **Check Frontend Logs** (Vercel Dashboard → Deployment → Logs)
3. **Test Backend Directly** (curl commands above)
4. **Check Browser Console** (F12 → Console & Network tabs)
5. **Verify Environment Variables** (Vercel Settings)

---

**Last Updated:** After fixing API client and response parsing issues
