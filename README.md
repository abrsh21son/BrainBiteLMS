# BrainBite - AI-Powered Learning Management System

## Overview
BrainBite is a lightweight e-learning MVP that allows users to generate courses using AI, browse them, and take assessments. Built as a modern, full-stack application with a focus on user experience and AI-powered content generation.

## Features

- ✅ **User Authentication**: Sign up, log in, and password reset using Supabase Auth
- ✅ **Course Browsing**: View all published courses with search and filtering
- ✅ **AI Course Generation**: Generate complete courses with 4 lessons and 2 MCQ questions using Groq AI
- ✅ **Interactive Learning**: Navigate through lessons with elegant UI and progress tracking
- ✅ **Assessment System**: Take quizzes with instant feedback and AI-generated explanations
- ✅ **Text-to-Speech**: Listen to course content with voice style variations
- ✅ **AI Learning Assistant**: Ask questions about lessons and get AI-powered answers
- ✅ **Course Recommendations**: Get personalized course suggestions after completing assessments

## Tech Stack

- **Frontend**: 
  - Nuxt 3 (Vue.js framework)
  - Tailwind CSS (styling)
  - Supabase Client (authentication)
  - TypeScript

- **Backend**: 
  - NestJS (Node.js framework)
  - Supabase Client (database)
  - Groq API (AI content generation - OpenAI-compatible)
  - TypeScript

- **Database**: 
  - Supabase (PostgreSQL with Row Level Security)

- **Deployment**:
  - Frontend: Vercel/Netlify (static hosting)
  - Backend: Render/Railway/Fly.io (Node.js hosting)

## Project Structure

```
BrainBite/
├── frontend/          # Nuxt 3 application
│   ├── pages/        # Route pages
│   ├── components/   # Vue components
│   ├── composables/  # Reusable composables
│   ├── layouts/      # Layout templates
│   └── middleware/   # Route middleware
├── backend/          # NestJS application
│   ├── src/
│   │   ├── courses/  # Course module
│   │   ├── ai/       # AI service
│   │   └── supabase/ # Supabase integration
│   └── schema.sql    # Database schema
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase Account ([supabase.com](https://supabase.com))
- Groq API Key ([console.groq.com](https://console.groq.com)) - Free tier available

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd BrainBite
```

### 2. Database Setup (Supabase)

