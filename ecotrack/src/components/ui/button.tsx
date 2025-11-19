import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-md border border-white/20 dark:border-white/10'
  
  const variantClasses = {
    default: 'bg-white/15 text-white hover:bg-white/25 dark:bg-gray-900/25 dark:hover:bg-gray-900/35 focus:ring-blue-500',
    destructive: 'bg-red-600/80 text-white hover:bg-red-600 focus:ring-red-500',
    outline: 'bg-transparent hover:bg-white/10 dark:hover:bg-white/10 focus:ring-gray-500',
    secondary: 'bg-gray-200/30 text-gray-900 hover:bg-gray-200/50 dark:bg-gray-700/40 dark:text-gray-100 dark:hover:bg-gray-700/60 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-white/10 dark:hover:bg-white/10 focus:ring-gray-500'
  }
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg'
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  )
}
