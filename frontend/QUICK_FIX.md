# Quick Fix: Supabase Error

## The Problem
```
Your project's URL and Key are required to create a Supabase client!
```

## Solution - Follow These Steps EXACTLY

### Step 1: Verify .env File

Open `frontend/.env` and ensure it looks like this (replace with YOUR actual values):

```env
NUXT_PUBLIC_SUPABASE_URL=https://mkbcbimbexgmyklhtmyj.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYmNiaW1iZXhnbXlrbGh0bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTQ1NjAsImV4cCI6MjA4MDk5MDU2MH0.BqYZfN1quzjLA8-V8SZOj5QtEYJke_Y3yQI_iLaLgHM
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Critical Checks:**
- ✅ No quotes around values
- ✅ No spaces before/after `=`
- ✅ File name is exactly `.env` (not `.env.txt`)
- ✅ File is in `frontend/` directory

### Step 2: Clear ALL Caches

```powershell
cd frontend
Remove-Item -Recurse -Force .nuxt -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
```

### Step 3: Restart Dev Server

**IMPORTANT:** You MUST restart the server after any .env changes!

1. Stop the server (Ctrl+C in the terminal where it's running)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 4: Check Terminal Output

When you start the server, look for:
- ✅ No Supabase warnings
- ✅ "Supabase configuration loaded successfully" (if plugin runs)
- ❌ If you see warnings about missing URL/Key, the .env file isn't being read

### Step 5: Verify in Browser

1. Open http://localhost:3001
2. Open DevTools (F12) → Console tab
3. Should see NO Supabase errors

## Still Not Working?

### Option A: Check .env File Encoding

The file must be UTF-8 encoded. Open it in a text editor and:
1. Save As
2. Choose "UTF-8" encoding
3. Save

### Option B: Verify Variables Manually

Create a test file `frontend/test-env.js`:

```javascript
require('dotenv').config();
console.log('URL:', process.env.NUXT_PUBLIC_SUPABASE_URL ? '✅ Found' : '❌ Missing');
console.log('Key:', process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing');
```

Run: `node test-env.js`

If it shows "Missing", the .env file isn't being read correctly.

### Option C: Use dotenv-cli (Alternative)

```bash
npm install -D dotenv-cli
```

Then modify `package.json` scripts:
```json
"dev": "dotenv -e .env -- nuxt dev"
```

### Option D: Set Environment Variables in PowerShell

```powershell
$env:NUXT_PUBLIC_SUPABASE_URL="https://mkbcbimbexgmyklhtmyj.supabase.co"
$env:NUXT_PUBLIC_SUPABASE_ANON_KEY="your_key_here"
npm run dev
```

## Verification Checklist

- [ ] .env file exists in frontend/ directory
- [ ] File name is exactly `.env` (no extension)
- [ ] Variables start with `NUXT_PUBLIC_`
- [ ] No quotes around values
- [ ] No spaces around `=` sign
- [ ] .nuxt folder deleted
- [ ] Dev server restarted
- [ ] Terminal shows no Supabase warnings
- [ ] Browser console shows no errors

## Most Common Issue

**The dev server wasn't restarted after creating/updating .env**

Nuxt only reads .env when it starts. You MUST restart the server!


