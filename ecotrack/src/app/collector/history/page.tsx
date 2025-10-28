'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  History, 
  Calendar, 
  MapPin, 
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function CollectorHistoryPage() {
  const { darkMode } = useTheme()

  const collectionHistory = [
    {
      id: 1,
      date: '2024-01-14',
      client: 'Green Office Building',
      address: '123 Business Ave, Downtown',
      bottlesCollected: 45,
      weight: '2.3kg',
      duration: '1.2h',
      status: 'completed',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      date: '2024-01-13',
      client: 'Eco School District',
      address: '456 Education St, School Area',
      bottlesCollected: 78,
      weight: '3.9kg',
      duration: '1.8h',
      status: 'completed',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      date: '2024-01-12',
      client: 'Community Center',
      address: '789 Community Blvd, Residential',
      bottlesCollected: 32,
      weight: '1.6kg',
      duration: '0.9h',
      status: 'completed',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      date: '2024-01-11',
      client: 'Shopping Mall',
      address: '321 Commerce St, Shopping District',
      bottlesCollected: 95,
      weight: '4.7kg',
      duration: '2.1h',
      status: 'completed',
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  const totalStats = {
    totalCollections: collectionHistory.length,
    totalBottles: collectionHistory.reduce((sum, item) => sum + item.bottlesCollected, 0),
    totalWeight: collectionHistory.reduce((sum, item) => sum + parseFloat(item.weight), 0).toFixed(1),
    totalHours: collectionHistory.reduce((sum, item) => sum + parseFloat(item.duration), 0).toFixed(1)
  }

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
            <History className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Collection History
            </h1>
            <p className="text-green-100 text-lg">
              View your past collection records
            </p>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Collection Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.totalCollections}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Collections
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.totalBottles}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Bottles Collected
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.totalWeight}kg
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Weight
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.totalHours}h
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Hours
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>All Time</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <span>This Week</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <span>This Month</span>
          </button>
        </motion.div>

        {/* Collection History List */}
        <div className="space-y-6">
          {collectionHistory.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {collection.client}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                      {collection.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {collection.address}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {new Date(collection.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`bg-gradient-to-r ${collection.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Bottles Collected</span>
                  </div>
                  <p className="text-2xl font-bold">{collection.bottlesCollected}</p>
                </div>
                
                <div className={`bg-gradient-to-r ${collection.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">Weight</span>
                  </div>
                  <p className="text-2xl font-bold">{collection.weight}</p>
                </div>
                
                <div className={`bg-gradient-to-r ${collection.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Duration</span>
                  </div>
                  <p className="text-2xl font-bold">{collection.duration}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
