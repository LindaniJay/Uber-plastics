'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  delay?: number
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = 'from-green-500 to-teal-600',
  label,
  delay = 0
}: ProgressRingProps) {
  const { darkMode } = useTheme()
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="relative flex items-center justify-center"
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={darkMode ? '#374151' : '#e5e7eb'}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#gradient-${color.replace(/\s+/g, '-')})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.5 + delay }}
        />
        <defs>
          <linearGradient id={`gradient-${color.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color.split(' ')[0].replace('from-', '')} />
            <stop offset="100%" stopColor={color.split(' ')[2].replace('to-', '')} />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + delay }}
            className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {progress}%
          </motion.div>
          {label && (
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {label}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}


