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
  bestScan: {
    bottles: number
    date: string
    confidence: number
  }
}

interface EcoTrackStore {
  userStats: UserStats
  detectionHistory: BottleDetection[]
  isScanning: boolean
  currentDetection: BottleDetection | null
  scanningSession: {
    startTime: number | null
    detectionCount: number
    totalBottlesInSession: number
  }
  
  // Actions
  addDetection: (detection: Omit<BottleDetection, 'id' | 'timestamp' | 'points'>) => void
  updateStats: (bottles: number, polyMoney: number, earnings: number, co2Saved: number) => void
  setScanning: (scanning: boolean) => void
  setCurrentDetection: (detection: BottleDetection | null) => void
  startScanningSession: () => void
  endScanningSession: () => void
  updateScanningSession: (bottles: number) => void
  resetStats: () => void
  getTodayScans: () => BottleDetection[]
  getWeeklyStats: () => { bottles: number; polyMoney: number; earnings: number; co2Saved: number; streak: number; longestStreak: number; points: number }
  getMonthlyStats: () => { bottles: number; polyMoney: number; earnings: number; co2Saved: number; points: number }
  getRecentScans: (limit?: number) => BottleDetection[]
  addScanResult: (result: Omit<BottleDetection, 'id' | 'timestamp' | 'points'>) => void
  getSessionStats: () => { bottles: number; scans: number; duration: number }
}

const initialStats: UserStats = {
  totalBottles: 0,
  totalPolyMoney: 0,
  totalEarnings: 0,
  totalCo2Saved: 0,
  totalPoints: 0,
  streak: 0,
  lastScanDate: null,
  totalScans: 0,
  averageConfidence: 0,
  bestScan: {
    bottles: 0,
    date: '',
    confidence: 0
  }
}

export const useEcoTrackStore = create<EcoTrackStore>()(
  persist(
    (set, get) => ({
      userStats: initialStats,
      detectionHistory: [],
      isScanning: false,
      currentDetection: null,
      scanningSession: {
        startTime: null,
        detectionCount: 0,
        totalBottlesInSession: 0
      },

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
        set({ isScanning: scanning })
      },

      setCurrentDetection: (detection) => {
        set({ currentDetection: detection })
      },

      startScanningSession: () => {
        set({
          scanningSession: {
            startTime: Date.now(),
            detectionCount: 0,
            totalBottlesInSession: 0
          }
        })
      },

      endScanningSession: () => {
        set({
          scanningSession: {
            startTime: null,
            detectionCount: 0,
            totalBottlesInSession: 0
          }
        })
      },

      updateScanningSession: (bottles) => {
        set((state) => ({
          scanningSession: {
            ...state.scanningSession,
            detectionCount: state.scanningSession.detectionCount + 1,
            totalBottlesInSession: state.scanningSession.totalBottlesInSession + bottles
          }
        }))
      },

      getSessionStats: () => {
        const state = get()
        const session = state.scanningSession
        const duration = session.startTime ? Date.now() - session.startTime : 0
        
        return {
          bottles: session.totalBottlesInSession,
          scans: session.detectionCount,
          duration: Math.round(duration / 1000) // Duration in seconds
        }
      },

      resetStats: () => {
        set({
          userStats: initialStats,
          detectionHistory: [],
          currentDetection: null,
          scanningSession: {
            startTime: null,
            detectionCount: 0,
            totalBottlesInSession: 0
          }
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
        return get().detectionHistory
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