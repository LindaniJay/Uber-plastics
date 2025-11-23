'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Navigation, 
  MapPin, 
  Clock, 
  Package, 
  Phone,
  User,
  Edit,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Trash2,
  Copy
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface RouteStop {
  id: string
  address: string
  contactName: string
  contactPhone: string
  expectedBottles: number
  actualBottles?: number
  status: 'pending' | 'completed' | 'skipped'
  notes: string
  completedAt?: string
}

interface RouteDetails {
  id: string
  name: string
  description: string
  status: 'scheduled' | 'active' | 'completed' | 'paused'
  progress: number
  totalStops: number
  completedStops: number
  estimatedDuration: string
  actualDuration?: string
  totalBottles: number
  actualBottles: number
  createdAt: string
  startedAt?: string
  completedAt?: string
  stops: RouteStop[]
}

export default function RouteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { darkMode } = useTheme()
  const router = useRouter()
  const [routeId, setRouteId] = useState<string>('')
  
  // Resolve params
  React.useEffect(() => {
    params.then((resolvedParams) => {
      setRouteId(resolvedParams.id)
    })
  }, [params])
  
  // Mock data - in a real app, this would come from an API
  const [route, setRoute] = useState<RouteDetails>({
    id: routeId,
    name: 'Downtown Collection Route',
    description: 'Primary collection route covering downtown business district',
    status: 'active',
    progress: 65,
    totalStops: 8,
    completedStops: 5,
    estimatedDuration: '2.5h',
    actualDuration: '1.8h',
    totalBottles: 240,
    actualBottles: 156,
    createdAt: '2024-01-14T08:00:00',
    startedAt: '2024-01-14T08:15:00',
    stops: [
      {
        id: '1',
        address: '123 Business Ave, Downtown',
        contactName: 'John Smith',
        contactPhone: '+1 (555) 123-4567',
        expectedBottles: 30,
        actualBottles: 32,
        status: 'completed',
        notes: 'Easy access, ground floor',
        completedAt: '2024-01-14T08:30:00'
      },
      {
        id: '2',
        address: '456 Commerce St, Downtown',
        contactName: 'Sarah Johnson',
        contactPhone: '+1 (555) 234-5678',
        expectedBottles: 25,
        actualBottles: 28,
        status: 'completed',
        notes: 'Use back entrance',
        completedAt: '2024-01-14T09:15:00'
      },
      {
        id: '3',
        address: '789 Market St, Downtown',
        contactName: 'Mike Chen',
        contactPhone: '+1 (555) 345-6789',
        expectedBottles: 40,
        actualBottles: 0,
        status: 'pending',
        notes: 'Call before arrival'
      },
      {
        id: '4',
        address: '321 Financial Blvd, Downtown',
        contactName: 'Lisa Rodriguez',
        contactPhone: '+1 (555) 456-7890',
        expectedBottles: 35,
        actualBottles: 0,
        status: 'pending',
        notes: 'Security clearance required'
      },
      {
        id: '5',
        address: '654 Corporate Plaza, Downtown',
        contactName: 'David Kim',
        contactPhone: '+1 (555) 567-8901',
        expectedBottles: 30,
        actualBottles: 0,
        status: 'pending',
        notes: 'Parking in basement'
      },
      {
        id: '6',
        address: '987 Innovation Center, Downtown',
        contactName: 'Emma Wilson',
        contactPhone: '+1 (555) 678-9012',
        expectedBottles: 45,
        actualBottles: 0,
        status: 'pending',
        notes: 'Building access code: 1234'
      },
      {
        id: '7',
        address: '147 Tech Hub, Downtown',
        contactName: 'Alex Thompson',
        contactPhone: '+1 (555) 789-0123',
        expectedBottles: 20,
        actualBottles: 0,
        status: 'pending',
        notes: 'Weekend collection only'
      },
      {
        id: '8',
        address: '258 Startup Alley, Downtown',
        contactName: 'Maria Garcia',
        contactPhone: '+1 (555) 890-1234',
        expectedBottles: 15,
        actualBottles: 0,
        status: 'pending',
        notes: 'Small collection, quick stop'
      }
    ]
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'skipped':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'skipped':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const updateStopStatus = (stopId: string, status: 'completed' | 'skipped', actualBottles?: number) => {
    setRoute(prev => ({
      ...prev,
      stops: prev.stops.map(stop => 
        stop.id === stopId 
          ? { 
              ...stop, 
              status, 
              actualBottles: actualBottles || stop.actualBottles || 0,
              completedAt: status === 'completed' ? new Date().toISOString() : undefined
            }
          : stop
      ),
      completedStops: status === 'completed' ? prev.completedStops + 1 : prev.completedStops,
      actualBottles: status === 'completed' ? prev.actualBottles + (actualBottles || 0) : prev.actualBottles,
      progress: Math.round(((status === 'completed' ? prev.completedStops + 1 : prev.completedStops) / prev.totalStops) * 100)
    }))
  }

  const startRoute = () => {
    setRoute(prev => ({
      ...prev,
      status: 'active',
      startedAt: new Date().toISOString()
    }))
  }

  const pauseRoute = () => {
    setRoute(prev => ({
      ...prev,
      status: 'paused'
    }))
  }

  const completeRoute = () => {
    setRoute(prev => ({
      ...prev,
      status: 'completed',
      completedAt: new Date().toISOString(),
      progress: 100
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Routes</span>
          </button>
          
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Navigation className="h-8 w-8 text-white" />
                <div>
                  <h1 className="text-3xl font-bold text-white">{route.name}</h1>
                  <p className="text-green-100">{route.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  route.status === 'active' ? 'bg-green-100 text-green-800' :
                  route.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  route.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {route.status}
                </span>
                <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                  <MoreVertical className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Route Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6`}
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Route Progress
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress</span>
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{route.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${route.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {route.completedStops}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Completed
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {route.totalStops - route.completedStops}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Remaining
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {route.actualBottles}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Bottles Collected
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Route Stops */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Collection Stops
              </h3>
              <div className="space-y-4">
                {route.stops.map((stop, index) => (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${
                      stop.status === 'completed' ? 'bg-green-50 dark:bg-green-900/20' :
                      stop.status === 'skipped' ? 'bg-red-50 dark:bg-red-900/20' :
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          stop.status === 'completed' ? 'bg-green-500 text-white' :
                          stop.status === 'skipped' ? 'bg-red-500 text-white' :
                          'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {stop.address}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {stop.contactName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {stop.contactPhone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(stop.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stop.status)}`}>
                          {stop.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Expected Bottles
                        </div>
                        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {stop.expectedBottles}
                        </div>
                      </div>
                      <div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Actual Bottles
                        </div>
                        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {stop.actualBottles || 0}
                        </div>
                      </div>
                    </div>

                    {stop.notes && (
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        <strong>Notes:</strong> {stop.notes}
                      </div>
                    )}

                    {stop.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            const actualBottles = prompt('Enter actual bottles collected:', stop.expectedBottles.toString())
                            if (actualBottles) {
                              updateStopStatus(stop.id, 'completed', parseInt(actualBottles))
                            }
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          Mark Complete
                        </button>
                        <button
                          onClick={() => updateStopStatus(stop.id, 'skipped')}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          Skip
                        </button>
                      </div>
                    )}

                    {stop.completedAt && (
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Completed: {new Date(stop.completedAt).toLocaleString()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Route Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6`}
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Route Actions
              </h3>
              <div className="space-y-3">
                {route.status === 'scheduled' && (
                  <button
                    onClick={startRoute}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Route</span>
                  </button>
                )}
                {route.status === 'active' && (
                  <>
                    <button
                      onClick={pauseRoute}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Pause className="h-4 w-4" />
                      <span>Pause Route</span>
                    </button>
                    <button
                      onClick={completeRoute}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Complete Route</span>
                    </button>
                  </>
                )}
                <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Route</span>
                </button>
                <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                  <Copy className="h-4 w-4" />
                  <span>Duplicate Route</span>
                </button>
              </div>
            </motion.div>

            {/* Route Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Route Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total Stops
                    </div>
                    <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.totalStops}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Expected Bottles
                    </div>
                    <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.totalBottles}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Duration
                    </div>
                    <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {route.actualDuration || route.estimatedDuration}
                    </div>
                  </div>
                </div>
                {route.startedAt && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Started At
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(route.startedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
