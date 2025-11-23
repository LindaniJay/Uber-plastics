'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Sparkles,
  Leaf,
  Award,
  Zap,
  Recycle,
  Target,
  TrendingUp,
  Users,
  Globe,
  Star,
  Gift,
  ArrowRight,
  Share2,
  Heart,
  Trophy,
  Clock
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import Link from 'next/link'

interface ScanResult {
  bottles: number
  confidence: number
  polyMoney: number
  co2Saved: number
  quality: 'excellent' | 'good' | 'fair'
  category: string
  timestamp: string
  bottleDetails?: {
    count: number
    size: string
    material: string
    description: string
  }
}

interface EnhancedScanResultsProps {
  result: ScanResult
  onContinue: () => void
  onShare: () => void
}

export function EnhancedScanResults({ result, onContinue, onShare }: EnhancedScanResultsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [userStats, setUserStats] = useState({
    totalBottles: 127,
    totalPolyMoney: 2840,
    streak: 7,
    rank: 15
  })

  // Client component; avoid conditional hooks by not gating on mount

  useEffect(() => {
    // Trigger celebration animation
    setShowCelebration(true)
    
    // Confetti animation
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#047857', '#065f46']
      })
    }, 500)

    // Auto-advance through steps
    const timer = setTimeout(() => {
      setCurrentStep(1)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-400 bg-green-400/10'
      case 'good': return 'text-blue-400 bg-blue-400/10'
      case 'fair': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return Star
      case 'good': return CheckCircle
      case 'fair': return Target
      default: return CheckCircle
    }
  }

  const achievements = [
    {
      id: 'first_scan',
      title: 'First Scan',
      description: 'Welcome to the community!',
      icon: Sparkles,
      unlocked: true
    },
    {
      id: 'eco_warrior',
      title: 'Eco Warrior',
      description: 'Collected 100+ bottles',
      icon: Leaf,
      unlocked: userStats.totalBottles >= 100
    },
    {
      id: 'streak_master',
      title: 'Streak Master',
      description: '7 day collection streak',
      icon: Trophy,
      unlocked: userStats.streak >= 7
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          {currentStep === 0 && (
            <motion.div
              key="scan-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Scan Complete!</h2>
                <p className="text-gray-300">AI analysis successful</p>
              </motion.div>

              {/* Results Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 mb-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">{result.bottles}</div>
                    <div className="text-gray-400 text-sm">Bottles Detected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">+{result.polyMoney}</div>
                    <div className="text-gray-400 text-sm">Poly Money Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{result.co2Saved}kg</div>
                    <div className="text-gray-400 text-sm">CO₂ Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">{result.confidence}%</div>
                    <div className="text-gray-400 text-sm">AI Confidence</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottle Details */}
              {result.bottleDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Bottle Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{result.bottleDetails.size}</div>
                      <div className="text-gray-400 text-sm">Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">{result.bottleDetails.material}</div>
                      <div className="text-gray-400 text-sm">Material</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">{result.bottleDetails.count}</div>
                      <div className="text-gray-400 text-sm">Count</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-300 text-sm">{result.bottleDetails.description}</p>
                  </div>
                </motion.div>
              )}

              {/* Quality Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getQualityColor(result.quality)}`}>
                  {(() => {
                    const Icon = getQualityIcon(result.quality)
                    return <Icon className="w-4 h-4" />
                  })()}
                  <span className="font-medium capitalize">{result.quality} Quality</span>
                </div>
              </motion.div>

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => setCurrentStep(1)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <span>View Impact</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="impact-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Your Environmental Impact</h2>
                <p className="text-gray-300">See how your action contributes to a better planet</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Environmental Impact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Leaf className="w-5 h-5 text-green-400 mr-2" />
                    Environmental Impact
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Recycle className="w-5 h-5 text-green-400" />
                        <span className="text-white">Bottles Recycled</span>
                      </div>
                      <span className="text-green-400 font-semibold">{result.bottles}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <span className="text-white">CO₂ Emissions Prevented</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{result.co2Saved}kg</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span className="text-white">Decomposition Time Saved</span>
                      </div>
                      <span className="text-purple-400 font-semibold">{result.bottles * 500} years</span>
                    </div>
                  </div>
                </motion.div>

                {/* Personal Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                    Your Progress
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span className="text-white">Total Bottles</span>
                      </div>
                      <span className="text-yellow-400 font-semibold">{userStats.totalBottles + result.bottles}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-green-400" />
                        <span className="text-white">Total Poly Money</span>
                      </div>
                      <span className="text-green-400 font-semibold">{userStats.totalPolyMoney + result.polyMoney}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Trophy className="w-5 h-5 text-orange-400" />
                        <span className="text-white">Current Rank</span>
                      </div>
                      <span className="text-orange-400 font-semibold">#{userStats.rank}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-blue-400" />
                        <span className="text-white">Streak</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{userStats.streak} days</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30"
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Award className="w-5 h-5 text-yellow-400 mr-2" />
                  Achievements
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          achievement.unlocked
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-gray-700/30 border-gray-600/30 text-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm opacity-75">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              >
                <button
                  onClick={onShare}
                  className="bg-gray-700/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-200 flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Achievement</span>
                </button>
                
                <Link
                  href="/individual/rewards-requests"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Browse Rewards</span>
                </Link>
                
                <button
                  onClick={onContinue}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
