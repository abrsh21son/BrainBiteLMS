# Netlify Deployment Guide for BrainBite Frontend

This guide will help you deploy the BrainBite frontend to Netlify.

## Prerequisites

- A Netlify account (sign up at https://app.netlify.com)
- Your GitHub repository connected
- Environment variables ready

## Step 1: Prepare Your Repository

The `netlify.toml` file is already configured in the `frontend` directory.

## Step 2: Deploy via Netlify Dashboard

### Option A: Deploy from Git (Recommended)

1. **Log in to Netlify**
   - Go to https://app.netlify.com
   - Sign in with your GitHub account

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository: `abrsh21son/BrainBiteLMS`

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `.output/public`
   - **Node version**: `22` (or latest LTS)

4. **Set Environment Variables**
   Click "Show advanced" → "New variable" and add:
   ```
   NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NUXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NUXT_PUBLIC_BACKEND_URL=your_backend_url
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

4. **Initialize Site**
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Follow the prompts

5. **Set Environment Variables**
   ```bash
   netlify env:set NUXT_PUBLIC_SUPABASE_URL "your_supabase_url"
   netlify env:set NUXT_PUBLIC_SUPABASE_ANON_KEY "your_supabase_anon_key"
   netlify env:set NUXT_PUBLIC_BACKEND_URL "your_backend_url"
   ```

6. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Step 4: Update Backend CORS

Make sure your backend (on Render or other platform) has the Netlify URL in its CORS configuration:

```typescript
// In backend/src/main.ts
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
// Set FRONTEND_URL to your Netlify URL
```

## Troubleshooting

### Build Fails
- Check Node version (should be 22 or latest LTS)
- Verify all environment variables are set
- Check build logs in Netlify dashboard

### Routing Issues
- The `netlify.toml` includes redirect rules for SPA routing
- If issues persist, check the redirect configuration

### Environment Variables Not Working
- Ensure variables start with `NUXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables

## Continuous Deployment

Netlify automatically deploys when you push to your main branch. You can configure branch deployments in:
- Site settings → Build & deploy → Continuous Deployment

## Support

For more information, visit:
- [Netlify Documentation](https://docs.netlify.com/)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
