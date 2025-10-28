'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import caboVerdeData from '@/data/cabo_verde.json'
import saoTomeData from '@/data/sao_tome.json'

interface DataContextType {
  caboVerdeData: typeof caboVerdeData
  saoTomeData: typeof saoTomeData
  currentRegion: 'cabo-verde' | 'sao-tome'
  setCurrentRegion: (region: 'cabo-verde' | 'sao-tome') => void
  getCurrentData: () => typeof caboVerdeData | typeof saoTomeData
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<'cabo-verde' | 'sao-tome'>('cabo-verde')

  const getCurrentData = () => {
    return currentRegion === 'cabo-verde' ? caboVerdeData : saoTomeData
  }

  const value: DataContextType = {
    caboVerdeData,
    saoTomeData,
    currentRegion,
    setCurrentRegion,
    getCurrentData
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

