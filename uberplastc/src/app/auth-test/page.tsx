'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  CheckCircle, 
  XCircle, 
  User, 
  LogOut,
  Settings,
  Shield,
  Leaf
} from 'lucide-react'

export default function AuthTestPage() {
  const { user, isAuthenticated, isLoading, login, logout, validateEmail, validatePassword } = useAuth()
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)

  const runAuthTests = async () => {
    setIsRunningTests(true)
    setTestResults([])
    
    const tests = [
      {
        name: 'Email Validation',
        test: () => {
          const validEmails = ['test@example.com', 'user@domain.org', 'admin@site.co.uk']
          const invalidEmails = ['invalid-email', '@domain.com', 'user@', 'user.domain.com']
          
          const validResults = validEmails.map(email => validateEmail(email))
          const invalidResults = invalidEmails.map(email => validateEmail(email))
          
          return {
            passed: validResults.every(Boolean) && invalidResults.every(result => !result),
            details: `Valid emails: ${validResults.filter(Boolean).length}/${validEmails.length}, Invalid emails: ${invalidResults.filter(result => !result).length}/${invalidEmails.length}`
          }
        }
      },
      {
        name: 'Password Validation',
        test: () => {
          const weakPasswords = ['123', 'password', 'abc123']
          const strongPasswords = ['Password123!', 'MyStr0ng#Pass', 'SecureP@ss1']
          
          const weakResults = weakPasswords.map(pwd => validatePassword(pwd))
          const strongResults = strongPasswords.map(pwd => validatePassword(pwd))
          
          return {
            passed: weakResults.every(result => !result.valid) && strongResults.every(result => result.valid),
            details: `Weak passwords rejected: ${weakResults.filter(r => !r.valid).length}/${weakPasswords.length}, Strong passwords accepted: ${strongResults.filter(r => r.valid).length}/${strongPasswords.length}`
          }
        }
      },
      {
        name: 'Login with Valid Credentials',
        test: async () => {
          const result = await login('demo@ecotrack.app', 'demo123')
          return {
            passed: result.success,
            details: result.success ? 'Login successful' : `Login failed: ${result.error}`
          }
        }
      },
      {
        name: 'Login with Invalid Credentials',
        test: async () => {
          const result = await login('invalid@example.com', 'wrongpassword')
          return {
            passed: !result.success,
            details: result.success ? 'Login should have failed' : `Login correctly rejected: ${result.error}`
          }
        }
      },
      {
        name: 'Authentication State',
        test: () => {
          return {
            passed: isAuthenticated && user !== null,
            details: `Authenticated: ${isAuthenticated}, User: ${user ? user.name : 'null'}`
          }
        }
      }
    ]

    const results = []
    for (const test of tests) {
      try {
        const result = await test.test()
        results.push({
          name: test.name,
          passed: result.passed,
          details: result.details,
          timestamp: new Date().toLocaleTimeString()
        })
      } catch (error) {
        results.push({
          name: test.name,
          passed: false,
          details: `Test failed with error: ${error}`,
          timestamp: new Date().toLocaleTimeString()
        })
      }
    }
    
    setTestResults(results)
    setIsRunningTests(false)
  }

  const testCredentials = [
    { email: 'demo@ecotrack.app', password: 'demo123', role: 'Individual' },
    { email: 'institution@ecotrack.app', password: 'demo123', role: 'Institution' },
    { email: 'collector@ecotrack.app', password: 'demo123', role: 'Collector' },
    { email: 'depot@ecotrack.app', password: 'demo123', role: 'Depot' }
  ]

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
            Authentication Test Suite
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Test the authentication system functionality
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
                      <div><strong>Join Date:</strong> {new Date(user.joinDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                )}
                
                {isAuthenticated && (
                  <button
                    onClick={logout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
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
                  onClick={runAuthTests}
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
                      <span>Run Authentication Tests</span>
                    </>
                  )}
                </button>

                {/* Test Credentials */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Test Credentials
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
                            onClick={async () => {
                              const result = await login(cred.email, cred.password)
                              if (result.success) {
                                alert(`Successfully logged in as ${cred.role}`)
                              } else {
                                alert(`Login failed: ${result.error}`)
                              }
                            }}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                          >
                            Test Login
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
                Test Results
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
                        <div className="font-medium text-gray-900 dark:text-white">{result.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{result.details}</div>
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
        </div>
      </div>
    </div>
  )
}

