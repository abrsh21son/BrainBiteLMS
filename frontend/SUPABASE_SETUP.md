# Supabase Setup Guide

## Quick Fix for Missing Supabase Configuration

The error you're seeing means Supabase environment variables are missing. Follow these steps:

### Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 2: Create `.env` File

1. In the `frontend/` directory, create a file named `.env`
2. Add the following content (replace with your actual values):

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### Step 3: Important Notes

- ✅ Use `NUXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
- ✅ Use `NUXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_SERVICE_ROLE_KEY`)
- ✅ The anon key is **safe for client-side** use
- ✅ Use the **anon/public key**, NOT the service_role key
- ✅ No quotes around values
- ✅ No trailing slashes in URLs

### Step 4: Restart Dev Server

After creating/updating `.env`:

1. Stop the server (Ctrl+C)
2. Start it again: `npm run dev`

## Quick Setup Script

Alternatively, you can use the provided PowerShell script:

```powershell
cd frontend
.\fix-env.ps1
```

## Verification

After setup, you should see:
- ✅ No Supabase errors in console
- ✅ Can access login/signup pages
- ✅ Application loads without errors

## Troubleshooting

### Still seeing errors?

1. **File location**: Make sure `.env` is in `frontend/` directory (same level as `package.json`)
2. **File name**: Must be exactly `.env` (not `.env.txt` or `.env.example`)
3. **Variable names**: Must start with `NUXT_PUBLIC_`
4. **Values**: No spaces around `=` sign
5. **Restart**: Always restart dev server after changing `.env`

### How to check if it's working:

1. Open browser DevTools (F12)
2. Check Console tab - should see no Supabase errors
3. Try navigating to `/login` - page should load

## Need Help?

- Check [Supabase Docs](https://supabase.com/docs)
- Verify your project is active in Supabase dashboard
- Make sure you copied the **anon key** (not service_role key)


