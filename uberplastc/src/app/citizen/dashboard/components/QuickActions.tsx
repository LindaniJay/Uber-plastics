import { motion } from 'framer-motion'
import Link from 'next/link'
import { PlusCircle, Camera, QrCode, Upload, MapPin, Gift } from 'lucide-react'

const actionItems = [
  {
    name: 'Log Plastic',
    description: 'Manual entry or AI scan',
    icon: Camera,
    href: '/individual/log-plastic',
    color: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Redeem Points',
    description: 'Use your EcoPoints',
    icon: Gift,
    href: '#',
    color: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-300',
  },
  {
    name: 'Find Drop-off',
    description: 'Locate recycling centers',
    icon: MapPin,
    href: '#',
    color: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-300',
  },
  {
    name: 'Scan QR Code',
    description: 'Scan a QR code',
    icon: QrCode,
    href: '#',
    color: 'bg-yellow-100 dark:bg-yellow-900',
    iconColor: 'text-yellow-600 dark:text-yellow-300',
  },
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Quick Actions
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Common tasks at your fingertips
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {actionItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className="relative rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-300 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 transition-colors duration-200"
            >
              <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                <item.icon className={`h-6 w-6 ${item.iconColor}`} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={item.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {item.description}
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
