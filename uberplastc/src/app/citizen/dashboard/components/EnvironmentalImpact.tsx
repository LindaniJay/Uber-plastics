import { motion } from 'framer-motion'
import { Leaf, Droplets, Cloud, Zap } from 'lucide-react'

const stats = [
  { name: 'CO₂ Saved', value: '124 kg', icon: Cloud, change: '+12%', changeType: 'increase' },
  { name: 'Water Saved', value: '2,450 L', icon: Droplets, change: '+8%', changeType: 'increase' },
  { name: 'Energy Saved', value: '1,250 kWh', icon: Zap, change: '+15%', changeType: 'increase' },
]

export function EnvironmentalImpact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Environmental Impact
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your contribution to a greener planet
        </p>
      </div>
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 gap-5">
          {stats.map((stat) => (
            <div key={stat.name} className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      stat.changeType === 'increase'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              style={{ width: '75%' }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Your impact</span>
            <span>75% of monthly goal</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
