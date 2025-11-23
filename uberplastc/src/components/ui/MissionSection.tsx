'use client'

import { motion } from 'framer-motion'
import { Heart, Target, Users, Globe } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useState, useEffect } from 'react'

export function MissionSection() {
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
            <h2 className="heading-2">Our Mission</h2>
            <p className="text-muted max-w-2xl mx-auto">
              We're building a sustainable future through innovative technology and community engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card text-center">
                <div className="bg-gray-200 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const missionPoints = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Transform waste into worth by making recycling rewarding and accessible for everyone.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'A world where every plastic bottle finds its way back to the circular economy.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Building a global community of eco-conscious individuals and organizations.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Globe,
      title: 'Environmental Impact',
      description: 'Reducing plastic pollution and carbon footprint through innovative technology.',
      color: 'from-teal-500 to-green-600'
    }
  ]

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`heading-2 ${darkMode ? 'heading-2-dark' : ''}`}>
            Our Mission: From Waste to Worth
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            We're building a sustainable future where every action counts and every bottle matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center group hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${point.color} p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`heading-3 ${darkMode ? 'heading-3-dark' : ''}`}>
                  {point.title}
                </h3>
                <p className="text-muted">
                  {point.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Join the Movement</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Together, we can create a cleaner, more sustainable world. Every bottle you recycle 
              brings us one step closer to a plastic-free future.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}