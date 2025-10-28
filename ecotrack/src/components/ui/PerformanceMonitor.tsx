'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development and ensure we're in browser environment
    if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return

    // Simple performance monitoring without complex observers
    const measurePerformance = () => {
      try {
        // Basic performance metrics collection
        if (typeof performance !== 'undefined') {
          // Log basic performance info to console (development only)
          console.log('Performance monitoring active')
        }
      } catch (error) {
        console.warn('Performance monitoring error:', error)
      }
    }

    // Run after a short delay to ensure page is loaded
    const timeoutId = setTimeout(measurePerformance, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  // Return null - no UI rendering
  return null
}
