# Fix for Render Build Error: "nest: not found"

## Problem

Render build fails with:
```
sh: 1: nest: not found
==> Build failed 😞
```

## Solution

The issue is that `nest` command isn't available during build. Use `npx nest` instead.

## ✅ Fixed package.json

The build script has been updated to use `npx nest build` instead of `nest build`.

**Before:**
```json
"build": "nest build"
```

**After:**
```json
"build": "npx nest build"
```

## Alternative Solutions

### Option 1: Use npx (Already Fixed) ✅

This uses the locally installed `@nestjs/cli` from `node_modules`:

```json
"build": "npx nest build"
```

### Option 2: Move @nestjs/cli to dependencies

Move `@nestjs/cli` from `devDependencies` to `dependencies` in `package.json`.

### Option 3: Update Render Build Command

In Render dashboard, change build command to:
```
cd backend && npm install && npx nest build
```

## Next Steps

1. **Commit the fix:**
   ```bash
   git add backend/package.json
   git commit -m "Fix: Use npx nest for build command"
   git push origin main
   ```

2. **Render will auto-redeploy** (or manually trigger redeploy)

3. **Build should now succeed** ✅

## Verify

After deployment, check:
- Build logs show successful build
- Service starts correctly
- Health endpoint works: `https://your-backend.onrender.com/api/health`

---

**The fix is already applied to your package.json! Just commit and push.**

