/**
 * Performance optimization service for API calls and data management
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class PerformanceService {
  private cache = new Map<string, CacheEntry<any>>()
  private debounceTimers = new Map<string, NodeJS.Timeout>()
  private requestQueue = new Map<string, Promise<any>>()

  /**
   * Cache with TTL (Time To Live)
   */
  setCache<T>(key: string, data: T, ttlMs: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    })
  }

  getCache<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > entry.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Debounced function execution
   */
  debounce<T extends (...args: any[]) => any>(
    key: string,
    fn: T,
    delay: number = 300
  ): T {
    return ((...args: Parameters<T>) => {
      // Clear existing timer
      const existingTimer = this.debounceTimers.get(key)
      if (existingTimer) {
        clearTimeout(existingTimer)
      }

      // Set new timer
      const timer = setTimeout(() => {
        fn(...args)
        this.debounceTimers.delete(key)
      }, delay)

      this.debounceTimers.set(key, timer)
    }) as T
  }

  /**
   * Request deduplication - prevents duplicate requests
   */
  async deduplicateRequest<T>(
    key: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    // If request is already in progress, return the existing promise
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key)!
    }

    // Create new request
    const request = requestFn().finally(() => {
      this.requestQueue.delete(key)
    })

    this.requestQueue.set(key, request)
    return request
  }

  /**
   * Optimized fetch with caching and error handling
   */
  async fetchWithCache<T>(
    url: string,
    options: RequestInit = {},
    ttlMs: number = 300000
  ): Promise<T> {
    const cacheKey = `fetch:${url}:${JSON.stringify(options)}`
    
    // Check cache first
    const cached = this.getCache<T>(cacheKey)
    if (cached) {
      return cached
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Cache the result
      this.setCache(cacheKey, data, ttlMs)
      
      return data
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error)
      throw error
    }
  }

  /**
   * Batch multiple requests into a single call
   */
  async batchRequests<T>(
    requests: Array<{ key: string; url: string; options?: RequestInit }>
  ): Promise<Map<string, T>> {
    const results = new Map<string, T>()
    const promises = requests.map(async ({ key, url, options }) => {
      try {
        const data = await this.fetchWithCache<T>(url, options)
        results.set(key, data)
      } catch (error) {
        console.error(`Batch request failed for ${key}:`, error)
        results.set(key, null as T)
      }
    })

    await Promise.allSettled(promises)
    return results
  }

  /**
   * Performance monitoring
   */
  measurePerformance<T>(
    name: string,
    fn: () => T | Promise<T>
  ): T | Promise<T> {
    const start = performance.now()
    
    const result = fn()
    
    if (result instanceof Promise) {
      return result.then((data) => {
        const end = performance.now()
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`)
        }
        return data
      })
    } else {
      const end = performance.now()
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`)
      }
      return result
    }
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    // Clear all debounce timers
    this.debounceTimers.forEach(timer => clearTimeout(timer))
    this.debounceTimers.clear()
    
    // Clear cache
    this.cache.clear()
    
    // Clear request queue
    this.requestQueue.clear()
  }
}

// Singleton instance
export const performanceService = new PerformanceService()

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    performanceService.cleanup()
  })
}
