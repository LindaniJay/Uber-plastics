'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Recycle, 
  Leaf, 
  Award, 
  TrendingUp,
  MapPin,
  Clock,
  Users,
  BarChart3,
  Activity,
  Heart,
  Zap,
  Calendar,
  Settings,
  Bell,
  User,
  Home,
  PlusCircle
} from 'lucide-react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import Link from 'next/link'

// Components
import { StatsCard } from './components/StatsCard'
import { RecentActivity } from './components/RecentActivity'
import { EnvironmentalImpact } from './components/EnvironmentalImpact'
import { CommunityStats } from './components/CommunityStats'
import { QuickActions } from './components/QuickActions'

export default function CitizenDashboard() {
  return (
    <ProtectedRoute allowedRoles={['citizen']}>
      <CitizenDashboardContent />
    </ProtectedRoute>
  )
}

function CitizenDashboardContent() {
  const { user } = useAuth()
  const { darkMode } = useTheme()
  const { userStats, getRecentActivities } = useEcoTrackStore()
  
  const [recentActivity, setRecentActivity] = useState<Array<{
    id: string
    type: 'recycle' | 'reward' | 'level_up' | 'community'
    title: string
    description: string
    timestamp: number
  }>>([])

  useEffect(() => {
    // Simulate loading data
    const activity = getRecentActivities()
    setRecentActivity(activity)
  }, [getRecentActivities])

  const stats = [
    {
      icon: Recycle,
      title: 'Bottles Recycled',
      value: userStats.totalBottles,
      change: `+12 this week`,
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Leaf,
      title: 'CO₂ Saved',
      value: `${userStats.totalCo2Saved.toFixed(2)} kg`,
      change: `+${(userStats.totalCo2Saved * 0.15).toFixed(2)} kg this week`,
      changeType: 'positive' as const,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Award,
      title: 'Eco Points',
      value: userStats.totalPoints,
      change: `+${Math.floor(userStats.totalPoints * 0.1)} this week`,
      changeType: 'positive' as const,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Community Rank',
      value: `#${userStats.rank || '--'}`,
      change: userStats.rankChange ? `${userStats.rankChange > 0 ? '↑' : '↓'} ${Math.abs(userStats.rankChange)}` : 'New',
      changeType: userStats.rankChange ? (userStats.rankChange > 0 ? 'positive' as const : 'negative' as const) : 'neutral' as const,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'Eco Warrior'}! 👋
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Bell className="h-6 w-6" />
            </button>
            <Link href="/citizen/profile" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <User className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                My Profile
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Recent Activity */}
            <RecentActivity activities={recentActivity} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Environmental Impact */}
            <EnvironmentalImpact />
            
            {/* Community Stats */}
            <CommunityStats />
          </div>
        </div>
      </main>
    </div>
  )
}
