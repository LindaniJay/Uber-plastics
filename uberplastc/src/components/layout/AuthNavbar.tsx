"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Home,
  BarChart3,
  Building,
  Truck,
  Warehouse,
  Users as UsersIcon,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import Image from 'next/image'

function getRoleDashboard(role: string) {
  switch (role) {
    case 'individual':
      return '/individual/dashboard'
    case 'hub':
      return '/hub'
    case 'collector':
      return '/collector'
    case 'depot':
      return '/depot'
    default:
      return '/'
  }
}

function getRoleName(role: string): string {
  switch (role) {
    case 'individual':
      return 'Citizen'
    case 'hub':
      return 'Hub'
    case 'collector':
      return 'Collector'
    case 'depot':
      return 'Depot'
    case 'institution':
      return 'Institution'
    default:
      return 'User'
  }
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'individual':
      return UsersIcon
    case 'hub':
      return Building
    case 'collector':
      return Truck
    case 'depot':
      return Warehouse
    default:
      return User
  }
}

function AuthNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { darkMode, toggleDarkMode } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Validate role against expected values to prevent UI inconsistency
  const validRoles = ['individual', 'hub', 'collector', 'depot']
  const userRole = user?.role
  const isValidRole = userRole && validRoles.includes(userRole)
  const safeRole = isValidRole ? userRole : 'individual' // Default to 'individual' for invalid roles
  
  const RoleIcon = getRoleIcon(safeRole)

  const getSafeRoleName = (role?: string) => {
    if (!role) return 'User'
    // Validate role before passing to getRoleName
    if (!validRoles.includes(role)) {
      console.warn(`Invalid role detected: ${role}. Defaulting to 'individual'`)
      return getRoleName('individual')
    }
    return getRoleName(role)
  }

  const handleLogout = () => {
    logout && logout()
    router.push('/')
  }

  // Render consistent structure during SSR and hydration to avoid mismatch
  // Use suppressHydrationWarning on the nav element to handle client-only content
  if (!mounted) {
    // Return a placeholder that matches the authenticated structure during SSR
    // This prevents hydration mismatch while maintaining layout consistency
    return (
      <nav className="bg-transparent py-4 content-fit" suppressHydrationWarning>
        <div className="container-fit">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-800/50 animate-pulse" />
            </div>
            <div className="w-32 h-8 bg-gray-800/50 rounded-full animate-pulse" />
          </div>
        </div>
      </nav>
    )
  }

  if (!isAuthenticated) {
    return (
      <nav className="bg-transparent py-4 content-fit" suppressHydrationWarning>
        <div className="container-fit">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/uber-plastic-logo.png"
                alt="Uber Plastic Logo"
                width={40}
                height={40}
                className="rounded-lg"
                priority
                suppressHydrationWarning
              />
            </Link>

            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>

                <Link
                  href="/insights"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Eco Insights</span>
                </Link>

                <LanguageSwitcher />

                <Link
                  href="/login"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 ml-2"
                >
                  Sign In
                </Link>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                >
                  {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-sm rounded-lg mt-2">
                  <Link
                    href="/"
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center">
                      <Home className="w-5 h-5 mr-3" />
                      Home
                    </span>
                  </Link>

                  <Link
                    href="/insights"
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-3" />
                      Eco Insights
                    </span>
                  </Link>

                  <div className="pt-2">
                    <Link
                      href="/login"
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-transparent py-4 content-fit" suppressHydrationWarning>
      <div className="container">
        <div className="container-fit">
          <div className="flex justify-between items-center">
            <Link href={getRoleDashboard(user?.role || '')} className="flex items-center space-x-3">
              <Image
                src="/uber-plastic-logo.png"
                alt="Uber Plastic Logo"
                width={40}
                height={40}
                className="rounded-lg"
                priority
                suppressHydrationWarning
              />
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Eco Insights</span>
                </Link>

                <div className="relative group">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                  >
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span className="truncate max-w-[100px]">{user?.name || 'User'}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 origin-top-right bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      >
                        <div className="py-1">
                          <div className="px-4 py-3 border-b border-gray-700">
                            <p className="text-sm text-gray-300">Signed in as</p>
                            <p className="text-sm font-medium text-white truncate">{user?.email || 'No email'}</p>
                          </div>

                          <Link
                            href="/settings/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
                            onClick={() => setIsOpen(false)}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            <span>Settings</span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <LanguageSwitcher />

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 dark:border-gray-600/50 rounded-2xl mx-2 shadow-2xl"
              suppressHydrationWarning
            >
              <div className="px-3 py-4 space-y-1">
                <Link
                  href="/"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-3 rounded-xl transition-all duration-200 text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Home</span>
                </Link>

                <Link
                  href={getRoleDashboard(user?.role || '')}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-3 rounded-xl transition-all duration-200 text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <Building className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                <Link
                  href="/insights"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-3 rounded-xl transition-all duration-200 text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <BarChart3 className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Eco Insights</span>
                </Link>

                {user?.role === 'individual' && (
                  <>
                    <Link
                      href="/individual/rewards"
                      className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Rewards</span>
                    </Link>
                    <Link
                      href="/individual/leaderboard"
                      className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <UsersIcon className="w-5 h-5" />
                      <span>Leaderboard</span>
                    </Link>
                  </>
                )}

                <div className="border-t border-gray-600/30 pt-4 mt-4">
                  <div className="flex items-center justify-center mb-4">
                    <LanguageSwitcher />
                  </div>

                  <div className="flex items-center space-x-3 mb-4 px-3 py-2 bg-gray-700/30 rounded-full">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
                      <RoleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-400">{getSafeRoleName(user?.role)}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default AuthNavbar
// Named export for files that import { AuthNavbar }
export { AuthNavbar }
