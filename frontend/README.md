# BrainBite Frontend

Nuxt 3 frontend application for the BrainBite LMS platform.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# Run in development mode
npm run dev
```

The application will be available at `http://localhost:3001`

## Environment Variables

See `.env.example` for required environment variables:
- `NUXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NUXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `NUXT_PUBLIC_BACKEND_URL` - Backend API URL (default: http://localhost:3000)

**Important Notes:**
- `NUXT_PUBLIC_BACKEND_URL` should NOT include `/api` suffix
- The API client automatically appends `/api` to the base URL
- For local dev: `http://localhost:3000`
- For production: `https://brainbitelms-backend.onrender.com`

## Project Structure

```
frontend/
├── pages/          # Route pages
├── components/     # Vue components
├── composables/    # Reusable composables
├── layouts/        # Layout templates
├── middleware/     # Route middleware
└── utils/          # Utility functions
```

## Build for Production

```bash
npm run build
npm run preview
```

For more details, see the main [README.md](../README.md) in the project root.
