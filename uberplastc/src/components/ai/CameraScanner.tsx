'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  X, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Leaf,
  Award,
  Zap,
  Recycle,
  Target,
  Scan,
  ScanLine
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'

interface CameraScannerProps {
  isOpen: boolean
  onClose: () => void
  onScanComplete: (result: any) => void
}

export function CameraScanner({ isOpen, onClose, onScanComplete }: CameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanningProgress, setScanningProgress] = useState(0)
  const [detectionResult, setDetectionResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [scanningStep, setScanningStep] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Note: component is client-side; avoid conditional hook order by not gating on mount

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [isOpen])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      toast.error('Unable to access camera. Please check permissions.')
      onClose()
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)
        
        // Start scanning simulation
        startScanning()
      }
    }
  }

  const startScanning = () => {
    setIsScanning(true)
    setScanningProgress(0)
    setShowResult(false)
    
    // Enhanced scanning with step-by-step feedback
    const steps = [
      { progress: 15, step: 'Initializing AI scanner...' },
      { progress: 30, step: 'Analyzing image quality...' },
      { progress: 50, step: 'Detecting plastic objects...' },
      { progress: 70, step: 'Classifying bottle types...' },
      { progress: 85, step: 'Calculating environmental impact...' },
      { progress: 100, step: 'Scan complete!' }
    ]
    
    let currentStepIndex = 0
    const progressInterval = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          completeScanning()
          return 100
        }
        
        // Update step message based on progress
        const nextStep = steps.find(step => step.progress > prev)
        if (nextStep && currentStepIndex < steps.length - 1) {
          setScanningStep(nextStep.step)
          currentStepIndex++
        }
        
        return prev + Math.random() * 12 + 3
      })
    }, 300)
  }

  const completeScanning = () => {
    setIsScanning(false)
    
    // Fixed detection results - Always returns 1 bottle, 330ml, PET plastic
    const result = {
      bottles: 1,
      confidence: 98,
      polyMoney: 37,
      co2Saved: 1,
      bottleTypes: ['PET'],
      detectedBottles: [
        { type: 'PET', size: '330ml', confidence: 98 }
      ]
    }
    
    setDetectionResult(result)
    setShowResult(true)
    
    // Show success animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    
    toast.success(`Detected 1 bottle (330ml PET plastic)! +${result.polyMoney} poly money earned!`)
  }

  const handleConfirm = () => {
    if (detectionResult) {
      onScanComplete(detectionResult)
      onClose()
    }
  }

  const handleRetry = () => {
    setDetectionResult(null)
    setShowResult(false)
    setScanningProgress(0)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Bottle Scanner
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="p-6">
            {!showResult ? (
              <div className="space-y-6">
                {/* Camera View */}
                <div className="relative bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  
                  {/* Scanning Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center"
                        >
                          <Scan className="h-8 w-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">Scanning for Bottles...</h3>
                        <div className="w-64 bg-gray-700 rounded-full h-2 mb-2">
                          <motion.div
                            className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
                            style={{ width: `${scanningProgress}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${scanningProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-sm text-gray-300 mb-1">
                          {Math.round(scanningProgress)}% Complete
                        </p>
                        {scanningStep && (
                          <p className="text-xs text-green-300 font-medium">
                            {scanningStep}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Scanning Lines Animation */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                        animate={{ y: [0, 384, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  {!isScanning ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={capturePhoto}
                      className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
                    >
                      <Camera className="h-6 w-6" />
                      <span>Scan for Bottles</span>
                      <ScanLine className="h-5 w-5" />
                    </motion.button>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Please wait while we analyze your image...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Results View */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Scan Complete!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Confidence: {detectionResult.confidence}%
                  </p>
                </div>

                {/* Detection Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 text-center">
                    <Recycle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-600">{detectionResult.bottles}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Bottles Detected</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 text-center">
                    <Award className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-yellow-600">+{detectionResult.polyMoney}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Poly Money Earned</div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 text-center">
                    <Leaf className="h-10 w-10 text-teal-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-teal-600">{detectionResult.co2Saved} kg</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">CO₂ Saved</div>
                  </div>
                </div>

                {/* Bottle Types Detected */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Detected Bottle Types:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detectionResult.detectedBottles.map((bottle: any, index: number) => (
                      <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{bottle.type}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{bottle.size}</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{bottle.confidence}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRetry}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2"
                  >
                    <Camera className="h-5 w-5" />
                    <span>Scan Again</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleConfirm}
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2"
                  >
                    <Zap className="h-5 w-5" />
                    <span>Confirm Collection</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </AnimatePresence>
  )
}