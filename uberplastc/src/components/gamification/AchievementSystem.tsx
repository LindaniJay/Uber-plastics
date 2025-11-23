'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Award, 
  Trophy, 
  Star, 
  Zap, 
  Waves, 
  Fish, 
  Globe,
  CheckCircle,
  Lock,
  Sparkles
} from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'collection' | 'environmental' | 'social' | 'milestone'
  requirement: number
  current: number
  unlocked: boolean
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface AchievementSystemProps {
  bottlesCollected: number
  co2Saved: number
  oceanImpact: number
  socialShares: number
  countryCode: string
  onAchievementUnlocked?: (achievement: Achievement) => void
}

const achievements: Achievement[] = [
  // Collection Achievements
  {
    id: 'first_bottle',
    name: 'First Steps',
    description: 'Collected your first bottle',
    icon: '🌱',
    category: 'collection',
    requirement: 1,
    current: 0,
    unlocked: false,
    points: 10,
    rarity: 'common'
  },
  {
    id: 'eco_warrior',
    name: 'Eco Warrior',
    description: 'Collected 50 bottles',
    icon: '🛡️',
    category: 'collection',
    requirement: 50,
    current: 0,
    unlocked: false,
    points: 50,
    rarity: 'rare'
  },
  {
    id: 'ocean_hero',
    name: 'Ocean Hero',
    description: 'Collected 100 bottles',
    icon: '🌊',
    category: 'collection',
    requirement: 100,
    current: 0,
    unlocked: false,
    points: 100,
    rarity: 'epic'
  },
  {
    id: 'clean_coast_champion',
    name: 'Clean Coast Champion',
    description: 'Collected 500 bottles',
    icon: '🏆',
    category: 'collection',
    requirement: 500,
    current: 0,
    unlocked: false,
    points: 500,
    rarity: 'legendary'
  },

  // Environmental Achievements
  {
    id: 'co2_saver',
    name: 'CO₂ Saver',
    description: 'Saved 1 kg of CO₂',
    icon: '🌱',
    category: 'environmental',
    requirement: 1,
    current: 0,
    unlocked: false,
    points: 25,
    rarity: 'common'
  },
  {
    id: 'ocean_guardian',
    name: 'Ocean Guardian',
    description: 'Prevented 5 kg of ocean plastic',
    icon: '🐚',
    category: 'environmental',
    requirement: 5,
    current: 0,
    unlocked: false,
    points: 75,
    rarity: 'rare'
  },
  {
    id: 'marine_protector',
    name: 'Marine Protector',
    description: 'Prevented 20 kg of ocean plastic',
    icon: '🐠',
    category: 'environmental',
    requirement: 20,
    current: 0,
    unlocked: false,
    points: 200,
    rarity: 'epic'
  },

  // Blue Economy Achievements
  {
    id: 'blue_economy_advocate',
    name: 'Blue Economy Advocate',
    description: 'Made significant impact in island nation',
    icon: '🌊',
    category: 'environmental',
    requirement: 10,
    current: 0,
    unlocked: false,
    points: 150,
    rarity: 'epic'
  },
  {
    id: 'island_innovator',
    name: 'Island Innovator',
    description: 'Shared 3 eco insights',
    icon: '⚓',
    category: 'social',
    requirement: 3,
    current: 0,
    unlocked: false,
    points: 100,
    rarity: 'rare'
  },

  // Milestone Achievements
  {
    id: 'sustainability_leader',
    name: 'Sustainability Leader',
    description: 'Achieved 1000 total points',
    icon: '⭐',
    category: 'milestone',
    requirement: 1000,
    current: 0,
    unlocked: false,
    points: 300,
    rarity: 'legendary'
  }
]

export function AchievementSystem({ 
  bottlesCollected, 
  co2Saved, 
  oceanImpact, 
  socialShares,
  countryCode,
  onAchievementUnlocked 
}: AchievementSystemProps) {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements)
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([])
  const [showUnlocked, setShowUnlocked] = useState(false)

  useEffect(() => {
    checkAchievements()
  }, [bottlesCollected, co2Saved, oceanImpact, socialShares])

  const checkAchievements = () => {
    const updatedAchievements = userAchievements.map(achievement => {
      let current = 0
      
      switch (achievement.id) {
        case 'first_bottle':
        case 'eco_warrior':
        case 'ocean_hero':
        case 'clean_coast_champion':
          current = bottlesCollected
          break
        case 'co2_saver':
          current = co2Saved
          break
        case 'ocean_guardian':
        case 'marine_protector':
          current = oceanImpact
          break
        case 'blue_economy_advocate':
          current = countryCode === 'cabo_verde' || countryCode === 'sao_tome' ? bottlesCollected : 0
          break
        case 'island_innovator':
          current = socialShares
          break
        case 'sustainability_leader':
          current = userAchievements
            .filter(a => a.unlocked)
            .reduce((sum, a) => sum + a.points, 0)
          break
      }

      const wasUnlocked = achievement.unlocked
      const isUnlocked = current >= achievement.requirement

      return {
        ...achievement,
        current,
        unlocked: isUnlocked
      }
    })

    // Check for newly unlocked achievements
    const newlyUnlockedAchievements = updatedAchievements.filter(
      (achievement, index) => 
        !userAchievements[index].unlocked && achievement.unlocked
    )

    if (newlyUnlockedAchievements.length > 0) {
      setNewlyUnlocked(newlyUnlockedAchievements)
      setShowUnlocked(true)
      
      // Notify parent component
      newlyUnlockedAchievements.forEach(achievement => {
        onAchievementUnlocked?.(achievement)
      })
    }

    setUserAchievements(updatedAchievements)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400'
      case 'rare': return 'text-blue-400'
      case 'epic': return 'text-purple-400'
      case 'legendary': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 dark:bg-gray-800'
      case 'rare': return 'bg-blue-100 dark:bg-blue-900/20'
      case 'epic': return 'bg-purple-100 dark:bg-purple-900/20'
      case 'legendary': return 'bg-yellow-100 dark:bg-yellow-900/20'
      default: return 'bg-gray-100 dark:bg-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'collection': return <Zap className="h-4 w-4" />
      case 'environmental': return <Waves className="h-4 w-4" />
      case 'social': return <Globe className="h-4 w-4" />
      case 'milestone': return <Trophy className="h-4 w-4" />
      default: return <Award className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Achievement Unlocked Popup */}
      <AnimatePresence>
        {showUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-black/50 backdrop-blur-sm absolute inset-0" />
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md mx-auto text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Achievement Unlocked!
              </h3>
              {newlyUnlocked.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className="text-xl font-bold text-white">{achievement.name}</div>
                  <div className="text-yellow-100">{achievement.description}</div>
                  <div className="text-yellow-200 text-sm">+{achievement.points} points</div>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUnlocked(false)}
                className="bg-white text-orange-600 font-bold py-3 px-6 rounded-xl mt-4"
              >
                Awesome!
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl p-4 transition-all duration-300 ${
              achievement.unlocked 
                ? getRarityBg(achievement.rarity) 
                : 'bg-gray-100 dark:bg-gray-800 opacity-60'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-3xl">
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-bold ${
                    achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h4>
                  {achievement.unlocked && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                
                <p className={`text-sm mb-2 ${
                  achievement.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(achievement.category)}
                    <span className={`text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {achievement.current}/{achievement.requirement}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((achievement.current / achievement.requirement) * 100, 100)}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`h-2 rounded-full ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}
                  />
                </div>
                
                {achievement.unlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 text-xs font-bold text-green-600 dark:text-green-400"
                  >
                    +{achievement.points} points
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
