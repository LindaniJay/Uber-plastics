'use client'

import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Leaf, 
  Waves, 
  Target, 
  TrendingUp,
  Award,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { useCountryData } from '@/hooks/useCountryData'

interface EcoScoringSystemProps {
  bottlesDetected: number
  bottleTypes?: Array<{
    type: 'PET' | 'HDPE' | 'PP' | 'Other'
    count: number
    recyclability: number
  }>
  countryCode: string
  onScoreCalculated?: (score: number, insights: string[]) => void
}

interface EcoScore {
  total: number
  co2Saved: number
  oceanImpact: number
  recyclabilityBonus: number
  countryMultiplier: number
  insights: string[]
}

export function EcoScoringSystem({ 
  bottlesDetected, 
  bottleTypes = [], 
  countryCode,
  onScoreCalculated 
}: EcoScoringSystemProps) {
  const { data, calculateEcoScore, getContextualInsight } = useCountryData(countryCode)
  const [ecoScore, setEcoScore] = useState<EcoScore | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (data && bottlesDetected > 0) {
      calculateEcoScoreDetails()
    }
  }, [bottlesDetected, bottleTypes, data])

  const calculateEcoScoreDetails = () => {
    if (!data) return

    const baseScore = calculateEcoScore(bottlesDetected)
    const co2Saved = bottlesDetected * data.plastic_data.environmental_impact.co2_per_bottle_kg
    const oceanImpact = bottlesDetected * data.plastic_data.environmental_impact.ocean_plastic_reduction_per_bottle_kg
    
    // Calculate recyclability bonus
    let recyclabilityBonus = 0
    if (bottleTypes.length > 0) {
      const avgRecyclability = bottleTypes.reduce((sum, type) => 
        sum + (type.recyclability * type.count), 0) / bottlesDetected
      recyclabilityBonus = Math.round(avgRecyclability * 20) // Max 20 points bonus
    }

    // Country-specific multiplier
    const countryMultiplier = data.plastic_data.environmental_impact.marine_ecosystem_benefit_score

    const totalScore = Math.round(
      (baseScore + recyclabilityBonus) * countryMultiplier
    )

    const insights = generateInsights(co2Saved, oceanImpact, recyclabilityBonus, countryCode)

    const score: EcoScore = {
      total: Math.min(totalScore, 100),
      co2Saved,
      oceanImpact,
      recyclabilityBonus,
      countryMultiplier,
      insights
    }

    setEcoScore(score)
    onScoreCalculated?.(score.total, insights)

    // Trigger animation completion
    setTimeout(() => setAnimationComplete(true), 1000)
  }

  const generateInsights = (co2Saved: number, oceanImpact: number, recyclabilityBonus: number, country: string): string[] => {
    const insights = []

    if (co2Saved > 0.5) {
      insights.push(`🌱 Saved ${co2Saved.toFixed(2)} kg CO₂ - equivalent to ${(co2Saved * 2.5).toFixed(1)} km of driving avoided!`)
    }

    if (oceanImpact > 0.3) {
      insights.push(`🌊 Prevented ${oceanImpact.toFixed(2)} kg of ocean plastic - protecting marine life!`)
    }

    if (recyclabilityBonus > 10) {
      insights.push(`♻️ High recyclability bonus - these materials are valuable for circular economy!`)
    }

    if (country === 'CV') {
      insights.push(`🇨🇻 In Cabo Verde, where packaging dominates imports, every bottle helps reduce dependency!`)
    } else if (country === 'ST') {
      insights.push(`🇸🇹 São Tomé's limited recycling capacity makes your contribution even more impactful!`)
    }

    return insights
  }

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: 'Exceptional', color: 'text-green-400', bg: 'bg-green-500', icon: Award }
    if (score >= 75) return { level: 'Excellent', color: 'text-blue-400', bg: 'bg-blue-500', icon: TrendingUp }
    if (score >= 60) return { level: 'Good', color: 'text-yellow-400', bg: 'bg-yellow-500', icon: CheckCircle }
    if (score >= 40) return { level: 'Fair', color: 'text-orange-400', bg: 'bg-orange-500', icon: AlertTriangle }
    return { level: 'Needs Improvement', color: 'text-red-400', bg: 'bg-red-500', icon: AlertTriangle }
  }

  if (ecoScore) {
    const scoreLevel = getScoreLevel(ecoScore.total)
    const Icon = scoreLevel.icon

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Eco-Score
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Real-time environmental impact assessment
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200"
          >
            <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>

        {/* Score Display */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative w-24 h-24 mx-auto mb-4"
          >
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="35"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 219.8" }}
                animate={{ strokeDasharray: `${(ecoScore.total / 100) * 219.8} 219.8` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="25%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="75%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {ecoScore.total}
                </motion.div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center justify-center space-x-2">
            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className={`font-semibold ${scoreLevel.color}`}>
              {scoreLevel.level}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {ecoScore.co2Saved.toFixed(2)} kg
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">CO₂ Saved</div>
          </div>
          <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {ecoScore.oceanImpact.toFixed(2)} kg
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Ocean Impact</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Score Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Base Impact</span>
                    <span className="font-medium">{Math.round(ecoScore.total / ecoScore.countryMultiplier - ecoScore.recyclabilityBonus)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Recyclability Bonus</span>
                    <span className="font-medium text-green-600">+{ecoScore.recyclabilityBonus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Country Multiplier</span>
                    <span className="font-medium text-blue-600">×{ecoScore.countryMultiplier.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold">
                    <span>Total Score</span>
                    <span>{ecoScore.total}</span>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Environmental Insights
                </h4>
                <div className="space-y-2">
                  {ecoScore.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      {insight}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievement Animation */}
        <AnimatePresence>
          {animationComplete && ecoScore.total >= 75 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="mt-4 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-2xl mb-2"
              >
                🎉
              </motion.div>
              <div className="text-white font-bold">
                Excellent Environmental Impact!
              </div>
              <div className="text-green-100 text-sm">
                You're making a real difference for our planet
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return null
}
