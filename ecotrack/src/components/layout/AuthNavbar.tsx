'use client'

import { motion } from 'framer-motion'
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
  Leaf,
  Building,
  Truck,
  Warehouse,
  Users,
  Gift,
  Clock
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import Image from 'next/image'

export function AuthNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Prevent hydration mismatch by rendering consistent structure
  // Use same structure as unauthenticated state to avoid mismatch
  const renderUnauthenticatedNav = () => (
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
          
          <div 
            className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2"
            suppressHydrationWarning
          >
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
            
            <Link
              href="/chatbot"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
            >
              <User className="w-4 h-4" />
              <span>EcoBot</span>
            </Link>
            
            <LanguageSwitcher />
            
            <Link
              href="/login"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 ml-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )

  // Render unauthenticated state structure immediately to prevent hydration mismatch
  if (!mounted || !isAuthenticated) {
    return renderUnauthenticatedNav()
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'individual':
        return Users
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

  const getRoleDashboard = (role: string) => {
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

  const getRoleName = (role: string) => {
    switch (role) {
      case 'individual':
        return 'Citizen'
      case 'hub':
        return 'Hub'
      case 'collector':
        return 'Collector'
      case 'depot':
        return 'Depot'
      default:
        return 'User'
    }
  }


  const RoleIcon = getRoleIcon(user?.role || '')

  return (
    <nav className="bg-transparent py-4 content-fit" suppressHydrationWarning>
      <div className="container-fit">
        <div className="flex justify-between items-center">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2"
            suppressHydrationWarning
          >
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              href={getRoleDashboard(user?.role || '')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
            >
              <Building className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              href="/insights"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Eco Insights</span>
            </Link>
            
            <Link
              href="/chatbot"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
            >
              <User className="w-4 h-4" />
              <span>EcoBot</span>
            </Link>

            {/* Role-specific navigation */}
            {user?.role === 'individual' && (
              <>
                <Link
                  href="/individual/rewards"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Gift className="w-4 h-4" />
                  <span>Rewards</span>
                </Link>
                <Link
                  href="/individual/rewards-requests"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Clock className="w-4 h-4" />
                  <span>My Requests</span>
                </Link>
                <Link
                  href="/individual/leaderboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Users className="w-4 h-4" />
                  <span>Leaderboard</span>
                </Link>
              </>
            )}

            {user?.role === 'hub' && (
              <>
                <Link
                  href="/hub/team"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Users className="w-4 h-4" />
                  <span>Team</span>
                </Link>
                <Link
                  href="/hub/rewards"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Gift className="w-4 h-4" />
                  <span>Rewards</span>
                </Link>
                <Link
                  href="/hub/analytics"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </Link>
              </>
            )}

            {user?.role === 'collector' && (
              <>
                <Link
                  href="/collector/routes"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Truck className="w-4 h-4" />
                  <span>Routes</span>
                </Link>
                <Link
                  href="/collector/performance"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Performance</span>
                </Link>
              </>
            )}

            {user?.role === 'depot' && (
              <>
                <Link
                  href="/depot/processing"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <Warehouse className="w-4 h-4" />
                  <span>Processing</span>
                </Link>
                <Link
                  href="/depot/analytics"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            
            <div 
              className="flex items-center space-x-2 px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded-full"
              suppressHydrationWarning
            >
              <div className="p-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
                <RoleIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400">
                  {getRoleName(user?.role || '')}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-full transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-gray-300 hover:bg-gray-700/50 transition-all duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
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

              {/* Role-specific mobile navigation */}
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
                    <Users className="w-5 h-5" />
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
                    <p className="font-medium text-white">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {getRoleName(user?.role || '')}
                    </p>
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
      </div>
    </nav>
  )
}
