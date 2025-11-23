'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Package, 
  Warehouse, 
  Truck, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DepotInventoryPage() {
  const { darkMode } = useTheme()

  const inventoryItems = [
    {
      id: 1,
      type: 'PET Bottles',
      quantity: 1247,
      weight: '62.3kg',
      status: 'processed',
      location: 'A-12',
      lastUpdated: '2024-01-14',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      type: 'HDPE Containers',
      quantity: 892,
      weight: '44.6kg',
      status: 'processing',
      location: 'B-08',
      lastUpdated: '2024-01-14',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      type: 'Mixed Plastic',
      quantity: 634,
      weight: '31.7kg',
      status: 'pending',
      location: 'C-15',
      lastUpdated: '2024-01-13',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      type: 'LDPE Bags',
      quantity: 423,
      weight: '21.1kg',
      status: 'processed',
      location: 'A-05',
      lastUpdated: '2024-01-14',
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const totalStats = {
    totalItems: inventoryItems.length,
    totalQuantity: inventoryItems.reduce((sum, item) => sum + item.quantity, 0),
    totalWeight: inventoryItems.reduce((sum, item) => sum + parseFloat(item.weight), 0).toFixed(1),
    processedItems: inventoryItems.filter(item => item.status === 'processed').length
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
            <Package className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Inventory Management
            </h1>
            <p className="text-orange-100 text-lg">
              Track and manage plastic waste inventory
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
            Inventory Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.totalItems}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Item Types
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.totalQuantity}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Items
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Warehouse className="h-8 w-8 text-purple-600 dark:text-purple-400" />
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
                <CheckCircle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalStats.processedItems}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Processed
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter and Search */}
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
                placeholder="Search inventory..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>All Status</span>
          </button>
        </motion.div>

        {/* Inventory Items */}
        <div className="space-y-6">
          {inventoryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.type}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Warehouse className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Location: {item.location}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Last Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`bg-gradient-to-r ${item.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Quantity</span>
                  </div>
                  <p className="text-2xl font-bold">{item.quantity}</p>
                </div>
                
                <div className={`bg-gradient-to-r ${item.color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">Weight</span>
                  </div>
                  <p className="text-2xl font-bold">{item.weight}</p>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className={`flex-1 bg-gradient-to-r ${item.color} text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300`}>
                  Update Status
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
