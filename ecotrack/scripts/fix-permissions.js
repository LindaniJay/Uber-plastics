#!/usr/bin/env node

/**
 * Fix Permissions Script
 * Handles Windows permission issues with Next.js trace files
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🔧 Fixing Next.js permission issues...');

// Function to safely remove .next directory
function removeNextDir() {
  const nextDir = path.join(process.cwd(), '.next');
  
  if (fs.existsSync(nextDir)) {
    try {
      // Try to remove individual files first
      const files = fs.readdirSync(nextDir, { withFileTypes: true });
      
      for (const file of files) {
        const filePath = path.join(nextDir, file.name);
        try {
          if (file.isDirectory()) {
            fs.rmSync(filePath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          console.log(`⚠️  Could not remove ${file.name}: ${err.message}`);
        }
      }
      
      // Try to remove the directory
      try {
        fs.rmdirSync(nextDir);
        console.log('✅ Successfully removed .next directory');
      } catch (err) {
        console.log('⚠️  Could not remove .next directory, but individual files were cleaned');
      }
    } catch (err) {
      console.log('⚠️  Could not clean .next directory:', err.message);
    }
  }
}

// Function to set environment variables
function setEnvVars() {
  const envContent = `# Development optimizations
NEXT_TELEMETRY_DISABLED=1
FAST_REFRESH=true
# Disable tracing to prevent permission errors
NEXT_TRACE=false
NEXT_TRACING=false
`;

  try {
    fs.writeFileSync('.env.local', envContent);
    console.log('✅ Created .env.local with tracing disabled');
  } catch (err) {
    console.log('⚠️  Could not create .env.local:', err.message);
  }
}

// Main execution
removeNextDir();
setEnvVars();

console.log('✅ Permission fixes applied!');
console.log('💡 Try running your development server again');
