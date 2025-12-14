# Backend Deployment Alternatives to Render

This guide covers multiple platforms where you can deploy your NestJS backend instead of Render.

## 🚂 1. Railway (Recommended - Easy & Fast)

**Best for**: Quick deployments, automatic HTTPS, simple setup

### Setup Steps:

1. **Sign up at Railway**
   - Go to https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Railway auto-detects Node.js projects
   - Set **Root Directory**: `backend`
   - Set **Build Command**: `npm install && npm run build`
   - Set **Start Command**: `npm run start:prod`

4. **Set Environment Variables**
   In Railway dashboard → Variables tab, add:
   ```
   NODE_ENV=production
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   SUPABASE_JWT_SECRET=your_jwt_secret
   AI_API_KEY=your_ai_api_key
   AI_API_URL=https://api.groq.com/openai/v1
   AI_MODEL=llama-3.1-8b-instant
   FRONTEND_URL=your_frontend_url
   ```

5. **Deploy**
   - Railway automatically deploys on push
   - Get your URL from the service settings

**Pros**: 
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Simple setup
- ✅ Auto-deploy from Git

**Cons**:
- ⚠️ Free tier has usage limits

---

## 🪂 2. Fly.io (Great for Global Distribution)

**Best for**: Global edge deployment, Docker support

### Setup Steps:

1. **Install Fly CLI**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Login to Fly.io**
   ```bash
   fly auth login
   ```

3. **Initialize Fly App**
   ```bash
   cd backend
   fly launch
   ```
   - Follow prompts
   - Choose a region
   - Don't deploy yet (we'll configure first)

4. **Configure Environment Variables**
   ```bash
   fly secrets set NODE_ENV=production
   fly secrets set PORT=3000
   fly secrets set SUPABASE_URL=your_supabase_url
   fly secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   fly secrets set SUPABASE_JWT_SECRET=your_jwt_secret
   fly secrets set AI_API_KEY=your_ai_api_key
   fly secrets set AI_API_URL=https://api.groq.com/openai/v1
   fly secrets set AI_MODEL=llama-3.1-8b-instant
   fly secrets set FRONTEND_URL=your_frontend_url
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

**Pros**:
- ✅ Generous free tier
- ✅ Global edge network
- ✅ Docker support
- ✅ Great performance

**Cons**:
- ⚠️ Requires CLI setup
- ⚠️ More complex than Railway

**Note**: The `fly.toml` file is already created in the backend directory.

---

## 🟣 3. Heroku (Classic Platform)

**Best for**: Traditional PaaS, extensive documentation

### Setup Steps:

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create brainbite-backend
   ```

4. **Set Buildpack**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

5. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=3000
   heroku config:set SUPABASE_URL=your_supabase_url
   heroku config:set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   heroku config:set SUPABASE_JWT_SECRET=your_jwt_secret
   heroku config:set AI_API_KEY=your_ai_api_key
   heroku config:set AI_API_URL=https://api.groq.com/openai/v1
   heroku config:set AI_MODEL=llama-3.1-8b-instant
   heroku config:set FRONTEND_URL=your_frontend_url
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

**Pros**:
- ✅ Well-documented
- ✅ Add-ons ecosystem
- ✅ Easy rollbacks

**Cons**:
- ⚠️ No free tier (paid plans only)
- ⚠️ More expensive than alternatives

**Note**: The `Procfile` is already created in the backend directory.

---

## 🐳 4. DigitalOcean App Platform

**Best for**: Simple PaaS with good pricing

### Setup Steps:

1. **Sign up at DigitalOcean**
   - Go to https://cloud.digitalocean.com
   - Create account

2. **Create New App**
   - Go to App Platform
   - Click "Create App"
   - Connect GitHub repository

3. **Configure App**
   - **Source**: GitHub repo
   - **Branch**: main
   - **Type**: Web Service
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Run Command**: `npm run start:prod`
   - **HTTP Port**: 3000

