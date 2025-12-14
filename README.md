# BrainBite - AI-Powered Learning Management System

> A lightweight e-learning MVP that allows users to generate AI-powered courses, browse them, and take interactive assessments.

## 🚀 Quick Start

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

Visit:
- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:3000/api`
- API Docs: `http://localhost:3000/api/docs`

## ✨ Features

- ✅ **User Authentication** - Sign up, log in, and password reset using Supabase Auth
- ✅ **AI Course Generation** - Generate complete courses with 4 lessons and 2 MCQ questions using Groq AI
- ✅ **Course Browsing** - View all published courses with search and filtering
- ✅ **Interactive Learning** - Navigate through lessons with elegant UI and progress tracking
- ✅ **Assessment System** - Take quizzes with instant feedback and AI-generated explanations
- ✅ **Text-to-Speech** - Listen to course content with voice style variations
- ✅ **AI Learning Assistant** - Ask questions about lessons and get AI-powered answers
- ✅ **Course Recommendations** - Get personalized course suggestions after completing assessments

## 🛠️ Tech Stack

### Frontend
- **Framework:** Nuxt 3 (Vue.js)
- **Styling:** Tailwind CSS
- **Authentication:** Supabase Client
- **Language:** TypeScript

### Backend
- **Framework:** NestJS
- **Database:** Supabase (PostgreSQL)
- **AI:** Groq API (OpenAI-compatible)
- **Language:** TypeScript

### Infrastructure
- **Database:** Supabase (PostgreSQL with Row Level Security)
- **Deployment:** 
  - Frontend: Vercel
  - Backend: Render

## 📁 Project Structure

```
BrainBite/
├── frontend/                 # Nuxt 3 application
│   ├── pages/               # Route pages
│   │   ├── index.vue        # Landing page
│   │   ├── login.vue         # Login page
│   │   ├── signup.vue       # Signup page
│   │   ├── courses/         # Course pages
│   │   └── generate-course.vue
│   ├── components/          # Vue components
│   │   ├── common/          # Reusable components
│   │   └── course/          # Course-specific components
│   ├── composables/         # Reusable composables
│   ├── layouts/             # Layout templates
│   ├── middleware/          # Route middleware
│   ├── utils/               # Utility functions
│   └── types/               # TypeScript types
│
├── backend/                 # NestJS application
│   ├── src/
│   │   ├── courses/         # Course module
│   │   │   ├── courses.controller.ts
│   │   │   ├── courses.service.ts
│   │   │   ├── dto/         # Data Transfer Objects
│   │   │   ├── entities/   # Type-safe entities
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
│   └── schema.sql           # Database schema
│
├── DEPLOYMENT_GUIDE.md      # Complete deployment instructions
└── README.md                # This file
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase Account ([supabase.com](https://supabase.com))
- Groq API Key ([console.groq.com](https://console.groq.com)) - Free tier available

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

# Backend API URL (no /api suffix)
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Important:**
- Use the **anon** key (public key) for the frontend
- Backend URL should NOT include `/api` suffix

### 3. Installation & Running

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

## 🚀 Deployment

For complete step-by-step deployment instructions, see **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

### Quick Overview

**Backend (Render):**
1. Create Web Service on Render
2. Connect GitHub repository
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm run start:prod`
5. Add environment variables
6. Deploy

**Frontend (Vercel):**
1. Import GitHub repository in Vercel
2. Set root directory: `frontend`
3. Add environment variables
4. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📚 API Endpoints

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
- **course_pages** - Content pages/lessons for each course
- **questions** - MCQ questions for assessments
- **question_options** - Answer options with correct answer flags
- **attempts** - User assessment attempts (optional)

See `backend/schema.sql` for complete schema and RLS policies.

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

## 🐛 Troubleshooting

### Common Issues

1. **"Table not found" error**
   - Solution: Run `backend/schema.sql` in Supabase SQL Editor

2. **CORS errors**
   - Solution: Verify `FRONTEND_URL` is set correctly in backend `.env`

3. **Authentication errors**
   - Solution: Check that Supabase keys are correct and not expired

4. **AI generation fails**
   - Solution: Verify `AI_API_KEY` is a valid Groq API key (starts with `gsk_`)

5. **Module not found errors**
   - Solution: Run `npm install` in both frontend and backend directories

6. **Environment variables not working**
   - Solution: Ensure frontend variables start with `NUXT_PUBLIC_` prefix
   - Solution: Restart dev server after changing `.env` files

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

For deployment help, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

For issues or questions:
- Check the troubleshooting section above
- Review deployment logs
- Verify environment variables are set correctly

---

**Built with ❤️ using Nuxt 3, NestJS, and Supabase**
