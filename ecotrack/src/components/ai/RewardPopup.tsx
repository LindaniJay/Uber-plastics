'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Coins, 
  Leaf, 
  Award, 
  Sparkles,
  X,
  Plus,
  TrendingUp
} from 'lucide-react'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import { useTheme } from '@/contexts/ThemeContext'
import confetti from 'canvas-confetti'

interface RewardPopupProps {
  isOpen: boolean
  onClose: () => void
  onAddToDashboard: () => void
  bottles: number
  points: number
  earnings: number
  co2Saved: number
  confidence: number
  bottleDetails?: {
    count: number
    size: string
    material: string
    description: string
  }
}

export function RewardPopup({
  isOpen,
  onClose,
  onAddToDashboard,
  bottles,
  points,
  earnings,
  co2Saved,
  confidence,
  bottleDetails
}: RewardPopupProps) {
  const { darkMode } = useTheme()
  const { addDetection } = useEcoTrackStore()

  const handleAddToDashboard = () => {
    // Add detection to store
    addDetection({
      bottles,
      points,
      earnings,
      co2Saved,
      confidence
    })

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    onAddToDashboard()
  }

  const achievements = [
    {
      condition: bottles >= 5,
      title: 'Bulk Collector',
      description: 'Collected 5+ bottles in one scan',
      icon: Award,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      condition: confidence >= 0.9,
      title: 'AI Master',
      description: 'High confidence detection',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600'
    },
    {
      condition: co2Saved >= 0.5,
      title: 'Eco Warrior',
      description: 'Significant CO₂ impact',
      icon: Leaf,
      color: 'from-green-500 to-teal-600'
    }
  ]

  const unlockedAchievements = achievements.filter(achievement => achievement.condition)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-8 w-8" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Scan Complete!</h2>
              <p className="text-green-100">
                {bottles} bottle{bottles !== 1 ? 's' : ''} detected with {Math.round(confidence * 100)}% confidence
              </p>
              {bottleDetails && (
                <div className="mt-3 p-3 bg-white/10 rounded-lg">
                  <p className="text-sm text-green-100">
                    <strong>{bottleDetails.size}</strong> {bottleDetails.material} bottle
                  </p>
                  <p className="text-xs text-green-200 mt-1">
                    {bottleDetails.description}
                  </p>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <Coins className="h-6 w-6 text-green-600 mr-2" />
                    <span className="font-bold text-green-600">STN ${earnings.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Earned</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-yellow-600 mr-2" />
                    <span className="font-bold text-yellow-600">+{points}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Points</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Leaf className="h-6 w-6 text-teal-600 mr-2" />
                  <span className="font-bold text-teal-600">{co2Saved.toFixed(1)} kg</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">CO₂ Saved</p>
              </motion.div>

              {/* Achievements */}
              {unlockedAchievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                    🎉 New Achievements!
                  </h3>
                  {unlockedAchievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className={`bg-gradient-to-r ${achievement.color} text-white p-3 rounded-xl`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">{achievement.title}</div>
                            <div className="text-sm opacity-90">{achievement.description}</div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToDashboard}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add to Dashboard</span>
                </div>
              </motion.button>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  Scan Again
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  Close
                </motion.button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


