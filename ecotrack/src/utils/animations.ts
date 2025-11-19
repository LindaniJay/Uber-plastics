'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'

// Animation variants for different components
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
}

export const slideInFromBottom: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
}

export const slideInFromTop: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
}

// Stagger animation for lists
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Pulse animation for loading states
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Bounce animation for success states
export const bounce: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: 2,
      ease: "easeOut"
    }
  }
}

// Shake animation for error states
export const shake: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

// Rotate animation for loading spinners
export const rotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Slide animations for modals
export const modalSlideIn: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 50 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.6
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: {
      duration: 0.3
    }
  }
}

// Card hover animations
export const cardHover: Variants = {
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
}

// Button animations
export const buttonHover: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

// Progress bar animation
export const progressBar: Variants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
}

// Counter animation
export const counterAnimation: Variants = {
  animate: (value: number) => ({
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  })
}

// Floating animation for icons
export const floating: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Glow animation for special elements
export const glow: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(16, 185, 129, 0)",
      "0 0 20px rgba(16, 185, 129, 0.5)",
      "0 0 0px rgba(16, 185, 129, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: 0.3
    }
  }
}

// Scanning animation for camera overlay
export const scanningLine: Variants = {
  animate: {
    y: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Detection pulse animation
export const detectionPulse: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Achievement unlock animation
export const achievementUnlock: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      duration: 0.8
    }
  }
}

// Confetti animation
export const confetti: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}

// Utility function to create staggered animations
export const createStaggerAnimation = (delay: number = 0.1) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay }
})

// Utility function for spring animations
export const springAnimation = {
  type: "spring" as const,
  damping: 25,
  stiffness: 300
}

// Utility function for smooth transitions
export const smoothTransition = {
  duration: 0.6,
  ease: "easeOut" as const
}

// Utility function for quick transitions
export const quickTransition = {
  duration: 0.3,
  ease: "easeInOut" as const
}







