import { motion } from 'framer-motion'
import { 
  Recycle, 
  Award, 
  TrendingUp, 
  Zap,
  Users,
  Clock
} from 'lucide-react'
import React from 'react'

type ActivityType = 'recycle' | 'reward' | 'level_up' | 'community'

type Activity = {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: number
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'recycle':
      return <Recycle className="h-5 w-5 text-green-500" />
    case 'reward':
      return <Award className="h-5 w-5 text-yellow-500" />
    case 'level_up':
      return <TrendingUp className="h-5 w-5 text-blue-500" />
    case 'community':
      return <Users className="h-5 w-5 text-purple-500" />
    default:
      return <Zap className="h-5 w-5 text-gray-500" />
  }
}

const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  
  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) return `${interval} years ago`
  if (interval === 1) return '1 year ago'
  
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) return `${interval} months ago`
  if (interval === 1) return '1 month ago'
  
  interval = Math.floor(seconds / 86400)
  if (interval > 1) return `${interval} days ago`
  if (interval === 1) return '1 day ago'
  
  interval = Math.floor(seconds / 3600)
  if (interval > 1) return `${interval} hours ago`
  if (interval === 1) return '1 hour ago'
  
  interval = Math.floor(seconds / 60)
  if (interval > 1) return `${interval} minutes ago`
  if (interval === 1) return '1 minute ago'
  
  return 'just now'
}

type RecentActivityProps = {
  activities: Array<Activity>
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Recent Activity
          </h3>
        </div>
        <div className="px-6 py-12 text-center">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No activity yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your recent activities will appear here.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {activity.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all activity
          </a>
        </div>
      </div>
    </motion.div>
  )
}
