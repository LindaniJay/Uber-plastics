'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Navigation, 
  MapPin, 
  Clock, 
  Package, 
  Route,
  Play,
  Pause,
  RotateCcw,
  Target,
  Truck,
  CheckCircle,
  AlertCircle,
  Zap,
  Compass
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Location {
  id: string
  name: string
  address: string
  coordinates: [number, number]
  bottles: number
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  estimatedTime: string
  contactName: string
  contactPhone: string
  notes: string
}

interface RoutePoint {
  id: string
  coordinates: [number, number]
  type: 'start' | 'pickup' | 'end'
  location?: Location
}

export default function NavigationPage() {
  const { darkMode } = useTheme()
  const router = useRouter()
  
  // Mock locations with coordinates
  const [locations] = useState<Location[]>([
    {
      id: '1',
      name: 'Downtown Office Complex',
      address: '123 Main St, Downtown',
      coordinates: [40.7128, -74.0060],
      bottles: 25,
      priority: 'high',
      status: 'pending',
      estimatedTime: '15 min',
      contactName: 'Sarah Johnson',
      contactPhone: '+1 (555) 123-4567',
      notes: 'Building A, 3rd floor'
    },
    {
      id: '2',
      name: 'Midtown Shopping Center',
      address: '456 Oak Ave, Midtown',
      coordinates: [40.7589, -73.9851],
      bottles: 18,
      priority: 'medium',
      status: 'pending',
      estimatedTime: '12 min',
      contactName: 'Mike Chen',
      contactPhone: '+1 (555) 234-5678',
      notes: 'Loading dock entrance'
    },
    {
      id: '3',
      name: 'Uptown Residential',
      address: '789 Pine St, Uptown',
      coordinates: [40.7831, -73.9712],
      bottles: 32,
      priority: 'high',
      status: 'pending',
      estimatedTime: '18 min',
      contactName: 'Emily Rodriguez',
      contactPhone: '+1 (555) 345-6789',
      notes: 'Gate code: 1234'
    },
    {
      id: '4',
      name: 'Business District',
      address: '321 Commerce Blvd',
      coordinates: [40.7505, -73.9934],
      bottles: 15,
      priority: 'low',
      status: 'pending',
      estimatedTime: '10 min',
      contactName: 'David Kim',
      contactPhone: '+1 (555) 456-7890',
      notes: 'Parking in rear'
    },
    {
      id: '5',
      name: 'Tech Campus',
      address: '654 Innovation Dr',
      coordinates: [40.7282, -73.7949],
      bottles: 28,
      priority: 'medium',
      status: 'pending',
      estimatedTime: '20 min',
      contactName: 'Alex Thompson',
      contactPhone: '+1 (555) 567-8901',
      notes: 'Security badge required'
    }
  ])

  const [currentLocation] = useState<[number, number]>([40.7128, -74.0060]) // Starting point
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentRoute, setCurrentRoute] = useState<RoutePoint[]>([])
  const [routeOptimized, setRouteOptimized] = useState(false)
  const [totalDistance, setTotalDistance] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  // Calculate optimized route
  useEffect(() => {
    if (locations.length > 0) {
      calculateOptimizedRoute()
    }
  }, [locations])

  const calculateOptimizedRoute = () => {
    // Simple route optimization algorithm (nearest neighbor)
    const unvisited = [...locations]
    const route: RoutePoint[] = []
    
    // Start point
    route.push({
      id: 'start',
      coordinates: currentLocation,
      type: 'start'
    })
    
    let current = currentLocation
    let totalDist = 0
    let totalTime = 0
    
    while (unvisited.length > 0) {
      // Find nearest unvisited location
      let nearestIndex = 0
      let nearestDistance = calculateDistance(current, unvisited[0].coordinates)
      
      for (let i = 1; i < unvisited.length; i++) {
        const distance = calculateDistance(current, unvisited[i].coordinates)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = i
        }
      }
      
      const nearest = unvisited[nearestIndex]
      route.push({
        id: nearest.id,
        coordinates: nearest.coordinates,
        type: 'pickup',
        location: nearest
      })
      
      totalDist += nearestDistance
      totalTime += parseInt(nearest.estimatedTime)
      current = nearest.coordinates
      unvisited.splice(nearestIndex, 1)
    }
    
    // End point (return to depot)
    const depotCoords: [number, number] = [40.7128, -74.0060]
    route.push({
      id: 'end',
      coordinates: depotCoords,
      type: 'end'
    })
    
    totalDist += calculateDistance(current, depotCoords)
    totalTime += 15 // Return to depot time
    
    setCurrentRoute(route)
    setTotalDistance(Math.round(totalDist * 10) / 10)
    setTotalTime(totalTime)
    setRouteOptimized(true)
  }

  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    // Simple distance calculation (not accurate for real-world use)
    const lat1 = coord1[0]
    const lon1 = coord1[1]
    const lat2 = coord2[0]
    const lon2 = coord2[1]
    
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const startNavigation = () => {
    setIsNavigating(true)
    // In a real app, this would integrate with GPS navigation
  }

  const stopNavigation = () => {
    setIsNavigating(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900'
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900'
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-100 dark:bg-green-900'
      case 'in-progress': return 'text-blue-500 bg-blue-100 dark:bg-blue-900'
      case 'pending': return 'text-gray-500 bg-gray-100 dark:bg-gray-900'
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900'
    }
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
            <span>Back to Dashboard</span>
          </button>
          
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Navigation className="h-8 w-8 text-white" />
                <div>
                  <h1 className="text-3xl font-bold text-white">Smart Navigation</h1>
                  <p className="text-green-100">Optimized routes with real-time tracking</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {!isNavigating ? (
                  <button
                    onClick={startNavigation}
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Navigation</span>
                  </button>
                ) : (
                  <button
                    onClick={stopNavigation}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <Pause className="h-5 w-5" />
                    <span>Stop Navigation</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Route Map
                </h3>
                <div className="flex items-center space-x-2">
                  <Compass className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Interactive Map</span>
                </div>
              </div>
              
              {/* Mock Map Container */}
              <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                      Interactive Map
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {routeOptimized ? 'Optimized route calculated' : 'Calculating optimal route...'}
                    </p>
                    {isNavigating && (
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="animate-pulse bg-green-500 h-2 w-2 rounded-full"></div>
                        <div className="animate-pulse bg-green-500 h-2 w-2 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                        <div className="animate-pulse bg-green-500 h-2 w-2 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                        <span className="text-sm text-green-600 font-medium">Navigating...</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Route Points Overlay */}
                {currentRoute.map((point, index) => (
                  <div
                    key={point.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index % 2) * 20}%`
                    }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      point.type === 'start' ? 'bg-green-500' :
                      point.type === 'end' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}>
                      {point.type === 'start' ? 'S' : point.type === 'end' ? 'E' : index}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Route Info */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalDistance} km</div>
                  <div className="text-sm text-gray-500">Total Distance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalTime} min</div>
                  <div className="text-sm text-gray-500">Estimated Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{locations.length}</div>
                  <div className="text-sm text-gray-500">Pickup Stops</div>
                </div>
              </div>
            </motion.div>

            {/* Route Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Route Details
              </h3>
              <div className="space-y-3">
                {currentRoute.map((point, index) => (
                  <div
                    key={point.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      point.type === 'start' ? 'bg-green-50 dark:bg-green-900' :
                      point.type === 'end' ? 'bg-red-50 dark:bg-red-900' :
                      'bg-blue-50 dark:bg-blue-900'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      point.type === 'start' ? 'bg-green-500' :
                      point.type === 'end' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}>
                      {point.type === 'start' ? 'S' : point.type === 'end' ? 'E' : index}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {point.type === 'start' ? 'Starting Point' :
                         point.type === 'end' ? 'Return to Depot' :
                         point.location?.name}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {point.type === 'start' ? 'Current Location' :
                         point.type === 'end' ? 'End of Route' :
                         point.location?.address}
                      </div>
                    </div>
                    {point.location && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {point.location.bottles} bottles
                        </div>
                        <div className="text-xs text-gray-500">
                          {point.location.estimatedTime}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Navigation Controls
              </h3>
              <div className="space-y-3">
                <button
                  onClick={calculateOptimizedRoute}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Route className="h-4 w-4" />
                  <span>Recalculate Route</span>
                </button>
                <button
                  onClick={() => setRouteOptimized(false)}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset Route</span>
                </button>
              </div>
            </motion.div>

            {/* Pickup Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Pickup Locations
              </h3>
              <div className="space-y-3">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedLocation?.id === location.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {location.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(location.priority)}`}>
                          {location.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                          {location.status}
                        </span>
                      </div>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                      {location.address}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Package className="h-3 w-3 text-gray-500" />
                          <span>{location.bottles} bottles</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span>{location.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
