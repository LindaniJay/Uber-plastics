'use client'

import { motion } from 'framer-motion'
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  Users,
  Star,
  Crown,
  Medal,
  Target,
  Zap,
  Calendar
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'

export default function LeaderboardPage() {
  const { darkMode } = useTheme()
  const { userStats, detectionHistory } = useEcoTrackStore()

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      bottles: 156,
      points: 780,
      earnings: 7.80,
      co2Saved: 15.6,
      avatar: 'SJ',
      badge: 'Eco Champion',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      rank: 2,
      name: 'Mike Chen',
      bottles: 142,
      points: 710,
      earnings: 7.10,
      co2Saved: 14.2,
      avatar: 'MC',
      badge: 'Green Warrior',
      color: 'from-gray-400 to-gray-600'
    },
    {
      rank: 3,
      name: 'Emma Rodriguez',
      bottles: 128,
      points: 640,
      earnings: 6.40,
      co2Saved: 12.8,
      avatar: 'ER',
      badge: 'Recycle Master',
      color: 'from-orange-400 to-red-500'
    },
    {
      rank: 4,
      name: 'Alex Thompson',
      bottles: 115,
      points: 575,
      earnings: 5.75,
      co2Saved: 11.5,
      avatar: 'AT',
      badge: 'Eco Hero',
      color: 'from-blue-400 to-purple-500'
    },
    {
      rank: 5,
      name: 'Lisa Park',
      bottles: 98,
      points: 490,
      earnings: 4.90,
      co2Saved: 9.8,
      avatar: 'LP',
      badge: 'Green Guardian',
      color: 'from-green-400 to-teal-500'
    }
  ]

  const currentUserRank = 6 // Mock rank for current user

  const categories = [
    {
      title: 'Weekly Top Recyclers',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-600',
      data: leaderboardData.slice(0, 3)
    },
    {
      title: 'Monthly Champions',
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      data: leaderboardData
    },
    {
      title: 'Eco Warriors',
      icon: Award,
      color: 'from-green-500 to-teal-600',
      data: leaderboardData.slice(0, 5)
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Leaderboard
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Compete with other eco-warriors and climb the sustainability rankings
            </p>
          </div>

          {/* User Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card mb-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  #{currentUserRank}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {userStats.totalBottles}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Bottles Collected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {userStats.totalPoints}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {userStats.totalCo2Saved.toFixed(1)}kg
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">CO₂ Saved</div>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard Categories */}
          <div className="space-y-8">
            {categories.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center mb-6">
                    <div className={`bg-gradient-to-r ${category.color} p-3 rounded-xl mr-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {category.data.map((user, index) => (
                      <motion.div
                        key={user.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          user.rank <= 3 
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700/30' 
                            : 'bg-gray-50 dark:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            {user.rank === 1 && <Crown className="h-6 w-6 text-yellow-500" />}
                            {user.rank === 2 && <Medal className="h-6 w-6 text-gray-400" />}
                            {user.rank === 3 && <Award className="h-6 w-6 text-orange-500" />}
                            {user.rank > 3 && (
                              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                                  {user.rank}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="bg-gradient-to-r from-green-500 to-teal-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                            {user.avatar}
                          </div>
                          
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {user.badge}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {user.bottles}
                            </div>
                            <div className="text-xs text-gray-500">Bottles</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-yellow-600">
                              {user.points}
                            </div>
                            <div className="text-xs text-gray-500">Points</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-teal-600">
                              {user.co2Saved}kg
                            </div>
                            <div className="text-xs text-gray-500">CO₂</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 card"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Achievement Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Top Recycler</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Collect 100+ bottles in a month
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Eco Warrior</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Maintain a 7-day streak
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Speed Scanner</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Complete 10 scans in a day
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


