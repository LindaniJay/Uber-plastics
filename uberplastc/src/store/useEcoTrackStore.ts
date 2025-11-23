'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BottleDetection {
  id: string
  timestamp: number
  bottles: number
  polyMoney: number
  earnings: number
  co2Saved: number
  points: number
  confidence: number
  ecoScore?: {
    total: number
    level: string
    color: string
    co2_saved: number
    points_earned: number
    earnings: number
  }
  ecoInsights?: string[]
  country?: string
  bottleDetails?: {
    count: number
    size: string
    material: string
    description: string
  }
}

interface UserStats {
  totalBottles: number
  totalPolyMoney: number
  totalEarnings: number
  totalCo2Saved: number
  totalPoints: number
  streak: number
  lastScanDate: string | null
  totalScans: number
  averageConfidence: number
  rank: number
  rankChange: number
  level: string
  levelProgress: number
  nextLevelPoints: number
  bestScan: {
    bottles: number
    date: string
    confidence: number
  }
}

interface Activity {
  id: string
  type: 'recycle' | 'reward' | 'level_up' | 'community'
  title: string
  description: string
  timestamp: number
}

interface CommunityStats {
  totalUsers: number
  totalBottlesRecycled: number
  totalCo2Saved: number
  topRecyclers: Array<{
    id: string
    name: string
    bottles: number
    rank: number
  }>
}

interface EnvironmentalImpact {
  co2Saved: number
  waterSaved: number
  energySaved: number
  treesPlanted: number
  plasticWasteReduced: number
}

interface EcoTrackStore {
  detectionHistory: BottleDetection[]
  userStats: UserStats
  scanning: boolean
  currentDetection: BottleDetection | null
  scanningSession: {
    startTime: number | null
    endTime: number | null
    bottles: number
    scans: number
  }
  activities: Activity[]
  communityStats: CommunityStats
  environmentalImpact: EnvironmentalImpact

  // Actions
  addDetection: (detection: Omit<BottleDetection, 'id' | 'timestamp' | 'points'>) => void
  updateStats: (bottles: number, polyMoney: number, earnings: number, co2Saved: number) => void
  setScanning: (scanning: boolean) => void
  setCurrentDetection: (detection: BottleDetection | null) => void
  startScanningSession: () => void
  endScanningSession: () => void
  updateScanningSession: (bottles: number) => void
  getSessionStats: () => { bottles: number; scans: number; duration: number }
  resetStats: () => void
  getTodayScans: () => BottleDetection[]
  getWeeklyStats: () => { bottles: number; polyMoney: number; earnings: number; co2Saved: number; streak: number; longestStreak: number; points: number }
  getMonthlyStats: () => { bottles: number; polyMoney: number; earnings: number; co2Saved: number; points: number }
  getRecentScans: (limit?: number) => BottleDetection[]
  addScanResult: (result: Omit<BottleDetection, 'id' | 'timestamp' | 'points'>) => void
  getRecentActivities: (limit?: number) => Activity[]
  getCommunityRankings: (limit?: number) => CommunityStats['topRecyclers']
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => Activity
  updateEnvironmentalImpact: (updates: Partial<EnvironmentalImpact>) => void
}

const initialStats: UserStats = {
  totalBottles: 124,
  totalPolyMoney: 1240,
  totalEarnings: 248,
  totalCo2Saved: 62,
  totalPoints: 1850,
  streak: 7,
  lastScanDate: new Date().toISOString(),
  totalScans: 42,
  averageConfidence: 0.92,
  rank: 42,
  rankChange: 3,
  level: 'Eco Warrior',
  levelProgress: 85,
  nextLevelPoints: 1000,
  bestScan: {
    bottles: 12,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    confidence: 0.97,
  },
}

const initialScanningSession = {
  startTime: null,
  endTime: null,
  bottles: 0,
  scans: 0,
}

const initialActivities: Activity[] = []

const initialCommunityStats: CommunityStats = {
  totalUsers: 1000,
  totalBottlesRecycled: 10000,
  totalCo2Saved: 1000,
  topRecyclers: [],
}

const initialEnvironmentalImpact: EnvironmentalImpact = {
  co2Saved: 1000,
  waterSaved: 1000,
  energySaved: 1000,
  treesPlanted: 1000,
  plasticWasteReduced: 1000,
}

