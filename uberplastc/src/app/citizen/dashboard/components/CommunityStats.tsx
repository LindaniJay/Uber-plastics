import { motion } from 'framer-motion'
import { Users, Trophy, Award, TrendingUp } from 'lucide-react'

const stats = [
  { name: 'Active Users', value: '2,345', icon: Users, change: '+12%' },
  { name: 'Your Rank', value: '#42', icon: Trophy, change: '↑3' },
  { name: 'Weekly Leader', value: 'eco_warrior42', icon: Award, change: 'You!' },
  { name: 'Community Impact', value: '12.5T', icon: TrendingUp, change: '+5.2%' },
]

export function CommunityStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Community Stats
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          See how you compare with others
        </p>
      </div>
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 gap-5">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.name}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Your Impact Level
            </h4>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Eco Warrior
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: '85%' }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            850/1000 points to next level
          </p>
        </div>
      </div>
    </motion.div>
  )
}
