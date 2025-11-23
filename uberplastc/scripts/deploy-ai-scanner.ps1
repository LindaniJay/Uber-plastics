# EcoTrack AI Scanner Deployment Script for Windows
Write-Host "🤖 Deploying EcoTrack AI Scanner - From Waste to Worth" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing AI detection dependencies..." -ForegroundColor Yellow
npm install

# Run type checking
Write-Host "🔍 Running type checks..." -ForegroundColor Yellow
npm run type-check

# Run linting
Write-Host "🧹 Running linter..." -ForegroundColor Yellow
npm run lint

# Build the project
Write-Host "🏗️ Building the project with AI scanner..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ AI Scanner build successful!" -ForegroundColor Green
    Write-Host "🚀 Ready for deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🤖 AI Scanner Features:" -ForegroundColor Cyan
    Write-Host "  ✅ Real-time bottle detection" -ForegroundColor White
    Write-Host "  ✅ Automatic point calculation" -ForegroundColor White
    Write-Host "  ✅ Live camera overlay" -ForegroundColor White
    Write-Host "  ✅ Animated reward system" -ForegroundColor White
    Write-Host "  ✅ Dashboard integration" -ForegroundColor White
    Write-Host "  ✅ Leaderboard competition" -ForegroundColor White
    Write-Host ""
    Write-Host "Deployment options:" -ForegroundColor Cyan
    Write-Host "1. Vercel: vercel --prod" -ForegroundColor White
    Write-Host "2. Netlify: netlify deploy --prod" -ForegroundColor White
    Write-Host "3. Docker: docker build -t ecotrack-ai ." -ForegroundColor White
    Write-Host ""
    Write-Host "🌱 EcoTrack AI Scanner is ready to make a difference!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

