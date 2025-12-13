# Fix: Supabase Client Initialization Error

## The Error

```
Your project's URL and Key are required to create a Supabase client!
Check your Supabase project's API settings...
```

## Quick Fix Steps

### Step 1: Verify .env File

1. Open `frontend/.env` file
2. Verify it contains (replace with your actual values):

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### Step 2: Get Your Supabase Credentials

If you don't have them:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `NUXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NUXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Clear Nuxt Cache

The cache might have old values. Clear it:

```powershell
# PowerShell (Windows)
cd frontend
Remove-Item -Recurse -Force .nuxt -ErrorAction SilentlyContinue

# Then restart
npm run dev
```

Or manually delete the `.nuxt` folder in the `frontend/` directory.

### Step 4: Restart Dev Server

**Important:** After any `.env` changes, always restart:

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 5: Verify

Check browser console (F12) - the error should be gone.

## Common Issues

### Issue 1: .env File Not Being Read

**Symptoms:** Variables are undefined

**Solutions:**
1. File must be named exactly `.env` (not `.env.txt`)
2. File must be in `frontend/` directory (same level as `package.json`)
3. No quotes around values
4. No spaces around `=` sign
5. Restart dev server after changes

### Issue 2: Wrong Variable Names

**Wrong:**
```env
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

**Correct:**
```env
NUXT_PUBLIC_SUPABASE_URL=...
NUXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Issue 3: Using Service Role Key

**Wrong:** Using `SUPABASE_SERVICE_ROLE_KEY`

**Correct:** Use `NUXT_PUBLIC_SUPABASE_ANON_KEY` (the anon/public key)

The anon key is safe for client-side use. The service_role key should NEVER be used in the frontend.

### Issue 4: Server-Side Rendering (SSR) Issues

If the error occurs during SSR, the module might not be reading env vars correctly.

**Solution:** Ensure `.env` file exists and restart server. The `@nuxtjs/supabase` module should automatically handle this.

## Verification Checklist

- [ ] `.env` file exists in `frontend/` directory
- [ ] Variable names start with `NUXT_PUBLIC_`
- [ ] Using anon key (not service_role key)
- [ ] No quotes around values
- [ ] No trailing slashes in URLs
- [ ] `.nuxt` cache cleared
- [ ] Dev server restarted
- [ ] No errors in browser console

## Still Not Working?

1. **Check terminal output** - Look for environment variable warnings
2. **Check browser DevTools** (F12) - Console tab for errors
3. **Verify Supabase project** - Make sure it's active in dashboard
4. **Try the fix script**: `.\fix-env.ps1` (Windows)

## Environment Variables Format

```env
# Required - Supabase Project URL
NUXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Required - Supabase Anon/Public Key
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTQ1NjAsImV4cCI6MjA4MDk5MDU2MH0.xxxxx

# Optional - Backend API URL
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Important Notes:**
- Values should NOT have quotes
- Values should NOT have trailing slashes
- Anon key should start with `eyJ...` (it's a JWT token)


