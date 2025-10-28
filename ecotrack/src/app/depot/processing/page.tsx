'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  Zap,
  Target
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DepotProcessingPage() {
  const { darkMode } = useTheme()

  const processingLines = [
    {
      id: 1,
      name: 'PET Bottle Processing Line',
      status: 'active',
      efficiency: 94,
      currentBatch: 'Batch #2024-001',
      itemsProcessed: 1247,
      itemsRemaining: 253,
      estimatedCompletion: '2.5h',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'HDPE Container Line',
      status: 'paused',
      efficiency: 87,
      currentBatch: 'Batch #2024-002',
      itemsProcessed: 892,
      itemsRemaining: 108,
      estimatedCompletion: '1.8h',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'Mixed Plastic Line',
      status: 'maintenance',
      efficiency: 0,
      currentBatch: 'Maintenance Mode',
      itemsProcessed: 634,
      itemsRemaining: 0,
      estimatedCompletion: 'N/A',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-5 w-5 text-green-500" />
      case 'paused':
        return <Pause className="h-5 w-5 text-yellow-500" />
      case 'maintenance':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'maintenance':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const overallStats = {
    totalLines: processingLines.length,
    activeLines: processingLines.filter(line => line.status === 'active').length,
    totalProcessed: processingLines.reduce((sum, line) => sum + line.itemsProcessed, 0),
    averageEfficiency: Math.round(processingLines.reduce((sum, line) => sum + line.efficiency, 0) / processingLines.length)
  }

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
            <Settings className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Processing Status
            </h1>
            <p className="text-orange-100 text-lg">
              Monitor and control processing operations
            </p>
          </div>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Processing Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {overallStats.totalLines}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Lines
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Play className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {overallStats.activeLines}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Active Lines
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {overallStats.totalProcessed}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Items Processed
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {overallStats.averageEfficiency}%
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Avg Efficiency
              </p>
            </div>
          </div>
        </motion.div>

        {/* Processing Lines */}
        <div className="space-y-6">
          {processingLines.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {line.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(line.status)}`}>
                      {line.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Current Batch: {line.currentBatch}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Efficiency: {line.efficiency}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(line.status)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress</span>
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {line.itemsProcessed} / {line.itemsProcessed + line.itemsRemaining}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${line.color} h-3 rounded-full transition-all duration-300`}
                    style={{ 
                      width: `${line.status === 'maintenance' ? 0 : (line.itemsProcessed / (line.itemsProcessed + line.itemsRemaining)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className={`bg-gradient-to-r ${line.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Processed</span>
                  </div>
                  <p className="text-2xl font-bold">{line.itemsProcessed}</p>
                </div>
                
                <div className={`bg-gradient-to-r ${line.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Remaining</span>
                  </div>
                  <p className="text-2xl font-bold">{line.itemsRemaining}</p>
                </div>
                
                <div className={`bg-gradient-to-r ${line.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5" />
                    <span className="font-medium">Est. Completion</span>
                  </div>
                  <p className="text-lg font-bold">{line.estimatedCompletion}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                {line.status === 'active' ? (
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Pause className="h-4 w-4" />
                    <span>Pause Line</span>
                  </button>
                ) : line.status === 'paused' ? (
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Resume Line</span>
                  </button>
                ) : (
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <RotateCcw className="h-4 w-4" />
                    <span>Start Maintenance</span>
                  </button>
                )}
                
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Settings
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
