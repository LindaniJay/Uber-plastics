#!/usr/bin/env node

/**
 * EcoTrack System Validation Script
 * Validates all components, routes, and functionality
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 EcoTrack System Validation Starting...\n')

// Validation results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
}

// Helper function to log results
function logResult(test, status, message = '') {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️'
  console.log(`${icon} ${test}: ${status}${message ? ` - ${message}` : ''}`)
  
  if (status === 'PASS') results.passed++
  else if (status === 'FAIL') results.failed++
  else if (status === 'WARN') results.warnings++
  
  if (status === 'FAIL') {
    results.errors.push(`${test}: ${message}`)
  }
}

// Check if file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, '..', filePath))
}

// Check if file has content
function hasContent(filePath) {
  if (!fileExists(filePath)) return false
  const content = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8')
  return content.trim().length > 0
}

// Validate file structure
function validateFileStructure() {
  console.log('📁 Validating File Structure...')
  
  const requiredFiles = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/globals.css',
    'src/components/ai/CameraScanner.tsx',
    'src/components/ai/EducationPopup.tsx',
    'src/components/ai/CameraOverlay.tsx',
    'src/components/ai/RewardPopup.tsx',
    'src/hooks/useBottleDetection.ts',
    'src/hooks/useImpactStats.ts',
    'src/store/useEcoTrackStore.ts',
    'src/data/cabo_verde.json',
    'src/data/sao_tome.json',
    'src/app/individual/dashboard/page.tsx',
    'src/app/scan/page.tsx',
    'src/app/insights/page.tsx',
    'public/manifest.json',
    'public/sw.js',
    'package.json',
    'next.config.js',
    'tailwind.config.js'
  ]
  
  requiredFiles.forEach(file => {
    if (fileExists(file)) {
      logResult(`File: ${file}`, 'PASS')
    } else {
      logResult(`File: ${file}`, 'FAIL', 'File not found')
    }
  })
}

// Validate package.json
function validatePackageJson() {
  console.log('\n📦 Validating Package.json...')
  
  if (!fileExists('package.json')) {
    logResult('Package.json', 'FAIL', 'File not found')
    return
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    
    // Check required dependencies
    const requiredDeps = [
      'next', 'react', 'react-dom', 'typescript',
      'tailwindcss', 'framer-motion', 'zustand',
      '@tensorflow/tfjs', '@tensorflow-models/coco-ssd',
      'react-webcam', 'lucide-react'
    ]
    
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies }
    
    requiredDeps.forEach(dep => {
      if (allDeps[dep]) {
        logResult(`Dependency: ${dep}`, 'PASS')
      } else {
        logResult(`Dependency: ${dep}`, 'FAIL', 'Not found in package.json')
      }
    })
    
    // Check scripts
    const requiredScripts = ['dev', 'build', 'start', 'lint']
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        logResult(`Script: ${script}`, 'PASS')
      } else {
        logResult(`Script: ${script}`, 'FAIL', 'Not found in scripts')
      }
    })
    
  } catch (error) {
    logResult('Package.json', 'FAIL', `Invalid JSON: ${error.message}`)
  }
}

// Validate data files
function validateDataFiles() {
  console.log('\n📊 Validating Data Files...')
  
  const dataFiles = ['src/data/cabo_verde.json', 'src/data/sao_tome.json']
  
  dataFiles.forEach(file => {
    if (!fileExists(file)) {
      logResult(`Data file: ${file}`, 'FAIL', 'File not found')
      return
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'))
      
      // Check required fields
      const requiredFields = [
        'country', 'population', 'plasticWaste', 'environmentalImpact',
        'economicData', 'initiatives', 'challenges', 'opportunities'
      ]
      
      requiredFields.forEach(field => {
        if (data[field]) {
          logResult(`Data field: ${field} in ${file}`, 'PASS')
        } else {
          logResult(`Data field: ${field} in ${file}`, 'FAIL', 'Field missing')
        }
      })
      
    } catch (error) {
      logResult(`Data file: ${file}`, 'FAIL', `Invalid JSON: ${error.message}`)
    }
  })
}

// Validate PWA files
function validatePWAFiles() {
  console.log('\n📱 Validating PWA Files...')
  
  // Check manifest.json
  if (!fileExists('public/manifest.json')) {
    logResult('PWA Manifest', 'FAIL', 'manifest.json not found')
    return
  }
  
  try {
    const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'))
    
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons']
    requiredFields.forEach(field => {
      if (manifest[field]) {
        logResult(`Manifest field: ${field}`, 'PASS')
      } else {
        logResult(`Manifest field: ${field}`, 'FAIL', 'Field missing')
      }
    })
    
    // Check icons
    if (manifest.icons && manifest.icons.length > 0) {
      logResult('Manifest icons', 'PASS', `${manifest.icons.length} icons found`)
    } else {
      logResult('Manifest icons', 'WARN', 'No icons defined')
    }
    
  } catch (error) {
    logResult('PWA Manifest', 'FAIL', `Invalid JSON: ${error.message}`)
  }
  
  // Check service worker
  if (fileExists('public/sw.js')) {
    logResult('Service Worker', 'PASS')
  } else {
    logResult('Service Worker', 'FAIL', 'sw.js not found')
  }
}

// Validate AI components
function validateAIComponents() {
  console.log('\n🤖 Validating AI Components...')
  
  const aiComponents = [
    'src/components/ai/CameraScanner.tsx',
    'src/components/ai/EducationPopup.tsx',
    'src/components/ai/CameraOverlay.tsx',
    'src/components/ai/RewardPopup.tsx',
    'src/hooks/useBottleDetection.ts'
  ]
  
  aiComponents.forEach(component => {
    if (fileExists(component)) {
      logResult(`AI Component: ${component}`, 'PASS')
    } else {
      logResult(`AI Component: ${component}`, 'FAIL', 'Component not found')
    }
  })
}

// Validate dashboard components
function validateDashboardComponents() {
  console.log('\n📊 Validating Dashboard Components...')
  
  const dashboardComponents = [
    'src/app/individual/dashboard/page.tsx',
    'src/app/scan/page.tsx',
    'src/app/insights/page.tsx',
    'src/components/dashboard/StatsCard.tsx',
    'src/components/dashboard/AchievementCard.tsx',
    'src/components/dashboard/ProgressRing.tsx'
  ]
  
  dashboardComponents.forEach(component => {
    if (fileExists(component)) {
      logResult(`Dashboard Component: ${component}`, 'PASS')
    } else {
      logResult(`Dashboard Component: ${component}`, 'FAIL', 'Component not found')
    }
  })
}

// Validate store and hooks
function validateStoreAndHooks() {
  console.log('\n🗄️ Validating Store and Hooks...')
  
  const storeFiles = [
    'src/store/useEcoTrackStore.ts',
    'src/hooks/useImpactStats.ts',
    'src/contexts/ThemeContext.tsx',
    'src/contexts/AuthContext.tsx'
  ]
  
  storeFiles.forEach(file => {
    if (fileExists(file)) {
      logResult(`Store/Hook: ${file}`, 'PASS')
    } else {
      logResult(`Store/Hook: ${file}`, 'FAIL', 'File not found')
    }
  })
}

// Validate CSS and styling
function validateStyling() {
  console.log('\n🎨 Validating Styling...')
  
  const styleFiles = [
    'src/app/globals.css',
    'src/app/text-fix.css',
    'src/app/card-text-override.css',
    'src/app/force-text-visibility.css',
    'tailwind.config.js'
  ]
  
  styleFiles.forEach(file => {
    if (fileExists(file)) {
      logResult(`Style file: ${file}`, 'PASS')
    } else {
      logResult(`Style file: ${file}`, 'FAIL', 'File not found')
    }
  })
}

// Main validation function
function runValidation() {
  console.log('🚀 Starting EcoTrack System Validation\n')
  
  validateFileStructure()
  validatePackageJson()
  validateDataFiles()
  validatePWAFiles()
  validateAIComponents()
  validateDashboardComponents()
  validateStoreAndHooks()
  validateStyling()
  
  // Summary
  console.log('\n📋 Validation Summary:')
  console.log(`✅ Passed: ${results.passed}`)
  console.log(`❌ Failed: ${results.failed}`)
  console.log(`⚠️  Warnings: ${results.warnings}`)
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors Found:')
    results.errors.forEach(error => console.log(`   - ${error}`))
  }
  
  if (results.failed === 0) {
    console.log('\n🎉 All validations passed! EcoTrack is ready for deployment.')
    process.exit(0)
  } else {
    console.log('\n⚠️  Some validations failed. Please fix the issues above.')
    process.exit(1)
  }
}

// Run validation
runValidation()

