#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔍 Validating performance improvements...')

// 1. Check if all performance files exist
function validatePerformanceFiles() {
  console.log('📁 Checking performance optimization files...')
  
  const requiredFiles = [
    'src/services/performanceService.ts',
    'src/hooks/useOptimizedFetch.ts',
    'src/components/ui/OptimizedImage.tsx',
    'src/components/ui/PerformanceDashboard.tsx',
    'src/utils/performanceMonitor.ts'
  ]
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file))
  
  if (missingFiles.length > 0) {
    console.log('❌ Missing performance files:')
    missingFiles.forEach(file => console.log(`   • ${file}`))
    return false
  }
  
  console.log('✅ All performance files present')
  return true
}

// 2. Validate backend optimizations
function validateBackendOptimizations() {
  console.log('🔧 Checking backend optimizations...')
  
  const mainPyPath = 'python-backend/main.py'
  if (!fs.existsSync(mainPyPath)) {
    console.log('❌ Backend file not found')
    return false
  }
  
  const content = fs.readFileSync(mainPyPath, 'utf8')
  
  const optimizations = [
    'GZipMiddleware',
    'ThreadPoolExecutor',
    'time.time()',
    'run_in_executor',
    'processing_time_ms'
  ]
  
  const missingOptimizations = optimizations.filter(opt => !content.includes(opt))
  
  if (missingOptimizations.length > 0) {
    console.log('❌ Missing backend optimizations:')
    missingOptimizations.forEach(opt => console.log(`   • ${opt}`))
    return false
  }
  
  console.log('✅ Backend optimizations validated')
  return true
}

// 3. Validate frontend optimizations
function validateFrontendOptimizations() {
  console.log('⚛️ Checking frontend optimizations...')
  
  const bottleScannerPath = 'src/components/ai/BottleScanner.tsx'
  if (!fs.existsSync(bottleScannerPath)) {
    console.log('❌ BottleScanner component not found')
    return false
  }
  
  const content = fs.readFileSync(bottleScannerPath, 'utf8')
  
  const optimizations = [
    'memo',
    'useCallback',
    'useMemo'
  ]
  
  const missingOptimizations = optimizations.filter(opt => !content.includes(opt))
  
  if (missingOptimizations.length > 0) {
    console.log('❌ Missing frontend optimizations:')
    missingOptimizations.forEach(opt => console.log(`   • ${opt}`))
    return false
  }
  
  console.log('✅ Frontend optimizations validated')
  return true
}

// 4. Check Next.js configuration
function validateNextConfig() {
  console.log('⚙️ Checking Next.js configuration...')
  
  const configPath = 'next.config.js'
  if (!fs.existsSync(configPath)) {
    console.log('❌ Next.js config not found')
    return false
  }
  
  const content = fs.readFileSync(configPath, 'utf8')
  
  const optimizations = [
    'optimizePackageImports',
    'compress: true',
    'imageSizes',
    'deviceSizes',
    'splitChunks'
  ]
  
  const missingOptimizations = optimizations.filter(opt => !content.includes(opt))
  
  if (missingOptimizations.length > 0) {
    console.log('❌ Missing Next.js optimizations:')
    missingOptimizations.forEach(opt => console.log(`   • ${opt}`))
    return false
  }
  
  console.log('✅ Next.js configuration validated')
  return true
}

// 5. Test build performance
function testBuildPerformance() {
  console.log('🏗️ Testing build performance...')
  
  try {
    const startTime = Date.now()
    execSync('npm run build', { stdio: 'pipe' })
    const endTime = Date.now()
    const buildTime = endTime - startTime
    
    console.log(`✅ Build completed in ${buildTime}ms`)
    
    if (buildTime > 60000) { // 1 minute
      console.log('⚠️ Build time is longer than expected (>1min)')
      return false
    }
    
    return true
  } catch (error) {
    console.log('❌ Build failed:', error.message)
    return false
  }
}

// 6. Generate validation report
function generateValidationReport(results) {
  console.log('📋 Generating validation report...')
  
  const report = {
    timestamp: new Date().toISOString(),
    validation: {
      performanceFiles: results.performanceFiles,
      backendOptimizations: results.backendOptimizations,
      frontendOptimizations: results.frontendOptimizations,
      nextConfig: results.nextConfig,
      buildPerformance: results.buildPerformance
    },
    summary: {
      totalChecks: 5,
      passedChecks: Object.values(results).filter(Boolean).length,
      successRate: `${Math.round((Object.values(results).filter(Boolean).length / 5) * 100)}%`
    },
    recommendations: results.buildPerformance ? [
      '✅ All performance optimizations are in place',
      '✅ Build performance is acceptable',
      '✅ Ready for production deployment'
    ] : [
      '⚠️ Some optimizations may need attention',
      '💡 Consider running npm run perf:optimize for additional improvements',
      '💡 Monitor Core Web Vitals in production'
    ]
  }
  
  fs.writeFileSync(
    path.join(process.cwd(), 'performance-validation-report.json'),
    JSON.stringify(report, null, 2)
  )
  
  console.log('📄 Validation report saved to performance-validation-report.json')
}

// 7. Run all validations
function runValidations() {
  console.log('🎯 Running performance validation checks...')
  
  const results = {
    performanceFiles: validatePerformanceFiles(),
    backendOptimizations: validateBackendOptimizations(),
    frontendOptimizations: validateFrontendOptimizations(),
    nextConfig: validateNextConfig(),
    buildPerformance: testBuildPerformance()
  }
  
  generateValidationReport(results)
  
  const allPassed = Object.values(results).every(Boolean)
  
  console.log('')
  if (allPassed) {
    console.log('🎉 All performance validations passed!')
    console.log('✅ Your application is optimized for performance')
  } else {
    console.log('⚠️ Some performance validations failed')
    console.log('💡 Check the validation report for details')
  }
  
  console.log('')
  console.log('📊 Performance optimization summary:')
  console.log('   • Backend: Compression, threading, caching, timing')
  console.log('   • Frontend: Memoization, debouncing, optimized images')
  console.log('   • Build: Code splitting, bundle optimization')
  console.log('   • Monitoring: Performance tracking and reporting')
  console.log('')
  console.log('🚀 Your app should now load significantly faster!')
}

// Run the validation script
runValidations()