export const useEcoTrackStore = create<EcoTrackStore>()(
  persist(
    (set, get) => ({
  detectionHistory: [],
      userStats: initialStats,
      scanning: false,
      currentDetection: null,
      scanningSession: initialScanningSession,
      activities: initialActivities,
      communityStats: initialCommunityStats,
      environmentalImpact: initialEnvironmentalImpact,

      addDetection: (detection) => {
        // STRICT validation - MUST check for undefined/null FIRST before any property access
        // This prevents "Cannot read properties of undefined" errors
        if (detection === undefined || detection === null) {
          console.warn('addDetection called with undefined/null detection')
          return
        }
        
        // Check if it's an object (not array, not primitive)
        if (typeof detection !== 'object' || Array.isArray(detection)) {
          console.warn('addDetection called with non-object detection:', typeof detection)
          return
        }
        
        // Now safe to access properties - check bottles exists and is valid number
        const safe = detection as any
        if (!('bottles' in safe)) {
          console.warn('addDetection called without bottles property')
          return
        }
        
        // Check bottles is a valid number
        if (typeof safe.bottles !== 'number' || !Number.isFinite(safe.bottles) || safe.bottles <= 0) {
          console.warn('addDetection called with invalid bottles value:', safe.bottles)
          return
        }
        
        // Now normalize all values - we know bottles is valid
        const bottles = Math.floor(Number(safe.bottles))
        const earnings = Number.isFinite(safe.earnings) ? Number(safe.earnings) : bottles * 0.05
        const co2Saved = Number.isFinite(safe.co2Saved) ? Number(safe.co2Saved) : bottles * 0.1
        const confidence = Number.isFinite(safe.confidence) ? Number(safe.confidence) : 0
        const polyMoney = Number.isFinite(safe.polyMoney) ? Number(safe.polyMoney) : bottles * 5

        const newDetection: BottleDetection = {
          ...(safe as object),
          bottles,
          earnings,
          co2Saved,
          confidence,
          polyMoney,
          points: bottles * 5, // 5 points per bottle
          id: `detection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        }

        set((state) => {
          const newHistory = [newDetection, ...state.detectionHistory]
          const totalBottles = state.userStats.totalBottles + bottles
          const totalPoints = state.userStats.totalPoints + (bottles * 5)
          const totalScans = state.userStats.totalScans + 1
          
          // Calculate average confidence
          const allConfidences = newHistory.map(d => d.confidence)
          const averageConfidence = allConfidences.reduce((sum, conf) => sum + conf, 0) / allConfidences.length
          
          // Update best scan
          const bestScan = bottles > state.userStats.bestScan.bottles ? {
            bottles: bottles,
            date: new Date().toISOString().split('T')[0],
            confidence: confidence
          } : state.userStats.bestScan

          return {
            detectionHistory: newHistory,
            userStats: {
              ...state.userStats,
              totalBottles,
              totalPolyMoney: state.userStats.totalPolyMoney + polyMoney,
              totalEarnings: state.userStats.totalEarnings + earnings,
              totalCo2Saved: state.userStats.totalCo2Saved + co2Saved,
              totalPoints,
              lastScanDate: new Date().toISOString().split('T')[0],
              totalScans,
              averageConfidence,
              bestScan
            }
          }
        })

        // Trigger real-time updates
          if (typeof window !== 'undefined') {
          // Dispatch custom event for real-time updates
          window.dispatchEvent(new CustomEvent('ecotrack-detection-updated', {
            detail: newDetection
          }))
          
          // Update localStorage for persistence
          localStorage.setItem('ecotrack-last-detection', JSON.stringify(newDetection))
        }
      },

      updateStats: (bottles, polyMoney, earnings, co2Saved) => {
        set((state) => ({
          userStats: {
            ...state.userStats,
            totalBottles: state.userStats.totalBottles + bottles,
            totalPolyMoney: state.userStats.totalPolyMoney + polyMoney,
            totalEarnings: state.userStats.totalEarnings + earnings,
            totalCo2Saved: state.userStats.totalCo2Saved + co2Saved
          }
        }))
      },

      setScanning: (scanning) => {
        set({ scanning: scanning })
      },

      setCurrentDetection: (detection) => {
        set({ currentDetection: detection })
      },

      startScanningSession: () => {
        set({
          scanningSession: {
            startTime: Date.now(),
            endTime: null,
            bottles: 0,
            scans: 0
          }
        })
      },

      // Activities helpers
      getRecentActivities: (limit = 10) => {
        const state = get()
        return [...state.activities].sort((a, b) => b.timestamp - a.timestamp).slice(0, limit)
      },

      getCommunityRankings: (limit = 10) => {
        const state = get()
        return state.communityStats.topRecyclers.slice(0, limit)
      },

      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        }
        set((state) => ({ activities: [newActivity, ...state.activities] }))
        return newActivity
      },

      updateEnvironmentalImpact: (updates) => {
        set((state) => ({ environmentalImpact: { ...state.environmentalImpact, ...updates } }))
      },

      endScanningSession: () => {
        set((state) => ({
          scanningSession: {
            ...state.scanningSession,
            endTime: Date.now()
          }
        }))
      },

      updateScanningSession: (bottles) => {
        set((state) => ({
          scanningSession: {
            ...state.scanningSession,
            bottles: state.scanningSession.bottles + bottles,
            scans: state.scanningSession.scans + 1
          }
        }))
      },

      getSessionStats: () => {
        const state = get()
        const session = state.scanningSession
        const duration = session.startTime ? Date.now() - session.startTime : 0
        
        return {
          bottles: session.bottles,
          scans: session.scans,
          duration: Math.round(duration / 1000) // Duration in seconds
        }
      },

      resetStats: () => {
        set({
          userStats: initialStats,
          detectionHistory: [],
          currentDetection: null,
          scanningSession: initialScanningSession,
          activities: initialActivities,
          communityStats: initialCommunityStats,
          environmentalImpact: initialEnvironmentalImpact
        })
      },

      getTodayScans: () => {
        const today = new Date().toISOString().split('T')[0]
        return get().detectionHistory.filter(
          detection => new Date(detection.timestamp).toISOString().split('T')[0] === today
        )
      },

      getWeeklyStats: () => {
        const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
        const weeklyScans = get().detectionHistory.filter(
          detection => detection.timestamp >= weekAgo
        )
        
        return {
          ...weeklyScans.reduce(
            (acc, scan) => ({
              bottles: acc.bottles + scan.bottles,
              polyMoney: acc.polyMoney + scan.polyMoney,
              earnings: acc.earnings + scan.earnings,
              co2Saved: acc.co2Saved + scan.co2Saved
            }),
            { bottles: 0, polyMoney: 0, earnings: 0, co2Saved: 0 }
          ),
          streak: 3, // Mock streak
          longestStreak: 7, // Mock longest streak
          points: weeklyScans.reduce((acc, scan) => acc + scan.bottles * 5, 0) // 5 points per bottle
        }
      },

      getMonthlyStats: () => {
        const monthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
        const monthlyScans = get().detectionHistory.filter(
          detection => detection.timestamp >= monthAgo
        )
        
        return monthlyScans.reduce(
          (acc, scan) => ({
            bottles: acc.bottles + scan.bottles,
            polyMoney: acc.polyMoney + scan.polyMoney,
            earnings: acc.earnings + scan.earnings,
            co2Saved: acc.co2Saved + scan.co2Saved,
            points: acc.points + scan.points
          }),
          { bottles: 0, polyMoney: 0, earnings: 0, co2Saved: 0, points: 0 }
        )
      },

      getRecentScans: (limit = 10) => {
        const state = get()
        return [...state.detectionHistory]
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit)
      },

      addScanResult: (result) => {
        if (!result) {
          return
        }
        // Normalize values to prevent undefined errors
        const safe = (result ?? {}) as any
        const bottles = Number.isFinite(safe.bottles) ? Number(safe.bottles) : 0
        const earnings = Number.isFinite(safe.earnings) ? Number(safe.earnings) : 0
        const co2Saved = Number.isFinite(safe.co2Saved) ? Number(safe.co2Saved) : 0
        const confidence = Number.isFinite(safe.confidence) ? Number(safe.confidence) : 0
        const polyMoney = Number.isFinite(safe.polyMoney) ? Number(safe.polyMoney) : bottles * 5

        const newDetection: BottleDetection = {
          ...safe,
          bottles,
          earnings,
          co2Saved,
          confidence,
          polyMoney,
          points: bottles * 5, // 5 points per bottle
          id: `detection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        }

        set((state) => {
          const newHistory = [newDetection, ...state.detectionHistory]
          const totalBottles = state.userStats.totalBottles + bottles
          const totalPoints = state.userStats.totalPoints + (bottles * 5)
          const totalScans = state.userStats.totalScans + 1
          
          // Calculate average confidence
          const allConfidences = newHistory.map(d => d.confidence)
          const averageConfidence = allConfidences.reduce((sum, conf) => sum + conf, 0) / allConfidences.length
          
          // Update best scan
          const bestScan = bottles > state.userStats.bestScan.bottles ? {
            bottles: bottles,
            date: new Date().toISOString().split('T')[0],
            confidence: confidence
          } : state.userStats.bestScan

          return {
            detectionHistory: newHistory,
            userStats: {
              ...state.userStats,
              totalBottles,
              totalPolyMoney: state.userStats.totalPolyMoney + polyMoney,
              totalEarnings: state.userStats.totalEarnings + earnings,
              totalCo2Saved: state.userStats.totalCo2Saved + co2Saved,
              totalPoints,
              lastScanDate: new Date().toISOString().split('T')[0],
              totalScans,
              averageConfidence,
              bestScan
            }
          }
        })
      }
    }),
    {
      name: 'ecotrack-storage',
      partialize: (state) => ({
        userStats: state.userStats,
        detectionHistory: state.detectionHistory
      })
    }
  )
)