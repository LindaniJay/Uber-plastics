'use client'

import { motion } from 'framer-motion'
import { 
  Warehouse, 
  Package, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  BarChart3,
  Truck,
  AlertCircle,
  DollarSign,
  Target,
  Calendar,
  Users,
  Home,
  ArrowRight,
  Settings,
  FileText,
  Globe,
  Recycle
} from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

export default function DepotDashboard() {
  return (
    <ProtectedRoute allowedRoles={['depot']}>
      <DepotDashboardContent />
    </ProtectedRoute>
  )
}

function DepotDashboardContent() {
  const { user } = useAuth()
  const { darkMode } = useTheme()

  // Mock data for depot dashboard
  const depotStats = {
    totalProcessed: 2847,
    pendingVerification: 12,
    todayProcessed: 156,
    totalValue: 1423.50,
    processingRate: 94.2,
    inventoryLevel: 78
  }

  const stats = [
    {
      icon: Package,
      title: 'Total Processed',
      value: depotStats.totalProcessed,
      change: `+${depotStats.todayProcessed} today`,
      changeType: 'positive' as const,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Pending Verification',
      value: depotStats.pendingVerification,
      change: 'Awaiting review',
      changeType: 'neutral' as const,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'Processing Rate',
      value: `${depotStats.processingRate}%`,
      change: 'Efficiency score',
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: DollarSign,
      title: 'Total Value',
      value: `$${depotStats.totalValue}`,
      change: 'Processed materials',
      changeType: 'positive' as const,
      color: 'from-blue-500 to-indigo-600'
    }
  ]

  const quickActions = [
    {
      title: 'Verification Queue',
      description: 'Review pending collections',
      icon: CheckCircle,
      color: 'from-blue-500 to-indigo-600',
      href: '/depot/processing'
    },
    {
      title: 'Inventory Management',
      description: 'Track processed materials',
      icon: Package,
      color: 'from-green-500 to-emerald-600',
      href: '/depot/inventory'
    },
    {
      title: 'Analytics',
      description: 'View processing analytics',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      href: '/depot/analytics'
    },
    {
      title: 'Transportation',
      description: 'Manage outgoing shipments',
      icon: Truck,
      color: 'from-teal-500 to-cyan-600',
      href: '/depot/transportation'
    }
  ]

  const verificationQueue = [
    {
      id: 1,
      collector: 'John Smith',
      bottles: 25,
      location: 'Downtown Collection',
      time: '2 hours ago',
      status: 'pending',
      value: 12.50
    },
    {
      id: 2,
      collector: 'Sarah Johnson',
      bottles: 18,
      location: 'Midtown Collection',
      time: '3 hours ago',
      status: 'pending',
      value: 9.00
    },
    {
      id: 3,
      collector: 'Mike Chen',
      bottles: 32,
      location: 'Uptown Collection',
      time: '4 hours ago',
      status: 'pending',
      value: 16.00
    }
  ]

  const recentProcessing = [
    {
      id: 1,
      collector: 'Alice Brown',
      bottles: 20,
      value: 10.00,
      time: '1 hour ago',
      status: 'verified',
      material: 'PET',
      quality: 'high'
    },
    {
      id: 2,
      collector: 'Bob Wilson',
      bottles: 15,
      value: 7.50,
      time: '2 hours ago',
      status: 'verified',
      material: 'HDPE',
      quality: 'medium'
    },
    {
      id: 3,
      collector: 'Carol Davis',
      bottles: 28,
      value: 14.00,
      time: '3 hours ago',
      status: 'verified',
      material: 'PET',
      quality: 'high'
    }
  ]

  const inventoryStatus = {
    totalBottles: 2847,
    petBottles: 1892,
    hdpeBottles: 623,
    otherBottles: 332,
    processingCapacity: 5000,
    utilizationRate: 56.9
  }

  const qualityMetrics = {
    averageQuality: 4.2,
    contaminationRate: 3.8,
    processingEfficiency: 94.2,
    wasteReduction: 87.5,
    recyclingRate: 96.8
  }

  const environmentalImpact = {
    co2Saved: 125.6,
    energySaved: 2500,
    waterSaved: 1800,
    landfillDiverted: 2847,
    equivalentTrees: 315
  }

  const processingSchedule = [
    {
      time: '09:00',
      process: 'Sorting & Inspection',
      status: 'completed',
      bottles: 150,
      efficiency: 95
    },
    {
      time: '10:30',
      process: 'Cleaning & Preparation',
      status: 'in-progress',
      bottles: 200,
      efficiency: 92
    },
    {
      time: '12:00',
      process: 'Shredding & Melting',
      status: 'scheduled',
      bottles: 300,
      efficiency: 0
    },
    {
      time: '14:00',
      process: 'Pellet Formation',
      status: 'scheduled',
      bottles: 250,
      efficiency: 0
    },
    {
      time: '16:00',
      process: 'Quality Control',
      status: 'scheduled',
      bottles: 200,
      efficiency: 0
    }
  ]

  const topCollectors = [
    {
      name: 'Green Collection Co.',
      totalBottles: 1250,
      qualityScore: 4.8,
      lastDelivery: '2 hours ago',
      totalValue: 625.00
    },
    {
      name: 'Eco Waste Solutions',
      totalBottles: 980,
      qualityScore: 4.6,
      lastDelivery: '4 hours ago',
      totalValue: 490.00
    },
    {
      name: 'Sustainable Collectors',
      totalBottles: 750,
      qualityScore: 4.9,
      lastDelivery: '6 hours ago',
      totalValue: 375.00
    }
  ]

  const upcomingShipments = [
    {
      destination: 'Recycling Plant Alpha',
      material: 'PET Pellets',
      quantity: 500,
      scheduledDate: '2024-01-20',
      status: 'ready'
    },
    {
      destination: 'Manufacturing Co. Beta',
      material: 'HDPE Pellets',
      quantity: 300,
      scheduledDate: '2024-01-22',
      status: 'processing'
    },
    {
      destination: 'Export Terminal',
      material: 'Mixed Pellets',
      quantity: 800,
      scheduledDate: '2024-01-25',
      status: 'preparing'
    }
  ]

  return (
    <ProtectedRoute allowedRoles={['depot']}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className={`text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Welcome, {user?.name || 'Recycling Depot'}! 🏭
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage the recycling pipeline and process collected materials.
            </p>
          </motion.div>

          {/* Navigation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Home Navigation */}
              <Link
                href="/"
                className="card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      Home
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Back to main page
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 ml-auto" />
                </div>
              </Link>

              {/* Eco Insights Navigation */}
              <Link
                href="/insights"
                className="card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                      Eco Insights
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Environmental data & analytics
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 ml-auto" />
                </div>
              </Link>

              {/* Processing Queue */}
              <Link
                href="/depot/processing"
                className="card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Processing
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Verification queue
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 ml-auto" />
                </div>
              </Link>

              {/* Analytics */}
              <Link
                href="/depot/analytics"
                className="card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      Analytics
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Processing insights
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 ml-auto" />
                </div>
              </Link>

              {/* Progress Tracker */}
              <Link
                href="/progress"
                className="card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      Progress Tracker
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Impact vs country data
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 ml-auto" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 group hover:shadow-lg hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-4 h-4 text-purple-500" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Verification Queue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Verification Queue
              </h2>
              <div className="space-y-4">
                {verificationQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.collector}
                        </span>
                      </div>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        ${item.value}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{item.bottles} bottles</span>
                      <span>{item.location}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Processing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Processing
            </h2>
            <div className="space-y-4">
              {recentProcessing.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.collector}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.bottles} bottles • {item.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      ${item.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Verified
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Inventory Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Inventory Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {inventoryStatus.totalBottles.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Bottles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {inventoryStatus.petBottles}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  PET Bottles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {inventoryStatus.hdpeBottles}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  HDPE Bottles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {inventoryStatus.utilizationRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Capacity Utilization
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {inventoryStatus.processingCapacity.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Processing Capacity
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  {inventoryStatus.otherBottles}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Other Materials
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quality Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quality Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {qualityMetrics.averageQuality}/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Average Quality
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {qualityMetrics.contaminationRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Contamination Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {qualityMetrics.processingEfficiency}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Processing Efficiency
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {qualityMetrics.wasteReduction}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Waste Reduction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {qualityMetrics.recyclingRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Recycling Rate
                </div>
              </div>
            </div>
          </motion.div>

          {/* Processing Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Processing Schedule
            </h2>
            <div className="space-y-3">
              {processingSchedule.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    item.status === 'completed' ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20' :
                    item.status === 'in-progress' ? 'border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20' :
                    'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {item.time} - {item.process}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.bottles} bottles
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        {item.efficiency}% efficiency
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {item.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Collectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Top Collectors
            </h2>
            <div className="space-y-4">
              {topCollectors.map((collector, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {collector.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {collector.totalBottles} bottles • Last: {collector.lastDelivery}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 dark:text-green-400">
                      ${collector.totalValue}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">
                      Quality: {collector.qualityScore}/5
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Shipments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Upcoming Shipments
            </h2>
            <div className="space-y-3">
              {upcomingShipments.map((shipment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {shipment.destination}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4" />
                          <span>{shipment.material} - {shipment.quantity}kg</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{shipment.scheduledDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        shipment.status === 'ready' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        shipment.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {shipment.status}
                      </span>
                      <button className="mt-2 px-3 py-1 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors duration-200">
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progress Summary Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="card mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Progress Towards 2030 Goals
              </h2>
              <Link
                href="/progress"
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>View Full Analysis</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Progress */}
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  23.4%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Overall Progress
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full" style={{ width: '23.4%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Towards 2030 plastic reduction goals
                </div>
              </div>

              {/* Country Impact */}
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  0.02%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Country Impact
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Of {depotStats.totalProcessed.toLocaleString()} bottles vs country's annual waste
                </div>
                <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                  +15.7% vs last month
                </div>
              </div>

              {/* Efficiency Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  94.2%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Efficiency Score
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Processing efficiency vs industry standards
                </div>
                <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                  Above average performance
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
                    Key Insight
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Your depot is processing plastic at 11x the national recycling rate, making significant progress towards 2030 environmental goals. 
                    <Link href="/progress" className="ml-1 text-emerald-600 dark:text-emerald-400 hover:underline">
                      View detailed analysis →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Environmental Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Environmental Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {environmentalImpact.co2Saved}kg
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  CO₂ Saved
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {environmentalImpact.energySaved}kWh
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Energy Saved
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {environmentalImpact.waterSaved}L
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Water Saved
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {environmentalImpact.landfillDiverted.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Landfill Diverted
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {environmentalImpact.equivalentTrees}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Trees Equivalent
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}