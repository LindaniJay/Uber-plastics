'use client'

import { useState, useRef, useCallback, useEffect, useMemo, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Webcam from 'react-webcam'
import { 
  Camera, 
  CameraOff, 
  RotateCcw, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Target
} from 'lucide-react'
import { bottleDetectionService, BottleDetectionResult } from '@/services/bottleDetectionService'
import { CameraOverlay } from './CameraOverlay'
import { RewardPopup } from './RewardPopup'
import { EcoScoringSystem } from './EcoScoringSystem'
import { OceanHealthMeter } from '@/components/ui/OceanHealthMeter'
import { useTheme } from '@/contexts/ThemeContext'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'

interface BottleScannerProps {
  onClose?: () => void
  onScanComplete?: (results: any) => void
}

const BottleScanner = memo(function BottleScanner({ onClose, onScanComplete }: BottleScannerProps) {
  const { darkMode } = useTheme()
  const { setScanning, setCurrentDetection } = useEcoTrackStore()
  
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [selectedCountry, setSelectedCountry] = useState('cabo_verde')
  const [ecoScore, setEcoScore] = useState<number | null>(null)
  const [ecoInsights, setEcoInsights] = useState<string[]>([])
  
  const webcamRef = useRef<Webcam>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const [isLoading, setIsLoading] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [detectionResult, setDetectionResult] = useState<BottleDetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)

  // Check if Python API is available
  useEffect(() => {
    const checkAPIHealth = async () => {
      try {
        const isHealthy = await bottleDetectionService.checkHealth()
        setIsModelLoaded(isHealthy)
        if (!isHealthy) {
          console.warn('Python API not available, using fallback detection')
        }
      } catch (error) {
        console.warn('Python API health check failed:', error)
        setIsModelLoaded(false)
      }
    }
    
    checkAPIHealth()
  }, [])

  const detectBottles = useCallback(async (imageData: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await bottleDetectionService.detectBottlesFromBase64(imageData)
      setDetectionResult(result)
      
      // Update store with detection results
      const results = {
        id: `detection_${Date.now()}`,
        timestamp: Date.now(),
        bottles: result.bottles,
        points: result.eco_score.points_earned,
        earnings: result.eco_score.earnings,
        co2Saved: result.eco_score.co2_saved,
        confidence: result.confidence,
        ecoScore: result.eco_score,
        ecoInsights: result.eco_insights,
        country: selectedCountry
      }
      
      setCurrentDetection(results)
      
      if (onScanComplete) {
        onScanComplete(results)
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Detection failed')
    } finally {
      setIsLoading(false)
    }
  }, [selectedCountry, setCurrentDetection, onScanComplete])

  const startDetection = () => {
    setIsDetecting(true)
  }

  const stopDetection = () => {
    setIsDetecting(false)
  }

  const clearDetection = () => {
    setDetectionResult(null)
    setError(null)
  }

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })
      }
    }

    updateSize()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [])

  // Cleanup detection interval on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && (window as any).detectionInterval) {
        clearInterval((window as any).detectionInterval)
        ;(window as any).detectionInterval = null
      }
    }
  }, [])

  // Handle camera error
  const handleCameraError = useCallback((error: string) => {
    setCameraError(error)
    setIsScanning(false)
    setScanning(false)
  }, [setScanning])

  // Start scanning
  const startScanning = useCallback(async () => {
    try {
      setIsScanning(true)
      setScanning(true)
      setCameraError(null)
      clearDetection()

      const video = webcamRef.current?.video
      if (!video) {
        throw new Error('Camera not available')
      }

      // Start continuous detection
      startDetection()
      
      // Start continuous detection loop (only on client side)
      if (typeof window !== 'undefined') {
        const detectionInterval = setInterval(() => {
          if (isDetecting && video) {
            (async () => {
              try {
                // Capture image from video
                const canvas = document.createElement('canvas')
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                const ctx = canvas.getContext('2d')
                if (ctx) {
                  ctx.drawImage(video, 0, 0)
                  const imageData = canvas.toDataURL('image/jpeg', 0.8)
                  await detectBottles(imageData)
                }
              } catch (err) {
                console.error('Detection error:', err)
              }
            })()
          }
        }, 2000) // Detect every 2 seconds

        // Store interval ID for cleanup
        (window as any).detectionInterval = detectionInterval
      }
    } catch (err) {
      console.error('Failed to start scanning:', err)
      handleCameraError('Failed to access camera. Please check permissions.')
    }
  }, [startDetection, clearDetection, setScanning, handleCameraError, isDetecting, detectBottles])

  // Stop scanning
  const stopScanning = useCallback(() => {
    setIsScanning(false)
    setScanning(false)
    stopDetection()
    
    // Clear detection interval (only on client side)
    if (typeof window !== 'undefined' && (window as any).detectionInterval) {
      clearInterval((window as any).detectionInterval)
      (window as any).detectionInterval = null
    }
  }, [stopDetection, setScanning])

  // Complete scan
  const completeScan = useCallback(() => {
    if (detectionResult) {
      const { bottles, confidence } = detectionResult
      const points = bottles * 5
      const earnings = bottles * 0.05
      const co2Saved = bottles * 0.1

      const results = {
        id: `detection_${Date.now()}`,
        timestamp: Date.now(),
        bottles,
        points,
        earnings,
        co2Saved,
        confidence,
        ecoScore,
        ecoInsights,
        country: selectedCountry
      }

      setCurrentDetection(results)
      setShowResults(true)
      stopScanning()
    }
  }, [detectionResult, setCurrentDetection, stopScanning, ecoScore, ecoInsights, selectedCountry])

  // Handle eco-score calculation
  const handleEcoScoreCalculated = useCallback((score: number, insights: string[]) => {
    setEcoScore(score)
    setEcoInsights(insights)
  }, [])

  // Handle scan completion
  const handleAddToDashboard = useCallback(() => {
    if (detectionResult) {
      const { bottles, confidence } = detectionResult
      const points = bottles * 5
      const earnings = bottles * 0.05
      const co2Saved = bottles * 0.1

      // Add detection to store
      const { addDetection } = useEcoTrackStore.getState()
      addDetection({
        bottles,
        points,
        earnings,
        co2Saved,
        confidence
      })

      if (onScanComplete) {
        onScanComplete(detectionResult)
      }
    }
    setShowResults(false)
    if (onClose) onClose()
  }, [detectionResult, onScanComplete, onClose])

  // Toggle camera
  const toggleCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              AI Bottle Scanner
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Point your camera at plastic bottles to automatically detect and count them
            </p>
            
            {/* Country Selector */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2">
                <button
                  onClick={() => setSelectedCountry('cabo_verde')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCountry === 'cabo_verde'
                      ? 'bg-white text-blue-900 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🇨🇻 Cabo Verde
                </button>
                <button
                  onClick={() => setSelectedCountry('sao_tome')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCountry === 'sao_tome'
                      ? 'bg-white text-blue-900 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🇸🇹 São Tomé
                </button>
              </div>
            </div>
          </div>

          {/* Camera Container */}
          <div className="relative">
            <div
              ref={containerRef}
              className="relative w-full max-w-2xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              {/* Webcam */}
              <Webcam
                ref={webcamRef}
                audio={false}
                videoConstraints={{
                  facingMode: facingMode,
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
                }}
                className="w-full h-full object-cover"
                onUserMediaError={(error) => {
                  console.error('Camera error:', error)
                  handleCameraError('Camera access denied. Please allow camera permissions.')
                }}
              />

              {/* Camera Overlay */}
              {isScanning && detectionResult && (
                <CameraOverlay
                  boundingBoxes={[]}
                  containerWidth={containerSize.width}
                  containerHeight={containerSize.height}
                  isDetecting={isScanning}
                  totalBottles={detectionResult.bottles}
                />
              )}

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
                  />
                </div>
              )}

              {/* Error Overlay */}
              {cameraError && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
                    <h3 className="text-xl font-bold mb-2">Camera Error</h3>
                    <p className="text-gray-300 mb-4">{cameraError}</p>
                    <button
                      onClick={() => setCameraError(null)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4 mt-6">
              {!isScanning ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScanning}
                  disabled={isLoading}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <Camera className="h-6 w-6 mr-2" />
                  Start Scanning
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopScanning}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                  >
                    <CameraOff className="h-5 w-5 mr-2" />
                    Stop
                  </motion.button>
                  
                  {detectionResult && detectionResult.bottles > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={completeScan}
                      className="btn-primary text-lg px-6 py-3"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Complete Scan
                    </motion.button>
                  )}
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCamera}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                <RotateCcw className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Detection Status */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 card text-center"
            >
              <div className="flex items-center justify-center space-x-4 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <span className="font-semibold">AI Detection Active</span>
              </div>
              
              {detectionResult && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {detectionResult.bottles}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Bottles
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {Math.round(detectionResult.confidence * 100)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Confidence
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      STN ${(detectionResult.bottles * 0.05).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Earnings
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* AI Eco-Scoring System */}
          {detectionResult && detectionResult.bottles > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <EcoScoringSystem
                bottlesDetected={detectionResult.bottles}
                countryCode={selectedCountry}
                onScoreCalculated={handleEcoScoreCalculated}
              />
            </motion.div>
          )}

          {/* Ocean Health Meter */}
          {detectionResult && detectionResult.bottles > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <OceanHealthMeter
                bottlesCollected={detectionResult.bottles}
                countryCode={selectedCountry}
              />
            </motion.div>
          )}

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 card"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Scanning Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Good Lighting</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ensure bottles are well-lit and clearly visible
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Clear View</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Keep bottles separate and avoid overlapping
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Multiple Bottles</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Group bottles together for batch processing
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Results Modal */}
      <RewardPopup
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        onAddToDashboard={handleAddToDashboard}
        bottles={detectionResult?.bottles || 0}
        points={(detectionResult?.bottles || 0) * 5}
        earnings={(detectionResult?.bottles || 0) * 0.05}
        co2Saved={(detectionResult?.bottles || 0) * 0.1}
        confidence={detectionResult?.confidence || 0}
        bottleDetails={detectionResult?.bottle_details}
      />
    </div>
  )
})

export { BottleScanner }

