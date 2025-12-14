# BrainBite - AI-Powered Learning Management System

> A lightweight e-learning MVP that allows users to generate AI-powered courses, browse them, and take interactive assessments.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

BrainBite is a full-stack e-learning platform built with modern web technologies. It enables users to:

- **Authenticate** using Supabase Auth (email/password)
- **Browse** published courses with search and filtering
- **Generate** new courses using AI (Groq API)
- **Learn** through interactive lessons with 4 content pages
- **Assess** knowledge with MCQ questions and instant feedback
- **Listen** to course content using Text-to-Speech (TTS)

## ✨ Features

### Core Functionality

- ✅ **User Authentication** - Sign up, log in, and password reset using Supabase Auth
- ✅ **Course Browsing** - View all published courses with search and filtering
- ✅ **AI Course Generation** - Generate complete courses with 4 lessons and 2 MCQ questions using Groq AI
- ✅ **Interactive Learning** - Navigate through lessons with elegant UI and progress tracking
- ✅ **Assessment System** - Take quizzes with instant feedback and AI-generated explanations
- ✅ **Text-to-Speech** - Listen to course content with voice style variations
- ✅ **AI Learning Assistant** - Ask questions about lessons and get AI-powered answers
- ✅ **Course Recommendations** - Get personalized course suggestions after completing assessments

### User Flows

1. **Authentication Flow**
   - User signs up/logs in via `/login` page
   - Session persists across page refreshes
   - Protected routes redirect unauthenticated users to login

2. **Course Browsing Flow**
   - User views all published courses on `/courses` page
   - Can search and filter by subject
   - Clicks "Learn" to view course details

3. **Course Generation Flow**
   - User navigates to `/generate-course`
   - Enters subject (and optional: level, age range, language)
   - AI generates course content
   - User is redirected to the new course details page

4. **Learning Flow**
   - User views course with 4 content pages (tabs/accordion)
   - Can navigate between pages
   - Completes assessment with 2 MCQ questions
   - Receives instant feedback and score

## 🛠️ Tech Stack

### Frontend
- **Framework:** Nuxt 3 (Vue.js)
- **Styling:** Tailwind CSS
- **Authentication:** Supabase Client
- **State Management:** Vue Composables
- **Language:** TypeScript

### Backend
- **Framework:** NestJS
- **Database:** Supabase (PostgreSQL)
- **AI:** Groq API (OpenAI-compatible)
- **Validation:** class-validator, class-transformer
- **Language:** TypeScript

### Infrastructure
- **Database:** Supabase (PostgreSQL with Row Level Security)
- **Frontend Deployment:** Vercel
- **Backend Deployment:** Render
- **Source Control:** GitHub (Private Repository)

## 📁 Project Structure

```
BrainBite/
├── frontend/                    # Nuxt 3 application
│   ├── pages/                  # Route pages
│   │   ├── index.vue          # Landing page
│   │   ├── login.vue          # Login page
│   │   ├── signup.vue         # Signup page
│   │   ├── courses/           # Course pages
│   │   │   ├── index.vue     # Courses overview
│   │   │   └── [id].vue      # Course details
│   │   └── generate-course.vue # Course generation
│   ├── components/            # Vue components
│   │   ├── common/           # Reusable components
│   │   └── course/           # Course-specific components
│   ├── composables/          # Reusable composables
│   ├── layouts/              # Layout templates
│   ├── middleware/           # Route middleware (auth)
│   ├── utils/                # Utility functions
│   └── types/                # TypeScript types
│
├── backend/                    # NestJS application
│   ├── src/
│   │   ├── courses/          # Course module
│   │   │   ├── courses.controller.ts
│   │   │   ├── courses.service.ts
│   │   │   ├── dto/         # Data Transfer Objects
│   │   │   ├── entities/    # Type-safe entities
│   │   │   └── repositories/ # Repository pattern
│   │   ├── ai/              # AI service
│   │   │   └── ai.service.ts
│   │   ├── supabase/        # Supabase integration
│   │   ├── common/          # Shared utilities
│   │   │   ├── guards/      # Auth guards
│   │   │   ├── filters/     # Exception filters
│   │   │   ├── interceptors/ # Request/response interceptors
│   │   │   └── pipes/       # Validation pipes
│   │   └── main.ts          # Application entry point
│   ├── test/                # Test files
│   │   ├── e2e/            # End-to-end tests (Playwright)
│   │   └── playwright.config.ts
│   └── schema.sql           # Database schema
│
├── DEPLOYMENT_GUIDE.md       # Deployment instructions
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase Account ([supabase.com](https://supabase.com))
- Groq API Key ([console.groq.com](https://console.groq.com)) - Free tier available

### Installation

```bash
# Clone repository
git clone <repository-url>
cd BrainBite

