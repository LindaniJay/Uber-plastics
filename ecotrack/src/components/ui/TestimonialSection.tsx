'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useState, useEffect } from 'react'

export function TestimonialSection() {
  const { darkMode } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2">What Our Users Say</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Join thousands of users who are making a difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card group">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center animate-pulse"></div>
                  <div className="ml-4">
                    <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Environmental Activist',
      content: 'Uber Plastic has completely changed how I think about recycling. The gamification makes it fun and rewarding!',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'University Student',
      content: 'I love seeing my impact in real-time. The CO₂ savings counter motivates me to recycle more.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Corporate Sustainability Manager',
      content: 'Our organization has reduced plastic waste by 40% since using Uber Plastic. The team loves the friendly competition.',
      rating: 5,
      avatar: 'ER'
    }
  ]

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`heading-2 ${darkMode ? 'heading-2-dark' : ''}`}>
            What Our Community Says
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Join thousands of users who are making a real difference for our planet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="h-6 w-6 text-green-500 mb-3" />
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-700/30">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join our community and start making a difference today. Your impact matters!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                🌱 Eco-Friendly
              </span>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                🏆 Rewarding
              </span>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                🚀 Innovative
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


