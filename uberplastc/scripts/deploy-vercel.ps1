# EcoTrack Vercel Deployment Script for Windows PowerShell
# This script deploys both frontend and backend to Vercel

param(
    [switch]$SkipLogin,
    [switch]$SkipEnvSetup
)

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"

function Write-Status {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor $Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor $Red
}

Write-Host "🚀 Starting EcoTrack deployment to Vercel..." -ForegroundColor Cyan

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Status "Vercel CLI found: $vercelVersion"
} catch {
    Write-Error "Vercel CLI is not installed. Installing now..."
    npm install -g vercel
}

# Check if user is logged in to Vercel
if (-not $SkipLogin) {
    try {
        $whoami = vercel whoami 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Please log in to Vercel first:"
            vercel login
        } else {
            Write-Status "Logged in as: $whoami"
        }
    } catch {
        Write-Warning "Please log in to Vercel first:"
        vercel login
    }
}

Write-Host ""
Write-Host "📦 Deploying Frontend (Next.js)..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Deploy frontend
Set-Location "ecotrack"
try {
    vercel --prod --yes
    Write-Status "Frontend deployed successfully!"
} catch {
    Write-Error "Frontend deployment failed!"
    exit 1
}

Write-Host ""
Write-Host "🐍 Deploying Backend (Python/FastAPI)..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Deploy backend
Set-Location "../python-backend"
try {
    vercel --prod --yes
    Write-Status "Backend deployed successfully!"
} catch {
    Write-Error "Backend deployment failed!"
    exit 1
}

Write-Host ""
Write-Host "🔗 Getting deployment URLs..." -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

# Get deployment URLs
try {
    $frontendUrl = (vercel ls --json | ConvertFrom-Json | Select-Object -First 1).url
    $backendUrl = (vercel ls --json | ConvertFrom-Json | Select-Object -First 1).url
    
    Write-Status "Deployment URLs retrieved!"
} catch {
    Write-Warning "Could not retrieve deployment URLs automatically"
    $frontendUrl = "your-frontend-url"
    $backendUrl = "your-backend-url"
}

if (-not $SkipEnvSetup) {
    Write-Host ""
    Write-Warning "Please update the following environment variables in Vercel dashboard:"
    Write-Host ""
    Write-Host "Frontend Environment Variables:" -ForegroundColor Yellow
    Write-Host "- NEXT_PUBLIC_APP_URL: https://$frontendUrl"
    Write-Host "- NEXT_PUBLIC_PYTHON_API_URL: https://$backendUrl"
    Write-Host "- NEXT_PUBLIC_REGION: cabo-verde"
    Write-Host ""
    Write-Host "Backend Environment Variables:" -ForegroundColor Yellow
    Write-Host "- PYTHON_API_URL: https://$backendUrl"
    Write-Host "- CONFIDENCE_THRESHOLD: 0.5"
    Write-Host "- ALLOWED_ORIGINS: https://$frontendUrl"
}

Write-Host ""
Write-Status "Deployment completed!"
Write-Host ""
Write-Host "🌐 Your applications are now live at:" -ForegroundColor Cyan
Write-Host "Frontend: https://$frontendUrl"
Write-Host "Backend: https://$backendUrl"
Write-Host "API Docs: https://$backendUrl/docs"
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "1. Update environment variables in Vercel dashboard"
Write-Host "2. Test the applications"
Write-Host "3. Set up custom domains if needed"
Write-Host "4. Configure analytics and monitoring"
