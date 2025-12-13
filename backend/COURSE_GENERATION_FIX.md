# Fix Course Generation 500 Error

## Common Causes

The 500 error when generating a course can be caused by several issues:

### 1. Database Tables Don't Exist (Most Common)

**Symptoms:**
- Error mentions "table 'courses' doesn't exist" or similar
- Backend logs show database errors

**Solution:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Copy and paste the entire contents of `backend/schema.sql`
5. Click **Run**
6. Verify tables exist in **Table Editor**

### 2. OpenAI API Key Issues

**Symptoms:**
- Error mentions "Invalid OpenAI API key" or "401 Unauthorized"
- Backend logs show OpenAI authentication errors

**Solution:**
1. Check your `.env` file in `backend/` directory
2. Verify `AI_API_KEY` is set correctly
3. Get a new key from [OpenAI Platform](https://platform.openai.com/api-keys)
4. Make sure the key starts with `sk-`
5. Ensure you have credits/balance in your OpenAI account
6. Restart the backend server after updating the key

### 3. Missing Environment Variables

**Symptoms:**
- Error mentions "AI_API_KEY is not set" or "Supabase URL or Key is missing"

**Solution:**
1. Check `backend/.env` file exists
2. Verify it contains:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   AI_API_KEY=sk-your_openai_key
   ```
3. Make sure there are no extra spaces or quotes
4. Restart backend server

### 4. Network/Connection Issues

**Symptoms:**
- Timeout errors
- Connection refused errors

**Solution:**
1. Check if backend is running: `http://localhost:3000`
2. Check internet connection
3. Verify OpenAI API is accessible
4. Check firewall settings

## How to Debug

### Check Backend Logs

Look at your backend terminal output. The improved error handling will show:
- Specific database errors
- OpenAI API errors
- Detailed error messages

### Test Backend Endpoints

1. **Test basic endpoint:**
   ```bash
   curl http://localhost:3000
   ```
   Should return API response

2. **Test courses endpoint:**
   ```bash
   curl http://localhost:3000/courses
   ```
   Should return `[]` (empty array) if tables exist

3. **Test course generation:**
   ```bash
   curl -X POST http://localhost:3000/courses/generate \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_SUPABASE_TOKEN" \
     -d '{"subject":"Test Course","level":"beginner"}'
   ```

### Check Frontend Console

Open browser DevTools (F12) and check:
- Network tab for failed requests
- Console tab for error messages
- The error message should now be more descriptive

## Quick Checklist

- [ ] Database tables created in Supabase (run schema.sql)
- [ ] Backend `.env` file exists with all variables
- [ ] OpenAI API key is valid and has credits
- [ ] Backend server is running on port 3000
- [ ] Backend logs show no startup errors
- [ ] You're logged in to the frontend (have auth token)

## Still Having Issues?

1. Check backend terminal for detailed error logs
2. Verify all environment variables are set correctly
3. Test database connection by visiting `/courses` endpoint
4. Test OpenAI API key separately if possible
5. Make sure you've restarted the backend after any changes





