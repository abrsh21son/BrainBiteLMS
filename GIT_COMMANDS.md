# Git Commands for BrainBite

Quick reference for all Git commands you need.

---

## 🔄 Basic Pull and Push

### Pull Latest Changes

```bash
# Pull latest changes from GitHub
git pull origin main
```

### Push Your Changes

```bash
# Add all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

---

## 📋 Complete Workflow

### Standard Workflow (Most Common)

```bash
# 1. Pull latest changes first
git pull origin main

# 2. Check what files changed
git status

# 3. Add all changes
git add .

# 4. Commit your changes
git commit -m "Description of your changes"

# 5. Push to GitHub
git push origin main
```

---

## 🆕 First Time Setup

### If Repository Doesn't Have Remote

```bash
# Check if remote exists
git remote -v

# If empty, add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify it was added
git remote -v

# Push for first time
git push -u origin main
```

---

## 🔀 Handling Conflicts

### If Pull Shows Conflicts

```bash
# 1. Pull latest changes
git pull origin main

# 2. If conflicts occur, Git will show which files
# 3. Open conflicted files and resolve conflicts
# 4. After resolving:

git add .
git commit -m "Resolved merge conflicts"
git push origin main
```

---

## 📊 Useful Commands

### Check Status

```bash
# See what files changed
git status

# See detailed changes
git diff

# See commit history
git log
```

### Undo Changes

```bash
# Undo changes to a file (before adding)
git checkout -- filename.txt

# Unstage a file (after git add)
git reset HEAD filename.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Create New Branch

```bash
# Create and switch to new branch
git checkout -b feature-name

# Push new branch to GitHub
git push -u origin feature-name
```

### Switch Branches

```bash
# Switch to main branch
git checkout main

# Switch to another branch
git checkout branch-name
```

---

## 🚀 Before Deployment Checklist

```bash
# 1. Make sure you're on main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Check status
git status

# 4. Add all changes
git add .

# 5. Commit
git commit -m "Ready for deployment"

# 6. Push
git push origin main

# 7. Verify on GitHub
# Go to your GitHub repository and verify your changes are there
```

---

## ⚠️ Common Issues

### Issue: "Your branch is behind"

**Solution:**
```bash
git pull origin main
# Resolve any conflicts if they occur
git push origin main
```

### Issue: "Permission denied"

**Solution:**
- Make sure you're logged into GitHub
- Check your SSH keys or use HTTPS with personal access token
- Verify you have write access to the repository

### Issue: "Remote origin already exists"

**Solution:**
```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Issue: "Nothing to commit"

**Solution:**
- This means all changes are already committed
- Just push: `git push origin main`

---

## 📝 Quick Reference

| Action | Command |
|--------|---------|
| Pull latest | `git pull origin main` |
| Check status | `git status` |
| Add all files | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push origin main` |
| See changes | `git diff` |
| See history | `git log` |

---

## 🎯 Most Common Commands

**For daily use, you'll mostly use these 4 commands:**

```bash
git pull origin main    # Get latest changes
git add .              # Stage all changes
git commit -m "msg"    # Save changes
git push origin main   # Upload to GitHub
```

---

**That's it! These are all the Git commands you need for BrainBite deployment.**

