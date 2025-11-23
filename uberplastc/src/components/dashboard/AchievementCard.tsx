'use client'

import { motion } from 'framer-motion'
import { Award, Star, Trophy, Target, Zap, Shield, Leaf } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface AchievementCardProps {
  title: string
  description: string
  icon: 'award' | 'star' | 'trophy' | 'target' | 'zap' | 'shield' | 'leaf'
  progress?: number
  maxProgress?: number
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  delay?: number
}

export function AchievementCard({ 
  title, 
  description, 
  icon, 
  progress = 0, 
  maxProgress = 100, 
  unlocked, 
  rarity,
  delay = 0
}: AchievementCardProps) {
  const { darkMode } = useTheme()

  const iconMap = {
    award: Award,
    star: Star,
    trophy: Trophy,
    target: Target,
    zap: Zap,
    shield: Shield,
    leaf: Leaf
  }

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-600'
  }

  const Icon = iconMap[icon]
  const progressPercentage = (progress / maxProgress) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`achievement-card ${darkMode ? 'achievement-card-dark' : ''} ${
        unlocked ? 'ring-2 ring-yellow-400' : ''
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`bg-gradient-to-r ${rarityColors[rarity]} p-3 rounded-xl shadow-lg ${
          unlocked ? 'animate-pulse' : 'opacity-60'
        }`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            {unlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-yellow-500"
              >
                <Star className="h-5 w-5 fill-current" />
              </motion.div>
            )}
          </div>
          
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
            {description}
          </p>
          
          {!unlocked && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{progress}/{maxProgress}</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}


