# Database Setup Instructions

## Issue
The backend is showing this error:
```
Error: Could not find the table 'public.courses' in the schema cache
```

This means the database tables haven't been created in Supabase yet.

## Solution

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Log in to your account
3. Select your project (or create a new one if you haven't)

### Step 2: Run the Schema SQL
1. In the Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the entire contents of `backend/schema.sql` file
4. Paste it into the SQL editor
5. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify Tables Were Created
1. Click on **Table Editor** in the left sidebar
2. You should see the following tables:
   - `courses`
   - `course_pages`
   - `questions`
   - `question_options`

### Step 4: Verify Environment Variables
Make sure your `.env` file in the backend has the correct Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

**Important**: Use the **service_role** key (not the anon key) because the backend needs to bypass Row Level Security (RLS) to create courses.

### Step 5: Restart the Backend
After setting up the database, restart your backend server:
```bash
npm run start:dev
```

## Testing
Once the database is set up, you can test the backend by:
1. Visiting `http://localhost:3000` - should show "Hello World!"
2. Visiting `http://localhost:3000/courses` - should return an empty array `[]`
3. Testing course generation via POST to `http://localhost:3000/courses/generate`

## Troubleshooting

### If you still get "table not found" errors:
1. Make sure you're using the correct Supabase project
2. Verify the SQL ran successfully (check for any error messages)
3. Try refreshing the schema cache by restarting the backend

### If you get RLS policy errors:
1. Make sure you're using the **service_role** key, not the anon key
2. The service_role key bypasses RLS by default
