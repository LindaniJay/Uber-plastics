'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Recycle, 
  Award, 
  TrendingUp, 
  Leaf, 
  Target,
  Calendar,
  Users,
  Zap,
  Trophy,
  Star,
  DollarSign,
  MapPin,
  Clock,
  Gift,
  Home,
  BarChart3,
  Globe,
  ArrowRight,
  Sparkles,
  Activity,
  Flame,
  Heart,
  Lightbulb,
  Plus,
  Scan
} from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AchievementCard } from '@/components/dashboard/AchievementCard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import Link from 'next/link'

export default function IndividualDashboard() {
  return (
    <ProtectedRoute allowedRoles={['individual']}>
      <IndividualDashboardContent />
    </ProtectedRoute>
  )
}

function IndividualDashboardContent() {
  const { user } = useAuth()
  const { darkMode } = useTheme()
  const { userStats, getTodayScans, getWeeklyStats, getRecentScans } = useEcoTrackStore()
  const [formattedScans, setFormattedScans] = useState<Array<{ bottles: number; timestamp: number; earnings: number; co2Saved: number; polyMoney: number; formattedDate: string }>>([])
  const [mounted, setMounted] = useState(false)

  const todayScans = getTodayScans()
  const weeklyStats = getWeeklyStats()
  
  // Track detection history changes - useMemo with detectionHistory as the only dependency
  // This ensures we only recalculate when the actual detection history array reference changes
  // Note: historyLength and mostRecentTimestamp are derived from detectionHistory, so they're redundant
  const detectionHistory = useEcoTrackStore((state) => state.detectionHistory)
  
  // Derive recentScans directly from detectionHistory using useMemo
  // Only detectionHistory is needed as a dependency since it's the source of truth
  const recentScans = useMemo(() => {
    return [...detectionHistory]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
  }, [detectionHistory])

  useEffect(() => {
    setMounted(true)
    setFormattedScans(recentScans.map(scan => ({
      ...scan,
      formattedDate: new Date(scan.timestamp).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })))
  }, [recentScans])

  const stats = [
    {
      icon: Recycle,
      title: 'Bottles Collected',
      value: userStats.totalBottles,
      change: `+${todayScans.reduce((acc, scan) => acc + scan.bottles, 0)} today`,
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Leaf,
      title: 'CO₂ Saved (kg)',
      value: userStats.totalCo2Saved.toFixed(1),
      change: `+${todayScans.reduce((acc, scan) => acc + scan.co2Saved, 0).toFixed(1)} today`,
      changeType: 'positive' as const,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Award,
      title: 'Poly Money Earned',
      value: userStats.totalPolyMoney,
      change: `+${todayScans.reduce((acc, scan) => acc + scan.polyMoney, 0)} today`,
      changeType: 'positive' as const,
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: DollarSign,
      title: 'Total Earnings',
      value: `STN ${userStats.totalEarnings.toFixed(2)}`,
      change: `+STN ${todayScans.reduce((acc, scan) => acc + scan.earnings, 0).toFixed(2)} today`,
      changeType: 'positive' as const,
      color: 'from-emerald-500 to-green-600'
    }
  ]

  const achievements = [
    {
      title: 'First Steps',
      description: 'Collect your first 10 bottles',
      icon: 'star' as const,
      progress: Math.min(userStats.totalBottles, 10),
      maxProgress: 10,
      unlocked: userStats.totalBottles >= 10,
      rarity: 'common' as const
    },
    {
      title: 'Eco Warrior',
      description: 'Reach 50 bottles collected',
      icon: 'shield' as const,
      progress: Math.min(userStats.totalBottles, 50),
      maxProgress: 50,
      unlocked: userStats.totalBottles >= 50,
      rarity: 'rare' as const
    },
    {
      title: 'Ocean Guardian',
      description: 'Save 5kg of CO₂',
      icon: 'leaf' as const,
      progress: Math.min(userStats.totalCo2Saved, 5),
      maxProgress: 5,
      unlocked: userStats.totalCo2Saved >= 5,
      rarity: 'epic' as const
    },
    {
      title: 'Recycling Master',
      description: 'Reach 1000 total bottles collected',
      icon: 'trophy' as const,
      progress: Math.min(userStats.totalBottles, 1000),
      maxProgress: 1000,
      unlocked: userStats.totalBottles >= 1000,
      rarity: 'legendary' as const
    }
  ]

  const weeklyGoals = [
    { name: 'Bottles', current: weeklyStats.bottles, target: 20, color: 'from-green-500 to-emerald-600', icon: Recycle },
    { name: 'Points', current: weeklyStats.points, target: 100, color: 'from-yellow-500 to-orange-600', icon: Star },
    { name: 'Streak', current: weeklyStats.streak, target: 7, color: 'from-blue-500 to-purple-600', icon: Flame }
  ]

  const rewards = [
    {
      title: 'Coffee Voucher',
      description: 'Free coffee at local café',
      points: 50,
      icon: '☕',
      available: userStats.totalPoints >= 50,
      category: 'Food & Beverage',
      expiry: '30 days'
    },
    {
      title: 'Ferry Ticket',
      description: '50% off inter-island ferry',
      points: 200,
      icon: '⛴️',
      available: userStats.totalPoints >= 200,
      category: 'Transportation',
      expiry: '90 days'
    },
    {
      title: 'Mobile Data',
      description: '1GB free mobile data',
      points: 100,
      icon: '📱',
      available: userStats.totalPoints >= 100,
      category: 'Digital Services',
      expiry: '7 days'
    },
    {
      title: 'Eco Store Discount',
      description: '20% off sustainable products',
      points: 150,
      icon: '🛍️',
      available: userStats.totalPoints >= 150,
      category: 'Shopping',
      expiry: '60 days'
    }
  ]

  const weeklyChallenges = [
    {
      id: 1,
      title: 'Plastic-Free Week',
      description: 'Collect 50 bottles this week',
      progress: 35,
      target: 50,
      reward: '100 points',
      deadline: '3 days left',
      difficulty: 'medium'
    },
    {
      id: 2,
      title: 'Community Cleanup',
      description: 'Join a local cleanup event',
      progress: 0,
      target: 1,
      reward: '200 points + badge',
      deadline: '5 days left',
      difficulty: 'easy'
    },
    {
      id: 3,
      title: 'Eco Education',
      description: 'Share 3 eco tips with friends',
      progress: 1,
      target: 3,
      reward: '150 points',
      deadline: '7 days left',
      difficulty: 'easy'
    }
  ]

  const environmentalTips = [
    {
      title: 'Reduce Single-Use Plastics',
      tip: 'Carry a reusable water bottle and shopping bags to reduce plastic waste.',
      impact: 'Saves 100+ plastic items per month',
      icon: '♻️'
    },
    {
      title: 'Proper Recycling',
      tip: 'Rinse containers before recycling to prevent contamination.',
      impact: 'Increases recycling efficiency by 40%',
      icon: '♻️'
    }
  ]

  const communityStats = {
    totalUsers: 2847,
    totalBottlesCollected: 156789,
    totalCo2Saved: 3125.6,
    activeToday: 234,
    topCollector: 'EcoWarrior_2024',
    communityRank: 15
  }

  const upcomingEvents = [
    {
      title: 'Beach Cleanup Drive',
      date: '2024-01-15',
      time: '9:00 AM',
      location: 'Praia de Santa Maria',
      participants: 45,
      organizer: 'Uber Plastic Community'
    },
    {
      title: 'Recycling Workshop',
      date: '2024-01-18',
      time: '2:00 PM',
      location: 'Centro Cultural',
      participants: 28,
      organizer: 'Green Education Center'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <Sparkles className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  Eco Champion
                </span>
              </div>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Welcome back, {user?.name || 'Eco Warrior'}! 🌱
              </h1>
              <p className={`text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Keep up the great work! Every bottle makes a difference.
              </p>
            </div>
            
            {/* Quick Navigation Pills */}
            <div className="flex flex-wrap gap-2 relative z-10">
              <Link
                href="/"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm'
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/insights"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Insights
              </Link>
              <Link
                href="/individual/log-plastic"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 border border-green-500/30' 
                    : 'bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-700 border border-green-200'
                }`}
              >
                <Plus className="h-4 w-4" />
                Log Plastic
              </Link>
              <Link
                href="/individual/rewards"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-400 border border-yellow-500/30' 
                    : 'bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 text-orange-700 border border-yellow-200'
                }`}
              >
                <Award className="h-4 w-4" />
                Rewards
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Modern Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <StatsCard {...stat} delay={index * 0.1} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions - Redesigned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h2>
                <Zap className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/individual/log-plastic"
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                    darkMode
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30'
                      : 'bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                      <Plus className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Log Plastic
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Record collection
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/individual/rewards"
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                    darkMode
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30'
                      : 'bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 border border-yellow-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                      <Award className={`h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        View Rewards
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Claim your prizes
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/individual/leaderboard"
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                    darkMode
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30'
                      : 'bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                      <Trophy className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Leaderboard
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        See your rank
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Achievements - Modern Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Achievements
                </h2>
                <Trophy className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <AchievementCard key={achievement.title} {...achievement} delay={index * 0.1} />
                ))}
              </div>
            </motion.div>

            {/* Weekly Progress - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Weekly Progress
                </h2>
                <Activity className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div className="space-y-6">
                {weeklyGoals.map((goal, index) => {
                  const Icon = goal.icon
                  const percentage = Math.min((goal.current / goal.target) * 100, 100)
                  return (
                    <div key={goal.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${goal.color} bg-opacity-10`}>
                            <Icon className={`h-4 w-4 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                          </div>
                          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {goal.name}
                          </span>
                        </div>
                        <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <div className={`relative w-full h-3 rounded-full overflow-hidden ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 1 + index * 0.2 }}
                          className={`h-full rounded-full bg-gradient-to-r ${goal.color} shadow-lg`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Recent Scans - Modern List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recent Scans
                </h2>
                <Recycle className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              </div>
              <div className="space-y-3">
                {(mounted && formattedScans.length > 0 ? formattedScans : recentScans.map(scan => ({ ...scan, formattedDate: '' }))).map((scan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                      darkMode
                        ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600`}>
                        <Recycle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {scan.bottles} {scan.bottles === 1 ? 'bottle' : 'bottles'} collected
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {scan.formattedDate || (mounted ? 'Processing...' : '')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        +{scan.bottles * 5} pts
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        STN {scan.earnings.toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Available Rewards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Available Rewards
                </h2>
                <Gift className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              </div>
              <div className="space-y-3">
                {rewards.map((reward, index) => (
                  <motion.div
                    key={reward.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      reward.available
                        ? darkMode
                          ? 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20'
                          : 'border-green-200 bg-green-50 hover:bg-green-100'
                        : darkMode
                          ? 'border-gray-600/50 bg-gray-700/30'
                          : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl">{reward.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {reward.title}
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {reward.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {reward.points} pts
                        </div>
                        {reward.available ? (
                          <button className={`mt-2 text-xs px-3 py-1 rounded-lg font-medium transition-all duration-300 ${
                            darkMode
                              ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}>
                            Redeem
                          </button>
                        ) : (
                          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Need {reward.points - userStats.totalPoints} more
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Environmental Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 shadow-2xl' 
                  : 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 shadow-xl'
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Leaf className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Environmental Impact
                </h2>
              </div>
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {userStats.totalCo2Saved.toFixed(1)}kg
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    CO₂ Saved
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {Math.round(userStats.totalCo2Saved * 1000 / 0.5)}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Bottles Equivalent
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                      {Math.round(userStats.totalCo2Saved * 2.5)}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Trees Equivalent
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weekly Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Weekly Challenges
                </h2>
                <Target className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div className="space-y-4">
                {weeklyChallenges.map((challenge) => {
                  const progressPercentage = Math.min((challenge.progress / challenge.target) * 100, 100)
                  return (
                    <div
                      key={challenge.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        darkMode
                          ? 'border-gray-600/50 bg-gray-700/30 hover:border-green-500/50'
                          : 'border-gray-200 bg-gray-50 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {challenge.title}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {challenge.description}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          challenge.difficulty === 'easy' 
                            ? darkMode
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-green-100 text-green-700'
                            : challenge.difficulty === 'medium'
                              ? darkMode
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-yellow-100 text-yellow-700'
                              : darkMode
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-red-100 text-red-700'
                        }`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                          <span className={darkMode ? 'text-white' : 'text-gray-900'}>{challenge.progress}/{challenge.target}</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-200'
                        }`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1 }}
                            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            Reward: {challenge.reward}
                          </span>
                          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
                            {challenge.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Community Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-2xl' 
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 shadow-xl'
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Community Impact
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {communityStats.totalUsers.toLocaleString()}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Active Users
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {communityStats.totalBottlesCollected.toLocaleString()}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Bottles Collected
                    </div>
                  </div>
                </div>
                <div className={`text-center p-4 rounded-2xl ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/50 border border-gray-200'
                }`}>
                  <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Community Rank
                  </div>
                  <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                    #{communityStats.communityRank}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    out of {communityStats.totalUsers} users
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Eco Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Eco Tips
                </h2>
              </div>
              <div className="space-y-4">
                {environmentalTips.map((tip, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl transition-colors duration-200 ${
                      darkMode
                        ? 'bg-gray-700/50 hover:bg-gray-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {tip.title}
                        </h3>
                        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {tip.tip}
                        </p>
                        <div className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                          💡 Impact: {tip.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className={`rounded-3xl p-6 lg:p-8 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Upcoming Events
                </h2>
                <Calendar className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      darkMode
                        ? 'border-gray-600/50 bg-gray-700/30 hover:border-blue-500/50'
                        : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {event.title}
                        </h3>
                        <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                        <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          by {event.organizer}
                        </div>
                      </div>
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}>
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
