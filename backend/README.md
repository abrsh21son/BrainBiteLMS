# BrainBite Backend

NestJS backend API for the BrainBite LMS platform.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# Run in development mode
npm run start:dev
```

The API will be available at `http://localhost:3000`
- API Documentation: `http://localhost:3000/api` (Swagger UI)

## Environment Variables

See `.env.example` for required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `AI_API_KEY` - Groq API key (starts with `gsk_`)
- `PORT` - Server port (default: 3000)

## API Endpoints

### Public
- `GET /api/courses` - List all published courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/recommendations` - Get course recommendations

### Protected (Requires Authentication)
- `POST /api/courses/generate` - Generate new course with AI
- `POST /api/courses/ask-question` - Ask AI about lesson content
- `POST /api/courses/generate-summary` - Generate lesson summary
- `POST /api/courses/explain-answer` - Get AI explanation for quiz answer

## Testing

```bash
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Test coverage
```

## Database

Run `schema.sql` in your Supabase SQL Editor to set up the database schema.

For more details, see the main [README.md](../README.md) in the project root.
