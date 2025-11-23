#!/bin/bash
# EcoTrack Deployment Script for Vercel
# This script deploys both frontend and backend to Vercel

set -e

echo "🚀 Starting EcoTrack deployment to Vercel..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Installing now..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "Please log in to Vercel first:"
    vercel login
fi

echo ""
echo "📦 Deploying Frontend (Next.js)..."
echo "=================================="

# Deploy frontend
cd ecotrack
vercel --prod --yes

print_status "Frontend deployed successfully!"

echo ""
echo "🐍 Deploying Backend (Python/FastAPI)..."
echo "========================================"

# Deploy backend
cd ../python-backend
vercel --prod --yes

print_status "Backend deployed successfully!"

echo ""
echo "🔗 Setting up environment variables..."
echo "====================================="

# Get deployment URLs
FRONTEND_URL=$(vercel ls --json | jq -r '.[0].url' | head -1)
BACKEND_URL=$(vercel ls --json | jq -r '.[0].url' | head -1)

print_warning "Please update the following environment variables in Vercel dashboard:"
echo ""
echo "Frontend Environment Variables:"
echo "- NEXT_PUBLIC_APP_URL: https://$FRONTEND_URL"
echo "- NEXT_PUBLIC_PYTHON_API_URL: https://$BACKEND_URL"
echo "- NEXT_PUBLIC_REGION: cabo-verde"
echo ""
echo "Backend Environment Variables:"
echo "- PYTHON_API_URL: https://$BACKEND_URL"
echo "- CONFIDENCE_THRESHOLD: 0.5"
echo "- ALLOWED_ORIGINS: https://$FRONTEND_URL"

echo ""
print_status "Deployment completed!"
echo ""
echo "🌐 Your applications are now live at:"
echo "Frontend: https://$FRONTEND_URL"
echo "Backend: https://$BACKEND_URL"
echo "API Docs: https://$BACKEND_URL/docs"
echo ""
echo "📚 Next steps:"
echo "1. Update environment variables in Vercel dashboard"
echo "2. Test the applications"
echo "3. Set up custom domains if needed"
echo "4. Configure analytics and monitoring"
