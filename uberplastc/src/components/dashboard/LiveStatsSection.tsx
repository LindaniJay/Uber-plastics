'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Recycle, 
  Leaf, 
  Award, 
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Zap,
  Waves,
  Globe
} from 'lucide-react'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import { useCountryData } from '@/hooks/useCountryData'
import { useTheme } from '@/contexts/ThemeContext'

interface LiveStatsSectionProps {
  selectedCountry: string
}

export function LiveStatsSection({ selectedCountry }: LiveStatsSectionProps) {
  const { darkMode } = useTheme()
  const { userStats, getTodayScans, getWeeklyStats } = useEcoTrackStore()
  const { data: countryData } = useCountryData(selectedCountry)
  
  const [animatedStats, setAnimatedStats] = useState({
    bottles: 0,
    co2: 0,
    polyMoney: 0,
    earnings: 0
  })

  const todayScans = getTodayScans()
  const weeklyStats = getWeeklyStats()

  // Animate stats on load
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const current = start + (end - start) * progress
        callback(current)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }

    // Animate each stat
    animateValue(0, userStats.totalBottles, 2000, (value) => {
      setAnimatedStats(prev => ({ ...prev, bottles: Math.round(value) }))
    })

    animateValue(0, userStats.totalCo2Saved, 2000, (value) => {
      setAnimatedStats(prev => ({ ...prev, co2: value }))
    })

    animateValue(0, userStats.totalPolyMoney, 2000, (value) => {
      setAnimatedStats(prev => ({ ...prev, polyMoney: Math.round(value) }))
    })

    animateValue(0, userStats.totalEarnings, 2000, (value) => {
      setAnimatedStats(prev => ({ ...prev, earnings: value }))
    })
  }, [userStats])

  const stats = [
    {
      icon: Recycle,
      title: 'Bottles Collected',
      value: animatedStats.bottles,
      change: `+${todayScans.reduce((acc, scan) => acc + scan.bottles, 0)} today`,
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Leaf,
      title: 'CO₂ Saved (kg)',
      value: animatedStats.co2.toFixed(2),
      change: `+${todayScans.reduce((acc, scan) => acc + scan.co2Saved, 0).toFixed(2)} today`,
      changeType: 'positive' as const,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      textColor: 'text-teal-600 dark:text-teal-400'
    },
    {
      icon: Award,
      title: 'Poly Money Earned',
      value: animatedStats.polyMoney,
      change: `+${todayScans.reduce((acc, scan) => acc + scan.polyMoney, 0)} today`,
      changeType: 'positive' as const,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: DollarSign,
      title: 'Total Earnings',
      value: `STN ${animatedStats.earnings.toFixed(2)}`,
      change: `+STN ${todayScans.reduce((acc, scan) => acc + scan.earnings, 0).toFixed(2)} today`,
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    }
  ]

  const weeklyGoals = [
    { 
      name: 'Bottles', 
      current: weeklyStats.bottles, 
      target: 50, 
      color: 'from-green-500 to-emerald-600',
      icon: Recycle
    },
    { 
      name: 'Poly Money', 
      current: weeklyStats.polyMoney, 
      target: 500, 
      color: 'from-yellow-500 to-orange-600',
      icon: Award
    },
    { 
      name: 'CO₂ Saved', 
      current: weeklyStats.co2Saved, 
      target: 2.0, 
      color: 'from-teal-500 to-cyan-600',
      icon: Leaf
    }
  ]

  const getRank = () => {
    if (userStats.totalBottles >= 1000) return { rank: 'Ocean Legend', color: 'text-purple-600', icon: '🏆' }
    if (userStats.totalBottles >= 500) return { rank: 'Blue Economy Hero', color: 'text-blue-600', icon: '🌊' }
    if (userStats.totalBottles >= 100) return { rank: 'Eco Warrior', color: 'text-green-600', icon: '🛡️' }
    if (userStats.totalBottles >= 10) return { rank: 'Ocean Guardian', color: 'text-teal-600', icon: '🐚' }
    return { rank: 'Eco Starter', color: 'text-gray-600', icon: '🌱' }
  }

  const rank = getRank()

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`${stat.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </div>
              
              <div className="mb-2">
                <div className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.title}
                </div>
              </div>
              
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                {stat.change}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Rank & Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🏆 Your Status
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Rank */}
          <div className="text-center">
            <div className="text-4xl mb-2">{rank.icon}</div>
            <div className={`text-2xl font-bold ${rank.color} mb-2`}>
              {rank.rank}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {userStats.totalBottles} bottles collected
            </div>
          </div>

          {/* Streak */}
          <div className="text-center">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {userStats.streak} day streak
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Keep it up!
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          📈 Weekly Progress
        </h2>
        
        <div className="space-y-6">
          {weeklyGoals.map((goal, index) => {
            const Icon = goal.icon
            const progress = Math.min((goal.current / goal.target) * 100, 100)
            
            return (
              <div key={goal.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {goal.name}
                    </span>
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {goal.current.toFixed(1)}/{goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r ${goal.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {progress.toFixed(0)}% complete
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Environmental Impact Visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20"
      >
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🌊 Environmental Impact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Waves className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {(userStats.totalBottles * 0.15).toFixed(1)} kg
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Ocean plastic prevented
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {(userStats.totalBottles * 0.02).toFixed(1)} kg
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              CO₂ emissions saved
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(userStats.totalBottles / 10)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Marine animals helped
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
