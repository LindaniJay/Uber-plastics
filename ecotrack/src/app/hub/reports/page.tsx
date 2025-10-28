'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Filter,
  Search,
  Eye,
  Share
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function InstitutionReportsPage() {
  const { darkMode } = useTheme()

  const reports = [
    {
      id: 1,
      title: 'Monthly Sustainability Report',
      type: 'Monthly',
      date: '2024-01-14',
      status: 'completed',
      description: 'Comprehensive monthly analysis of plastic collection and environmental impact',
      metrics: {
        bottlesCollected: 1247,
        co2Saved: '62.3kg',
        totalPoints: 6235,
        participation: 87
      },
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Department Performance Analysis',
      type: 'Department',
      date: '2024-01-10',
      status: 'completed',
      description: 'Detailed breakdown of performance by department and team members',
      metrics: {
        topDepartment: 'Marketing',
        avgBottles: 156,
        efficiency: 92,
        improvement: '+12%'
      },
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Environmental Impact Assessment',
      type: 'Environmental',
      date: '2024-01-08',
      status: 'completed',
      description: 'Environmental impact metrics and carbon footprint reduction analysis',
      metrics: {
        co2Reduction: '156.2kg',
        energySaved: '2,847 kWh',
        wasteDiverted: '392.3kg',
        impact: 'High'
      },
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Quarterly Sustainability Review',
      type: 'Quarterly',
      date: '2024-01-05',
      status: 'draft',
      description: 'Quarterly comprehensive review of sustainability initiatives and goals',
      metrics: {
        goalProgress: 83,
        milestones: 5,
        achievements: 12,
        nextQuarter: 'Q2 2024'
      },
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 5,
      title: 'Team Engagement Report',
      type: 'Engagement',
      date: '2024-01-03',
      status: 'completed',
      description: 'Analysis of team participation, engagement levels, and motivation factors',
      metrics: {
        engagement: 94,
        satisfaction: 88,
        retention: 96,
        growth: '+15%'
      },
      color: 'from-pink-500 to-pink-600'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const reportStats = {
    totalReports: reports.length,
    completed: reports.filter(r => r.status === 'completed').length,
    drafts: reports.filter(r => r.status === 'draft').length,
    totalDownloads: 47
  }

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
            <FileText className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Impact Reports
            </h1>
            <p className="text-blue-100 text-lg">
              Generate and manage sustainability reports
            </p>
          </div>
        </motion.div>

        {/* Report Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Report Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {reportStats.totalReports}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Reports
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {reportStats.completed}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Completed
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {reportStats.drafts}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Drafts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Download className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {reportStats.totalDownloads}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Downloads
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>All Types</span>
          </button>
        </motion.div>

        {/* Reports List */}
        <div className="space-y-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {report.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                      {report.type}
                    </span>
                  </div>
                  
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                    {report.description}
                  </p>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Generated: {new Date(report.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {Object.entries(report.metrics).map(([key, value], metricIndex) => (
                  <div key={key} className={`bg-gradient-to-r ${report.color} p-4 rounded-lg text-white`}>
                    <div className="text-sm opacity-90 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-lg font-bold">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Report</span>
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Generate New Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Generate New Report</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
