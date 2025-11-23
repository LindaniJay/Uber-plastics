#!/usr/bin/env node

/**
 * Development Optimization Script
 * Optimizes Next.js development server for better performance
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizing development environment...');

// Update next.config.js with development optimizations
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// Add development-specific optimizations if not already present
if (!nextConfig.includes('optimizeCss')) {
  nextConfig = nextConfig.replace(
    "experimental: {\n    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],",
    "experimental: {\n    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],\n    // Optimize CSS loading\n    optimizeCss: true,"
  );
}

if (!nextConfig.includes('watchOptions')) {
  nextConfig = nextConfig.replace(
    '  // Optimize webpack for better performance\n  webpack: (config, { dev, isServer }) => {',
    `  // Optimize webpack for better performance
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Optimize Fast Refresh
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },`
  );
}

fs.writeFileSync(nextConfigPath, nextConfig);

// Create .env.local for development optimizations
const envLocalPath = path.join(process.cwd(), '.env.local');
const envContent = `# Development optimizations
NEXT_TELEMETRY_DISABLED=1
FAST_REFRESH=true
`;

if (!fs.existsSync(envLocalPath)) {
  fs.writeFileSync(envLocalPath, envContent);
  console.log('✅ Created .env.local with development optimizations');
}

console.log('✅ Development environment optimized!');
console.log('💡 Restart your development server to apply optimizations');
