'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useMockAuth } from '@/contexts/MockAuthContext'
import { motion } from 'framer-motion'
import { Loader2, Shield, AlertTriangle } from 'lucide-react'

interface MockProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function MockProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: MockProtectedRouteProps) {
  const { currentUser, isAuthenticated, isLoading } = useMockAuth()
  const router = useRouter()
  const params = useParams()
  
  // Extract user ID from route
  const routeUserId = params?.id ? parseInt(params.id as string) : null

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // No user logged in, redirect to login
        router.push(redirectTo)
        return
      }

      if (currentUser && routeUserId && currentUser.id !== routeUserId) {
        // User is logged in but trying to access another user's dashboard
        router.push('/unauthorized')
        return
      }
    }
  }, [isAuthenticated, isLoading, currentUser, routeUserId, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Verifying access...</p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please log in to access this dashboard.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (currentUser && routeUserId && currentUser.id !== routeUserId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You don't have permission to access this dashboard.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => router.push(`/dashboard/${currentUser.id}`)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Go to My Dashboard
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
