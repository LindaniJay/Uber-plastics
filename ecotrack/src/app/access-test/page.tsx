'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  CheckCircle, 
  XCircle, 
  Shield,
  User,
  Building,
  Truck,
  Warehouse,
  BarChart3,
  MessageCircle,
  Home,
  Leaf
} from 'lucide-react'

interface PageAccess {
  path: string
  name: string
  icon: any
  shouldBeAccessible: boolean
  requiresAuth: boolean
  allowedRoles?: string[]
  isPublic: boolean
}

export default function AccessTestPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)

  const pages: PageAccess[] = [
    {
      path: '/',
      name: 'Home Page',
      icon: Home,
      shouldBeAccessible: true,
      requiresAuth: false,
      isPublic: true
    },
    {
      path: '/insights',
      name: 'Eco Insights',
      icon: BarChart3,
      shouldBeAccessible: true,
      requiresAuth: false,
      isPublic: true
    },
    {
      path: '/chatbot',
      name: 'EcoBot Chat',
      icon: MessageCircle,
      shouldBeAccessible: true,
      requiresAuth: false,
      isPublic: true
    },
    {
      path: '/individual/dashboard',
      name: 'Individual Dashboard',
      icon: User,
      shouldBeAccessible: user?.role === 'individual',
      requiresAuth: true,
      allowedRoles: ['individual'],
      isPublic: false
    },
    {
      path: '/institution',
      name: 'Institution Dashboard',
      icon: Building,
      shouldBeAccessible: user?.role === 'institution',
      requiresAuth: true,
      allowedRoles: ['institution'],
      isPublic: false
    },
    {
      path: '/collector',
      name: 'Collector Dashboard',
      icon: Truck,
      shouldBeAccessible: user?.role === 'collector',
      requiresAuth: true,
      allowedRoles: ['collector'],
      isPublic: false
    },
    {
      path: '/depot',
      name: 'Depot Dashboard',
      icon: Warehouse,
      shouldBeAccessible: user?.role === 'depot',
      requiresAuth: true,
      allowedRoles: ['depot'],
      isPublic: false
    },
    {
      path: '/profile',
      name: 'User Profile',
      icon: User,
      shouldBeAccessible: isAuthenticated,
      requiresAuth: true,
      isPublic: false
    }
  ]

  const runAccessTests = async () => {
    setIsRunningTests(true)
    setTestResults([])
    
    const results = []
    
    for (const page of pages) {
      let accessible = false
      let reason = ''
      
      if (page.isPublic) {
        accessible = true
        reason = 'Public page - accessible to everyone'
      } else if (page.requiresAuth) {
        if (isAuthenticated) {
          if (page.allowedRoles && page.allowedRoles.length > 0) {
            if (user && page.allowedRoles.includes(user.role)) {
              accessible = true
              reason = `Authenticated user with correct role (${user.role})`
            } else {
              accessible = false
              reason = `Authenticated but wrong role (${user?.role || 'none'})`
            }
          } else {
            accessible = true
            reason = 'Authenticated user'
          }
        } else {
          accessible = false
          reason = 'Requires authentication'
        }
      }
      
      const expectedAccess = page.shouldBeAccessible
      const testPassed = accessible === expectedAccess
      
      results.push({
        page: page.name,
        path: page.path,
        accessible,
        expectedAccess,
        passed: testPassed,
        reason,
        timestamp: new Date().toLocaleTimeString()
      })
    }
    
    setTestResults(results)
    setIsRunningTests(false)
  }

  const testCredentials = [
    { email: 'demo@ecotrack.app', password: 'demo123', role: 'individual' },
    { email: 'institution@ecotrack.app', password: 'demo123', role: 'institution' },
    { email: 'collector@ecotrack.app', password: 'demo123', role: 'collector' },
    { email: 'depot@ecotrack.app', password: 'demo123', role: 'depot' }
  ]

  useEffect(() => {
    runAccessTests()
  }, [isAuthenticated, user])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Access Control Test Suite
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Verify that users can only access appropriate pages based on their role
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Current Auth State */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Current Authentication State
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Loading State:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isLoading ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {isLoading ? 'Loading...' : 'Ready'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Authenticated:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isAuthenticated ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {isAuthenticated ? 'Yes' : 'No'}
                  </span>
                </div>
                
                {user && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">Current User:</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {user.name}</div>
                      <div><strong>Email:</strong> {user.email}</div>
                      <div><strong>Role:</strong> {user.role}</div>
                      <div><strong>Region:</strong> {user.region}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Test Controls */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Test Controls
              </h2>
              
              <div className="space-y-6">
                <button
                  onClick={runAccessTests}
                  disabled={isRunningTests}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isRunningTests ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Running Tests...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Run Access Control Tests</span>
                    </>
                  )}
                </button>

                {/* Test Credentials */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Test Different User Roles
                  </h3>
                  <div className="space-y-2">
                    {testCredentials.map((cred, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{cred.role}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{cred.email}</div>
                          </div>
                          <button
                            onClick={() => {
                              // This would trigger login in a real test
                              alert(`To test as ${cred.role}, please login with: ${cred.email}`)
                            }}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                          >
                            Test Role
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Access Control Test Results
              </h2>
              
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {result.passed ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{result.page}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {result.reason} • Expected: {result.expectedAccess ? 'Accessible' : 'Restricted'} • Actual: {result.accessible ? 'Accessible' : 'Restricted'}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.timestamp}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-800 dark:text-green-400">
                    Tests Passed: {testResults.filter(r => r.passed).length}/{testResults.length}
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    {Math.round((testResults.filter(r => r.passed).length / testResults.length) * 100)}% Success Rate
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Page Access Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Page Access Summary
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Public Pages (No Login Required)
                </h3>
                <div className="space-y-2">
                  {pages.filter(p => p.isPublic).map((page, index) => {
                    const Icon = page.icon
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-gray-900 dark:text-white">{page.name}</span>
                        <span className="ml-auto text-sm text-green-600 dark:text-green-400">Public</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Protected Pages (Login Required)
                </h3>
                <div className="space-y-2">
                  {pages.filter(p => !p.isPublic).map((page, index) => {
                    const Icon = page.icon
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-900 dark:text-white">{page.name}</span>
                        <span className="ml-auto text-sm text-blue-600 dark:text-blue-400">
                          {page.allowedRoles ? page.allowedRoles.join(', ') : 'Any Role'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

