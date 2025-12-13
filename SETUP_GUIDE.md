# BrainBite LMS - Setup & Run Guide

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Supabase Account** - [Sign up here](https://supabase.com)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

---

## Step 1: Database Setup (Supabase)

### 1.1 Create a Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Fill in your project details and wait for it to be created

### 1.2 Run the Database Schema
1. In your Supabase dashboard, click on **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open `backend/schema.sql` in your project
4. Copy **all contents** and paste into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. Verify tables were created by checking **Table Editor** - you should see:
   - `courses`
   - `course_pages`
   - `questions`
   - `question_options`

### 1.3 Get Your Supabase Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")
   - **service_role key** (under "Project API keys" - click "Reveal" to see it)

---

## Step 2: Get OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click **Create new secret key**
4. Copy the key (you'll need it for the backend)

---

## Step 3: Backend Setup

### 3.1 Navigate to Backend Directory
```bash
cd backend
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Create Environment File
Create a file named `.env` in the `backend/` directory with:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
AI_API_KEY=your_openai_api_key_here
```

**Important Notes:**
- Replace `your-project-id.supabase.co` with your actual Supabase project URL
- Replace `your_service_role_key_here` with your Supabase service_role key (NOT the anon key)
- Replace `your_openai_api_key_here` with your OpenAI API key

### 3.4 Start the Backend Server
```bash
npm run start:dev
```

The backend should now be running on **http://localhost:3000**

You can test it by visiting:
- http://localhost:3000 - Should show API response
- http://localhost:3000/courses - Should return `[]` (empty array)

---

## Step 4: Frontend Setup

### 4.1 Open a New Terminal
Keep the backend running and open a **new terminal window/tab**

### 4.2 Navigate to Frontend Directory
```bash
cd frontend
```

### 4.3 Install Dependencies
```bash
npm install
```

### 4.4 Create Environment File
Create a file named `.env` in the `frontend/` directory with:

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Important Notes:**
- Replace `your-project-id.supabase.co` with your actual Supabase project URL
- Replace `your_anon_key_here` with your Supabase **anon/public key** (different from service_role key)
- `NUXT_PUBLIC_BACKEND_URL` should be `http://localhost:3000` if backend is running locally

### 4.5 Start the Frontend Server
```bash
npm run dev
```

The frontend should now be running on **http://localhost:3001** (or similar - check the terminal output)

---

## Step 5: Access the Application

1. Open your browser and go to the frontend URL (usually **http://localhost:3001**)
2. You'll be redirected to the login page
3. **Create an account** by:
   - Entering your email and password
   - Clicking "create a new account" link if you see "sign in"
   - Checking your email for confirmation (if email confirmation is enabled)
4. Once logged in, you can:
   - Browse courses (initially empty)
   - Generate new courses by clicking "Generate New Course"
   - Take assessments after viewing course content

---

## Quick Start Summary

```bash
# Terminal 1 - Backend
cd backend
npm install
# Create .env file with Supabase and OpenAI credentials
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm install
# Create .env file with Supabase anon key and backend URL
npm run dev
```

---

## Troubleshooting

### Backend Issues

**"Could not find the table 'public.courses'"**
- Make sure you ran the `schema.sql` file in Supabase SQL Editor
- Verify the tables exist in Supabase Table Editor

**"Supabase URL or Key is missing"**
- Check your `.env` file exists in `backend/` directory
- Verify all environment variables are set correctly
- Make sure you're using the **service_role** key, not anon key

**"Invalid token" errors**
- Make sure Supabase authentication is working
- Check that you're using the correct Supabase URL and keys

### Frontend Issues

**"Failed to generate course"**
- Make sure backend is running on port 3000
- Check backend logs for errors
- Verify OpenAI API key is valid and has credits

**Authentication not working**
- Verify `NUXT_PUBLIC_SUPABASE_URL` and `NUXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Make sure you're using the **anon key** (not service_role) in frontend

**CORS errors**
- Backend should have CORS enabled (it's in `main.ts`)
- Make sure backend is running

### General Issues

**Port already in use**
- Backend uses port 3000 - if busy, change it in `backend/src/main.ts`
- Frontend uses port 3001 by default (Nuxt auto-selects available port)

**Dependencies won't install**
- Make sure you have Node.js v18+ installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

---

## Environment Variables Reference

### Backend `.env`
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (long key)
AI_API_KEY=sk-... (OpenAI key)
```

### Frontend `.env`
```env
NUXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (anon/public key)
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

---

## Next Steps

Once everything is running:
1. Create your first course by going to "Generate New Course"
2. Enter a subject (e.g., "Introduction to JavaScript")
3. Select a difficulty level (optional)
4. Wait for AI to generate the course
5. View the course and take the assessment!

Happy learning! 🚀



