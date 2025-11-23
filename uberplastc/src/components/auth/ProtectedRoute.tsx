'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  redirectTo?: string
  requireAuth?: boolean
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login',
  requireAuth = true
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // If authentication is required and user is not authenticated
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo)
        return
      }

      // If authentication is required and user is authenticated
      if (requireAuth && isAuthenticated && user) {
        // Check if user has the required role
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          // Redirect to appropriate dashboard based on user role
          switch (user.role) {
            case 'individual':
              router.push('/individual/dashboard')
              break
            case 'hub':
              router.push('/hub')
              break
            case 'collector':
              router.push('/collector')
              break
            case 'depot':
              router.push('/depot')
              break
            default:
              router.push('/')
          }
          return
        }
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, redirectTo, router, requireAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
          </div>
        </motion.div>
      </div>
    )
  }

  // If authentication is not required, always show children
  if (!requireAuth) {
    return <>{children}</>
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return null
  }

  // If authentication is required and user is authenticated but doesn't have the right role
  if (requireAuth && isAuthenticated && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
