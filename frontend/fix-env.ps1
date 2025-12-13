# Script to fix .env file for Supabase configuration
# This script updates the .env file with correct variable names

$envPath = Join-Path $PSScriptRoot ".env"
$envBackupPath = Join-Path $PSScriptRoot ".env.backup"

Write-Host "Fixing .env file for Supabase configuration..." -ForegroundColor Cyan

# Backup current .env
if (Test-Path $envPath) {
    Copy-Item $envPath $envBackupPath -Force
    Write-Host "Created backup at .env.backup" -ForegroundColor Yellow
}

# Read current .env content
$currentContent = @()
if (Test-Path $envPath) {
    $currentContent = Get-Content $envPath
}

# Extract values
$supabaseUrl = ""
$anonKey = ""
$backendUrl = "http://localhost:3000"

foreach ($line in $currentContent) {
    if ($line -match "^SUPABASE_URL=(.+)") {
        $supabaseUrl = $matches[1]
    }
    if ($line -match "^AI_API_KEY=(.+)") {
        # Keep this for reference but we don't need it in frontend
    }
    if ($line -match "^NUXT_PUBLIC_BACKEND_URL=(.+)") {
        $backendUrl = $matches[1]
    }
}

Write-Host ""
Write-Host "IMPORTANT: You need to get your ANON KEY (not service_role key) from Supabase!" -ForegroundColor Red
Write-Host ""
Write-Host "To get your anon key:"
Write-Host "1. Go to https://supabase.com/dashboard" -ForegroundColor Yellow
Write-Host "2. Select your project" -ForegroundColor Yellow
Write-Host "3. Go to Settings > API" -ForegroundColor Yellow
Write-Host "4. Find 'anon public' key (NOT service_role key!)" -ForegroundColor Yellow
Write-Host "5. Copy the key that starts with 'eyJ...'" -ForegroundColor Yellow
Write-Host ""

$anonKeyInput = Read-Host "Paste your anon key here (or press Enter to skip and add manually)"

# Create new .env content
$newContent = @()

if ($supabaseUrl) {
    $newContent += "NUXT_PUBLIC_SUPABASE_URL=$supabaseUrl"
} else {
    $newContent += "NUXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co"
}

if ($anonKeyInput) {
    $newContent += "NUXT_PUBLIC_SUPABASE_ANON_KEY=$anonKeyInput"
} else {
    $newContent += "NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here"
}

$newContent += "NUXT_PUBLIC_BACKEND_URL=$backendUrl"

# Write new content
$newContent | Out-File -FilePath $envPath -Encoding utf8 -NoNewline
$newContent | ForEach-Object { $_ + "`n" } | Set-Content -Path $envPath

Write-Host ""
Write-Host "✅ Updated .env file!" -ForegroundColor Green
Write-Host ""
Write-Host "Current configuration:" -ForegroundColor Cyan
Get-Content $envPath | ForEach-Object { Write-Host $_ -ForegroundColor Gray }
Write-Host ""
Write-Host "⚠️  If you skipped adding the anon key, please edit .env manually and add:" -ForegroundColor Yellow
Write-Host "   NUXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here" -ForegroundColor Yellow
Write-Host ""
Write-Host "After updating, restart your dev server (npm run dev)" -ForegroundColor Cyan



