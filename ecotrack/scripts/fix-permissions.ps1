# PowerShell script to fix Next.js permission issues on Windows

Write-Host "Fixing Next.js permission issues..." -ForegroundColor Green

# Stop any running Node.js processes that might be locking files
Write-Host "Stopping Node.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for processes to stop
Start-Sleep -Seconds 2

# Remove .next directory with force
Write-Host "Removing .next directory..." -ForegroundColor Yellow
if (Test-Path ".next") {
    try {
        Remove-Item -Path ".next" -Recurse -Force -ErrorAction Stop
        Write-Host "Successfully removed .next directory" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove .next directory: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Try running as Administrator or manually delete the .next folder" -ForegroundColor Yellow
    }
} else {
    Write-Host ".next directory not found" -ForegroundColor Green
}

# Create .env.local with tracing disabled
Write-Host "Creating environment configuration..." -ForegroundColor Yellow
$envContent = @"
# Development optimizations
NEXT_TELEMETRY_DISABLED=1
FAST_REFRESH=true
# Disable tracing to prevent permission errors
NEXT_TRACE=false
NEXT_TRACING=false
"@

try {
    Set-Content -Path ".env.local" -Value $envContent -ErrorAction Stop
    Write-Host "Created .env.local with tracing disabled" -ForegroundColor Green
} catch {
    Write-Host "Could not create .env.local: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Permission fixes applied!" -ForegroundColor Green
Write-Host "Try running your development server again" -ForegroundColor Cyan
