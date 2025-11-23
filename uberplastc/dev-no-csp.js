const { spawn } = require('child_process');

// Set environment variable to disable CSP
process.env.NODE_ENV = 'development';
process.env.DISABLE_CSP = 'true';

// Start Next.js with CSP disabled
const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    DISABLE_CSP: 'true'
  }
});

nextDev.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
});

nextDev.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
});

