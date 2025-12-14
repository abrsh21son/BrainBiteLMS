# SUPABASE_JWT_SECRET Setup Guide

## ✅ Your JWT Secret

Your JWT secret from Supabase:
```
7MLeQ0zZKzjj6yx4n66CWxyN6U715cYvJ2w3/JBfuCqHfscHJUmTIskUJmoGQsKmhqvJrWxStzCxU/gyowlMfQ==
```

**This is a valid JWT secret format.** ✅

---

## ⚠️ Important: Is It Required?

**NO - It's NOT required for the current BrainBite codebase.**

The backend uses `SUPABASE_SERVICE_ROLE_KEY` which automatically handles JWT verification. You can skip adding this variable.

---

## 📋 How to Add It (Optional)

If you want to add it for future use or completeness:

### In Render Dashboard:

1. Go to: https://dashboard.render.com
2. Click on your **backend service** (e.g., `brainbite-backend`)
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"** button
5. Enter:
   - **Key:** `SUPABASE_JWT_SECRET`
   - **Value:** `7MLeQ0zZKzjj6yx4n66CWxyN6U715cYvJ2w3/JBfuCqHfscHJUmTIskUJmoGQsKmhqvJrWxStzCxU/gyowlMfQ==`
6. Click **"Save Changes"**
7. Render will automatically redeploy (takes 2-3 minutes)

---

## ✅ Verification

After adding, you can verify it's set:

1. In Render Dashboard → Your service → Environment tab
2. Look for `SUPABASE_JWT_SECRET` in the list
3. The value should be masked (shown as `••••••••`)

---

## 📝 Complete Environment Variables List

### Required Variables (Backend):

```
NODE_ENV = production
PORT = 3000
SUPABASE_URL = https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
AI_API_KEY = gsk_YOUR_GROQ_API_KEY
AI_API_URL = https://api.groq.com/openai/v1
AI_MODEL = llama-3.1-8b-instant
FRONTEND_URL = https://YOUR-FRONTEND.vercel.app
```

### Optional Variable (Backend):

```
SUPABASE_JWT_SECRET = 7MLeQ0zZKzjj6yx4n66CWxyN6U715cYvJ2w3/JBfuCqHfscHJUmTIskUJmoGQsKmhqvJrWxStzCxU/gyowlMfQ==
```

---

## 🎯 Summary

- ✅ Your JWT secret is valid
- ⚠️ It's NOT required - deployment works without it
- 📋 If adding: Use the steps above in Render Dashboard
- 🔒 Keep it secret - don't commit to GitHub

---

**Your deployment will work fine with or without this variable!**

