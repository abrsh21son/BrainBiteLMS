# Supabase Troubleshooting Guide

## Error: "Your project's URL and Key are required to create a Supabase client!"

This error means the Supabase client cannot be initialized because environment variables are missing.

### Quick Checklist

1. ✅ **`.env` file exists** in `frontend/` directory
2. ✅ **Variable names are correct** (must start with `NUXT_PUBLIC_`)
3. ✅ **Values are correct** (no quotes, no trailing slashes)
4. ✅ **Dev server was restarted** after creating/updating `.env`

### Step-by-Step Fix

#### 1. Verify `.env` File Location
```
frontend/
  ├── .env          ← Must be here
  ├── package.json
  └── nuxt.config.ts
```

#### 2. Verify `.env` File Content
Open `frontend/.env` and verify it contains:

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Important:**
- No quotes around values
- No spaces around `=` sign
- No trailing slashes
- Use `NUXT_PUBLIC_SUPABASE_ANON_KEY` (NOT `SUPABASE_SERVICE_ROLE_KEY`)

#### 3. Get Your Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NUXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NUXT_PUBLIC_SUPABASE_ANON_KEY`

#### 4. Restart Dev Server

After updating `.env`:
```bash
# Stop server (Ctrl+C)
npm run dev
```

#### 5. Clear Cache (if still not working)

```bash
# Delete .nuxt folder
rm -rf .nuxt

# Or on Windows PowerShell:
Remove-Item -Recurse -Force .nuxt

# Restart dev server
npm run dev
```

### Common Issues

#### Issue 1: Variables Not Being Read

**Solution:**
- Verify variable names start with `NUXT_PUBLIC_`
- Restart dev server
- Check for typos in variable names

#### Issue 2: Wrong Key Type

**Error:** "Invalid API key" or authentication fails

**Solution:**
- Use **anon/public key** (starts with `eyJ...`)
- NOT the service_role key
- Anon key is safe for client-side use

#### Issue 3: Server-Side vs Client-Side

**Issue:** Works in browser but fails on server

**Solution:**
- Nuxt Supabase module handles this automatically
- Variables with `NUXT_PUBLIC_` prefix are available on both
- Ensure `.env` is in correct location

#### Issue 4: File Not Being Read

**Symptoms:** Variables show as undefined

**Solutions:**
1. Check file name is exactly `.env` (not `.env.txt`)
2. Check file is in `frontend/` directory
3. Restart dev server
4. Clear `.nuxt` cache folder

### Verification

After fixing, you should see:
- ✅ No Supabase errors in console
- ✅ Application loads successfully
- ✅ Login/signup pages work

### Still Not Working?

1. **Check browser console** (F12) for detailed errors
2. **Check terminal** where dev server is running for errors
3. **Verify Supabase project** is active in dashboard
4. **Check network tab** (F12) for failed requests
5. **Try the fix script**: `.\fix-env.ps1` (Windows) or manually edit `.env`

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NUXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Your Supabase project URL |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Your Supabase anon/public key |
| `NUXT_PUBLIC_BACKEND_URL` | ⚠️ Optional | Backend API URL (defaults to localhost:3000) |

### Need More Help?

- [Supabase Docs](https://supabase.com/docs)
- [Nuxt Supabase Module](https://supabase.nuxtjs.org/)
- Check project's `ENV_SETUP.md` file


