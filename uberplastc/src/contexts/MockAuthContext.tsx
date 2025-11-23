'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface MockUser {
  id: number
  username: string
  password: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  currentUser: MockUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: MockUser[] = [
  {
    id: 1,
    username: "alice",
    password: "1234",
    name: "Alice Johnson",
    email: "alice@ecotrack.app",
    role: "citizen"
  },
  {
    id: 2,
    username: "bob",
    password: "abcd",
    name: "Bob Smith",
    email: "bob@ecotrack.app",
    role: "hub"
  },
  {
    id: 3,
    username: "charlie",
    password: "5678",
    name: "Charlie Brown",
    email: "charlie@ecotrack.app",
    role: "collector"
  },
  {
    id: 4,
    username: "diana",
    password: "efgh",
    name: "Diana Wilson",
    email: "diana@ecotrack.app",
    role: "depot"
  }
]

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('ecotrack-mock-user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setCurrentUser(userData)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Find user in mock database
      const user = mockUsers.find(u => u.username === username && u.password === password)
      
      if (user) {
        setCurrentUser(user)
        localStorage.setItem('ecotrack-mock-user', JSON.stringify(user))
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('ecotrack-mock-user')
  }

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useMockAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider')
  }
  return context
}

// Export mock users for reference
export { mockUsers }
