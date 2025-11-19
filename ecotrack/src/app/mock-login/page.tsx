'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMockAuth, MockAuthProvider } from '@/contexts/MockAuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  Eye, 
  EyeOff,
  LogIn,
  Shield,
  Leaf,
  User,
  Lock,
  AlertCircle
} from 'lucide-react'

function MockLoginContent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { darkMode } = useTheme()
  const router = useRouter()

  // Initialize mock auth
  const { login, currentUser } = useMockAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      router.push(`/dashboard/${currentUser.id}`)
    }
  }, [currentUser, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const success = await login(username, password)
      
      if (success) {
        // Get the user data to redirect to their dashboard
        const user = await new Promise<any>((resolve) => {
          // Wait for the auth context to update
          setTimeout(() => {
            const storedUser = localStorage.getItem('ecotrack-mock-user')
            if (storedUser) {
              resolve(JSON.parse(storedUser))
            } else {
              resolve(null)
            }
          }, 100)
        })
        
        if (user) {
          router.push(`/dashboard/${user.id}`)
        }
      } else {
        setError('Invalid username or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (username: string, password: string) => {
    setUsername(username)
    setPassword(password)
  }

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
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            UberPlastics Login
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Enter your credentials to access your dashboard
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          {/* Login Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Sign In
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Use your username and password to access your dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your username"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Secure mock authentication</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Login Options */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Quick Login (Demo Users)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { username: 'alice', password: '1234', name: 'Alice Johnson', role: 'Citizen' },
                { username: 'bob', password: 'abcd', name: 'Bob Smith', role: 'Institution' },
                { username: 'charlie', password: '5678', name: 'Charlie Brown', role: 'Collector' },
                { username: 'diana', password: 'efgh', name: 'Diana Wilson', role: 'Depot' }
              ].map((user, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickLogin(user.username, user.password)}
                  disabled={isLoading}
                  className="p-3 text-left bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.username} • {user.role}
                      </p>
                    </div>
                    <LogIn className="w-4 h-4 text-green-500" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function MockLoginPage() {
  return (
    <MockAuthProvider>
      <MockLoginContent />
    </MockAuthProvider>
  )
}

export const dynamic = 'force-dynamic'