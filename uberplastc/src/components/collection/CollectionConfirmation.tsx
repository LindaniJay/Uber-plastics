'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Award, 
  Leaf, 
  Recycle, 
  Zap, 
  Share2, 
  Download,
  Trophy,
  Star,
  Target,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Sparkles,
  Gift,
  ArrowRight,
  X
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import confetti from 'canvas-confetti'
import caboVerdeData from '@/data/cabo_verde.json'
import saoTomeData from '@/data/sao_tome.json'

interface CollectionConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  detectionResult: {
    bottles: number
    points: number
    earnings: number
    co2Saved: number
    confidence: number
  }
  userStats?: {
    totalBottles: number
    totalPoints: number
    totalEarnings: number
    totalCo2Saved: number
    rank: string
    level: number
  }
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  color: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export function CollectionConfirmation({
  isOpen,
  onClose,
  onConfirm,
  detectionResult,
  userStats
}: CollectionConfirmationProps) {
  const { darkMode } = useTheme()
  const [currentStep, setCurrentStep] = useState(0)
  const [showAchievements, setShowAchievements] = useState(false)
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([])
  // Client component; avoid conditional hooks by not gating on mount

  const steps = [
    { title: "Collection Summary", icon: CheckCircle },
    { title: "Environmental Impact", icon: Leaf },
    { title: "Achievements", icon: Trophy },
    { title: "Next Steps", icon: ArrowRight }
  ]

  const achievements: Achievement[] = [
    {
      id: 'first_collection',
      title: 'First Steps',
      description: 'Completed your first plastic collection',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      unlocked: (userStats?.totalBottles || 0) === 0 && (detectionResult?.bottles || 0) > 0
    },
    {
      id: 'bulk_collector',
      title: 'Bulk Collector',
      description: 'Collected 5+ bottles in one session',
      icon: Recycle,
      color: 'from-green-500 to-teal-600',
      unlocked: (detectionResult?.bottles || 0) >= 5
    },
    {
      id: 'eco_warrior',
      title: 'Eco Warrior',
      description: 'Saved 1+ kg of CO₂ in one collection',
      icon: Leaf,
      color: 'from-emerald-500 to-green-600',
      unlocked: (detectionResult?.co2Saved || 0) >= 1
    },
    {
      id: 'ai_master',
      title: 'AI Master',
      description: 'Achieved 90%+ detection confidence',
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      unlocked: (detectionResult?.confidence || 0) >= 90
    },
    {
      id: 'ocean_hero',
      title: 'Ocean Hero',
      description: 'Collected 50+ bottles total',
      icon: Trophy,
      color: 'from-blue-500 to-cyan-600',
      unlocked: (userStats?.totalBottles || 0) + (detectionResult?.bottles || 0) >= 50
    },
    {
      id: 'island_champion',
      title: 'Island Champion',
      description: 'Saved 10+ kg of CO₂ total',
      icon: Award,
      color: 'from-indigo-500 to-purple-600',
      unlocked: (userStats?.totalCo2Saved || 0) + (detectionResult?.co2Saved || 0) >= 10
    }
  ]

  const environmentalImpact = {
    co2Saved: detectionResult?.co2Saved || 0,
    bottlesRecycled: detectionResult?.bottles || 0,
    oceanPlasticPrevented: (detectionResult?.bottles || 0) * 0.8, // 80% of bottles would end up in ocean
    energySaved: (detectionResult?.bottles || 0) * 0.5, // kWh saved per bottle
    waterSaved: (detectionResult?.bottles || 0) * 0.3, // liters of water saved
    landfillSpaceSaved: (detectionResult?.bottles || 0) * 0.02 // cubic meters
  }

  const islandData = {
    caboVerde: {
      name: "Cabo Verde",
      population: caboVerdeData.population,
      plasticWaste: caboVerdeData.plasticWaste.annualGeneration,
      recyclingRate: caboVerdeData.plasticWaste.recyclingRate,
      oceanLeakage: caboVerdeData.plasticWaste.oceanLeakage
    },
    saoTome: {
      name: "São Tomé and Príncipe", 
      population: saoTomeData.population,
      plasticWaste: saoTomeData.plasticWaste.annualGeneration,
      recyclingRate: saoTomeData.plasticWaste.recyclingRate,
      oceanLeakage: saoTomeData.plasticWaste.oceanLeakage
    }
  }

  useEffect(() => {
    if (isOpen && detectionResult) {
      setCurrentStep(0)
      setShowAchievements(false)
      
      // Check for newly unlocked achievements
      const newAchievements = achievements.filter(achievement => achievement.unlocked)
      setUnlockedAchievements(newAchievements)
      
      if (newAchievements.length > 0) {
        setShowAchievements(true)
        // Trigger confetti for achievements
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }
  }, [isOpen, detectionResult])

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleShare = () => {
    const bottles = detectionResult?.bottles || 0
    const co2Saved = detectionResult?.co2Saved || 0
    const shareText = `🌊 Just collected ${bottles} plastic bottles and saved ${co2Saved}kg of CO₂! Join me in protecting our oceans with Uber Plastic! #Uber Plastic #OceanConservation #Sustainability`
    
    if (navigator.share) {
      navigator.share({
        title: 'Uber Plastic Collection',
        text: shareText,
        url: window.location.origin
      })
    } else {
      navigator.clipboard.writeText(shareText)
      // Show toast notification
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
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
                Collection Confirmed!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your plastic bottles have been successfully logged
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 text-center">
                <Recycle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">{detectionResult?.bottles || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Bottles Collected</div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 text-center">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-yellow-600">+{detectionResult?.points || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Points Earned</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4 text-center">
              <Leaf className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-teal-600">{detectionResult?.co2Saved || 0} kg</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">CO₂ Saved</div>
            </div>

            {userStats && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Your Progress</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-300">Total Bottles</div>
                    <div className="font-semibold">{(userStats?.totalBottles || 0) + (detectionResult?.bottles || 0)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-300">Total CO₂ Saved</div>
                    <div className="font-semibold">{(userStats?.totalCo2Saved || 0) + (detectionResult?.co2Saved || 0)} kg</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Environmental Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your collection is making a real difference
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{environmentalImpact.oceanPlasticPrevented.toFixed(1)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">kg Ocean Plastic Prevented</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{environmentalImpact.energySaved.toFixed(1)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">kWh Energy Saved</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{environmentalImpact.waterSaved.toFixed(1)}L</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Water Saved</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Island Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Cabo Verde Annual Plastic Waste:</span>
                  <span className="font-semibold">{islandData.caboVerde.plasticWaste.toLocaleString()} tons</span>
                </div>
                <div className="flex justify-between">
                  <span>Your Contribution:</span>
                  <span className="font-semibold text-green-600">+{detectionResult?.bottles || 0} bottles</span>
                </div>
                <div className="flex justify-between">
                  <span>Recycling Rate:</span>
                  <span className="font-semibold">{islandData.caboVerde.recyclingRate}%</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Achievements
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {unlockedAchievements.length > 0 ? 'New achievements unlocked!' : 'Keep collecting to unlock achievements'}
              </p>
            </div>

            <div className="space-y-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.unlocked 
                          ? `bg-gradient-to-r ${achievement.color}` 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.unlocked ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${
                          achievement.unlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ArrowRight className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Next Steps
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continue your environmental journey
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Set a Goal</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Aim to collect 10 bottles this week
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Invite Friends</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Share Uber Plastic with your community
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Gift className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Redeem Rewards</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Use your points for local rewards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Share2 className="h-5 w-5" />
                <span>Share Achievement</span>
              </button>
              <button className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Certificate</span>
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen || !detectionResult) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Collection Confirmation</h2>
                <p className="text-sm opacity-90">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 mx-2 ${
                      index < currentStep ? 'bg-gradient-to-r from-green-500 to-teal-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-3">
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleConfirm}
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Complete Collection
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
