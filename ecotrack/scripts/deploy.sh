#!/bin/bash

# EcoTrack Deployment Script
echo "🌱 Deploying EcoTrack - From Waste to Worth"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checks..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Ready for deployment!"
    echo ""
    echo "Deployment options:"
    echo "1. Vercel: vercel --prod"
    echo "2. Netlify: netlify deploy --prod"
    echo "3. Docker: docker build -t ecotrack ."
    echo ""
    echo "🌱 EcoTrack is ready to make a difference!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi


