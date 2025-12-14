# How to Install NestJS

## Option 1: Install NestJS CLI Globally (Recommended)

This allows you to use `nest` command from anywhere:

```powershell
npm install -g @nestjs/cli
```

**Verify installation:**
```powershell
nest --version
```

---

## Option 2: Use npx (No Installation Needed)

You can use NestJS CLI without installing globally:

```powershell
npx @nestjs/cli --version
```

---

## Option 3: Install Locally in Your Project

The backend already has NestJS CLI in `devDependencies`. Just install project dependencies:

```powershell
cd backend
npm install
```

This will install all dependencies including `@nestjs/cli` locally.

---

## For Your BrainBite Backend

Since you're already in the `backend` folder, just run:

```powershell
# Install all dependencies (including NestJS)
npm install
```

This installs:
- ✅ `@nestjs/cli` (local)
- ✅ `@nestjs/core`
- ✅ `@nestjs/common`
- ✅ All other dependencies

---

## Common NestJS Commands

After installation, you can use:

```powershell
# Create new project
nest new project-name

# Generate module
nest generate module module-name

# Generate controller
nest generate controller controller-name

# Generate service
nest generate service service-name

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

---

## Quick Start for BrainBite

```powershell
# 1. Navigate to backend
cd backend

# 2. Install all dependencies
npm install

# 3. Start development server
npm run start:dev
```

---

## Troubleshooting

### Issue: "nest: command not found"

**Solution:**
```powershell
# Install globally
npm install -g @nestjs/cli

# Or use npx
npx @nestjs/cli
```

### Issue: Permission errors (Windows)

**Solution:**
```powershell
# Run PowerShell as Administrator, then:
npm install -g @nestjs/cli
```

---

**That's it! NestJS is now installed and ready to use.**

