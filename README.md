<div align="center">

<img src="frontend/public/image.png" alt="BrainBite Banner" width="100%" style="border-radius: 12px;" />

<br/>
<br/>

# 🧠 BrainBite
### *AI-Powered Learning, Instantly Generated*

[![Live App](https://img.shields.io/badge/🌐_Live_App-brain--bite--lms--f67k.vercel.app-4F46E5?style=for-the-badge)](https://brain-bite-lms-f67k.vercel.app)
[![Backend API](https://img.shields.io/badge/⚙️_Backend_API-brainbitelms--backend.onrender.com-10B981?style=for-the-badge)](https://brainbitelms-backend.onrender.com)
[![API Docs](https://img.shields.io/badge/📖_API_Docs-Swagger_UI-F59E0B?style=for-the-badge)](https://brainbitelms-backend.onrender.com/api/docs)

<br/>

*Type a subject. Get a full course. That's it.*

</div>

---

## ✨ What is BrainBite?

BrainBite is a full-stack e-learning platform that uses **Groq AI** to generate complete, structured courses on any topic in seconds. Pick a subject, choose your level and language, and the AI builds lesson pages and quiz questions — ready to learn immediately.

---

## 🔗 Live Links

| Service | URL |
|---------|-----|
| 🌐 **Frontend** | [brain-bite-lms-f67k.vercel.app](https://brain-bite-lms-f67k.vercel.app) |
| ⚙️ **Backend API** | [brainbitelms-backend.onrender.com/api](https://brainbitelms-backend.onrender.com/api) |
| 📖 **API Docs (Swagger)** | [brainbitelms-backend.onrender.com/api/docs](https://brainbitelms-backend.onrender.com/api/docs) |
| 🏥 **Health Check** | [brainbitelms-backend.onrender.com/api/health](https://brainbitelms-backend.onrender.com/api/health) |
| 🗄️ **Database** | [Supabase Project](https://supabase.com/dashboard/project/mkbcbimbexgmyklhtmyj) |

> ⚠️ **First load may take ~50s** — the backend runs on Render free tier and sleeps after inactivity.

---

## 🚀 User Journey

```
Sign Up  →  Verify Email  →  Log In  →  Generate Course  →  Learn  →  Take Quiz
```

1. **Sign Up** at `/signup` with email + password
2. **Verify** your email (check spam) — click the link sent by Supabase
3. **Log In** at `/login` — you're redirected to your courses
4. **Generate** at `/generate-course` — type a subject and hit Generate
5. **Learn** — AI creates 4 lesson pages + quiz questions automatically
6. **Quiz** — test your knowledge with instant feedback

---

## ⚡ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Auth** | Supabase email/password, email verification, password reset |
| 🤖 **AI Course Generation** | Groq LLaMA 3.1 generates full courses with lessons + MCQ quiz |
| 📚 **Course Library** | Browse all your generated courses |
| 📄 **Tabbed Lessons** | Navigate pages cleanly with tab UI |
| ✅ **Assessments** | Multiple-choice quiz with instant correct/wrong feedback |
| 🌍 **Multi-language** | Generate courses in 12 languages |
| 📊 **Progress Tracking** | Lesson completion saved locally |

---

## 🌍 Supported Languages

Generate courses in any of these languages:

`🇬🇧 English` `🇪🇸 Spanish` `🇫🇷 French` `🇩🇪 German` `🇮🇹 Italian` `🇧🇷 Portuguese`
`🇨🇳 Chinese` `🇯🇵 Japanese` `🇰🇷 Korean` `🇸🇦 Arabic` `🇮🇳 Hindi` `🇷🇺 Russian`

---

## 🎯 Difficulty Levels

`🟢 Beginner` `🟡 Intermediate` `🔴 Advanced`

---

## 🛠️ Tech Stack

**Frontend**
- [Nuxt 3](https://nuxt.com) (Vue.js) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- Deployed on **Vercel**

**Backend**
- [NestJS](https://nestjs.com) + TypeScript
- [Groq API](https://groq.com) — LLaMA 3.1 8B Instant
- [Supabase](https://supabase.com) — PostgreSQL + Auth + RLS
- [Swagger](https://brainbitelms-backend.onrender.com/api/docs) — auto-generated API docs
- Deployed on **Render**

---

## 📡 API Reference

### Public Endpoints

```
GET  /api/health              → Health check
GET  /api/courses             → List all courses
GET  /api/courses/:id         → Get course with pages & questions
```

### Protected Endpoints *(require `Authorization: Bearer <JWT>`)*

```
POST /api/courses/generate    → Generate a new AI course
```

**Request body for `/api/courses/generate`:**
```json
{
  "subject": "Introduction to Quantum Physics",
  "level": "beginner",
  "ageRange": "18-25",
  "language": "english"
}
```

Full interactive docs → [Swagger UI](https://brainbitelms-backend.onrender.com/api/docs)

---

## 🏗️ Architecture

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│   Nuxt 3 (Vue)   │──────▶│     NestJS        │──────▶│    Supabase      │
│   Vercel         │       │     Render         │       │    PostgreSQL     │
│                  │       │                   │       │    + Auth + RLS   │
└──────────────────┘       └────────┬─────────┘       └──────────────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │    Groq API       │
                           │  LLaMA 3.1 8B    │
                           └──────────────────┘
```

---

## 🔧 Local Development

### Prerequisites
- Node.js v18+
- A [Supabase](https://supabase.com) project
- A [Groq API key](https://console.groq.com/keys) (free)

### Backend

```bash
cd backend
npm install
# copy and fill in your .env
npm run start:dev
# → http://localhost:3000/api
# → http://localhost:3000/api/docs
```

**`backend/.env`**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
AI_PROVIDER=groq
AI_API_KEY=gsk_your_groq_key
GROQ_MODEL=llama-3.1-8b-instant
FRONTEND_URL=http://localhost:3001
PORT=3000
```

### Frontend

```bash
cd frontend
npm install
# copy and fill in your .env
npm run dev
# → http://localhost:3001
```

**`frontend/.env`**
```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

> ⚠️ `NUXT_PUBLIC_BACKEND_URL` must **not** include `/api` — the client adds it automatically.

---

## 🚢 Deployment

### Frontend → Vercel

1. Import repo → set root to `frontend`
2. Set env vars:

| Key | Value |
|-----|-------|
| `NUXT_PUBLIC_SUPABASE_URL` | your Supabase URL |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key |
| `NUXT_PUBLIC_BACKEND_URL` | `https://brainbitelms-backend.onrender.com` |
| `NUXT_PUBLIC_FRONTEND_URL` | `https://brain-bite-lms-f67k.vercel.app` |

### Backend → Render

1. New Web Service → connect repo
2. Build: `cd backend && npm install && npm run build`
3. Start: `cd backend && npm run start:prod`
4. Set env vars:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | your Supabase URL |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key |
| `SUPABASE_JWT_SECRET` | from Supabase → Settings → API |
| `AI_API_KEY` | your Groq key |
| `GROQ_MODEL` | `llama-3.1-8b-instant` |
| `FRONTEND_URL` | `https://brain-bite-lms-f67k.vercel.app` |
| `NODE_ENV` | `production` |

---

## 🐛 Common Issues

| Problem | Fix |
|---------|-----|
| Backend times out on first request | Render free tier cold start — wait ~50s and retry |
| "Email not confirmed" on login | Check spam folder, or use Resend on the login page |
| CORS errors | Make sure `FRONTEND_URL` in Render matches your exact Vercel URL |
| Course not loading | Check `NUXT_PUBLIC_BACKEND_URL` doesn't have `/api` suffix |
| Tables not found | Run `backend/schema.sql` in Supabase SQL Editor |

---

<div align="center">

Built with ❤️ using **Nuxt 3 · NestJS · Supabase · Groq AI**

</div>
