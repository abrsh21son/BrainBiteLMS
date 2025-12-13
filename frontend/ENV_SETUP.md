# Fix Your .env File - Quick Guide

## The Problem

Your `.env` file has the wrong variable names. The `@nuxtjs/supabase` module expects variables with the `NUXT_PUBLIC_` prefix.

## Quick Fix

### Option 1: Use the Fix Script (Easiest)

Run this in PowerShell from the `frontend` directory:

```powershell
.\fix-env.ps1
```

The script will guide you through the process.

### Option 2: Manual Fix

1. **Open** `frontend/.env` in a text editor

2. **Replace** the entire content with:

```env
NUXT_PUBLIC_SUPABASE_URL=https://mkbcbimbexgmyklhtmyj.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

3. **Get Your Anon Key:**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to **Settings** → **API**
   - Find **"anon public"** key (it's a long string starting with `eyJ...`)
   - **IMPORTANT:** Use the **anon key**, NOT the service_role key!
   - Copy it and replace `your_anon_key_here` in the .env file

4. **Save** the file

5. **Restart** your frontend server (Ctrl+C, then `npm run dev`)

## What Changed?

❌ **Old (wrong):**
```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...  # Wrong key type!
```

✅ **New (correct):**
```env
NUXT_PUBLIC_SUPABASE_URL=...      # Added NUXT_PUBLIC_ prefix
NUXT_PUBLIC_SUPABASE_ANON_KEY=... # Changed to anon key (not service_role)
NUXT_PUBLIC_BACKEND_URL=...       # Added backend URL
```

## Why?

- `@nuxtjs/supabase` automatically reads `NUXT_PUBLIC_*` variables
- Frontend needs the **anon key** (safe for client-side)
- Backend uses the **service_role key** (for server-side operations)

## Still Having Issues?

1. Make sure the file is named exactly `.env` (not `.env.txt`)
2. Make sure it's in the `frontend/` directory
3. Check there are no extra spaces around the `=` sign
4. Restart the dev server after making changes
5. Check browser console (F12) for more detailed errors



