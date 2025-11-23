import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import React from 'react'

type StatsCardProps = {
  icon: LucideIcon
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  color: string
}

export function StatsCard({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  changeType,
  color 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 bg-gradient-to-br ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {value}
                </div>
                <div 
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400'
                      : changeType === 'negative'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {change}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all
          </a>
        </div>
      </div>
    </motion.div>
  )
}
