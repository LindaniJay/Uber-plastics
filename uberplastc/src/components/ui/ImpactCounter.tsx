'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Recycle, Zap } from 'lucide-react'

export function ImpactCounter() {
  const [counts, setCounts] = useState({
    bottles: 0,
    co2: 0,
    users: 0
  })

  const targets = {
    bottles: 125000,
    co2: 2500,
    users: 15000
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        bottles: Math.min(prev.bottles + Math.floor(Math.random() * 5) + 1, targets.bottles),
        co2: Math.min(prev.co2 + Math.floor(Math.random() * 2) + 1, targets.co2),
        users: Math.min(prev.users + Math.floor(Math.random() * 3) + 1, targets.users)
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [targets])

  const stats = [
    {
      icon: Recycle,
      value: counts.bottles.toLocaleString(),
      label: 'Bottles Recycled',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Leaf,
      value: `${counts.co2.toLocaleString()} kg`,
      label: 'CO₂ Saved',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Zap,
      value: counts.users.toLocaleString(),
      label: 'Active Users',
      color: 'from-blue-500 to-purple-600'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/20 text-gray-900"
          >
            <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl w-16 h-16 mx-auto mb-4 flex-center shadow-lg`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <motion.div
              key={stat.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              {stat.value}
            </motion.div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

