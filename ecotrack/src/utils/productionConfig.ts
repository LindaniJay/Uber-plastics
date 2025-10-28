/**
 * Production configuration to ensure performance monitoring is disabled
 */

export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

// Performance monitoring should only be enabled in development
export const shouldShowPerformanceMetrics = isDevelopment

// Console logging should be minimized in production
export const shouldLogPerformance = isDevelopment

// Performance dashboard should only be available in development
export const shouldShowPerformanceDashboard = isDevelopment

// Performance monitoring components should be conditionally rendered
export const performanceConfig = {
  enabled: isDevelopment,
  logMetrics: isDevelopment,
  showDashboard: isDevelopment,
  measureTimings: isDevelopment
}
