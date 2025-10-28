'use client'

import { Suspense, lazy, ComponentType } from 'react'
import { motion } from 'framer-motion'

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const defaultFallback = (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center space-y-4"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      <p className="text-muted">Loading...</p>
    </motion.div>
  </div>
)

export function LazyWrapper({ children, fallback = defaultFallback }: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// Higher-order component for lazy loading
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function LazyComponent(props: P) {
    return (
      <LazyWrapper fallback={fallback}>
        <Component {...props} />
      </LazyWrapper>
    )
  }
}

// Utility function to create lazy components
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc)
  return withLazyLoading(LazyComponent, fallback)
}