1. Create a new project on [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor** in your Supabase project
3. Copy the contents of `backend/schema.sql`
4. Paste and run the SQL script to create all necessary tables and RLS policies

### 3. Environment Variables

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# AI Configuration (Groq API - Free tier available)
AI_API_KEY=gsk_your_groq_api_key_here
AI_MODEL=llama-3.1-8b-instant  # Optional: override default model

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3001

# Server Configuration
PORT=3000
```

**Important Notes:**
- Use the **service_role** key (not anon key) for the backend
- Get your Groq API key from [console.groq.com/keys](https://console.groq.com/keys)
- Groq API keys start with `gsk_`

#### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Supabase Configuration
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Backend API URL
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Important Notes:**
- Use the **anon** key (public key) for the frontend
- For production, update `NUXT_PUBLIC_BACKEND_URL` to your deployed backend URL

### 4. Installation & Running

#### Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The backend will run on `http://localhost:3000`
- API Documentation: `http://localhost:3000/api` (Swagger UI)

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3001`

## Deployment

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables in Vercel dashboard:
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NUXT_PUBLIC_BACKEND_URL` (your deployed backend URL)
4. Set build command: `npm run build`
5. Set output directory: `.output`
6. Deploy

#### Using Netlify:

1. Push your code to GitHub
2. Import your repository in Netlify
3. Configure environment variables (same as Vercel)
4. Build command: `npm run build`
5. Publish directory: `.output/public`
6. Deploy

### Backend Deployment (Render/Railway/Fly.io)

#### Using Render:

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm run start:prod`
   - **Environment**: Node
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AI_API_KEY`
   - `FRONTEND_URL` (your deployed frontend URL)
5. Deploy

#### Using Railway:

1. Create a new project on Railway
2. Deploy from GitHub repository
3. Set root directory to `backend`
4. Add environment variables (same as Render)
5. Deploy

**Important**: Update your frontend `NUXT_PUBLIC_BACKEND_URL` to point to your deployed backend URL.

## Architecture

### High-Level Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Nuxt 3    │────────▶│   NestJS     │────────▶│   Supabase  │
│  Frontend   │         │   Backend    │         │  (Database) │
│             │         │              │         │             │
│ - Auth UI   │         │ - API Routes │         │ - PostgreSQL│
│ - Course UI │         │ - AI Service │         │ - Auth      │
│ - TTS       │         │ - Validation │         │ - RLS       │
└─────────────┘         └──────────────┘         └─────────────┘
                              │
                              ▼
                        ┌─────────────┐
                        │  Groq API   │
                        │  (AI Model) │
                        └─────────────┘
```

### Data Flow

1. **Authentication**: User signs up/logs in via Supabase Auth (handled in frontend)
2. **Course Generation**: 
   - User submits form → Frontend calls NestJS API
   - NestJS verifies JWT → Calls Groq AI → Generates course content
   - NestJS stores course in Supabase (using service role key)
   - Returns course ID to frontend
   - Frontend redirects to course details page
3. **Course Viewing**: 
   - Frontend fetches courses from NestJS API
   - NestJS queries Supabase (respects RLS policies)
   - Returns data to frontend for display

### Database Schema

- **courses**: Main course table with title, subject, description
- **course_pages**: Content pages/lessons for each course
- **questions**: MCQ questions for assessments
- **question_options**: Answer options with correct answer flags

See `backend/schema.sql` for complete schema and RLS policies.

## API Endpoints

### Public Endpoints

- `GET /api/courses` - List all published courses
- `GET /api/courses/:id` - Get course details with pages and questions
- `GET /api/courses/:id/recommendations` - Get course recommendations

### Protected Endpoints (Require Authentication)

- `POST /api/courses/generate` - Generate new course with AI
- `POST /api/courses/ask-question` - Ask AI about lesson content
- `POST /api/courses/generate-summary` - Generate lesson summary
- `POST /api/courses/explain-answer` - Get AI explanation for quiz answer

**Authentication**: Send JWT token in `Authorization: Bearer <token>` header

## Testing

### Backend Tests

```bash
cd backend
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests (Jest)
npm run test:playwright # Run Playwright E2E tests
npm run test:playwright:ui # Run Playwright tests with UI
```

**Note:** Before running Playwright tests, install dependencies:
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Frontend Tests

Frontend tests can be added using Vitest. Currently, test structure is ready for expansion.

### Test Coverage

- ✅ Unit tests for AI service (validates 4 pages and 2 questions requirement)
- ✅ E2E test structure (Playwright) for auth, course generation, and assessment flows
- See `REQUIREMENTS_COMPLIANCE.md` for detailed test verification

## Troubleshooting

### Common Issues

1. **"Table not found" error**: Make sure you've run `backend/schema.sql` in Supabase SQL Editor
2. **CORS errors**: Verify `FRONTEND_URL` is set correctly in backend `.env`
3. **Authentication errors**: Check that Supabase keys are correct and not expired
4. **AI generation fails**: Verify `AI_API_KEY` is a valid Groq API key (starts with `gsk_`)
5. **Module not found errors**: Run `npm install` in both frontend and backend directories

See individual troubleshooting guides:
- `backend/DATABASE_SETUP.md` - Database setup issues
- `backend/QUICK_FIX.md` - Quick fixes for common errors
- `frontend/SUPABASE_TROUBLESHOOTING.md` - Supabase auth issues

## Development

### Code Structure

- **Frontend**: Component-based architecture with composables for reusable logic
- **Backend**: Modular structure with services, controllers, and repositories
- **Type Safety**: Full TypeScript support across the stack

### Adding Features

1. **Frontend**: Add pages in `frontend/pages/`, components in `frontend/components/`
2. **Backend**: Create modules in `backend/src/`, add routes in controllers
3. **Database**: Update `backend/schema.sql` and run in Supabase

## License

Private repository - All rights reserved

## Support

For issues or questions, please refer to:
- `REQUIREMENTS_COMPLIANCE.md` - Complete requirements checklist
- `SETUP_GUIDE.md` - Detailed setup instructions
- Backend and Frontend README files in respective directories
