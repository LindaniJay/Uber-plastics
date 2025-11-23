'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package,
  CheckCircle,
  AlertCircle,
  Navigation,
  Route,
  Calendar
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DepotTransportationPage() {
  const { darkMode } = useTheme()

  const shipments = [
    {
      id: 1,
      destination: 'Recycling Plant Alpha',
      address: '123 Industrial Blvd, Processing District',
      status: 'in_transit',
      truckId: 'TR-001',
      driver: 'John Smith',
      departureTime: '2024-01-14T08:00:00',
      estimatedArrival: '2024-01-14T12:30:00',
      cargo: '2,847 PET bottles (142.3kg)',
      progress: 65,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      destination: 'Processing Facility Beta',
      address: '456 Manufacturing St, Industrial Zone',
      status: 'scheduled',
      truckId: 'TR-002',
      driver: 'Sarah Johnson',
      departureTime: '2024-01-15T09:30:00',
      estimatedArrival: '2024-01-15T14:00:00',
      cargo: '1,892 HDPE containers (94.6kg)',
      progress: 0,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      destination: 'Waste Management Center',
      address: '789 Processing Ave, Recycling Hub',
      status: 'delivered',
      truckId: 'TR-003',
      driver: 'Mike Wilson',
      departureTime: '2024-01-13T10:15:00',
      estimatedArrival: '2024-01-13T15:45:00',
      cargo: '3,156 mixed plastic items (157.8kg)',
      progress: 100,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_transit':
        return <Truck className="h-5 w-5 text-blue-500" />
      case 'scheduled':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
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

  const totalStats = {
    totalShipments: shipments.length,
    inTransit: shipments.filter(s => s.status === 'in_transit').length,
    scheduled: shipments.filter(s => s.status === 'scheduled').length,
    delivered: shipments.filter(s => s.status === 'delivered').length
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
            <Truck className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Transportation Management
            </h1>
            <p className="text-orange-100 text-lg">
              Track and manage outgoing shipments
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
            Shipment Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Truck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.totalShipments}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Shipments
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Navigation className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.inTransit}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                In Transit
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.scheduled}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Scheduled
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.delivered}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Delivered
              </p>
            </div>
          </div>
        </motion.div>

        {/* Shipments List */}
        <div className="space-y-6">
          {shipments.map((shipment, index) => {
            const departure = formatDateTime(shipment.departureTime)
            const arrival = formatDateTime(shipment.estimatedArrival)
            return (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {shipment.destination}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {shipment.address}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Truck: {shipment.truckId} | Driver: {shipment.driver}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Departure: {departure.date} at {departure.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(shipment.status)}
                  </div>
                </div>

                {/* Progress Bar for in-transit shipments */}
                {shipment.status === 'in_transit' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Route Progress</span>
                      <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{shipment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${shipment.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${shipment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className={`bg-gradient-to-r ${shipment.color} p-4 rounded-lg text-white`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="h-5 w-5" />
                      <span className="font-medium">Cargo</span>
                    </div>
                    <p className="text-sm opacity-90">{shipment.cargo}</p>
                  </div>
                  
                  <div className={`bg-gradient-to-r ${shipment.color} p-4 rounded-lg text-white`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">Est. Arrival</span>
                    </div>
                    <p className="text-sm opacity-90">{arrival.date} at {arrival.time}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {shipment.status === 'scheduled' && (
                    <button className={`flex-1 bg-gradient-to-r ${shipment.color} text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300`}>
                      Start Shipment
                    </button>
                  )}
                  {shipment.status === 'in_transit' && (
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Update Progress
                    </button>
                  )}
                  {shipment.status === 'delivered' && (
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      View Delivery Report
                    </button>
                  )}
                  
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Track Route
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