# Backend setup
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run start:dev

# Frontend setup (in new terminal)
cd frontend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

### Access Points

- **Frontend:** `http://localhost:3001`
- **Backend API:** `http://localhost:3000/api`
- **API Docs:** `http://localhost:3000/api/docs`

## 🔧 Setup Instructions

### 1. Database Setup (Supabase)

1. Create a new project on [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor** in your Supabase project
3. Copy the contents of `backend/schema.sql`
4. Paste and run the SQL script to create all necessary tables and RLS policies

### 2. Environment Variables

#### Backend (`backend/.env`)

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here

# AI Configuration (Groq API)
AI_API_KEY=gsk_your_groq_api_key_here
AI_API_URL=https://api.groq.com/openai/v1
AI_MODEL=llama-3.1-8b-instant

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3001

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important:**
- Use the **service_role** key (not anon key) for the backend
- Get your Groq API key from [console.groq.com/keys](https://console.groq.com/keys)
- Groq API keys start with `gsk_`

#### Frontend (`frontend/.env`)

```env
# Supabase Configuration
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Backend API URL (no /api suffix - API client adds it automatically)
# For local: http://localhost:3000
# For production: https://your-backend-url.onrender.com
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Important:**
- Use the **anon** key (public key) for the frontend
- Backend URL should NOT include `/api` suffix (the API client adds it automatically)

### 3. Running the Application

#### Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend runs on `http://localhost:3000`
- API Root: `http://localhost:3000/api`
- Swagger Docs: `http://localhost:3000/api/docs`
- Health Check: `http://localhost:3000/api/health`

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3001`

## 📚 API Documentation

### Public Endpoints

- `GET /api/courses` - List all published courses
- `GET /api/courses/:id` - Get course details with pages and questions
- `GET /api/health` - Health check endpoint

### Protected Endpoints (Require Authentication)

- `POST /api/courses/generate` - Generate new course with AI
- `POST /api/courses/ask-question` - Ask AI about lesson content
- `POST /api/courses/generate-summary` - Generate lesson summary
- `POST /api/courses/explain-answer` - Get AI explanation for quiz answer

**Authentication:** Send JWT token in `Authorization: Bearer <token>` header

**API Documentation:** Visit `/api/docs` when backend is running for interactive Swagger documentation.

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests (Jest)
npm run test:playwright # Run Playwright E2E tests
```

### Frontend Tests

Frontend tests can be added using Vitest. Test structure is ready for expansion.

### End-to-End Testing (Playwright)

The project includes Playwright E2E tests covering:

1. **Authentication Flow** (`backend/test/e2e/auth.spec.ts`)
   - Login page navigation
   - Sign up link visibility
   - Protected route redirection

2. **Course Generation Flow** (`backend/test/e2e/course-generation.spec.ts`)
   - Generate course form display
   - Course generation and redirect to details page

3. **Assessment Flow** (`backend/test/e2e/assessment.spec.ts`)
   - Assessment questions display
   - Answer selection and feedback

**Running E2E Tests:**

```bash
cd backend
npm run test:playwright
```

**Note:** E2E tests require authentication setup. Some tests are skipped by default and require manual authentication configuration.

## 🚀 Deployment

For complete deployment instructions, see **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

### Frontend (Vercel) - Quick Start

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory: `frontend`
4. Add environment variables:
   - `NUXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com`
   - `NUXT_PUBLIC_SUPABASE_URL=your-supabase-url`
   - `NUXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`
5. Deploy!

### Backend (Render) - Quick Overview

1. Create Web Service on Render
2. Connect GitHub repository
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm run start:prod`
5. Add environment variables
6. Deploy

## 🏗️ Architecture

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

1. **Authentication:** User signs up/logs in via Supabase Auth (handled in frontend)
2. **Course Generation:**
   - User submits form → Frontend calls NestJS API
   - NestJS verifies JWT → Calls Groq AI → Generates course content
   - NestJS stores course in Supabase (using service role key)
   - Returns course ID to frontend
   - Frontend redirects to course details page
3. **Course Viewing:**
   - Frontend fetches courses from NestJS API
   - NestJS queries Supabase (respects RLS policies)
   - Returns data to frontend for display

### Database Schema

- **courses** - Main course table with title, subject, description
- **course_pages** - Content pages/lessons for each course (4 pages per course)
- **questions** - MCQ questions for assessments (2 questions per course)
- **question_options** - Answer options with correct answer flags
- **attempts** - User assessment attempts (optional)

See `backend/schema.sql` for complete schema and RLS policies.

## 🐛 Troubleshooting

### Common Issues

1. **"Table not found" error**
   - Solution: Run `backend/schema.sql` in Supabase SQL Editor

2. **CORS errors**
   - Solution: Verify `FRONTEND_URL` is set correctly in backend `.env`
   - For deployed backend: Set `FRONTEND_URL` in Render dashboard to your frontend URL
   - Multiple origins: Use comma-separated values: `https://app1.vercel.app,https://app2.vercel.app`

3. **Authentication errors**
   - Solution: Check that Supabase keys are correct and not expired

4. **AI generation fails**
   - Solution: Verify `AI_API_KEY` is a valid Groq API key (starts with `gsk_`)

5. **Module not found errors**
   - Solution: Run `npm install` in both frontend and backend directories

6. **Environment variables not working**
   - Solution: Ensure frontend variables start with `NUXT_PUBLIC_` prefix
   - Solution: Restart dev server after changing `.env` files

### Frontend Not Rendering Courses

1. **Check Browser Console**
   - Open DevTools (F12) → Console tab
   - Look for API errors, CORS errors, or network failures

2. **Verify Backend URL Configuration**
   - **Local Development:** Set `NUXT_PUBLIC_BACKEND_URL=http://localhost:3000` (no `/api` suffix)
   - **Production:** Set `NUXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com` (no `/api` suffix)

3. **Check CORS Configuration**
   - Backend must allow your frontend origin
   - In Render dashboard → Environment Variables → Set `FRONTEND_URL` to your frontend URL

4. **Render Free Tier Cold Start**
   - First request after inactivity takes ~50 seconds
   - Wait for backend to wake up, then try again

## 📖 Development Guidelines

### Code Structure

- **Frontend:** Component-based architecture with composables for reusable logic
- **Backend:** Modular structure with services, controllers, and repositories
- **Type Safety:** Full TypeScript support across the stack

### Adding Features

1. **Frontend:** Add pages in `frontend/pages/`, components in `frontend/components/`
2. **Backend:** Create modules in `backend/src/`, add routes in controllers
3. **Database:** Update `backend/schema.sql` and run in Supabase

### Best Practices

- ✅ Use TypeScript for type safety
- ✅ Follow NestJS module structure
- ✅ Use composables for reusable frontend logic
- ✅ Validate all inputs using DTOs
- ✅ Handle errors gracefully
- ✅ Use environment variables for configuration
- ✅ Follow RESTful API conventions

## 📄 License

Private repository - All rights reserved

## 📞 Support


For issues or questions:
- Check the troubleshooting section above
- Review deployment logs
- Verify environment variables are set correctly

---

**Built with ❤️ using Nuxt 3, NestJS, and Supabase**
