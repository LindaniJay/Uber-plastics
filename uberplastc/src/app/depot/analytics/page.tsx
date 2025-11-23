'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Clock,
  Package,
  Truck,
  Award,
  Calendar,
  Filter
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DepotAnalyticsPage() {
  const { darkMode } = useTheme()

  const analyticsData = {
    totalProcessed: 7847,
    totalWeight: '392.3kg',
    averageProcessingTime: '2.1h',
    efficiency: 94,
    costSavings: '$2,847',
    co2Saved: '156.2kg',
    qualityScore: 96,
    uptime: 98.5
  }

  const weeklyTrends = [
    { day: 'Mon', processed: 1200, efficiency: 92 },
    { day: 'Tue', processed: 1350, efficiency: 94 },
    { day: 'Wed', processed: 1180, efficiency: 91 },
    { day: 'Thu', processed: 1420, efficiency: 96 },
    { day: 'Fri', processed: 1680, efficiency: 95 },
    { day: 'Sat', processed: 890, efficiency: 88 },
    { day: 'Sun', processed: 347, efficiency: 85 }
  ]

  const topMetrics = [
    {
      title: 'Processing Efficiency',
      value: '94%',
      change: '+2.3%',
      trend: 'up',
      color: 'from-green-500 to-green-600',
      icon: TrendingUp
    },
    {
      title: 'Cost Savings',
      value: '$2,847',
      change: '+12.5%',
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
      icon: Target
    },
    {
      title: 'Quality Score',
      value: '96%',
      change: '+1.2%',
      trend: 'up',
      color: 'from-purple-500 to-purple-600',
      icon: Award
    },
    {
      title: 'System Uptime',
      value: '98.5%',
      change: '-0.3%',
      trend: 'down',
      color: 'from-yellow-500 to-yellow-600',
      icon: Clock
    }
  ]

  const performanceCategories = [
    {
      category: 'Processing Speed',
      score: 92,
      target: 90,
      color: 'from-green-500 to-green-600'
    },
    {
      category: 'Quality Control',
      score: 96,
      target: 95,
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'Energy Efficiency',
      score: 88,
      target: 85,
      color: 'from-purple-500 to-purple-600'
    },
    {
      category: 'Waste Reduction',
      score: 94,
      target: 90,
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl shadow-lg mb-6 inline-block">
            <BarChart3 className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Depot Analytics
            </h1>
            <p className="text-orange-100 text-lg">
              Comprehensive performance insights and metrics
            </p>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {topMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {metric.value}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {metric.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Weekly Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Weekly Processing Trends
          </h2>
          <div className="grid grid-cols-7 gap-4">
            {weeklyTrends.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  {day.day}
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 flex flex-col justify-end p-2 mb-2">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                    style={{ height: `${(day.processed / 2000) * 100}%` }}
                  ></div>
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {day.processed} items
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {day.efficiency}% efficiency
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Categories
          </h2>
          <div className="space-y-6">
            {performanceCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.category}
                    </h3>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-3 rounded-full transition-all duration-300`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Target: {category.target}%
                    </span>
                    <span className={`${
                      category.score >= category.target ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {category.score >= category.target ? '✓ Target Met' : '⚠ Below Target'}
                    </span>
                  </div>
                </div>
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
            <Package className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.totalProcessed}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Items Processed
            </p>
          </div>
          
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center`}>
            <Truck className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.totalWeight}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Weight Processed
            </p>
          </div>
          
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center`}>
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.co2Saved}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              CO₂ Emissions Saved
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
