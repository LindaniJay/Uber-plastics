'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  toggleTheme: () => void
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Only access localStorage and window after component mounts
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('ecotrack-theme')
      if (savedTheme) {
        setDarkMode(savedTheme === 'dark')
      } else {
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('ecotrack-theme', darkMode ? 'dark' : 'light')
    }
  }, [darkMode, mounted])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Always render children, but provide default values during SSR
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


