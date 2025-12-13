# Quick Fix for 500 Error on /courses

## The Problem
You're getting a 500 Internal Server Error when trying to access `/courses`. This usually means the database tables haven't been created in Supabase yet.

## Solution

### Step 1: Create Database Tables in Supabase

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Open `backend/schema.sql` in your project
6. Copy **ALL** the contents
7. Paste into the SQL editor
8. Click **Run** (or press Ctrl+Enter)
9. You should see "Success. No rows returned"

### Step 2: Verify Tables Were Created

1. In Supabase dashboard, click **Table Editor** in the left sidebar
2. You should see these tables:
   - `courses`
   - `course_pages`
   - `questions`
   - `question_options`

### Step 3: Restart Backend Server

1. Stop your backend server (Ctrl+C)
2. Start it again:
   ```bash
   npm run start:dev
   ```

### Step 4: Test

1. Visit `http://localhost:3000/courses` in your browser
2. You should see `[]` (empty array) instead of a 500 error

## Still Getting Errors?

- Check backend terminal for detailed error messages
- Verify your `.env` file has correct `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Make sure you're using the **service_role** key (not anon key) in backend
- Check Supabase dashboard to ensure tables exist





