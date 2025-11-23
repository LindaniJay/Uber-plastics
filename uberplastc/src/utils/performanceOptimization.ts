// Performance optimization utilities

// Debounce function for search and input handling
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll and resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  })
}

// Preload critical resources
export function preloadResource(href: string, as: string = 'script') {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

// Prefetch resources for better performance
export function prefetchResource(href: string) {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}

// Optimize images with lazy loading
export function createLazyImageObserver() {
  const imageObserver = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      }
    })
  })
  
  return imageObserver
}

// Memory management for large datasets
export function createVirtualizedList<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number
) {
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2
  const totalHeight = items.length * itemHeight
  
  return {
    totalHeight,
    visibleCount,
    getVisibleItems: (scrollTop: number) => {
      const startIndex = Math.floor(scrollTop / itemHeight)
      const endIndex = Math.min(startIndex + visibleCount, items.length)
      return items.slice(startIndex, endIndex)
    },
    getOffsetY: (index: number) => index * itemHeight
  }
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}

// Bundle size optimization
export function createChunkLoader<T>(
  importFunc: () => Promise<T>,
  fallback?: T
): () => Promise<T> {
  let chunk: T | null = null
  let loading: Promise<T> | null = null
  
  return async () => {
    if (chunk) return chunk
    if (loading) return loading
    
    loading = importFunc().then(module => {
      chunk = module
      return module
    })
    
    return loading
  }
}

// Optimize re-renders with memoization
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Critical resource hints
export function addResourceHints() {
  // Preload critical fonts
  preloadResource('/fonts/inter.woff2', 'font')
  preloadResource('/fonts/inter.woff', 'font')
  
  // Prefetch likely next pages
  prefetchResource('/individual')
  prefetchResource('/login')
}

// Service Worker registration for caching
export function registerServiceWorker() {
  // Only register the service worker in production builds to avoid stale
  // cached assets causing module/chunk mismatches during development.
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}