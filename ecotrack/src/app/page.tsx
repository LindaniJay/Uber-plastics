'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Leaf, 
  Users, 
  Building, 
  Truck, 
  Warehouse, 
  Award, 
  TrendingUp,
  Globe,
  Recycle,
  LogIn,
  Star,
  Heart,
  Zap
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'

export default function HomePage() {
  const { darkMode } = useTheme()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Note: Removed automatic redirect to allow users to stay on home page
  // Users can navigate to their dashboard via the navigation menu

  const features = [
    {
      icon: Recycle,
      title: 'AI Waste Management',
      description: 'Smart collection and processing systems with real-time tracking',
      color: 'from-emerald-600 to-green-700'
    },
    {
      icon: Award,
      title: 'Reward System',
      description: 'Financial incentives for proper waste disposal and recycling',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Data insights to measure and optimize environmental impact',
      color: 'from-teal-600 to-cyan-700'
    },
    {
      icon: Globe,
      title: 'Community Platform',
      description: 'Connect individuals and organizations in waste management',
      color: 'from-green-600 to-emerald-700'
    }
  ]

  const userTypes = [
    {
      path: '/individual',
      title: 'Eco Citizen',
      description: 'Join the ecosystem restoration movement and track your environmental impact',
      icon: Users,
      color: 'from-emerald-500 to-green-600',
      features: ['Log ecosystem contributions', 'Earn nature credits', 'Track biodiversity impact', 'Unlock eco rewards'],
      gradient: 'bg-gradient-to-br from-emerald-50 to-green-50'
    },
    {
      path: '/hub',
      title: 'Eco Hub',
      description: 'Transform your business into an ecosystem-positive organization and collection hub',
      icon: Building,
      color: 'from-teal-500 to-cyan-600',
      features: ['Circular economy tracking', 'Sustainable operations', 'Eco team training', 'Community engagement', 'Collection hub services'],
      gradient: 'bg-gradient-to-br from-teal-50 to-cyan-50'
    },
    {
      path: '/collector',
      title: 'Eco Collector',
      description: 'Be the bridge between waste and ecosystem restoration',
      icon: Truck,
      color: 'from-lime-500 to-emerald-600',
      features: ['Ecosystem pickup routes', 'Biodiversity mapping', 'Restoration confirmations', 'Nature impact tracking'],
      gradient: 'bg-gradient-to-br from-lime-50 to-emerald-50'
    },
    {
      path: '/depot',
      title: 'Eco Processing Center',
      description: 'Transform waste into ecosystem resources and biodiversity support',
      icon: Warehouse,
      color: 'from-green-500 to-teal-600',
      features: ['Ecosystem processing', 'Biodiversity verification', 'Nature credit processing', 'Restoration tracking'],
      gradient: 'bg-gradient-to-br from-green-50 to-teal-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 screen-fit" suppressHydrationWarning>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center content-fit">
        {/* Uber Plastic Background */}
        <div className="absolute inset-0">
          {/* Dark grey gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-gray-700/15 to-gray-800/20" />
          
          {/* Floating dim green shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-600/8 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-32 right-16 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-float delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-700/6 rounded-full blur-2xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-green-400/8 rounded-full blur-lg animate-float delay-3000"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 right-1/4 w-16 h-16 bg-green-500/6 transform rotate-45 rounded-full blur-lg animate-pulse delay-500"></div>
          <div className="absolute bottom-32 left-1/3 w-12 h-12 bg-green-400/8 transform rotate-12 rounded-full blur-md animate-pulse delay-1500"></div>
          
          {/* Ripple effects */}
          <div className="absolute bottom-10 right-10 w-28 h-28 border-2 border-green-500/15 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-green-400/10 rounded-full animate-ping delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Uber Plastic Logo with African Continent */}
            <div className="mb-12 flex items-center justify-center">
                <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
                  {/* Logo Image */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="/uber-plastic-logo.png"
                      alt="Uber Plastic Logo"
                      width={200}
                      height={200}
                      className="rounded-2xl shadow-2xl"
                      priority
                    />
                  </div>
                  
                  {/* Brand Text */}
                  <div className="text-center lg:text-left">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
                      Uber Plastic
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-300 mt-3 drop-shadow-lg font-medium">
                      Sustainable Waste Management
                    </p>
                    <p className="text-base text-gray-400 mt-2 max-w-2xl">
                      Transform waste into value through technology
                    </p>
                  </div>
                </div>
            </div>
              
              
              <p className="text-lg lg:text-xl text-white mb-8 max-w-4xl mx-auto leading-relaxed font-medium text-center">
                Advanced Circular Economy Platform
              </p>

              <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 w-full max-w-7xl mx-auto border border-gray-600/30">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl text-white font-semibold mb-4 sm:mb-6">
                    Environmental Impact of Plastic Bottle Waste
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 text-center">
                    <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/20">
                      <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">Bottles Collected</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">45,000+</p>
                      <p className="text-xs text-gray-400">Prevented from ocean</p>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/20">
                      <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">CO₂ Emissions Prevented</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">180 tons</p>
                      <p className="text-xs text-gray-400">Equivalent to 400 cars</p>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/20">
                      <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">Ocean Pollution Reduced</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">2.3 tons</p>
                      <p className="text-xs text-gray-400">Plastic waste diverted</p>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-600/20">
                      <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">Energy Saved</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">1.2M kWh</p>
                      <p className="text-xs text-gray-400">From recycling process</p>
                    </div>
                  </div>
                  
                  {/* Additional Impact Information */}
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <span className="text-lg sm:text-2xl font-bold text-white">500</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">Years to decompose</p>
                      <p className="text-xs text-gray-400">Time saved per bottle</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <span className="text-lg sm:text-2xl font-bold text-white">3x</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">More efficient</p>
                      <p className="text-xs text-gray-400">Than traditional recycling</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <span className="text-lg sm:text-2xl font-bold text-white">100%</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">Traceable impact</p>
                      <p className="text-xs text-gray-400">Every bottle tracked</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ecosystem CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
                <Link
                  href="/login"
                  className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto"
                >
                  <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Access Platform</span>
                </Link>
                <Link
                  href="/insights"
                  className="group bg-gray-800/40 backdrop-blur-sm text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 sm:space-x-3 border border-gray-600/40 hover:bg-gray-700/40 w-full sm:w-auto"
                >
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>View Analytics</span>
                </Link>
              </div>

              {/* Plastic Waste Impact Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 justify-items-center">
                <div className="text-center bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 w-full max-w-xs">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">2.3 tons</div>
                  <div className="text-white font-medium text-xs sm:text-sm">Plastic Waste Diverted</div>
                  <div className="text-xs text-gray-400 mt-1">From ocean pollution</div>
                </div>
                <div className="text-center bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 w-full max-w-xs">
                  <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-2">1.2M kWh</div>
                  <div className="text-white font-medium text-xs sm:text-sm">Energy Saved</div>
                  <div className="text-xs text-gray-400 mt-1">Through recycling</div>
                </div>
                <div className="text-center bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 w-full max-w-xs sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">500 years</div>
                  <div className="text-white font-medium text-xs sm:text-sm">Decomposition Time</div>
                  <div className="text-xs text-gray-400 mt-1">Saved per bottle</div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
            suppressHydrationWarning
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent">
              Platform Features
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Advanced technology for sustainable waste management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  suppressHydrationWarning
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-green-600/5 to-green-700/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-600 text-center w-full max-w-sm">
                    <div className={`bg-gradient-to-r ${feature.color} p-6 rounded-3xl w-20 h-20 mx-auto mb-6 flex-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-teal-50/50 to-blue-50/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Choose Your Role
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Whether you're an individual, organization, collector, or depot - we have you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {userTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-teal-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700 w-full max-w-sm">
                    <div className="text-center">
                      <div className={`bg-gradient-to-r ${type.color} p-6 rounded-3xl w-20 h-20 mx-auto mb-6 flex-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {type.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {type.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/login"
                        className={`w-full bg-gradient-to-r ${type.color} text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-xl text-center block transform hover:-translate-y-1 group-hover:scale-105`}
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ecosystem CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/50" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-green-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-400/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Join Our Initiative
            </h2>
            <p className="text-lg lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Technology-driven waste management for sustainable impact
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/login"
                className="group bg-green-600 text-white font-semibold py-4 px-10 rounded-lg text-lg hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <LogIn className="h-6 w-6" />
                <span>Get Started</span>
              </Link>
              <Link
                href="/insights"
                className="group bg-transparent border-2 border-gray-400 text-white font-semibold py-4 px-10 rounded-lg text-lg hover:bg-gray-700 hover:border-gray-300 transition-all duration-300 inline-flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <TrendingUp className="h-6 w-6" />
                <span>View Impact Data</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

