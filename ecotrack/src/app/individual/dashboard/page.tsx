'use client'

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
  Camera,
  Coins,
  DollarSign,
  MapPin,
  Clock,
  Gift,
  Home,
  BarChart3,
  Globe,
  ArrowRight
} from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AchievementCard } from '@/components/dashboard/AchievementCard'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import { CameraScanner } from '@/components/ai/CameraScanner'
import { useState } from 'react'
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
  const [showScanner, setShowScanner] = useState(false)

  const todayScans = getTodayScans()
  const weeklyStats = getWeeklyStats()
  const recentScans = getRecentScans(5)

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
      color: 'from-blue-500 to-green-500'
    },
    {
      icon: DollarSign,
      title: 'Total Earnings',
      value: `STN ${userStats.totalEarnings.toFixed(2)}`,
      change: `+STN ${todayScans.reduce((acc, scan) => acc + scan.earnings, 0).toFixed(2)} today`,
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600'
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
    { name: 'Bottles', current: weeklyStats.bottles, target: 20, color: 'from-green-500 to-emerald-600' },
    { name: 'Points', current: weeklyStats.points, target: 100, color: 'from-yellow-500 to-orange-600' },
    { name: 'Streak', current: weeklyStats.streak, target: 7, color: 'from-blue-500 to-purple-600' }
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
    },
    {
      title: 'Restaurant Voucher',
      description: '15% off at eco-friendly restaurants',
      points: 80,
      icon: '🍽️',
      available: userStats.totalPoints >= 80,
      category: 'Food & Beverage',
      expiry: '45 days'
    },
    {
      title: 'Gym Membership',
      description: '1 month free gym access',
      points: 300,
      icon: '💪',
      available: userStats.totalPoints >= 300,
      category: 'Health & Fitness',
      expiry: '120 days'
    },
    {
      title: 'Movie Tickets',
      description: '2 free cinema tickets',
      points: 120,
      icon: '🎬',
      available: userStats.totalPoints >= 120,
      category: 'Entertainment',
      expiry: '30 days'
    },
    {
      title: 'Eco Workshop',
      description: 'Free sustainability workshop',
      points: 180,
      icon: '🎓',
      available: userStats.totalPoints >= 180,
      category: 'Education',
      expiry: '90 days'
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
    },
    {
      title: 'Composting',
      tip: 'Start a small compost bin for organic waste.',
      impact: 'Reduces household waste by 30%',
      icon: '🌱'
    },
    {
      title: 'Energy Conservation',
      tip: 'Use LED bulbs and unplug devices when not in use.',
      impact: 'Saves 20% on electricity bills',
      icon: '💡'
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
    },
    {
      title: 'Sustainability Fair',
      date: '2024-01-22',
      time: '10:00 AM',
      location: 'Parque Municipal',
      participants: 120,
      organizer: 'City Council'
    }
  ]

  const handleScanComplete = (results: any) => {
    setShowScanner(false)
    // Results are automatically saved to the store
    // Force a re-render to show updated stats
    window.location.reload()
  }

  return (
    <ProtectedRoute allowedRoles={['individual']}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name || 'Eco Warrior'}! 🌱
          </h1>
          <p className="text-lg text-blue-100">
            Keep up the great work! Every bottle makes a difference.
          </p>
        </motion.div>

        {/* Navigation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Home Navigation */}
            <Link
              href="/"
              className="card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-blue-300">
                    Home
                  </h3>
                  <p className="text-sm text-blue-200">
                    Back to main page
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 ml-auto" />
              </div>
            </Link>

            {/* Eco Insights Navigation */}
            <Link
              href="/insights"
              className="card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-green-300">
                    Eco Insights
                  </h3>
                  <p className="text-sm text-blue-200">
                    Environmental data & analytics
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 ml-auto" />
              </div>
            </Link>

            {/* Global Impact Navigation */}
            <Link
              href="/insights"
              className="card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-blue-300">
                    Global Impact
                  </h3>
                  <p className="text-sm text-blue-200">
                    Worldwide sustainability data
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 ml-auto" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setShowScanner(true)}
              className="btn-primary group"
            >
              <Camera className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              AI Scanner
            </button>
            <Link
              href="/individual/log-plastic"
              className="btn-secondary group"
            >
              <Recycle className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Log Plastic
            </Link>
            <Link
              href="/individual/rewards"
              className="btn-eco group"
            >
              <Award className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              View Rewards
            </Link>
            <Link
              href="/individual/leaderboard"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <Trophy className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Leaderboard
            </Link>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Achievements & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <AchievementCard key={achievement.title} {...achievement} />
                ))}
              </div>
            </motion.div>

            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Weekly Progress
              </h2>
              <div className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {goal.name}
                      </span>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.2 }}
                        className={`h-3 rounded-full bg-gradient-to-r ${goal.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Scans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Scans
              </h2>
              <div className="space-y-3">
                {recentScans.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Recycle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {scan.bottles} bottles collected
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(scan.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        +{scan.points} pts
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        STN ${scan.earnings.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Rewards & Impact */}
          <div className="space-y-8">
            {/* Rewards Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Available Rewards
              </h2>
              <div className="space-y-3">
                {rewards.map((reward, index) => (
                  <div
                    key={reward.title}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      reward.available
                        ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{reward.icon}</span>
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {reward.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {reward.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-600">
                          {reward.points} pts
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          {reward.category}
                        </div>
                        <div className="text-xs text-gray-400 mb-2">
                          Expires in {reward.expiry}
                        </div>
                        {reward.available ? (
                          <button className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors duration-200">
                            Redeem
                          </button>
                        ) : (
                          <div className="text-xs text-gray-500">
                            Need {reward.points - userStats.totalPoints} more pts
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Environmental Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Environmental Impact
              </h2>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {userStats.totalCo2Saved.toFixed(1)}kg
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    CO₂ Saved
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {Math.round(userStats.totalCo2Saved * 1000 / 0.5)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Plastic Bottles Equivalent
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    {Math.round(userStats.totalCo2Saved * 2.5)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Trees Planted Equivalent
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weekly Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Weekly Challenges
              </h2>
              <div className="space-y-4">
                {weeklyChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {challenge.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">{challenge.progress}/{challenge.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                          style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          Reward: {challenge.reward}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {challenge.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Community Impact
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {communityStats.totalUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Active Users
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {communityStats.totalBottlesCollected.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Bottles Collected
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">
                    {communityStats.totalCo2Saved.toFixed(1)}kg
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Total CO₂ Saved
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Your Community Rank
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
                      #{communityStats.communityRank}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      out of {communityStats.totalUsers} users
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Environmental Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Eco Tips
              </h2>
              <div className="space-y-3">
                {environmentalTips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {tip.tip}
                        </p>
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Impact: {tip.impact}
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
              transition={{ duration: 0.6, delay: 1.4 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Upcoming Events
              </h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {event.title}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200">
                        Join
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Organized by {event.organizer}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Camera Scanner Modal */}
      {showScanner && (
        <CameraScanner
          onClose={() => setShowScanner(false)}
          onScanComplete={handleScanComplete}
        />
      )}
      </div>
    </ProtectedRoute>
  )
}