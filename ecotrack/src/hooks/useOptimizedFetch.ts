import { useState, useEffect, useCallback, useRef } from 'react'
import { performanceService } from '@/services/performanceService'

interface UseOptimizedFetchOptions<T> {
  url: string
  options?: RequestInit
  enabled?: boolean
  cacheTime?: number
  staleTime?: number
  retryCount?: number
  retryDelay?: number
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface UseOptimizedFetchReturn<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isStale: boolean
  refetch: () => Promise<void>
  mutate: (data: T) => void
}

export function useOptimizedFetch<T>({
  url,
  options = {},
  enabled = true,
  cacheTime = 300000, // 5 minutes
  staleTime = 60000,   // 1 minute
  retryCount = 3,
  retryDelay = 1000,
  onSuccess,
  onError,
}: UseOptimizedFetchOptions<T>): UseOptimizedFetchReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isStale, setIsStale] = useState(false)
  const [lastFetch, setLastFetch] = useState<number>(0)
  
  const retryCountRef = useRef(0)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async (isRetry = false) => {
    if (!enabled || !url) return

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    setError(null)

    try {
      const result = await performanceService.fetchWithCache<T>(
        url,
        {
          ...options,
          signal: abortControllerRef.current.signal,
        },
        cacheTime
      )

      setData(result)
      setLastFetch(Date.now())
      setIsStale(false)
      retryCountRef.current = 0
      onSuccess?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      
      // Retry logic
      if (retryCountRef.current < retryCount && !isRetry) {
        retryCountRef.current++
        setTimeout(() => fetchData(true), retryDelay)
        return
      }

      setError(error)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }, [url, options, enabled, cacheTime, retryCount, retryDelay, onSuccess, onError])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  const mutate = useCallback((newData: T) => {
    setData(newData)
    setLastFetch(Date.now())
    setIsStale(false)
  }, [])

  // Check if data is stale
  useEffect(() => {
    if (lastFetch > 0) {
      const timeSinceLastFetch = Date.now() - lastFetch
      setIsStale(timeSinceLastFetch > staleTime)
    }
  }, [lastFetch, staleTime])

  // Initial fetch
  useEffect(() => {
    if (enabled && url) {
      fetchData()
    }
  }, [enabled, url, fetchData])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    data,
    error,
    isLoading,
    isStale,
    refetch,
    mutate,
  }
}

// Debounced version for search inputs
export function useDebouncedFetch<T>(
  options: UseOptimizedFetchOptions<T> & { debounceMs?: number }
) {
  const { debounceMs = 300, ...fetchOptions } = options
  
  const debouncedFetch = useCallback(
    performanceService.debounce(
      `fetch:${fetchOptions.url}`,
      () => fetchOptions,
      debounceMs
    ),
    [fetchOptions.url, debounceMs]
  )

  return useOptimizedFetch(fetchOptions)
}
