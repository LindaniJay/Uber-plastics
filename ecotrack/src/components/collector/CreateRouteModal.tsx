'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  MapPin, 
  Clock, 
  Package, 
  Plus, 
  Trash2,
  Save,
  Navigation
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

interface CreateRouteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (routeData: any) => void
}

export default function CreateRouteModal({ isOpen, onClose, onSave }: CreateRouteModalProps) {
  const { darkMode } = useTheme()
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

  const handleSave = () => {
    const routeData = {
      name: routeName,
      description: routeDescription,
      estimatedDuration,
      stops: stops.filter(stop => stop.address.trim() !== ''),
      totalBottles: stops.reduce((sum, stop) => sum + stop.expectedBottles, 0),
      createdAt: new Date().toISOString()
    }
    onSave(routeData)
    onClose()
  }

  const isFormValid = routeName.trim() !== '' && 
    stops.some(stop => stop.address.trim() !== '') &&
    estimatedDuration.trim() !== ''

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Navigation className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Create New Route</h2>
                    <p className="text-green-100">Set up a new collection route with stops</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Route Information */}
              <div className="mb-8">
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
              </div>

              {/* Route Stops */}
              <div className="mb-8">
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
              </div>

              {/* Route Summary */}
              <div className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6`}>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Route Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {stops.filter(stop => stop.address.trim() !== '').length} stops
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {stops.reduce((sum, stop) => sum + stop.expectedBottles, 0)} expected bottles
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {estimatedDuration || 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!isFormValid}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  isFormValid
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="h-4 w-4" />
                <span>Create Route</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
