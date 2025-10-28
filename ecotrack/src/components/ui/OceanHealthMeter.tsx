'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Waves, 
  Fish, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'
import { useCountryData } from '@/hooks/useCountryData'

interface OceanHealthMeterProps {
  bottlesCollected: number
  countryCode: string
  className?: string
}

export function OceanHealthMeter({ bottlesCollected, countryCode, className = '' }: OceanHealthMeterProps) {
  const { data, calculateEcoScore, getContextualInsight } = useCountryData(countryCode)
  const [healthScore, setHealthScore] = useState(0)
  const [showInsight, setShowInsight] = useState(false)

  useEffect(() => {
    if (data && bottlesCollected > 0) {
      const ecoScore = calculateEcoScore(bottlesCollected)
      setHealthScore(Math.min(ecoScore, 100))
    }
  }, [bottlesCollected, data, calculateEcoScore])

  const getHealthLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-500', bg: 'bg-green-500' }
    if (score >= 60) return { level: 'Good', color: 'text-blue-500', bg: 'bg-blue-500' }
    if (score >= 40) return { level: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500' }
    if (score >= 20) return { level: 'Poor', color: 'text-orange-500', bg: 'bg-orange-500' }
    return { level: 'Critical', color: 'text-red-500', bg: 'bg-red-500' }
  }

  const healthLevel = getHealthLevel(healthScore)

  const oceanMetrics = [
    {
      icon: Fish,
      label: 'Marine Life',
      value: Math.round(healthScore * 0.8),
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      label: 'Ecosystem',
      value: Math.round(healthScore * 0.9),
      color: 'text-green-400'
    },
    {
      icon: Waves,
      label: 'Water Quality',
      value: Math.round(healthScore * 0.7),
      color: 'text-cyan-400'
    }
  ]

  return (
    <div className={`bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 rounded-2xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <Waves className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Ocean Health Meter</h3>
            <p className="text-blue-200 text-sm">Real-time environmental impact</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInsight(!showInsight)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
        >
          <Info className="h-5 w-5 text-white" />
        </motion.button>
      </div>

      {/* Health Score */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative w-32 h-32 mx-auto mb-4"
        >
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#healthGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 251.2" }}
              animate={{ strokeDasharray: `${(healthScore / 100) * 251.2} 251.2` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
              <div className={`text-3xl font-bold ${healthLevel.color}`}>
                {healthScore}
              </div>
              <div className="text-xs text-blue-200">Score</div>
            </div>
          </div>
        </motion.div>
        
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${healthLevel.bg}`}></div>
          <span className={`font-semibold ${healthLevel.color}`}>
            {healthLevel.level}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {oceanMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="p-3 bg-white/10 rounded-xl mb-2">
                <Icon className="h-6 w-6 mx-auto text-cyan-400" />
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}%
              </div>
              <div className="text-xs text-blue-200">
                {metric.label}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Impact Summary */}
      <div className="bg-white/10 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-200">Your Impact</span>
          <TrendingUp className="h-4 w-4 text-green-400" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-white font-bold">
              {bottlesCollected} bottles
            </div>
            <div className="text-blue-200">collected</div>
          </div>
          <div>
            <div className="text-white font-bold">
              {(bottlesCollected * 0.15).toFixed(1)} kg
            </div>
            <div className="text-blue-200">ocean plastic prevented</div>
          </div>
        </div>
      </div>

      {/* Contextual Insight */}
      <AnimatePresence>
        {showInsight && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4"
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-white mb-1">
                  Environmental Impact
                </div>
                <div className="text-xs text-blue-100">
                  {getContextualInsight(bottlesCollected)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Badges */}
      {bottlesCollected > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <div className="text-sm font-medium text-blue-200 mb-2">Recent Achievements</div>
          <div className="flex space-x-2">
            {bottlesCollected >= 10 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="flex items-center space-x-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs"
              >
                <span>🌱</span>
                <span>First Steps</span>
              </motion.div>
            )}
            {bottlesCollected >= 50 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="flex items-center space-x-1 bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs"
              >
                <span>🐚</span>
                <span>Ocean Guardian</span>
              </motion.div>
            )}
            {bottlesCollected >= 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="flex items-center space-x-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs"
              >
                <span>🌊</span>
                <span>Blue Economy Advocate</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
