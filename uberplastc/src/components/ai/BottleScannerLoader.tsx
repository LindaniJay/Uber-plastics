'use client'

import { useEffect, useState, type ComponentType } from 'react'

interface BottleScannerLoaderProps {
  onClose?: () => void
  onScanComplete?: (results: any) => void
}

/**
 * Lazy loader for BottleScanner component
 * This prevents webpack from trying to resolve the module at build/SSR time
 */
export function BottleScannerLoader({ onClose, onScanComplete }: BottleScannerLoaderProps) {
  const [mounted, setMounted] = useState(false)
  const [ScannerComponent, setScannerComponent] = useState<ComponentType<any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only load after client-side hydration to avoid SSR/webpack issues
    setMounted(true)

    // Manually import the scanner component after mount
    const loadScanner = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Use dynamic import to load the module at runtime
        const mod = await import('./BottleScanner')
        
        // Try named export first, then default export
        const Component = mod.BottleScanner || mod.default
        
        // Verify it's a valid React component
        if (Component && typeof Component === 'function') {
          // Store the component in state to trigger re-render
          setScannerComponent(() => Component)
          setIsLoading(false)
        } else {
          throw new Error('Invalid component export')
        }
      } catch (err) {
        console.error('Failed to load BottleScanner:', err)
        setError(err instanceof Error ? err.message : 'Failed to load scanner')
        setIsLoading(false)
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadScanner()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Don't render anything until mounted
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Initializing...</p>
        </div>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading scanner...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error || !ScannerComponent) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Failed to load scanner: {error || 'Unknown error'}
          </p>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    )
  }

  // Render the scanner component
  try {
    const Component = ScannerComponent
    return <Component onClose={onClose} onScanComplete={onScanComplete} />
  } catch (renderError) {
    console.error('Error rendering scanner:', renderError)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Error rendering scanner
          </p>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    )
  }
}

