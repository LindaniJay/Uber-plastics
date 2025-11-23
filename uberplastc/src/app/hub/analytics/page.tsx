'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Award,
  Calendar,
  Building,
  Leaf,
  Zap,
  Globe
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function InstitutionAnalyticsPage() {
  const { darkMode } = useTheme()

  const analyticsData = {
    totalMembers: 24,
    totalBottles: 1247,
    totalWeight: '62.3kg',
    co2Saved: '31.2kg',
    totalPoints: 6235,
    averageParticipation: 87,
    monthlyGoal: 1500,
    goalProgress: 83,
    topPerformer: 'Sarah Johnson',
    topPerformerBottles: 156
  }

  const monthlyData = [
    { month: 'Jan', bottles: 1200, members: 20, efficiency: 85 },
    { month: 'Feb', bottles: 1350, members: 22, efficiency: 88 },
    { month: 'Mar', bottles: 1180, members: 21, efficiency: 86 },
    { month: 'Apr', bottles: 1420, members: 23, efficiency: 90 },
    { month: 'May', bottles: 1680, members: 24, efficiency: 92 },
    { month: 'Jun', bottles: 1247, members: 24, efficiency: 87 }
  ]

  const topPerformers = [
    { name: 'Sarah Johnson', bottles: 156, points: 780, department: 'Marketing' },
    { name: 'Mike Chen', bottles: 142, points: 710, department: 'Engineering' },
    { name: 'Lisa Rodriguez', bottles: 128, points: 640, department: 'HR' },
    { name: 'David Kim', bottles: 115, points: 575, department: 'Finance' },
    { name: 'Emma Wilson', bottles: 108, points: 540, department: 'Operations' }
  ]

  const departmentStats = [
    { name: 'Marketing', bottles: 420, members: 6, efficiency: 92 },
    { name: 'Engineering', bottles: 380, members: 8, efficiency: 88 },
    { name: 'HR', bottles: 180, members: 3, efficiency: 95 },
    { name: 'Finance', bottles: 160, members: 4, efficiency: 85 },
    { name: 'Operations', bottles: 107, members: 3, efficiency: 90 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg mb-6 inline-block">
            <BarChart3 className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Comprehensive institutional impact metrics
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
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {analyticsData.totalMembers}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Active Members
            </p>
          </div>

          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {analyticsData.totalBottles}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Bottles Collected
            </p>
          </div>

          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg mb-4">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {analyticsData.co2Saved}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              CO₂ Saved
            </p>
          </div>

          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {analyticsData.totalPoints}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Points
            </p>
          </div>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Monthly Collection Trends
          </h2>
          <div className="grid grid-cols-6 gap-4">
            {monthlyData.map((month, index) => (
              <div key={month.month} className="text-center">
                <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  {month.month}
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 flex flex-col justify-end p-2 mb-2">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                    style={{ height: `${(month.bottles / 2000) * 100}%` }}
                  ></div>
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {month.bottles} bottles
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {month.members} members
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Monthly Goal Progress
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.totalBottles} / {analyticsData.monthlyGoal} bottles
            </span>
            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.goalProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${analyticsData.goalProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {analyticsData.monthlyGoal - analyticsData.totalBottles} bottles remaining
            </span>
            <span className="text-green-500 font-medium">
              On track to exceed goal!
            </span>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Top Performers
          </h2>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <motion.div
                key={performer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {performer.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {performer.department}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {performer.bottles} bottles
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {performer.points} points
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Department Performance
          </h2>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {dept.name}
                    </h3>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {dept.bottles} bottles
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(dept.bottles / 500) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {dept.members} members
                    </span>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {dept.efficiency}% efficiency
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
