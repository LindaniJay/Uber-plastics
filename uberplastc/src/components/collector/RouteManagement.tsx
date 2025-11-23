'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Package,
  TrendingUp,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Route {
  id: string
  name: string
  status: 'scheduled' | 'active' | 'completed' | 'paused'
  progress: number
  totalStops: number
  completedStops: number
  estimatedDuration: string
  totalBottles: number
  actualBottles: number
  createdAt: string
  color: string
}

interface RouteManagementProps {
  routes: Route[]
  onRouteAction: (routeId: string, action: string) => void
  onEditRoute: (routeId: string) => void
  onDeleteRoute: (routeId: string) => void
  onDuplicateRoute: (routeId: string) => void
}

export default function RouteManagement({ 
  routes, 
  onRouteAction, 
  onEditRoute, 
  onDeleteRoute, 
  onDuplicateRoute 
}: RouteManagementProps) {
  const { darkMode } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')

  const filteredRoutes = routes
    .filter(route => 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || route.status === statusFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'status':
          return a.status.localeCompare(b.status)
        case 'progress':
          return b.progress - a.progress
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4 text-green-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'scheduled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getActionButton = (route: Route) => {
    switch (route.status) {
      case 'scheduled':
        return (
          <button
            onClick={() => onRouteAction(route.id, 'start')}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Start Route
          </button>
        )
      case 'active':
        return (
          <div className="flex space-x-1">
            <button
              onClick={() => onRouteAction(route.id, 'pause')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Pause
            </button>
            <button
              onClick={() => onRouteAction(route.id, 'complete')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Complete
            </button>
          </div>
        )
      case 'paused':
        return (
          <button
            onClick={() => onRouteAction(route.id, 'resume')}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Resume
          </button>
        )
      default:
        return (
          <button
            onClick={() => onRouteAction(route.id, 'view')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            View
          </button>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
              <option value="progress">Sort by Progress</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Routes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {route.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                    {route.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {getStatusIcon(route.status)}
                  <span>Created {new Date(route.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {route.completedStops}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Completed
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {route.totalStops}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Total Stops
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Est. Duration: {route.estimatedDuration}
              </span>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-4 w-4 text-gray-500" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Bottles: {route.actualBottles}/{route.totalBottles}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {getActionButton(route)}
              <button
                onClick={() => onEditRoute(route.id)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Edit className="h-3 w-3" />
              </button>
              <button
                onClick={() => onDuplicateRoute(route.id)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center`}
        >
          <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            No routes found
          </h3>
          <p className={`text-gray-600 dark:text-gray-300`}>
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first collection route to get started.'
            }
          </p>
        </motion.div>
      )}
    </div>
  )
}
