'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function CollectorRoutesPage() {
  const { darkMode } = useTheme()

  const routes = [
    {
      id: 1,
      name: 'Downtown Collection Route',
      status: 'active',
      progress: 75,
      totalStops: 12,
      completedStops: 9,
      estimatedTime: '2.5h',
      nextStop: '123 Main St',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      name: 'Residential Area Route',
      status: 'scheduled',
      progress: 0,
      totalStops: 8,
      completedStops: 0,
      estimatedTime: '1.8h',
      nextStop: '456 Oak Ave',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      name: 'Business District Route',
      status: 'completed',
      progress: 100,
      totalStops: 15,
      completedStops: 15,
      estimatedTime: '3.2h',
      nextStop: 'All completed',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-purple-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
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
            <Navigation className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Collection Routes
            </h1>
            <p className="text-green-100 text-lg">
              Manage and track your collection routes
            </p>
          </div>
        </motion.div>

        {/* Routes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(route.status)}
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {route.name}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  route.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  route.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {route.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress</span>
                    <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{route.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${route.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${route.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.completedStops}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.totalStops}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total Stops
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Est. Time: {route.estimatedTime}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Next: {route.nextStop}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <Link href={`/collector/routes/${route.id}`} className="flex-1">
                  <button className={`w-full bg-gradient-to-r ${route.color} text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300`}>
                    {route.status === 'active' ? 'Continue Route' : route.status === 'scheduled' ? 'Start Route' : 'View Details'}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add New Route Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/collector/routes/create">
            <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
              <Plus className="h-6 w-6" />
              <span>Create New Route</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
