'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Clock, 
  Calendar, 
  MapPin, 
  User,
  Plus,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function CollectorSchedulePage() {
  const { darkMode } = useTheme()

  const scheduledPickups = [
    {
      id: 1,
      client: 'Green Office Building',
      address: '123 Business Ave, Downtown',
      scheduledTime: '2024-01-15T09:00:00',
      status: 'pending',
      type: 'Plastic Bottles',
      quantity: '50 bottles',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      client: 'Eco School District',
      address: '456 Education St, School Area',
      scheduledTime: '2024-01-15T14:30:00',
      status: 'confirmed',
      type: 'Mixed Plastic',
      quantity: '120 bottles',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      client: 'Community Center',
      address: '789 Community Blvd, Residential',
      scheduledTime: '2024-01-16T10:00:00',
      status: 'pending',
      type: 'PET Bottles',
      quantity: '75 bottles',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
            <Calendar className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Schedule Pickups
            </h1>
            <p className="text-green-100 text-lg">
              Manage your collection schedule
            </p>
          </div>
        </motion.div>

        {/* Scheduled Pickups */}
        <div className="space-y-6 mb-8">
          {scheduledPickups.map((pickup, index) => {
            const { date, time } = formatDateTime(pickup.scheduledTime)
            return (
              <motion.div
                key={pickup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {pickup.client}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pickup.status)}`}>
                        {pickup.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {pickup.address}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {date} at {time}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className={`bg-gradient-to-r ${pickup.color} p-4 rounded-lg text-white`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-5 w-5 bg-white rounded" />
                      <span className="font-medium">Collection Type</span>
                    </div>
                    <p className="text-sm opacity-90">{pickup.type}</p>
                  </div>
                  
                  <div className={`bg-gradient-to-r ${pickup.color} p-4 rounded-lg text-white`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-5 w-5" />
                      <span className="font-medium">Expected Quantity</span>
                    </div>
                    <p className="text-sm opacity-90">{pickup.quantity}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className={`flex-1 bg-gradient-to-r ${pickup.color} text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300`}>
                    {pickup.status === 'confirmed' ? 'Start Collection' : 'Confirm Pickup'}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Add New Pickup Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
            <Plus className="h-6 w-6" />
            <span>Schedule New Pickup</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
