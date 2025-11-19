'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  X, 
  CheckCircle,
  Sparkles,
  Scan,
  Target
} from 'lucide-react'
import { RewardPopup } from './RewardPopup'
import { useTheme } from '@/contexts/ThemeContext'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import { useRouter } from 'next/navigation'

interface BottleScannerProps {
  onClose?: () => void
  onScanComplete?: (results: any) => void
}

export function BottleScanner({ onClose, onScanComplete }: BottleScannerProps) {
  const { darkMode } = useTheme()
  const { addDetection } = useEcoTrackStore()
  const router = useRouter()
  
  // Scanning states
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStep, setScanStep] = useState('')
  const [showRewardPopup, setShowRewardPopup] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)

  // Demo scan results - fixed values
  const demoResult = {
    bottles: 1,
    size: '330 ml',
    color: 'clear',
    type: 'PET',
    confidence: 96,
    points: 5,
    earnings: 0.05,
    co2Saved: 0.1
  }

  // Scanning animation steps
  const scanSteps = [
    { progress: 20, step: 'Initializing scanner...' },
    { progress: 40, step: 'Capturing image...' },
    { progress: 60, step: 'Analyzing bottle...' },
    { progress: 80, step: 'Identifying type and size...' },
    { progress: 95, step: 'Finalizing detection...' },
    { progress: 100, step: 'Scan complete!' }
  ]

  const startScan = useCallback(() => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)
    setScanStep('')

    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        // Find current step based on progress
        const currentStep = scanSteps.find((step, index) => {
          return prev < step.progress && (index === 0 || prev >= scanSteps[index - 1].progress)
        })
        
        if (currentStep && currentStep.step !== scanStep) {
          setScanStep(currentStep.step)
        }

        if (prev >= 100) {
          clearInterval(progressInterval)
          completeScan()
          return 100
        }

        // Smooth progress increment
        const increment = Math.random() * 8 + 4
        return Math.min(100, prev + increment)
      })
    }, 200)
  }, [])

  const completeScan = () => {
    setIsScanning(false)
    setScanComplete(true)
    setScanStep('Scan complete!')
    
    // Small delay before showing reward popup for smooth transition
    setTimeout(() => {
      setShowRewardPopup(true)
    }, 500)
  }

  const handleAddToDashboard = useCallback(() => {
    // Save detection to store
    const detection = {
      id: `detection_${Date.now()}`,
      timestamp: Date.now(),
      bottles: demoResult.bottles,
      size: demoResult.size,
      color: demoResult.color,
      type: demoResult.type,
      points: demoResult.points,
      earnings: demoResult.earnings,
      co2Saved: demoResult.co2Saved,
      confidence: demoResult.confidence,
      polyMoney: demoResult.bottles * 5 || 0
    }
    
    addDetection(detection)
    
    // Close popup and navigate or call callback
    setShowRewardPopup(false)
    
    if (onScanComplete) {
      onScanComplete(detection)
    }
    
    // Navigate back after a brief delay
    setTimeout(() => {
      if (onClose) {
        onClose()
      } else {
        router.push('/individual/dashboard')
      }
    }, 300)
  }, [addDetection, onScanComplete, onClose, router])

  const handleScanAgain = () => {
    setShowRewardPopup(false)
    setScanComplete(false)
    setScanProgress(0)
    setScanStep('')
  }

  // Auto-start scan on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startScan()
    }, 800) // Small delay for smooth entrance
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Main Scanner Interface */}
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Bottle Scanner</h1>
            <button
              onClick={onClose || (() => router.back())}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close scanner"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Camera View Area */}
        <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-4 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-700 rounded" />
              ))}
            </div>
          </div>

          {/* Scan Area Overlay */}
          <div className="relative z-10 w-full max-w-md mx-4">
            {/* Viewfinder Frame */}
            <div className="relative aspect-[3/4] bg-gray-900/50 border-4 border-green-500 rounded-3xl overflow-hidden shadow-2xl">
              {/* Scanning Animation Lines */}
              {isScanning && (
                <>
                  {/* Horizontal scanning line */}
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent z-20"
                    animate={{
                      y: ['0%', '100%', '0%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Vertical scanning line */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-green-400 to-transparent z-20"
                    animate={{
                      x: ['0%', '100%', '0%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />

                  {/* Diagonal scanning lines */}
                  <motion.div
                    className="absolute inset-0 border-t-2 border-green-400/50 z-10"
                    animate={{
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      transformOrigin: 'center'
                    }}
                  />
                </>
              )}

              {/* Corner indicators */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-green-500 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-green-500 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-green-500 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-green-500 rounded-br-3xl" />

              {/* Detection result overlay */}
              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex items-center justify-center z-30"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center"
                  >
                    <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                    <div className="text-white font-bold text-lg">
                      {demoResult.bottles} Bottle Detected
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Center crosshair */}
              {isScanning && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-15">
                  <div className="w-16 h-16 border-2 border-green-400 rounded-full flex items-center justify-center">
                    <Target className="h-8 w-8 text-green-400 animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-teal-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {scanStep && (
                  <motion.p
                    key={scanStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-center mt-3 text-sm"
                  >
                    {scanStep}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Detection Info (when complete) */}
            {scanComplete && !showRewardPopup && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <div className="text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Bottles:</span>
                    <span className="font-bold">{demoResult.bottles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Size:</span>
                    <span className="font-bold">{demoResult.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Color:</span>
                    <span className="font-bold capitalize">{demoResult.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Type:</span>
                    <span className="font-bold">{demoResult.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Confidence:</span>
                    <span className="font-bold text-green-400">{demoResult.confidence}%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
          {!isScanning && !scanComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startScan}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center space-x-3"
            >
              <Camera className="h-6 w-6" />
              <span>Start Scan</span>
            </motion.button>
          )}

          {scanComplete && !showRewardPopup && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRewardPopup(true)}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center space-x-3"
            >
              <CheckCircle className="h-6 w-6" />
              <span>View Rewards</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Reward Popup */}
      <RewardPopup
        isOpen={showRewardPopup}
        onClose={() => {
          setShowRewardPopup(false)
          if (onClose) onClose()
        }}
        onScanAgain={handleScanAgain}
        onAddToDashboard={handleAddToDashboard}
        bottles={demoResult.bottles}
        points={demoResult.points}
        earnings={demoResult.earnings}
        co2Saved={demoResult.co2Saved}
        confidence={demoResult.confidence}
        bottleDetails={{
          count: demoResult.bottles,
          size: demoResult.size,
          material: demoResult.type,
          description: `${demoResult.size} ${demoResult.color} ${demoResult.type} bottle`
        }}
      />
    </div>
  )
}

export default BottleScanner