4. **Set Environment Variables**
   Add all required variables in the App Spec:
   - NODE_ENV=production
   - PORT=3000
   - SUPABASE_URL (as secret)
   - SUPABASE_SERVICE_ROLE_KEY (as secret)
   - SUPABASE_JWT_SECRET (as secret)
   - AI_API_KEY (as secret)
   - AI_API_URL=https://api.groq.com/openai/v1
   - AI_MODEL=llama-3.1-8b-instant
   - FRONTEND_URL (as secret)

5. **Deploy**
   - Click "Create Resources"
   - Wait for deployment

**Pros**:
- ✅ Good pricing
- ✅ Simple interface
- ✅ Automatic HTTPS

**Cons**:
- ⚠️ No free tier (but affordable)

**Note**: The `app.yaml` file is already created for App Platform.

---

## ▲ 5. Vercel (Serverless)

**Best for**: Serverless functions, edge deployment

### Setup Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd backend
   vercel
   ```

4. **Set Environment Variables**
   In Vercel dashboard → Project Settings → Environment Variables:
   - Add all required variables

**Note**: NestJS on Vercel requires serverless adapter. You may need to modify the entry point.

**Pros**:
- ✅ Excellent free tier
- ✅ Edge network
- ✅ Great performance

**Cons**:
- ⚠️ Requires serverless adapter for NestJS
- ⚠️ Cold starts possible

---

## 🌐 6. AWS (Elastic Beanstalk or EC2)

**Best for**: Enterprise, full control

### Option A: Elastic Beanstalk (Easier)

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize**
   ```bash
   cd backend
   eb init
   ```

3. **Create Environment**
   ```bash
   eb create brainbite-backend
   ```

4. **Set Environment Variables**
   ```bash
   eb setenv NODE_ENV=production PORT=3000 ...
   ```

### Option B: EC2 (More Control)

- Launch EC2 instance
- Install Node.js
- Clone repository
- Use PM2 for process management
- Configure Nginx as reverse proxy

**Pros**:
- ✅ Full control
- ✅ Scalable
- ✅ Enterprise-grade

**Cons**:
- ⚠️ Complex setup
- ⚠️ Requires server management
- ⚠️ More expensive

---

## 📊 Comparison Table

| Platform | Free Tier | Ease of Setup | Best For |
|----------|-----------|---------------|----------|
| **Railway** | ✅ Yes | ⭐⭐⭐⭐⭐ | Quick deployments |
| **Fly.io** | ✅ Yes | ⭐⭐⭐⭐ | Global distribution |
| **Heroku** | ❌ No | ⭐⭐⭐⭐ | Traditional PaaS |
| **DigitalOcean** | ❌ No | ⭐⭐⭐⭐ | Simple PaaS |
| **Vercel** | ✅ Yes | ⭐⭐⭐ | Serverless |
| **AWS** | ⚠️ Limited | ⭐⭐ | Enterprise |

---

## 🎯 Recommended Choice

**For most users**: **Railway** or **Fly.io**
- Both have free tiers
- Easy setup
- Automatic HTTPS
- Good performance

**For production/enterprise**: **DigitalOcean App Platform** or **AWS**
- More reliable
- Better support
- More control

---

## 🔧 Common Configuration

All platforms need these environment variables:

```bash
NODE_ENV=production
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
AI_API_URL=https://api.groq.com/openai/v1
AI_MODEL=llama-3.1-8b-instant
FRONTEND_URL=your_frontend_url
```

## 📝 Next Steps

1. Choose a platform from above
2. Follow the setup steps
3. Update your frontend's `NUXT_PUBLIC_BACKEND_URL` environment variable
4. Update backend CORS to allow your frontend domain
5. Test the deployment

## 🆘 Troubleshooting

### Build Fails
- Ensure `@nestjs/cli` is in devDependencies
- Check Node.js version (should be 18+)
- Verify build command includes `npm install`

### Port Issues
- Most platforms set PORT automatically
- Ensure your code uses `process.env.PORT || 3000`

### CORS Errors
- Update `FRONTEND_URL` in backend environment variables
- Check CORS configuration in `main.ts`

---

For platform-specific help, refer to their official documentation.
