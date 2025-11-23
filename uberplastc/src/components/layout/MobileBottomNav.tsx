'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home, 
  Camera, 
  BarChart3, 
  User, 
  Settings,
  Scan,
  Trophy,
  Leaf,
  Building,
  Truck,
  Warehouse,
  MessageCircle,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const mobileNavItems = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
    roles: ['individual', 'hub', 'collector', 'depot', 'institution']
  },
  {
    href: '/insights',
    icon: BarChart3,
    label: 'Insights',
    roles: ['individual', 'hub', 'collector', 'depot', 'institution']
  },
  {
    href: '/chatbot',
    icon: MessageCircle,
    label: 'EcoBot',
    roles: ['individual', 'hub', 'collector', 'depot', 'institution']
  },
  {
    href: '/login',
    icon: User,
    label: 'Sign In',
    roles: ['individual', 'hub', 'collector', 'depot', 'institution']
  },
  {
    href: '/hub',
    icon: Building,
    label: 'Hub',
    roles: ['hub']
  },
  {
    href: '/collector',
    icon: Truck,
    label: 'Collector',
    roles: ['collector']
  },
  {
    href: '/depot',
    icon: Warehouse,
    label: 'Depot',
    roles: ['depot']
  }
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Always render a stable wrapper to avoid SSR/CSR mismatch; fill content after mount
  
  // Core items that are always shown
  const coreItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/insights', icon: BarChart3, label: 'Insights' },
    { href: '/chatbot', icon: MessageCircle, label: 'EcoBot' }
  ]
  
  // Get role-specific dashboard item
  const getRoleDashboard = (role: string) => {
    switch (role) {
      case 'individual':
        return { href: '/individual/dashboard', icon: User, label: 'Dashboard' }
      case 'hub':
        return { href: '/hub', icon: Building, label: 'Hub' }
      case 'collector':
        return { href: '/collector', icon: Truck, label: 'Collector' }
      case 'depot':
        return { href: '/depot', icon: Warehouse, label: 'Depot' }
      case 'institution':
        return { href: '/institution', icon: Building, label: 'Institution' }
      default:
        return { href: '/login', icon: User, label: 'Sign In' }
    }
  }
  
  // Handle logout
  const handleLogout = () => {
    logout()
    // Redirect to home page after logout
    window.location.href = '/'
  }
  
  // Show dashboard if authenticated, otherwise show sign in
  // Use consistent default for SSR to avoid hydration mismatch
  const authItem = mounted && isAuthenticated && user 
    ? getRoleDashboard(user.role)
    : { href: '/login', icon: User, label: 'Sign In' }
  
  // Build items list - only show logout when mounted and authenticated
  const allItems = [...coreItems, authItem]
  const visibleItems = mounted && isAuthenticated
    ? [...allItems, { href: '#', icon: LogOut, label: 'Logout', isLogout: true } as any]
    : allItems

  // Use a consistent className that doesn't depend on dark mode for SSR
  const navClassName = "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-800/50 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden" suppressHydrationWarning>
      <div className={`${navClassName}`} suppressHydrationWarning>
        <div className="flex items-center justify-center px-2 py-2 max-w-md mx-auto">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))
            
            // Handle logout button differently
            if (item.isLogout) {
              return (
                <button
                  key="logout"
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1"
                >
                  <motion.div
                    className="p-2 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    whileTap={{ scale: 0.95 }}
                    suppressHydrationWarning
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-xs mt-1 font-medium transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    {item.label}
                  </span>
                </button>
              )
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1"
              >
                <motion.div
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  suppressHydrationWarning
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
