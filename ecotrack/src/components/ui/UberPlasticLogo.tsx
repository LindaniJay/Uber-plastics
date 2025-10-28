'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf } from 'lucide-react'

interface UberPlasticLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  href?: string
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-10 w-10',
  xl: 'h-12 w-12'
}

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg', 
  xl: 'text-xl'
}

export function UberPlasticLogo({ 
  size = 'md', 
  showText = true, 
  href = '/',
  className = '',
  animated = true 
}: UberPlasticLogoProps) {
  const LogoContent = () => (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* African Continent Logo */}
      <motion.div
        whileHover={animated ? { scale: 1.05 } : {}}
        whileTap={animated ? { scale: 0.95 } : {}}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center p-1`}>
          <div className="relative w-full h-full">
            {/* Simplified African continent outline */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M20 30 L25 25 L35 20 L45 18 L55 20 L65 25 L70 30 L75 40 L78 50 L75 60 L70 70 L65 75 L55 80 L45 82 L35 80 L25 75 L20 70 L18 60 L20 50 L20 40 Z"
                fill="url(#africaGradient)"
                stroke="white"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="africaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Central Recycling Symbol */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600">
                  <path
                    fill="currentColor"
                    d="M12 2L13.09 8.26L19 7L14.74 12.26L20 13L13.74 19.26L12 20L10.91 13.74L5 15L9.26 9.74L4 9L10.26 2.74L12 2Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Logo Text */}
      {showText && (
        <motion.span 
          className={`font-bold text-white ${textSizeClasses[size]} tracking-tight`}
          initial={animated ? { opacity: 0, x: -10 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Uber Plastic
        </motion.span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group">
        <motion.div
          whileHover={animated ? { scale: 1.02 } : {}}
          transition={{ duration: 0.2 }}
        >
          <LogoContent />
        </motion.div>
      </Link>
    )
  }

  return <LogoContent />
}

// Main logo component using the actual Uber Plastic logo image
export function UberPlasticLogoImage({ 
  size = 'md', 
  showText = true, 
  href = '/',
  className = '',
  animated = true 
}: UberPlasticLogoProps) {
  const LogoContent = () => (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <motion.img
        src="/uber-plastic-logo.png"
        alt="Uber Plastic Logo"
        className={`${sizeClasses[size]} w-auto object-contain`}
        whileHover={animated ? { scale: 1.05 } : {}}
        whileTap={animated ? { scale: 0.95 } : {}}
        transition={{ duration: 0.2 }}
      />
      
      {/* Logo Text */}
      {showText && (
        <motion.span 
          className={`font-bold text-gray-900 dark:text-white ${textSizeClasses[size]} tracking-tight`}
          initial={animated ? { opacity: 0, x: -10 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Uber Plastic
        </motion.span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group">
        <motion.div
          whileHover={animated ? { scale: 1.02 } : {}}
          transition={{ duration: 0.2 }}
        >
          <LogoContent />
        </motion.div>
      </Link>
    )
  }

  return <LogoContent />
}

// Optimized logo using Next.js Image component
export function UberPlasticLogoOptimized({ 
  size = 'md', 
  showText = true, 
  href = '/',
  className = '',
  animated = true 
}: UberPlasticLogoProps) {
  const LogoContent = () => (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Optimized Logo Image */}
      <motion.div
        whileHover={animated ? { scale: 1.05 } : {}}
        whileTap={animated ? { scale: 0.95 } : {}}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <Image
          src="/uber-plastic-logo.png"
          alt="Uber Plastic Logo"
          width={size === 'sm' ? 24 : size === 'md' ? 32 : size === 'lg' ? 40 : 48}
          height={size === 'sm' ? 24 : size === 'md' ? 32 : size === 'lg' ? 40 : 48}
          className="object-contain"
          priority={size === 'xl'}
        />
      </motion.div>
      
      {/* Logo Text */}
      {showText && (
        <motion.span 
          className={`font-bold text-gray-900 dark:text-white ${textSizeClasses[size]} tracking-tight`}
          initial={animated ? { opacity: 0, x: -10 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Uber Plastic
        </motion.span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group">
        <motion.div
          whileHover={animated ? { scale: 1.02 } : {}}
          transition={{ duration: 0.2 }}
        >
          <LogoContent />
        </motion.div>
      </Link>
    )
  }

  return <LogoContent />
}

// Compact logo for small spaces
export function UberPlasticLogoCompact({ 
  size = 'sm',
  href = '/',
  className = '',
  animated = true 
}: Omit<UberPlasticLogoProps, 'showText'>) {
  return (
    <UberPlasticLogo 
      size={size} 
      showText={false} 
      href={href}
      className={className}
      animated={animated}
    />
  )
}
