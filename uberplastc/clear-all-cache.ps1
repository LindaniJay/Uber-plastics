# 🔥 Clear ALL Caches - Nuclear Option
# This script removes EVERY cache in the platform

Write-Host "🔥 Starting Nuclear Cache Clear..." -ForegroundColor Red

# Stop any running processes
Write-Host "`n1. Stopping running processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process | Where-Object {$_.ProcessName -eq "next"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Clear Next.js Build Cache
Write-Host "`n2. Clearing Next.js build cache (.next)..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "   ✅ .next removed" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .next not found" -ForegroundColor Gray
}

# Clear Node Modules Cache
Write-Host "`n3. Clearing node_modules cache..." -ForegroundColor Yellow
$nodeCachePaths = @(
    "node_modules/.cache",
    "node_modules/.vite",
    "node_modules/.next"
)
foreach ($path in $nodeCachePaths) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ $path removed" -ForegroundColor Green
    }
}

# Clear npm cache globally
Write-Host "`n4. Clearing npm cache..." -ForegroundColor Yellow
try {
    npm cache clean --force
    Write-Host "   ✅ npm cache cleared" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  npm cache clear failed: $_" -ForegroundColor Yellow
}

# Clear Playwright cache
Write-Host "`n5. Clearing Playwright cache..." -ForegroundColor Yellow
$playwrightCache = "$env:USERPROFILE\.cache\ms-playwright"
if (Test-Path $playwrightCache) {
    Remove-Item -Path $playwrightCache -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ Playwright cache removed" -ForegroundColor Green
}

# Clear Python __pycache__
Write-Host "`n6. Clearing Python cache (__pycache__)..." -ForegroundColor Yellow
Get-ChildItem -Path . -Filter "__pycache__" -Recurse -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    Remove-Item -Path $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ Removed $($_.FullName)" -ForegroundColor Green
}
Get-ChildItem -Path . -Filter "*.pyc" -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
    Remove-Item -Path $_.FullName -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ Removed $($_.Name)" -ForegroundColor Green
}

# Clear TypeScript build info
Write-Host "`n7. Clearing TypeScript cache..." -ForegroundColor Yellow
$tsCachePaths = @(
    "*.tsbuildinfo",
    ".tsbuildinfo",
    "tsconfig.tsbuildinfo"
)
foreach ($pattern in $tsCachePaths) {
    Get-ChildItem -Path . -Filter $pattern -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        Remove-Item -Path $_.FullName -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ Removed $($_.Name)" -ForegroundColor Green
    }
}

# Clear ESLint cache
Write-Host "`n8. Clearing ESLint cache..." -ForegroundColor Yellow
$eslintCache = ".eslintcache"
if (Test-Path $eslintCache) {
    Remove-Item -Path $eslintCache -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ ESLint cache removed" -ForegroundColor Green
}

# Clear temp build files
Write-Host "`n9. Clearing temporary build files..." -ForegroundColor Yellow
$tempPaths = @(
    "dist",
    "out",
    "build",
    ".turbo",
    ".swc"
)
foreach ($path in $tempPaths) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ $path removed" -ForegroundColor Green
    }
}

# Clear Windows temp files related to Node
Write-Host "`n10. Clearing Windows temp files..." -ForegroundColor Yellow
$windowsTempPaths = @(
    "$env:TEMP\npm-*",
    "$env:TEMP\next-*",
    "$env:TEMP\node-*"
)
foreach ($pattern in $windowsTempPaths) {
    Get-ChildItem -Path $env:TEMP -Filter (Split-Path $pattern -Leaf) -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
        Remove-Item -Path $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Clear Vercel cache
Write-Host "`n11. Clearing Vercel cache..." -ForegroundColor Yellow
$vercelCache = ".vercel"
if (Test-Path $vercelCache) {
    Remove-Item -Path $vercelCache -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ Vercel cache removed" -ForegroundColor Green
}

# Clear test results cache
Write-Host "`n12. Clearing test results..." -ForegroundColor Yellow
if (Test-Path "test-results") {
    Remove-Item -Path "test-results" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ test-results removed" -ForegroundColor Green
}
if (Test-Path "playwright-report") {
    Remove-Item -Path "playwright-report" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ playwright-report removed" -ForegroundColor Green
}

Write-Host "`n✅ ALL CACHES CLEARED!" -ForegroundColor Green
Write-Host "`n⚠️  IMPORTANT: Clear browser cache too!" -ForegroundColor Yellow
Write-Host "   - Open DevTools (F12)" -ForegroundColor Cyan
Write-Host "   - Application tab → Clear Storage → Clear site data" -ForegroundColor Cyan
Write-Host "   - Or use incognito mode" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "   1. Restart dev server: npm run dev" -ForegroundColor White
Write-Host "   2. Hard refresh browser: Ctrl+Shift+R" -ForegroundColor White

