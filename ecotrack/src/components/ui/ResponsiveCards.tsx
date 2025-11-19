'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ResponsiveCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'glass' | 'solid'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  hover?: boolean
  animate?: boolean
  delay?: number
}

export function ResponsiveCard({
  children,
  className = '',
  variant = 'glass',
  size = 'md',
  padding = 'md',
  rounded = 'xl',
  shadow = 'md',
  hover = true,
  animate = true,
  delay = 0
}: ResponsiveCardProps) {
  const baseClasses = 'w-full'
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700',
    glass: 'glass-card',
    solid: 'bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
  }
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
  
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  }
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  }
  
  const hoverClasses = hover ? 'hover:shadow-lg dark:hover:shadow-xl transition-all duration-300' : ''
  
  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    paddingClasses[padding],
    roundedClasses[rounded],
    shadowClasses[shadow],
    hoverClasses,
    className
  ].filter(Boolean).join(' ')

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
        className={cardClasses}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'teal'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  delay?: number
}

export function StatCard({
  icon,
  value,
  label,
  color = 'green',
  size = 'md',
  animate = true,
  delay = 0
}: StatCardProps) {
  const colorClasses = {
    green: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 text-green-600',
    blue: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 text-blue-600',
    yellow: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700 text-yellow-600',
    red: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-700 text-red-600',
    purple: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 text-purple-600',
    teal: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-700 text-teal-600'
  }
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
  
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }
  
  const valueSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  }
  
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const cardContent = (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl ${sizeClasses[size]} text-center border`}>
      <div className="flex items-center justify-center mb-2">
        <div className={`${iconSizeClasses[size]} mr-2`}>
          {icon}
        </div>
        <span className={`font-bold ${valueSizeClasses[size]}`}>
          {value}
        </span>
      </div>
      <p className={`${labelSizeClasses[size]} text-gray-600 dark:text-gray-300`}>
        {label}
      </p>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}

interface AchievementCardProps {
  title: string
  description: string
  icon: ReactNode
  reward?: string
  color?: string
  animate?: boolean
  delay?: number
}

export function AchievementCard({
  title,
  description,
  icon,
  reward,
  color = 'from-yellow-500 to-orange-600',
  animate = true,
  delay = 0
}: AchievementCardProps) {
  const cardContent = (
    <div className={`bg-gradient-to-r ${color} text-white p-4 rounded-2xl shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-5 w-5">
            {icon}
          </div>
          <div>
            <div className="font-bold text-sm">{title}</div>
            <div className="text-xs opacity-90">{description}</div>
          </div>
        </div>
        {reward && (
          <div className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
            {reward}
          </div>
        )}
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}

interface InfoCardProps {
  title: string
  content: string | ReactNode
  icon?: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  animate?: boolean
  delay?: number
}

export function InfoCard({
  title,
  content,
  icon,
  variant = 'info',
  animate = true,
  delay = 0
}: InfoCardProps) {
  const variantClasses = {
    info: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700',
    success: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700',
    warning: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-700',
    error: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-700'
  }

  const cardContent = (
    <div className={`bg-gradient-to-br ${variantClasses[variant]} rounded-2xl p-4 border`}>
      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-center flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h4>
      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        {content}
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}


