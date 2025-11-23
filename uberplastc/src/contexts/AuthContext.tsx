'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'individual' | 'hub' | 'collector' | 'depot' | 'institution'
  region: 'cabo-verde' | 'sao-tome'
  joinDate: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (userData: Omit<User, 'id' | 'joinDate'>) => Promise<{ success: boolean; error?: string }>
  updateProfile: (updates: Partial<User>) => void
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
  validateEmail: (email: string) => boolean
  validatePassword: (password: string) => { valid: boolean; errors: string[] }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount with performance optimization
  useEffect(() => {
    let isCancelled = false

    const checkAuth = () => {
      try {
        // Quick synchronous check first for immediate render
        const storedUser = localStorage.getItem('ecotrack-user')
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            if (!isCancelled) {
              setUser(userData)
            }
          } catch (parseError) {
            // Invalid JSON, clear it
            localStorage.removeItem('ecotrack-user')
          }
        }
        if (!isCancelled) {
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    // Run immediately but ensure it doesn't block
    checkAuth()

    return () => {
      isCancelled = true
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      // Validate inputs
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' }
      }
      
      if (!validateEmail(email)) {
        return { success: false, error: 'Please enter a valid email address' }
      }
      
      // Mock authentication - in production, this would call your API
      if (email === 'demo@ecotrack.app' && password === 'demo123') {
        const mockUser: User = {
          id: 'user_123',
          name: 'Eco Warrior',
          email: 'demo@ecotrack.app',
          role: 'individual',
          region: 'cabo-verde',
          joinDate: new Date().toISOString(),
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        }
        
        setUser(mockUser)
        localStorage.setItem('ecotrack-user', JSON.stringify(mockUser))
        return { success: true }
      }
      
      // Mock other users for testing
      if (email === 'hub@ecotrack.app' && password === 'demo123') {
        const mockUser: User = {
          id: 'user_456',
          name: 'Green Hub',
          email: 'hub@ecotrack.app',
          role: 'hub',
          region: 'cabo-verde',
          joinDate: new Date().toISOString()
        }
        
        setUser(mockUser)
        localStorage.setItem('ecotrack-user', JSON.stringify(mockUser))
        return { success: true }
      }
      
      if (email === 'institution@ecotrack.app' && password === 'demo123') {
        const mockUser: User = {
          id: 'user_202',
          name: 'Eco Institution',
          email: 'institution@ecotrack.app',
          role: 'institution',
          region: 'cabo-verde',
          joinDate: new Date().toISOString()
        }
        
        setUser(mockUser)
        localStorage.setItem('ecotrack-user', JSON.stringify(mockUser))
        return { success: true }
      }
      
      if (email === 'collector@ecotrack.app' && password === 'demo123') {
        const mockUser: User = {
          id: 'user_789',
          name: 'Waste Collector',
          email: 'collector@ecotrack.app',
          role: 'collector',
          region: 'sao-tome',
          joinDate: new Date().toISOString()
        }
        
        setUser(mockUser)
        localStorage.setItem('ecotrack-user', JSON.stringify(mockUser))
        return { success: true }
      }
      
      if (email === 'depot@ecotrack.app' && password === 'demo123') {
        const mockUser: User = {
          id: 'user_101',
          name: 'Recycling Depot',
          email: 'depot@ecotrack.app',
          role: 'depot',
          region: 'sao-tome',
          joinDate: new Date().toISOString()
        }
        
        setUser(mockUser)
        localStorage.setItem('ecotrack-user', JSON.stringify(mockUser))
        return { success: true }
      }
      
      return { success: false, error: 'Invalid credentials. Please check your email and password.' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ecotrack-user')
  }

  const register = async (userData: Omit<User, 'id' | 'joinDate'>): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      // Validate inputs
      if (!userData.email || !userData.name) {
        return { success: false, error: 'Email and name are required' }
      }
      
      if (!validateEmail(userData.email)) {
        return { success: false, error: 'Please enter a valid email address' }
      }
      
      // Check if user already exists (mock check)
      const existingUser = localStorage.getItem('ecotrack-user')
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser)
        if (parsedUser.email === userData.email) {
          return { success: false, error: 'An account with this email already exists' }
        }
      }
      
      // Mock registration - in production, this would call your API
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}`,
        joinDate: new Date().toISOString()
      }
      
      setUser(newUser)
      localStorage.setItem('ecotrack-user', JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('ecotrack-user', JSON.stringify(updatedUser))
    }
  }

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      if (!email) {
        return { success: false, error: 'Email is required' }
      }
      
      if (!validateEmail(email)) {
        return { success: false, error: 'Please enter a valid email address' }
      }
      
      // Mock password reset - in production, this would send an email
      console.log(`Password reset requested for: ${email}`)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return { success: true }
    } catch (error) {
      console.error('Password reset error:', error)
      return { success: false, error: 'Password reset failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      if (!user) {
        return { success: false, error: 'You must be logged in to change your password' }
      }
      
      if (!currentPassword || !newPassword) {
        return { success: false, error: 'Current and new passwords are required' }
      }
      
      const passwordValidation = validatePassword(newPassword)
      if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.errors.join(', ') }
      }
      
      // Mock password change - in production, this would verify current password and update
      console.log(`Password changed for user: ${user.email}`)
      
      return { success: true }
    } catch (error) {
      console.error('Password change error:', error)
      return { success: false, error: 'Password change failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    resetPassword,
    changePassword,
    validateEmail,
    validatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock user data for development
export const mockUsers: User[] = [
  {
    id: 'user_123',
    name: 'Eco Warrior',
    email: 'demo@ecotrack.app',
    role: 'individual',
    region: 'cabo-verde',
    joinDate: new Date().toISOString(),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'user_456',
    name: 'Green Hub',
    email: 'hub@ecotrack.app',
    role: 'hub',
    region: 'cabo-verde',
    joinDate: new Date().toISOString()
  },
  {
    id: 'user_202',
    name: 'Eco Institution',
    email: 'institution@ecotrack.app',
    role: 'institution',
    region: 'cabo-verde',
    joinDate: new Date().toISOString()
  },
  {
    id: 'user_789',
    name: 'Waste Collector',
    email: 'collector@ecotrack.app',
    role: 'collector',
    region: 'sao-tome',
    joinDate: new Date().toISOString()
  },
  {
    id: 'user_101',
    name: 'Recycling Depot',
    email: 'depot@ecotrack.app',
    role: 'depot',
    region: 'sao-tome',
    joinDate: new Date().toISOString()
  }
]

