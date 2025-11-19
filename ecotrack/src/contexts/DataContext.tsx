'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Lazy load JSON data to prevent blocking initial render
type CaboVerdeData = typeof import('@/data/cabo_verde.json')
type SaoTomeData = typeof import('@/data/sao_tome.json')

interface DataContextType {
  caboVerdeData: CaboVerdeData | null
  saoTomeData: SaoTomeData | null
  currentRegion: 'cabo-verde' | 'sao-tome'
  setCurrentRegion: (region: 'cabo-verde' | 'sao-tome') => void
  getCurrentData: () => CaboVerdeData | SaoTomeData | null
  isLoading: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<'cabo-verde' | 'sao-tome'>('cabo-verde')
  const [caboVerdeData, setCaboVerdeData] = useState<CaboVerdeData | null>(null)
  const [saoTomeData, setSaoTomeData] = useState<SaoTomeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Lazy load data after mount to prevent blocking
  useEffect(() => {
    let isCancelled = false

    const loadData = async () => {
      try {
        // Load both datasets in parallel but non-blocking
        const loadPromises = [
          import('@/data/cabo_verde.json').then(mod => {
            if (!isCancelled) {
              setCaboVerdeData(mod.default || mod as any)
            }
          }),
          import('@/data/sao_tome.json').then(mod => {
            if (!isCancelled) {
              setSaoTomeData(mod.default || mod as any)
            }
          })
        ]

        await Promise.all(loadPromises)
      } catch (error) {
        console.error('Failed to load country data:', error)
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    // Use requestIdleCallback or setTimeout to defer loading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (!isCancelled) {
          loadData()
        }
      }, { timeout: 2000 })
    } else {
      setTimeout(() => {
        if (!isCancelled) {
          loadData()
        }
      }, 0)
    }

    return () => {
      isCancelled = true
    }
  }, [])

  const getCurrentData = useCallback(() => {
    return currentRegion === 'cabo-verde' ? caboVerdeData : saoTomeData
  }, [currentRegion, caboVerdeData, saoTomeData])

  const value: DataContextType = {
    caboVerdeData,
    saoTomeData,
    currentRegion,
    setCurrentRegion,
    getCurrentData,
    isLoading
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

