# SUPABASE_JWT_SECRET - Complete Guide

## Is it Required?

**Short Answer:** It's **optional** for the current BrainBite implementation, but **recommended** to add it for future-proofing and manual JWT verification.

**Why:**
- The current code uses Supabase's built-in `getUser()` method which handles JWT verification automatically
- The JWT secret is used if you want to manually verify JWTs yourself
- It's good practice to include it in case you need it later

---

## How to Find Your JWT Secret in Supabase

### Step-by-Step Instructions:

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Log in to your account

2. **Select Your Project**
   - Click on your BrainBite project

3. **Navigate to JWT Settings**
   - Click **"Settings"** (gear icon in left sidebar)
   - Click **"Auth"** (under Project Settings)
   - Scroll down to **"JWT Settings"** section

4. **Copy the JWT Secret**
   - You'll see a field labeled **"JWT Secret"**
   - Click the **eye icon** to reveal it (or copy button)
   - Copy the entire secret (it's a long string)

**Example location:**
```
Supabase Dashboard → Your Project → Settings → Auth → JWT Settings → JWT Secret
```

---

## How to Add It to Render (Backend)

### Method 1: Via Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Log in

2. **Select Your Backend Service**
   - Click on `brainbite-backend` (or your service name)

3. **Go to Environment Tab**
   - Click **"Environment"** in the left sidebar

4. **Add New Variable**
   - Click **"Add Environment Variable"** button
   - **Key:** `SUPABASE_JWT_SECRET`
   - **Value:** Paste your JWT secret from Supabase
   - Click **"Save Changes"**

5. **Wait for Redeploy**
   - Render will automatically redeploy (takes 2-3 minutes)
   - Or click **"Manual Deploy"** → **"Deploy latest commit"**

### Method 2: Via Render CLI (Advanced)

If you have Render CLI installed:

```bash
render env:set SUPABASE_JWT_SECRET="your-jwt-secret-here" --service brainbite-backend
```

---

## Verification

### Check if Variable is Set:

1. Go to Render Dashboard → Your Service → Environment tab
2. Look for `SUPABASE_JWT_SECRET` in the list
3. It should show as set (value is hidden for security)

### Test Backend:

```bash
# Test health endpoint
curl https://your-backend.onrender.com/api/health

# Should return: {"status":"ok"}
```

---

## Current Code Status

**Current Implementation:**
- The backend uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- JWT verification is handled automatically by Supabase client
- `SUPABASE_JWT_SECRET` is **not currently used** in the code

**Why Add It Anyway:**
- ✅ Future-proofing (if you add manual JWT verification)
- ✅ Best practice (completes the Supabase configuration)
- ✅ Required by some Supabase features
- ✅ Listed in deployment guides

---

## Quick Copy-Paste Steps

### 1. Get JWT Secret from Supabase:
```
1. Go to: https://app.supabase.com
2. Select your project
3. Settings → Auth → JWT Settings
4. Copy "JWT Secret"
```

### 2. Add to Render:
```
1. Go to: https://dashboard.render.com
2. Select your backend service
3. Environment tab
4. Add Environment Variable:
   Key: SUPABASE_JWT_SECRET
   Value: [paste your JWT secret]
5. Save
```

---

## Troubleshooting

### Issue: Can't find JWT Secret in Supabase

**Solution:**
- Make sure you're in the correct project
- Check that you have admin/owner access
- Try refreshing the page
- The JWT Secret is always available, it might just be hidden

### Issue: Variable not saving in Render

**Solution:**
- Make sure there are no extra spaces
- Don't include quotes in the value
- Check that you clicked "Save Changes"
- Verify the service is not paused

### Issue: Backend still works without it

**Solution:**
- This is normal! The current code doesn't require it
- It's optional but recommended for completeness
- Your backend will work fine without it

---

## Summary

| Question | Answer |
|----------|--------|
| **Is it required?** | No, but recommended |
| **Where to find it?** | Supabase Dashboard → Settings → Auth → JWT Settings |
| **Where to add it?** | Render Dashboard → Your Service → Environment tab |
| **What happens if missing?** | Backend still works (current code doesn't use it) |
| **Should I add it?** | Yes, for best practices and future-proofing |

---

## Quick Reference

**Supabase Location:**
```
Dashboard → Project → Settings → Auth → JWT Settings → JWT Secret
```

**Render Location:**
```
Dashboard → Service → Environment → Add Environment Variable
```

**Variable Name:**
```
SUPABASE_JWT_SECRET
```

---

**That's it! You now know everything about SUPABASE_JWT_SECRET.**

