'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  color: string
  delay?: number
}

export function StatsCard({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  color,
  delay = 0
}: StatsCardProps) {
  const { darkMode } = useTheme()

  const changeColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative flex items-center justify-between bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 w-full sm:w-64 hover:shadow-xl transition-all duration-300 group hover:scale-105`}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className={`bg-gradient-to-r ${color} p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {change && (
            <span className={`text-sm font-medium ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {title}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

