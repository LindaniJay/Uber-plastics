# PowerShell script to fix file rollback issues in Next.js dev server

Write-Host "🔧 Fixing Next.js Dev Server Rollback Issues..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop any running Node.js processes
Write-Host "1. Stopping Node.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   ✅ Node.js processes stopped" -ForegroundColor Green
Write-Host ""

# Step 2: Clear Next.js cache
Write-Host "2. Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    try {
        Remove-Item -Path ".next" -Recurse -Force -ErrorAction Stop
        Write-Host "   ✅ .next cache cleared" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  Could not clear .next cache: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "   💡 Try closing your IDE/editor and try again" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ℹ️  .next cache not found (already cleared)" -ForegroundColor Cyan
}
Write-Host ""

# Step 3: Clear TypeScript build cache
Write-Host "3. Clearing TypeScript build cache..." -ForegroundColor Yellow
if (Test-Path "tsconfig.tsbuildinfo") {
    try {
        Remove-Item -Path "tsconfig.tsbuildinfo" -Force -ErrorAction Stop
        Write-Host "   ✅ TypeScript cache cleared" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  Could not clear TypeScript cache: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "   ℹ️  TypeScript cache not found" -ForegroundColor Cyan
}
Write-Host ""

# Step 4: Verify files are saved
Write-Host "4. File Status Check..." -ForegroundColor Yellow
$modifiedFiles = git status --short 2>$null
if ($modifiedFiles) {
    Write-Host "   ✅ Found modified files (your changes are saved)" -ForegroundColor Green
    Write-Host "   📝 Modified files:" -ForegroundColor Cyan
    $modifiedFiles | ForEach-Object { Write-Host "      $_" -ForegroundColor Gray }
} else {
    Write-Host "   ℹ️  No modified files found" -ForegroundColor Cyan
}
Write-Host ""

# Step 5: Check for TypeScript errors
Write-Host "5. Checking for TypeScript errors..." -ForegroundColor Yellow
$tsErrors = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ No TypeScript errors found" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  TypeScript errors found (this might cause rollback)" -ForegroundColor Red
    Write-Host "   💡 Fix these errors before starting the dev server:" -ForegroundColor Yellow
    Write-Host "$tsErrors" -ForegroundColor Gray
}
Write-Host ""

# Step 6: Create .env.local with optimizations
Write-Host "6. Creating/updating .env.local..." -ForegroundColor Yellow
$envContent = @"
# Development optimizations
NEXT_TELEMETRY_DISABLED=1
FAST_REFRESH=true

# Disable tracing to prevent permission errors
NEXT_TRACE=false
NEXT_TRACING=false
"@

try {
    if (Test-Path ".env.local") {
        $existing = Get-Content ".env.local" -Raw
        if (-not $existing.Contains("FAST_REFRESH")) {
            Add-Content -Path ".env.local" -Value "`nFAST_REFRESH=true"
        }
        Write-Host "   ✅ .env.local updated" -ForegroundColor Green
    } else {
        Set-Content -Path ".env.local" -Value $envContent
        Write-Host "   ✅ .env.local created" -ForegroundColor Green
    }
} catch {
    Write-Host "   ⚠️  Could not create/update .env.local: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Summary
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Rollback Fix Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Save all files in your editor (Ctrl+K S in VS Code)" -ForegroundColor White
Write-Host "   2. Close and reopen your editor if files still revert" -ForegroundColor White
Write-Host "   3. Start dev server: npm run dev" -ForegroundColor White
Write-Host "   4. Hard refresh browser: Ctrl+Shift+R" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips to prevent rollback:" -ForegroundColor Yellow
Write-Host "   - Always check browser console for compilation errors" -ForegroundColor White
Write-Host "   - Keep dev server terminal visible to see errors" -ForegroundColor White
Write-Host "   - Use git status to verify your files are modified" -ForegroundColor White
Write-Host "   - If files keep reverting, disable Fast Refresh in .env.local" -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan




