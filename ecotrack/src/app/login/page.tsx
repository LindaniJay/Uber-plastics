'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { UberPlasticLogo } from '@/components/ui/UberPlasticLogo'
import { 
  Users, 
  Building, 
  Truck, 
  Warehouse, 
  Eye, 
  EyeOff,
  LogIn,
  Shield,
  Leaf,
  Globe
} from 'lucide-react'

const roleCredentials = [
  {
    role: 'individual',
    title: 'Citizen',
    description: 'Track your personal plastic collection and earn rewards',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    credentials: [
      { email: 'citizen@ecotrack.app', password: 'citizen123', name: 'Eco Citizen' },
      { email: 'demo@ecotrack.app', password: 'demo123', name: 'Eco Warrior' }
    ]
  },
  {
    role: 'hub',
    title: 'Hub',
    description: 'Manage your organization\'s sustainability initiatives and serve as a collection hub',
    icon: Building,
    color: 'from-blue-500 to-indigo-600',
    credentials: [
      { email: 'hub@ecotrack.app', password: 'demo123', name: 'Green Hub' },
      { email: 'restaurant@ecotrack.app', password: 'restaurant123', name: 'Eco Restaurant' }
    ]
  },
  {
    role: 'collector',
    title: 'Collector',
    description: 'Accept pickup requests and earn from collections',
    icon: Truck,
    color: 'from-yellow-500 to-orange-600',
    credentials: [
      { email: 'collector@ecotrack.app', password: 'demo123', name: 'Waste Collector' },
      { email: 'driver@ecotrack.app', password: 'driver123', name: 'Eco Driver' }
    ]
  },
  {
    role: 'depot',
    title: 'Depot',
    description: 'Process collections and manage the recycling pipeline',
    icon: Warehouse,
    color: 'from-purple-500 to-pink-600',
    credentials: [
      { email: 'depot@ecotrack.app', password: 'demo123', name: 'Recycling Depot' },
      { email: 'processing@ecotrack.app', password: 'processing123', name: 'Processing Center' }
    ]
  }
]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string>('individual')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const { darkMode } = useTheme()
  const router = useRouter()

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    const roleData = roleCredentials.find(r => r.role === role)
    if (roleData && roleData.credentials.length > 0) {
      setEmail(roleData.credentials[0].email)
      setPassword(roleData.credentials[0].password.split('123')[0] + '123')
    }
    setError('')
  }

  const handleQuickLogin = async (credential: any) => {
    setEmail(credential.email)
    setPassword(credential.password)
    await handleLogin(credential.email, credential.password)
  }

  const handleLogin = async (emailValue?: string, passwordValue?: string) => {
    const loginEmail = emailValue || email
    const loginPassword = passwordValue || password
    
    if (!loginEmail || !loginPassword) {
      setError('Please enter both email and password')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await login(loginEmail, loginPassword)
      
      if (result.success) {
        // Redirect based on role
        const roleData = roleCredentials.find(r => 
          r.credentials.some(c => c.email === loginEmail)
        )
        
        if (roleData) {
          switch (roleData.role) {
            case 'individual':
              router.push('/individual/dashboard')
              break
            case 'institution':
              router.push('/institution')
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
        } else {
          router.push('/')
        }
      } else {
        setError(result.error || 'Invalid credentials. Please check your email and password.')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const currentRole = roleCredentials.find(r => r.role === selectedRole)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <UberPlasticLogo 
              size="xl" 
              showText={true} 
              href="/"
              animated={true}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Uber Plastic
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose your role and access your personalized dashboard
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Role Selection */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Select Your Role
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {roleCredentials.map((role) => {
                    const Icon = role.icon
                    const isSelected = selectedRole === role.role
                    
                    return (
                      <motion.button
                        key={role.role}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect(role.role)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {role.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            {role.description}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Quick Login Options */}
              {currentRole && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Quick Login Options
                  </h3>
                  <div className="space-y-2">
                    {currentRole.credentials.map((credential, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickLogin(credential)}
                        disabled={isLoading}
                        className="w-full p-3 text-left bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {credential.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {credential.email}
                            </p>
                          </div>
                          <LogIn className="w-4 h-4 text-green-500" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

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
                  Enter your credentials to access your dashboard
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email"
                    required
                  />
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
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your password"
                      required
                    />
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
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
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
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>Secure authentication</span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => router.push('/forgot-password')}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                      onClick={() => router.push('/register')}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
