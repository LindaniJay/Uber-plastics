'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Award, 
  Star, 
  Gift, 
  ShoppingBag, 
  Coins,
  Trophy,
  Zap,
  Heart,
  Sparkles
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'

export default function RewardsPage() {
  const { darkMode } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Rewards', icon: Gift },
    { id: 'food', name: 'Food Vouchers', icon: Star },
    { id: 'utilities', name: 'Utilities', icon: Zap },
    { id: 'health', name: 'Health & Education', icon: Heart }
  ]

  const rewards = [
    {
      id: 1,
      title: 'Rice Voucher',
      description: '5kg bag of rice at local market',
      polyMoney: 50,
      category: 'food',
      image: '🍚',
      rarity: 'common',
      available: true
    },
    {
      id: 2,
      title: 'Electricity Credit',
      description: 'STN 500 electricity bill credit',
      polyMoney: 200,
      category: 'utilities',
      image: '⚡',
      rarity: 'common',
      available: true
    },
    {
      id: 3,
      title: 'Water Bill Credit',
      description: 'STN 300 water bill credit',
      polyMoney: 150,
      category: 'utilities',
      image: '💧',
      rarity: 'common',
      available: true
    },
    {
      id: 4,
      title: 'Medicine Voucher',
      description: 'Basic medicine at local pharmacy',
      polyMoney: 300,
      category: 'health',
      image: '💊',
      rarity: 'rare',
      available: true
    },
    {
      id: 5,
      title: 'School Supplies',
      description: 'Notebooks and pens for children',
      polyMoney: 150,
      category: 'health',
      image: '📚',
      rarity: 'common',
      available: true
    },
    {
      id: 6,
      title: 'Fish Voucher',
      description: 'Fresh fish from local fishermen',
      polyMoney: 120,
      category: 'food',
      image: '🐟',
      rarity: 'common',
      available: true
    },
    {
      id: 7,
      title: 'Bread Voucher',
      description: 'Daily bread for one week',
      polyMoney: 80,
      category: 'food',
      image: '🍞',
      rarity: 'common',
      available: true
    },
    {
      id: 8,
      title: 'Mobile Credit',
      description: 'CVE 200 mobile phone credit',
      polyMoney: 100,
      category: 'utilities',
      image: '📱',
      rarity: 'common',
      available: true
    },
    {
      id: 9,
      title: 'Transport Voucher',
      description: 'Bus tickets for one week',
      polyMoney: 100,
      category: 'utilities',
      image: '🚌',
      rarity: 'common',
      available: true
    },
    {
      id: 10,
      title: 'Cooking Oil Voucher',
      description: '1L bottle of cooking oil',
      polyMoney: 75,
      category: 'food',
      image: '🫒',
      rarity: 'common',
      available: true
    }
  ]

  const userPolyMoney = 2540
  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory)

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-600'
  }

  const handleRedeem = (reward: any) => {
    if (userPolyMoney >= reward.polyMoney) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      toast.success(`Congratulations! You've redeemed ${reward.title}!`)
    } else {
      toast.error('Not enough poly money! Keep collecting to earn more.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Rewards Store
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Redeem your poly money for amazing eco-friendly rewards
            </p>
          </div>

          {/* Poly Money Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-xl">
                  <Coins className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userPolyMoney.toLocaleString()} poly money
                  </h2>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Available for redemption
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">This Month</div>
                <div className="text-lg font-semibold text-green-600">+450 poly money</div>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Rewards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card group hover:scale-105"
                >
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-6xl mb-4"
                    >
                      {reward.image}
                    </motion.div>
                    
                    <div className="flex items-center justify-center mb-2">
                      <div className={`bg-gradient-to-r ${rarityColors[reward.rarity as keyof typeof rarityColors]} px-3 py-1 rounded-full text-white text-xs font-medium`}>
                        {reward.rarity.toUpperCase()}
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {reward.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {reward.description}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Coins className="h-5 w-5 text-yellow-500" />
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {reward.polyMoney.toLocaleString()} poly money
                      </span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRedeem(reward)}
                      disabled={userPolyMoney < reward.polyMoney}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                        userPolyMoney >= reward.polyMoney
                          ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {userPolyMoney >= reward.polyMoney ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Gift className="h-4 w-4" />
                          <span>Redeem</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Star className="h-4 w-4" />
                          <span>Need {reward.polyMoney - userPolyMoney} more poly money</span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Earning Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 card"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              How to Earn More Poly Money
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Daily Logging</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Log bottles daily for bonus poly money
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Achievements</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Complete challenges for extra rewards
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Streaks</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Maintain daily streaks for multipliers
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


