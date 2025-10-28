'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Award, 
  Coffee, 
  Ticket, 
  Wifi, 
  Shirt, 
  Gift,
  Star,
  CheckCircle,
  Clock,
  Zap,
  Heart
} from 'lucide-react'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import { useTheme } from '@/contexts/ThemeContext'

interface Reward {
  id: string
  name: string
  description: string
  polyMoney: number
  icon: string
  category: 'food' | 'utilities' | 'health' | 'education' | 'transport'
  available: boolean
  redeemed: boolean
  expiryDate?: string
  partner?: string
}

const rewards: Reward[] = [
  {
    id: 'rice_voucher',
    name: 'Rice Voucher',
    description: '5kg bag of rice at local market',
    polyMoney: 50,
    icon: '🍚',
    category: 'food',
    available: true,
    redeemed: false,
    partner: 'Mercado Central'
  },
  {
    id: 'cooking_oil_voucher',
    name: 'Cooking Oil Voucher',
    description: '1L bottle of cooking oil',
    polyMoney: 75,
    icon: '🫒',
    category: 'food',
    available: true,
    redeemed: false,
    partner: 'Mercado Central'
  },
  {
    id: 'electricity_voucher',
    name: 'Electricity Voucher',
    description: 'CVE 500 electricity credit',
    polyMoney: 200,
    icon: '⚡',
    category: 'utilities',
    available: true,
    redeemed: false,
    partner: 'Electra'
  },
  {
    id: 'water_voucher',
    name: 'Water Voucher',
    description: 'CVE 300 water bill credit',
    polyMoney: 150,
    icon: '💧',
    category: 'utilities',
    available: true,
    redeemed: false,
    partner: 'Águas de Santiago'
  },
  {
    id: 'mobile_credit',
    name: 'Mobile Credit',
    description: 'CVE 200 mobile phone credit',
    polyMoney: 100,
    icon: '📱',
    category: 'utilities',
    available: true,
    redeemed: false,
    partner: 'CV Telecom'
  },
  {
    id: 'fish_voucher',
    name: 'Fish Voucher',
    description: 'Fresh fish from local fishermen',
    polyMoney: 120,
    icon: '🐟',
    category: 'food',
    available: true,
    redeemed: false,
    partner: 'Pescadores Locais'
  },
  {
    id: 'bread_voucher',
    name: 'Bread Voucher',
    description: 'Daily bread for one week',
    polyMoney: 80,
    icon: '🍞',
    category: 'food',
    available: true,
    redeemed: false,
    partner: 'Padaria Comunitária'
  },
  {
    id: 'medicine_voucher',
    name: 'Medicine Voucher',
    description: 'Basic medicine at local pharmacy',
    polyMoney: 300,
    icon: '💊',
    category: 'health',
    available: true,
    redeemed: false,
    partner: 'Farmácia Popular'
  },
  {
    id: 'school_supplies',
    name: 'School Supplies',
    description: 'Notebooks and pens for children',
    polyMoney: 150,
    icon: '📚',
    category: 'education',
    available: true,
    redeemed: false,
    partner: 'Escola Comunitária'
  },
  {
    id: 'transport_voucher',
    name: 'Transport Voucher',
    description: 'Bus tickets for one week',
    polyMoney: 100,
    icon: '🚌',
    category: 'transport',
    available: true,
    redeemed: false,
    partner: 'Transportes Urbanos'
  }
]

export function RewardsWidget() {
  const { darkMode } = useTheme()
  const { userStats } = useEcoTrackStore()
  const [availableRewards, setAvailableRewards] = useState<Reward[]>(rewards)
  const [showRedeemed, setShowRedeemed] = useState(false)

  const redeemReward = (rewardId: string) => {
    setAvailableRewards(prev => 
      prev.map(reward => 
        reward.id === rewardId 
          ? { ...reward, redeemed: true, available: false }
          : reward
      )
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return <Coffee className="h-4 w-4" />
      case 'utilities': return <Zap className="h-4 w-4" />
      case 'health': return <Heart className="h-4 w-4" />
      case 'education': return <Star className="h-4 w-4" />
      case 'transport': return <Ticket className="h-4 w-4" />
      default: return <Gift className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'from-orange-500 to-red-500'
      case 'utilities': return 'from-yellow-500 to-orange-500'
      case 'health': return 'from-red-500 to-pink-500'
      case 'education': return 'from-blue-500 to-indigo-500'
      case 'transport': return 'from-green-500 to-teal-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const canAfford = (polyMoney: number) => userStats.totalPolyMoney >= polyMoney

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🎁 Available Rewards
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {userStats.totalPolyMoney} poly money
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Poly Money Balance */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-lg">
              {userStats.totalPolyMoney} Poly Money
            </div>
            <div className="text-yellow-100 text-sm">
              Available for redemption
            </div>
          </div>
          <div className="text-3xl">⭐</div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {availableRewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              reward.redeemed
                ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-60'
                : canAfford(reward.polyMoney)
                ? 'bg-white dark:bg-gray-800 border-green-300 dark:border-green-600 hover:shadow-lg'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-75'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{reward.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {reward.name}
                  </h3>
                  {reward.redeemed && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {reward.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(reward.category)}
                    <span className="text-xs text-gray-500">
                      {reward.partner}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${
                      canAfford(reward.polyMoney) ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {reward.polyMoney} poly money
                    </span>
                    
                    {!reward.redeemed && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => redeemReward(reward.id)}
                        disabled={!canAfford(reward.polyMoney)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                          canAfford(reward.polyMoney)
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford(reward.polyMoney) ? 'Redeem' : 'Need More Poly Money'}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Local Deals */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="h-5 w-5 text-blue-500" />
          <h3 className="font-bold text-blue-900 dark:text-blue-100">
            Local Eco Deals
          </h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 dark:text-blue-200">
              Beach Cleanup Event - Tomorrow
            </span>
            <span className="text-blue-600 font-medium">+50 bonus poly money</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-800 dark:text-blue-200">
              Ocean Conservation Workshop
            </span>
            <span className="text-blue-600 font-medium">+100 bonus poly money</span>
          </div>
        </div>
      </div>
    </div>
  )
}
