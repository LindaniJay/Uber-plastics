'use client'

import { motion } from 'framer-motion'
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Target,
  Navigation,
  Package,
  TrendingUp,
  Award,
  Calendar,
  Users,
  BarChart3,
  Home,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Globe,
  Star
} from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

export default function CollectorDashboard() {
  return (
    <ProtectedRoute allowedRoles={['collector']}>
      <CollectorDashboardContent />
    </ProtectedRoute>
  )
}

function CollectorDashboardContent() {
  const { user } = useAuth()
  const { darkMode } = useTheme()

  // Mock data for collector dashboard
  const collectorStats = {
    totalCollections: 156,
    todayEarnings: 45.50,
    weeklyEarnings: 320.75,
    pendingRequests: 8,
    completedToday: 12,
    averageRating: 4.8
  }

  const stats = [
    {
      icon: Package,
      title: 'Total Collections',
      value: collectorStats.totalCollections,
      change: `+${collectorStats.completedToday} today`,
      changeType: 'positive' as const,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: DollarSign,
      title: 'Today\'s Earnings',
      value: `STN ${collectorStats.todayEarnings}`,
      change: 'From collections',
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Target,
      title: 'Pending Requests',
      value: collectorStats.pendingRequests,
      change: 'Awaiting pickup',
      changeType: 'neutral' as const,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Award,
      title: 'Rating',
      value: collectorStats.averageRating,
      change: 'Customer satisfaction',
      changeType: 'positive' as const,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const quickActions = [
    {
      title: 'View Requests',
      description: 'See available pickup requests',
      icon: MapPin,
      color: 'from-blue-500 to-indigo-600',
      href: '/collector/routes'
    },
    {
      title: 'Navigation',
      description: 'Navigate to next pickup',
      icon: Navigation,
      color: 'from-green-500 to-emerald-600',
      href: '/collector/navigation'
    },
    {
      title: 'Schedule',
      description: 'View your collection schedule',
      icon: Calendar,
      color: 'from-purple-500 to-pink-600',
      href: '/collector/schedule'
    },
    {
      title: 'Performance',
      description: 'Track your earnings & stats',
      icon: BarChart3,
      color: 'from-teal-500 to-cyan-600',
      href: '/collector/performance'
    }
  ]

  const pendingRequests = [
    {
      id: 1,
      location: '123 Main St, Downtown',
      bottles: 25,
      distance: '2.3 km',
      time: '2:30 PM',
      status: 'pending',
      earnings: 12.50
    },
    {
      id: 2,
      location: '456 Oak Ave, Midtown',
      bottles: 18,
      distance: '1.8 km',
      time: '3:15 PM',
      status: 'pending',
      earnings: 9.00
    },
    {
      id: 3,
      location: '789 Pine St, Uptown',
      bottles: 32,
      distance: '4.1 km',
      time: '4:00 PM',
      status: 'pending',
      earnings: 16.00
    }
  ]

  const recentCollections = [
    {
      id: 1,
      location: '321 Elm St',
      bottles: 20,
      earnings: 10.00,
      time: '1 hour ago',
      status: 'completed',
      customer: 'John Smith',
      rating: 5
    },
    {
      id: 2,
      location: '654 Maple Ave',
      bottles: 15,
      earnings: 7.50,
      time: '2 hours ago',
      status: 'completed',
      customer: 'Sarah Johnson',
      rating: 4
    },
    {
      id: 3,
      location: '987 Cedar Blvd',
      bottles: 28,
      earnings: 14.00,
      time: '3 hours ago',
      status: 'completed',
      customer: 'Mike Chen',
      rating: 5
    }
  ]

  const performanceMetrics = {
    totalEarnings: 1250.75,
    averageRating: 4.8,
    totalCollections: 156,
    completionRate: 94.2,
    customerSatisfaction: 96.5,
    onTimeDelivery: 98.1
  }

  const weeklySchedule = [
    {
      day: 'Monday',
      collections: 8,
      earnings: 45.50,
      status: 'completed'
    },
    {
      day: 'Tuesday',
      collections: 12,
      earnings: 67.25,
      status: 'completed'
    },
    {
      day: 'Wednesday',
      collections: 6,
      earnings: 32.00,
      status: 'completed'
    },
    {
      day: 'Thursday',
      collections: 10,
      earnings: 55.75,
      status: 'completed'
    },
    {
      day: 'Friday',
      collections: 15,
      earnings: 78.50,
      status: 'in-progress'
    },
    {
      day: 'Saturday',
      collections: 8,
      earnings: 42.00,
      status: 'scheduled'
    },
    {
      day: 'Sunday',
      collections: 5,
      earnings: 28.75,
      status: 'scheduled'
    }
  ]

  const topCustomers = [
    {
      name: 'Green Office Building',
      collections: 45,
      totalEarnings: 225.00,
      lastCollection: '2 days ago',
      rating: 5
    },
    {
      name: 'Eco Restaurant',
      collections: 32,
      totalEarnings: 160.00,
      lastCollection: '1 day ago',
      rating: 5
    },
    {
      name: 'Sustainable Hotel',
      collections: 28,
      totalEarnings: 140.00,
      lastCollection: '3 days ago',
      rating: 4
    }
  ]

  const upcomingChallenges = [
    {
      title: 'Weekly Collection Goal',
      description: 'Complete 50 collections this week',
      progress: 35,
      target: 50,
      reward: 'Bonus $50',
      deadline: '3 days left'
    },
    {
      title: 'Perfect Week',
      description: 'Maintain 100% on-time delivery',
      progress: 4,
      target: 7,
      reward: 'Extra $25',
      deadline: '3 days left'
    },
    {
      title: 'Customer Satisfaction',
      description: 'Achieve 5-star rating average',
      progress: 4.8,
      target: 5.0,
      reward: 'Premium badge',
      deadline: '1 week left'
    }
  ]

  const routeOptimization = {
    totalDistance: 45.2,
    estimatedTime: 3.5,
    fuelEfficiency: 8.2,
    co2Saved: 2.1,
    optimizedRoutes: 3
  }

  return (
    <ProtectedRoute allowedRoles={['collector']}>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className={`text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Welcome, {user?.name || 'Waste Collector'}! 🚛
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your collection routes and track your earnings.
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

              {/* Routes Management */}
              <Link
                href="/collector/routes"
                className="card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                      Routes
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage collection routes
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 ml-auto" />
                </div>
              </Link>

              {/* Performance */}
              <Link
                href="/collector/performance"
                className="card hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Performance
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track earnings & stats
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 ml-auto" />
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
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300 group hover:shadow-lg hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-4 h-4 text-yellow-500" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Pending Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pending Requests
              </h2>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {request.location}
                        </span>
                      </div>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        STN ${request.earnings}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{request.bottles} bottles</span>
                      <span>{request.distance}</span>
                      <span>{request.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Collections
            </h2>
            <div className="space-y-4">
              {recentCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {collection.location}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {collection.bottles} bottles • {collection.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      STN ${collection.earnings}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Completed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  STN ${performanceMetrics.totalEarnings}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Earnings
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {performanceMetrics.averageRating}/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {performanceMetrics.completionRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Completion Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {performanceMetrics.customerSatisfaction}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Customer Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {performanceMetrics.onTimeDelivery}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  On-Time Delivery
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  {performanceMetrics.totalCollections}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Collections
                </div>
              </div>
            </div>
          </motion.div>

          {/* Weekly Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Weekly Schedule
            </h2>
            <div className="space-y-3">
              {weeklySchedule.map((day, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    day.status === 'completed' ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20' :
                    day.status === 'in-progress' ? 'border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20' :
                    'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        day.status === 'completed' ? 'bg-green-500' :
                        day.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {day.day}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {day.collections} collections
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        STN ${day.earnings}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {day.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Top Customers
            </h2>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {customer.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {customer.collections} collections • Last: {customer.lastCollection}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 dark:text-green-400">
                      STN ${customer.totalEarnings}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < customer.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Upcoming Challenges
            </h2>
            <div className="space-y-4">
              {upcomingChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {challenge.description}
                      </p>
                    </div>
                    <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                      {challenge.reward}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-gray-900 dark:text-white">
                        {challenge.progress}/{challenge.target}
                        {challenge.title === 'Customer Satisfaction' && '/5.0'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Reward: {challenge.reward}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {challenge.deadline}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Route Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="card mt-8"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Route Optimization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {routeOptimization.totalDistance}km
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Distance
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {routeOptimization.estimatedTime}h
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Estimated Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {routeOptimization.fuelEfficiency}L/100km
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Fuel Efficiency
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {routeOptimization.co2Saved}kg
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  CO₂ Saved
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {routeOptimization.optimizedRoutes}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Optimized Routes
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}