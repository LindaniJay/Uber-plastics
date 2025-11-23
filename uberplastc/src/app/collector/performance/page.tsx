'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  BarChart3,
  Star,
  Trophy,
  Zap
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function CollectorPerformancePage() {
  const { darkMode } = useTheme()

  const performanceMetrics = {
    efficiency: 94,
    punctuality: 98,
    customerSatisfaction: 96,
    totalCollections: 127,
    averageTime: '1.4h',
    totalBottles: 2847,
    totalWeight: '142.3kg',
    rating: 4.8
  }

  const achievements = [
    {
      id: 1,
      title: 'Efficiency Master',
      description: 'Maintained 90%+ efficiency for 30 consecutive days',
      icon: Target,
      color: 'from-green-500 to-green-600',
      earned: true
    },
    {
      id: 2,
      title: 'Speed Demon',
      description: 'Completed 50 collections in record time',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      earned: true
    },
    {
      id: 3,
      title: 'Customer Favorite',
      description: 'Received 5-star rating from 20+ clients',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      earned: true
    },
    {
      id: 4,
      title: 'Consistency Champion',
      description: 'Perfect attendance for 3 months',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600',
      earned: false
    }
  ]

  const weeklyData = [
    { day: 'Mon', collections: 8, efficiency: 92 },
    { day: 'Tue', collections: 12, efficiency: 96 },
    { day: 'Wed', collections: 10, efficiency: 94 },
    { day: 'Thu', collections: 15, efficiency: 98 },
    { day: 'Fri', collections: 18, efficiency: 95 },
    { day: 'Sat', collections: 6, efficiency: 90 },
    { day: 'Sun', collections: 4, efficiency: 88 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl shadow-lg mb-6 inline-block">
            <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Performance Dashboard
            </h1>
            <p className="text-green-100 text-lg">
              Track your collection performance and achievements
            </p>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {performanceMetrics.efficiency}%
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Efficiency Rate
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {performanceMetrics.punctuality}%
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Punctuality
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {performanceMetrics.customerSatisfaction}%
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Customer Rating
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {performanceMetrics.rating}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Overall Rating
              </p>
            </div>
          </div>
        </motion.div>

        {/* Weekly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Weekly Performance
          </h2>
          <div className="grid grid-cols-7 gap-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  {day.day}
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 flex flex-col justify-end p-2">
                  <div 
                    className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
                    style={{ height: `${(day.efficiency / 100) * 100}%` }}
                  ></div>
                </div>
                <div className={`text-xs mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {day.collections} collections
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {day.efficiency}% efficiency
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-xl border-2 ${
                  achievement.earned 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-3 rounded-full ${achievement.earned ? `bg-gradient-to-r ${achievement.color}` : 'bg-gray-400'}`}>
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="ml-auto">
                      <Award className="h-6 w-6 text-green-500" />
                    </div>
                  )}
                </div>
                {achievement.earned ? (
                  <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                    ✓ Earned
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    🔒 Locked
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center`}>
            <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {performanceMetrics.totalCollections}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Collections
            </p>
          </div>
          
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center`}>
            <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {performanceMetrics.totalBottles}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Bottles Collected
            </p>
          </div>
          
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center`}>
            <Clock className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {performanceMetrics.averageTime}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Average Time
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
