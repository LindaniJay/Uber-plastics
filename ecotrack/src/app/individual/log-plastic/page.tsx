'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Leaf,
  Award,
  Zap,
  Recycle,
  Target
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { CollectionConfirmation } from '@/components/collection/CollectionConfirmation'
import { CameraScanner } from '@/components/ai/CameraScanner'
import { EnhancedScanResults } from '@/components/collection/EnhancedScanResults'

export default function LogPlasticPage() {
  const { darkMode } = useTheme()
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectionResult, setDetectionResult] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showCameraScanner, setShowCameraScanner] = useState(false)
  const [showEnhancedResults, setShowEnhancedResults] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const simulateAIDetection = async (imageFile: File) => {
    setIsDetecting(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Fixed detection results - Always returns 1 bottle, 330ml, PET plastic
    const result = {
      bottles: 1,
      confidence: 98,
      polyMoney: 37,
      co2Saved: 1,
      quality: 'excellent',
      category: 'PET Bottles',
      timestamp: new Date().toISOString()
    }
    setDetectionResult(result)
    setIsDetecting(false)
    
    // Show enhanced results
    if (result.bottles > 0) {
      setShowEnhancedResults(true)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        simulateAIDetection(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    setShowCameraScanner(true)
  }

  const handleCameraScanComplete = (result: any) => {
    // Enhance the result with additional data
    const enhancedResult = {
      ...result,
      quality: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
      category: 'PET Bottles',
      timestamp: new Date().toISOString()
    }
    setDetectionResult(enhancedResult)
    setShowEnhancedResults(true)
  }

  const handleConfirmCollection = () => {
    setShowConfirmation(true)
  }

  const handleCollectionConfirmed = () => {
    // Reset the form
    setDetectionResult(null)
    setSelectedImage(null)
    setShowEnhancedResults(false)
    setShowConfirmation(false)
    toast.success('Collection confirmed and added to your dashboard!')
  }

  const handleShareAchievement = () => {
    toast.success('Achievement shared to social media!')
  }

  const handleContinueFromResults = () => {
    setShowEnhancedResults(false)
    setShowConfirmation(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className={`text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Log Your Plastic Collection
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Use AI-powered detection to automatically count and categorize your plastic bottles
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Upload or Capture
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={handleCameraCapture}
                  className="w-full btn-primary group"
                  disabled={isDetecting}
                >
                  <Camera className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  Take Photo
                </button>
                
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                    disabled={isDetecting}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full btn-secondary group"
                    disabled={isDetecting}
                  >
                    <Upload className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    Upload Image
                  </button>
                </div>
              </div>

              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6"
                >
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Detection Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AI Detection Results
              </h2>

              <AnimatePresence>
                {isDetecting ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center"
                    >
                      <Sparkles className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                      Analyzing Image...
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Our AI is detecting plastic bottles in your image
                    </p>
                  </motion.div>
                ) : detectionResult ? (
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
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                        Detection Complete!
                      </h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Confidence: {detectionResult.confidence}%
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 text-center">
                        <Recycle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">{detectionResult.bottles}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Bottles</div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 text-center">
                        <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-yellow-600">+{detectionResult.polyMoney}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Poly Money</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4 text-center">
                      <Leaf className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-teal-600">{detectionResult.co2Saved} kg</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">CO₂ Saved</div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleConfirmCollection}
                      className="w-full btn-primary"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Confirm Collection
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                      Ready to Detect
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Upload an image or take a photo to get started
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 card"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Tips for Better Detection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Good Lighting</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ensure bottles are well-lit and clearly visible
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Clear View</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Keep bottles separate and avoid overlapping
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
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

      {/* Camera Scanner Modal */}
      <CameraScanner
        isOpen={showCameraScanner}
        onClose={() => setShowCameraScanner(false)}
        onScanComplete={handleCameraScanComplete}
      />

      {/* Enhanced Scan Results */}
      {showEnhancedResults && detectionResult && (
        <EnhancedScanResults
          result={detectionResult}
          onContinue={handleContinueFromResults}
          onShare={handleShareAchievement}
        />
      )}

      {/* Collection Confirmation Modal */}
      {detectionResult && (
        <CollectionConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleCollectionConfirmed}
          detectionResult={detectionResult}
          userStats={{
            totalBottles: 15, // Mock user stats
            totalPolyMoney: 75,
            totalEarnings: 3.75,
            totalCo2Saved: 1.5,
            rank: "Eco Warrior",
            level: 3
          }}
        />
      )}
    </div>
  )
}


