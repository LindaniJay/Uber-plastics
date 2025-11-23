'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { shouldShowPerformanceDashboard } from '@/utils/productionConfig'
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  apiResponseTime: number | null
  bundleSize: number | null
  cacheHitRate: number | null
}

interface PerformanceDashboardProps {
  isVisible: boolean
  onClose: () => void
}

export function PerformanceDashboard({ isVisible, onClose }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    apiResponseTime: null,
    bundleSize: null,
    cacheHitRate: null
  })

  const [isCollecting, setIsCollecting] = useState(false)

  const collectMetrics = useCallback(() => {
    setIsCollecting(true)

    // First Contentful Paint
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
    if (fcpEntry) {
      setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
    }

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ 
          ...prev, 
          fid: entry.processingStart - entry.startTime 
        }))
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      setMetrics(prev => ({ ...prev, cls: clsValue }))
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      setMetrics(prev => ({ 
        ...prev, 
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart 
      }))
    }

    // Simulate API response time measurement
    const measureAPITime = async () => {
      const start = performance.now()
      try {
        await fetch('/api/health', { method: 'HEAD' })
      } catch {
        // Ignore errors for measurement
      }
      const end = performance.now()
      setMetrics(prev => ({ 
        ...prev, 
        apiResponseTime: end - start 
      }))
    }

    measureAPITime()

    // Simulate cache hit rate (in real app, this would come from your cache service)
    setMetrics(prev => ({ 
      ...prev, 
      cacheHitRate: Math.random() * 100 
    }))

    // Cleanup observers
    setTimeout(() => {
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      setIsCollecting(false)
    }, 5000)
  }, [])

  const getScoreColor = (value: number, thresholds: { good: number; needsImprovement: number }) => {
    if (value <= thresholds.good) return 'text-green-500'
    if (value <= thresholds.needsImprovement) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreIcon = (value: number, thresholds: { good: number; needsImprovement: number }) => {
    if (value <= thresholds.good) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (value <= thresholds.needsImprovement) return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    return <X className="w-4 h-4 text-red-500" />
  }

  // Only show in development
  if (!shouldShowPerformanceDashboard) return null
  
  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 w-96 glass-modal rounded-lg z-50"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Performance Dashboard</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Core Web Vitals */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 glass-card rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">FCP</span>
                  {getScoreIcon(metrics.fcp || 0, { good: 1800, needsImprovement: 3000 })}
                </div>
                <div className={`text-lg font-bold ${getScoreColor(metrics.fcp || 0, { good: 1800, needsImprovement: 3000 })}`}>
                  {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'Loading...'}
                </div>
                <div className="text-xs text-gray-500">First Contentful Paint</div>
              </div>

            <div className="p-3 glass-card rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">LCP</span>
                  {getScoreIcon(metrics.lcp || 0, { good: 2500, needsImprovement: 4000 })}
                </div>
                <div className={`text-lg font-bold ${getScoreColor(metrics.lcp || 0, { good: 2500, needsImprovement: 4000 })}`}>
                  {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'Loading...'}
                </div>
                <div className="text-xs text-gray-500">Largest Contentful Paint</div>
              </div>

            <div className="p-3 glass-card rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">FID</span>
                  {getScoreIcon(metrics.fid || 0, { good: 100, needsImprovement: 300 })}
                </div>
                <div className={`text-lg font-bold ${getScoreColor(metrics.fid || 0, { good: 100, needsImprovement: 300 })}`}>
                  {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : 'Loading...'}
                </div>
                <div className="text-xs text-gray-500">First Input Delay</div>
              </div>

            <div className="p-3 glass-card rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">CLS</span>
                  {getScoreIcon((metrics.cls || 0) * 1000, { good: 100, needsImprovement: 250 })}
                </div>
                <div className={`text-lg font-bold ${getScoreColor((metrics.cls || 0) * 1000, { good: 100, needsImprovement: 250 })}`}>
                  {metrics.cls ? metrics.cls.toFixed(3) : 'Loading...'}
                </div>
                <div className="text-xs text-gray-500">Cumulative Layout Shift</div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-3">
            <div className="p-3 glass-card rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">TTFB</span>
                </div>
                <div className="text-lg font-bold">
                  {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'Loading...'}
                </div>
                <div className="text-xs text-gray-500">Time to First Byte</div>
              </div>

            <div className="p-3 glass-card rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">API</span>
                </div>
                <div className="text-lg font-bold">
                  {metrics.apiResponseTime ? `${metrics.apiResponseTime.toFixed(0)}ms` : 'Loading...'}
                </div>
                <div className="text-xs text-gray-500">Response Time</div>
              </div>
            </div>

            {/* Cache Performance */}
            <div className="p-3 glass-card rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Cache Hit Rate</span>
              </div>
              <div className="text-lg font-bold">
                {metrics.cacheHitRate ? `${metrics.cacheHitRate.toFixed(1)}%` : 'Loading...'}
              </div>
              <div className="text-xs text-gray-500">Request Cache Efficiency</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={collectMetrics}
              disabled={isCollecting}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCollecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Collecting...
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  Collect Metrics
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
