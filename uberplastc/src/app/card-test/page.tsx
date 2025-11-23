'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'

export default function CardTestPage() {
  const { darkMode } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
            Card Text Visibility Test
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Test Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-4">Card Title</h2>
              <p className="text-muted mb-4">
                This is a test paragraph to check text visibility in cards.
              </p>
              <div className="text-sm text-gray-500">
                Small text for additional information.
              </div>
              <div className="mt-4">
                <span className="text-green-600 font-semibold">Green text</span>
                <span className="text-blue-600 font-semibold ml-2">Blue text</span>
              </div>
            </motion.div>

            {/* Test Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-3">Stats Card</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bottles:</span>
                  <span className="font-bold text-green-600">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points:</span>
                  <span className="font-bold text-yellow-600">2,540</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Earnings:</span>
                  <span className="font-bold text-blue-600">$12.70</span>
                </div>
              </div>
            </motion.div>

            {/* Test Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-3">Form Card</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>
                <button className="btn-primary w-full">
                  Submit
                </button>
              </div>
            </motion.div>

            {/* Test Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-3">List Card</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  First item
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Second item
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Third item
                </li>
              </ul>
            </motion.div>

            {/* Test Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-3">Progress Card</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">75%</div>
                  <div className="text-sm text-gray-500">Complete</div>
                </div>
              </div>
            </motion.div>

            {/* Test Card 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-3">Button Card</h3>
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  Primary Button
                </button>
                <button className="btn-secondary w-full">
                  Secondary Button
                </button>
                <button className="btn-eco w-full">
                  Eco Button
                </button>
              </div>
            </motion.div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 card"
          >
            <h2 className="text-2xl font-bold mb-4">Test Instructions</h2>
            <div className="space-y-2 text-sm">
              <p>✅ All text should be clearly visible and readable</p>
              <p>✅ Headings should be bold and dark</p>
              <p>✅ Paragraphs should be clearly readable</p>
              <p>✅ Form inputs should have visible text</p>
              <p>✅ Buttons should have white text</p>
              <p>✅ All elements should have proper contrast</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

