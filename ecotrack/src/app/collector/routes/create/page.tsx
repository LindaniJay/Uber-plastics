'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Navigation, 
  MapPin, 
  Clock, 
  Package, 
  Plus, 
  Trash2,
  Save,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface RouteStop {
  id: string
  address: string
  contactName: string
  contactPhone: string
  expectedBottles: number
  notes: string
}

export default function CreateRoutePage() {
  const { darkMode } = useTheme()
  const router = useRouter()
  const [routeName, setRouteName] = useState('')
  const [routeDescription, setRouteDescription] = useState('')
  const [estimatedDuration, setEstimatedDuration] = useState('')
  const [stops, setStops] = useState<RouteStop[]>([
    {
      id: '1',
      address: '',
      contactName: '',
      contactPhone: '',
      expectedBottles: 0,
      notes: ''
    }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const addStop = () => {
    const newStop: RouteStop = {
      id: Date.now().toString(),
      address: '',
      contactName: '',
      contactPhone: '',
      expectedBottles: 0,
      notes: ''
    }
    setStops([...stops, newStop])
  }

  const removeStop = (stopId: string) => {
    if (stops.length > 1) {
      setStops(stops.filter(stop => stop.id !== stopId))
    }
  }

  const updateStop = (stopId: string, field: keyof RouteStop, value: string | number) => {
    setStops(stops.map(stop => 
      stop.id === stopId ? { ...stop, [field]: value } : stop
    ))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const routeData = {
      name: routeName,
      description: routeDescription,
      estimatedDuration,
      stops: stops.filter(stop => stop.address.trim() !== ''),
      totalBottles: stops.reduce((sum, stop) => sum + stop.expectedBottles, 0),
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    }

    // Here you would typically save to your backend
    console.log('Route created:', routeData)
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Redirect after success
    setTimeout(() => {
      router.push('/collector/routes')
    }, 2000)
  }

  const isFormValid = routeName.trim() !== '' && 
    stops.some(stop => stop.address.trim() !== '') &&
    estimatedDuration.trim() !== ''

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-4">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Route Created Successfully!
            </h2>
            <p className={`text-gray-600 dark:text-gray-300 mb-4`}>
              Your new collection route has been created and is ready to use.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting to routes page...
            </div>
          </div>
        </motion.div>
      </div>
    )
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
            <div className="flex items-center space-x-3">
              <Navigation className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Create New Route</h1>
                <p className="text-green-100">Set up a new collection route with stops</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Route Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6`}
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Route Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Route Name *
                  </label>
                  <input
                    type="text"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    placeholder="e.g., Downtown Collection Route"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Estimated Duration *
                  </label>
                  <input
                    type="text"
                    value={estimatedDuration}
                    onChange={(e) => setEstimatedDuration(e.target.value)}
                    placeholder="e.g., 2.5 hours"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Description
                </label>
                <textarea
                  value={routeDescription}
                  onChange={(e) => setRouteDescription(e.target.value)}
                  placeholder="Describe the route, special instructions, or notes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Route Stops */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Collection Stops
                </h3>
                <button
                  onClick={addStop}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Stop</span>
                </button>
              </div>

              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Stop {index + 1}
                      </h4>
                      {stops.length > 1 && (
                        <button
                          onClick={() => removeStop(stop.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Address *
                        </label>
                        <input
                          type="text"
                          value={stop.address}
                          onChange={(e) => updateStop(stop.id, 'address', e.target.value)}
                          placeholder="123 Main St, City, State"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={stop.contactName}
                          onChange={(e) => updateStop(stop.id, 'contactName', e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={stop.contactPhone}
                          onChange={(e) => updateStop(stop.id, 'contactPhone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Expected Bottles
                        </label>
                        <input
                          type="number"
                          value={stop.expectedBottles}
                          onChange={(e) => updateStop(stop.id, 'expectedBottles', parseInt(e.target.value) || 0)}
                          placeholder="50"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Notes
                      </label>
                      <textarea
                        value={stop.notes}
                        onChange={(e) => updateStop(stop.id, 'notes', e.target.value)}
                        placeholder="Special instructions, access codes, etc."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Route Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6`}
            >
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Route Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total Stops
                    </div>
                    <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stops.filter(stop => stop.address.trim() !== '').length}
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
                      {stops.reduce((sum, stop) => sum + stop.expectedBottles, 0)}
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
                      {estimatedDuration || 'Not specified'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6`}
            >
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isFormValid && !isSubmitting
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating Route...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Create Route</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => router.back()}
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
