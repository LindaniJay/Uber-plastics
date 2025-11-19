
// Performance monitoring utilities
export const performanceMonitor = {
  measure: (name: string, fn: () => any) => {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
    return result
  },
  
  measureAsync: async (name: string, fn: () => Promise<any>) => {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
    return result
  },
  
  reportWebVitals: (metric: any) => {
    console.log('📊 Web Vitals:', metric)
  }
}
