const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting simple build process...');

try {
  // Remove .next directory if it exists
  const nextDir = path.join(__dirname, '.next');
  if (fs.existsSync(nextDir)) {
    console.log('Removing .next directory...');
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  // Run build
  console.log('Running Next.js build...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

