'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  X, 
  CheckCircle,
  Recycle,
  Leaf,
  DollarSign,
  Award,
  ArrowLeft,
  Sparkles,
  Camera,
  PenTool
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import { RewardPopup } from '@/components/ai/RewardPopup'
import Link from 'next/link'
import type { ComponentType } from 'react'

type LoggingMode = 'manual' | 'ai-scan'

export default function LogPlasticPage() {
  const router = useRouter()
  const { darkMode } = useTheme()
  const { addDetection } = useEcoTrackStore()

  // Mode selection state
  const [mode, setMode] = useState<LoggingMode | null>(null)
  const [mounted, setMounted] = useState(false)
  const scanCompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Lazy load BottleScanner component only when AI scan mode is selected
  const [BottleScanner, setBottleScanner] = useState<ComponentType<any> | null>(null)
  const [scannerLoading, setScannerLoading] = useState(false)
  const isNavigatingRef = useRef<boolean>(false)

  // Form states (for manual entry)
  const [bottles, setBottles] = useState(1)
  const [size, setSize] = useState('330 ml')
  const [color, setColor] = useState('clear')
  const [type, setType] = useState('PET')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showRewardPopup, setShowRewardPopup] = useState(false)
  const [processingStep, setProcessingStep] = useState('')

  // Bottle options
  const sizeOptions = ['250 ml', '330 ml', '500 ml', '750 ml', '1000 ml', '1500 ml']
  const colorOptions = ['clear', 'green', 'blue', 'brown', 'other']
  const typeOptions = ['PET', 'HDPE', 'PP', 'other']

  // Calculate rewards based on input
  const calculateRewards = useCallback(() => {
    const basePoints = bottles * 5
    const baseEarnings = bottles * 0.05
    const baseCo2Saved = bottles * 0.1
    const basePolyMoney = bottles * 5

    return {
      bottles,
      points: basePoints,
      earnings: baseEarnings,
      co2Saved: baseCo2Saved,
      polyMoney: basePolyMoney,
      confidence: 100 // Manual entry is 100% confidence
    }
  }, [bottles])

  const rewards = calculateRewards()

  // Processing animation for manual entry
  const processLog = useCallback(async () => {
    setIsProcessing(true)
    setProcessingStep('Validating input...')

    const steps = [
      { delay: 300, step: 'Calculating rewards...' },
      { delay: 600, step: 'Processing eco impact...' },
      { delay: 900, step: 'Updating statistics...' },
      { delay: 1200, step: 'Finalizing entry...' }
    ]

    for (const { delay, step } of steps) {
      await new Promise(resolve => setTimeout(resolve, delay))
      setProcessingStep(step)
    }

    await new Promise(resolve => setTimeout(resolve, 300))
    setIsProcessing(false)
    setShowRewardPopup(true)
  }, [])

  const handleAddToDashboard = useCallback((detectionData?: any) => {
    const detection = detectionData || {
      id: `detection_${Date.now()}`,
      timestamp: Date.now(),
      bottles: rewards.bottles,
      size,
      color,
      type,
      points: rewards.points,
      earnings: rewards.earnings,
      co2Saved: rewards.co2Saved,
      confidence: 100,
      polyMoney: rewards.polyMoney
    }

    addDetection(detection)
    setShowRewardPopup(false)
    router.push('/individual/dashboard')
  }, [rewards, size, color, type, addDetection, router])

  const handleScanAgain = useCallback(() => {
    setShowRewardPopup(false)
    if (mode === 'manual') {
      setBottles(1)
      setSize('330 ml')
      setColor('clear')
      setType('PET')
      setProcessingStep('')
    } else {
      setMode(null) // Reset to mode selection
    }
  }, [mode])

  // Ensure component is mounted before rendering scanner
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load BottleScanner only when AI scan mode is selected (client-side only)
  useEffect(() => {
    if (mode === 'ai-scan' && mounted && !BottleScanner && !scannerLoading) {
      setScannerLoading(true)
      // Dynamically import only when needed, after mount
      // This prevents webpack from trying to resolve the module at build/SSR time
      import('@/components/ai/BottleScanner')
        .then((mod) => {
          // Handle both named and default exports
          const Component = mod.BottleScanner || mod.default
          if (Component && typeof Component === 'function') {
            setBottleScanner(() => Component)
          }
          setScannerLoading(false)
        })
        .catch((err) => {
          console.error('Failed to load scanner:', err)
          setScannerLoading(false)
          setMode(null) // Reset mode on error
        })
    } else if (mode !== 'ai-scan') {
      // Reset loading state when mode changes away from ai-scan
      setScannerLoading(false)
    }
  }, [mode, BottleScanner, scannerLoading, mounted])

  // Handle AI scan completion
  // Note: BottleScanner already adds the detection internally, so we just navigate
  const handleScanComplete = useCallback((results: any) => {
    // Prevent multiple navigation calls
    if (isNavigatingRef.current) {
      return
    }
    
    // Clear any existing timeout
    if (scanCompleteTimeoutRef.current) {
      clearTimeout(scanCompleteTimeoutRef.current)
      scanCompleteTimeoutRef.current = null
    }
    
    // Mark navigation as in progress
    isNavigatingRef.current = true
    
    // Scanner already added detection, just navigate back to dashboard
    scanCompleteTimeoutRef.current = setTimeout(() => {
      router.push('/individual/dashboard')
      scanCompleteTimeoutRef.current = null
      // Reset navigation flag after a delay to allow component cleanup
      setTimeout(() => {
        isNavigatingRef.current = false
      }, 1000)
    }, 500)
  }, [router])
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scanCompleteTimeoutRef.current) {
        clearTimeout(scanCompleteTimeoutRef.current)
        scanCompleteTimeoutRef.current = null
      }
      isNavigatingRef.current = false
    }
  }, [])

  // If mode is selected as AI scan, show scanner (only after mount)
  if (mode === 'ai-scan' && mounted) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                setMode(null)
                setBottleScanner(null) // Clear loaded component when going back
                setScannerLoading(false) // Reset loading state
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Choose Method
            </button>
          </div>
          {scannerLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading scanner...</p>
              </div>
            </div>
          ) : BottleScanner ? (
            <BottleScanner
              onClose={() => {
                // When scanner closes, reset mode
                setMode(null)
                setBottleScanner(null) // Clear loaded component
                setScannerLoading(false) // Reset loading state
              }}
              onScanComplete={handleScanComplete}
            />
          ) : (
            <div className="text-center py-12">
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Preparing scanner...
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/individual/dashboard"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className={`p-3 rounded-2xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                <Recycle className={`h-8 w-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Log Plastic Collection
            </h1>
            <p className={`text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Choose how you want to log your plastic bottles
            </p>
          </motion.div>

          {/* Mode Selection (shown when no mode is selected) */}
          {!mode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              {/* Manual Entry Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode('manual')}
                className={`cursor-pointer rounded-3xl p-8 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
                } hover:border-green-500/50 transition-all duration-300`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-2xl mb-4 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <PenTool className={`h-12 w-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Manual Entry
                  </h3>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enter bottle details manually. Perfect for quick logging.
                  </p>
                  <div className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features:</span>
                    </div>
                    <ul className={`text-left space-y-1 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>✓ Enter number of bottles</li>
                      <li>✓ Select size and type</li>
                      <li>✓ Choose color</li>
                      <li>✓ Instant rewards calculation</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* AI Scan Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode('ai-scan')}
                className={`cursor-pointer rounded-3xl p-8 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
                } hover:border-green-500/50 transition-all duration-300`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-2xl mb-4 ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                    <Camera className={`h-12 w-12 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    AI Scan
                  </h3>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Use AI to automatically detect and identify plastic bottles from a photo.
                  </p>
                  <div className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features:</span>
                    </div>
                    <ul className={`text-left space-y-1 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>✓ Automatic bottle detection</li>
                      <li>✓ Type and size identification</li>
                      <li>✓ AI-powered analysis</li>
                      <li>✓ Confidence scoring</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Manual Entry Form (shown when manual mode is selected) */}
          {mode === 'manual' && (
            <>
              {/* Processing Overlay */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed inset-0 z-50 flex items-center justify-center ${
                      darkMode ? 'bg-black/90' : 'bg-white/95'
                    } backdrop-blur-md`}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className={`rounded-3xl p-8 text-center ${
                        darkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white border border-gray-200'
                      } shadow-2xl max-w-md mx-4`}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mb-6 inline-block"
                      >
                        <Recycle className={`h-16 w-16 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                      </motion.div>
                      <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Processing...
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {processingStep || 'Validating input...'}
                      </p>
                      <div className="mt-6 h-2 bg-gray-700 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-teal-600"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-3xl p-6 lg:p-8 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-xl'
                }`}
              >
                {/* Back to mode selection */}
                <button
                  onClick={() => setMode(null)}
                  className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change Method
                </button>

                <div className="space-y-6">
                  {/* Bottle Count */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Number of Bottles
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setBottles(Math.max(1, bottles - 1))}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <div className={`flex-1 text-center text-4xl font-bold py-4 px-6 rounded-2xl ${
                        darkMode ? 'bg-gray-700/50 text-green-400' : 'bg-gray-50 text-green-600'
                      }`}>
                        {bottles}
                      </div>
                      <button
                        onClick={() => setBottles(bottles + 1)}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Bottle Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {sizeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSize(option)}
                          className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                            size === option
                              ? darkMode
                                ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50'
                                : 'bg-green-100 text-green-700 border-2 border-green-500'
                              : darkMode
                                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 border border-gray-600'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Color
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {colorOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setColor(option)}
                          className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 capitalize ${
                            color === option
                              ? darkMode
                                ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50'
                                : 'bg-green-100 text-green-700 border-2 border-green-500'
                              : darkMode
                                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 border border-gray-600'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Selection */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Plastic Type
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {typeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setType(option)}
                          className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                            type === option
                              ? darkMode
                                ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50'
                                : 'bg-green-100 text-green-700 border-2 border-green-500'
                              : darkMode
                                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 border border-gray-600'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rewards Preview */}
                  <div className={`rounded-2xl p-6 ${
                    darkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'
                  }`}>
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Rewards Preview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <Award className={`h-6 w-6 mx-auto mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                        <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {rewards.points}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Points
                        </div>
                      </div>
                      <div className="text-center">
                        <DollarSign className={`h-6 w-6 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          STN {rewards.earnings.toFixed(2)}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Earnings
                        </div>
                      </div>
                      <div className="text-center">
                        <Leaf className={`h-6 w-6 mx-auto mb-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
                        <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {rewards.co2Saved.toFixed(1)}kg
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          CO₂ Saved
                        </div>
                      </div>
                      <div className="text-center">
                        <Recycle className={`h-6 w-6 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {rewards.polyMoney}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Poly Money
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processLog}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="h-6 w-6" />
                    <span>Log Collection</span>
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Reward Popup */}
      <RewardPopup
        isOpen={showRewardPopup}
        onClose={() => {
          setShowRewardPopup(false)
          router.push('/individual/dashboard')
        }}
        onScanAgain={handleScanAgain}
        onAddToDashboard={handleAddToDashboard}
        bottles={rewards.bottles}
        points={rewards.points}
        earnings={rewards.earnings}
        co2Saved={rewards.co2Saved}
        confidence={100}
        bottleDetails={{
          count: rewards.bottles,
          size,
          material: type,
          description: `${size} ${color} ${type} bottle`
        }}
      />
    </div>
  )
}
