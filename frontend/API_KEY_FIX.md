# Fix "Invalid API key" Error

If you're seeing an "Invalid API key" error when trying to sign up or log in, follow these steps:

## Step 1: Create `.env` file in the `frontend/` directory

Create a file named `.env` (not `.env.example`) in the `frontend/` folder.

## Step 2: Get your Supabase credentials

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. You'll see:
   - **Project URL** - Copy this
   - **anon/public key** - Copy this (under "Project API keys")

## Step 3: Add credentials to `.env` file

Your `frontend/.env` file should look like this:

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Important:**
- Replace `your-project-id.supabase.co` with your actual Supabase project URL
- Replace `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your actual anon key
- The anon key is the **long string** that starts with `eyJ...`

## Step 4: Restart the frontend server

After creating/updating the `.env` file:

1. Stop the frontend server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

## Step 5: Test

Try signing up again. The error should be gone!

## Common Issues

### "File not found" or "File exists but isn't being read"
- Make sure the file is named exactly `.env` (not `.env.txt` or `.env.example`)
- Make sure it's in the `frontend/` directory (same level as `package.json`)
- After creating the file, restart the dev server

### Still seeing the error after adding credentials
- Double-check that you copied the **anon/public key** (not the service_role key)
- Make sure there are no extra spaces or quotes around the values
- Make sure the URLs don't have trailing slashes
- Check the browser console (F12) for more detailed error messages

### Need help?
Check the main README.md in the project root for complete setup instructions.



