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
  confidence: number
}

interface UserStats {
  totalBottles: number
  totalPolyMoney: number
  totalEarnings: number
  totalCo2Saved: number
  streak: number
  lastScanDate: string | null
}

interface EcoTrackStore {
  userStats: UserStats
  detectionHistory: BottleDetection[]
  isScanning: boolean
  currentDetection: BottleDetection | null
  
  // Actions
  addDetection: (detection: Omit<BottleDetection, 'id' | 'timestamp'>) => void
  updateStats: (bottles: number, polyMoney: number, earnings: number, co2Saved: number) => void
  setScanning: (scanning: boolean) => void
  setCurrentDetection: (detection: BottleDetection | null) => void
  resetStats: () => void
  getTodayScans: () => BottleDetection[]
  getWeeklyStats: () => { bottles: number; polyMoney: number; earnings: number; co2Saved: number; streak: number; longestStreak: number }
  getMonthlyStats: () => { bottles: number; polyMoney: number; earnings: number; co2Saved: number }
  getRecentScans: (limit?: number) => BottleDetection[]
  addScanResult: (result: Omit<BottleDetection, 'id' | 'timestamp'>) => void
}

const initialStats: UserStats = {
  totalBottles: 0,
  totalPolyMoney: 0,
  totalEarnings: 0,
  totalCo2Saved: 0,
  streak: 0,
  lastScanDate: null
}

export const useEcoTrackStore = create<EcoTrackStore>()(
  persist(
    (set, get) => ({
      userStats: initialStats,
      detectionHistory: [],
      isScanning: false,
      currentDetection: null,

      addDetection: (detection) => {
        const newDetection: BottleDetection = {
          ...detection,
          id: `detection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        }

        set((state) => ({
          detectionHistory: [newDetection, ...state.detectionHistory],
          userStats: {
            ...state.userStats,
            totalBottles: state.userStats.totalBottles + detection.bottles,
            totalPolyMoney: state.userStats.totalPolyMoney + detection.polyMoney,
            totalEarnings: state.userStats.totalEarnings + detection.earnings,
            totalCo2Saved: state.userStats.totalCo2Saved + detection.co2Saved,
            lastScanDate: new Date().toISOString().split('T')[0]
          }
        }))

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

      resetStats: () => {
        set({
          userStats: initialStats,
          detectionHistory: [],
          currentDetection: null
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
          longestStreak: 7 // Mock longest streak
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
            co2Saved: acc.co2Saved + scan.co2Saved
          }),
          { bottles: 0, points: 0, earnings: 0, co2Saved: 0 }
        )
      },

      getRecentScans: (limit = 10) => {
        return get().detectionHistory
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit)
      },

      addScanResult: (result) => {
        const newDetection: BottleDetection = {
          ...result,
          id: `detection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        }

        set((state) => ({
          detectionHistory: [newDetection, ...state.detectionHistory],
          userStats: {
            ...state.userStats,
            totalBottles: state.userStats.totalBottles + result.bottles,
            totalPolyMoney: state.userStats.totalPolyMoney + result.polyMoney,
            totalEarnings: state.userStats.totalEarnings + result.earnings,
            totalCo2Saved: state.userStats.totalCo2Saved + result.co2Saved,
            lastScanDate: new Date().toISOString().split('T')[0]
          }
        }))
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

