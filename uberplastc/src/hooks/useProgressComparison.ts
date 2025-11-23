import { useState, useEffect, useMemo } from 'react'
import caboVerdeData from '@/data/cabo_verde_real_data.json'
import saoTomeData from '@/data/sao_tome_real_data.json'
import zanzibarData from '@/data/zanzibar_real_data.json'
import seychellesData from '@/data/seychelles_real_data.json'
import comorosData from '@/data/comoros_real_data.json'
import madagascarData from '@/data/madagascar_real_data.json'

export interface DepotData {
  totalProcessed: number
  co2Saved: number
  energySaved: number
  waterSaved: number
  recyclingRate: number
  processingEfficiency: number
  totalValue: number
  qualityScore: number
  lastUpdated: string
}

export interface ProgressMetrics {
  depotContributionToWaste: number
  depotContributionToRecycling: number
  depotContributionToCo2: number
  currentProgress: number
  targetReduction: number
  remainingProgress: number
  efficiencyScore: number
  impactScore: number
  economicScore: number
}

export interface CountryComparison {
  country: string
  population: number
  annualWaste: number
  recyclingRate: number
  co2FromPlastic: number
  oceanLeakage: number
  wasteManagementCost: number
  recyclingValue: number
}

export function useProgressComparison(selectedRegion: 'cabo-verde' | 'sao-tome' | 'zanzibar' | 'seychelles' | 'comoros' | 'madagascar', depotData: DepotData) {
  const [error, setError] = useState<string | null>(null)
  const isLoading = false // Remove artificial loading delay

  const currentData = useMemo(() => {
    return selectedRegion === 'cabo-verde' ? caboVerdeData :
           selectedRegion === 'sao-tome' ? saoTomeData :
           selectedRegion === 'zanzibar' ? zanzibarData :
           selectedRegion === 'seychelles' ? seychellesData :
           selectedRegion === 'comoros' ? comorosData :
           selectedRegion === 'madagascar' ? madagascarData :
           caboVerdeData as any
  }, [selectedRegion])

  const countryComparison = useMemo((): CountryComparison => {
    return {
      country: currentData?.country || 'Unknown',
      population: currentData?.population || 0,
      annualWaste: currentData?.plasticWaste?.annualGeneration || 0,
      recyclingRate: currentData?.plasticWaste?.recyclingRate || 0,
      co2FromPlastic: currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 0,
      oceanLeakage: currentData?.plasticWaste?.oceanLeakage || 0,
      wasteManagementCost: currentData?.economicData?.wasteManagementCost || 0,
      recyclingValue: currentData?.economicData?.recyclingValue || 0
    }
  }, [currentData])

  const progressMetrics = useMemo((): ProgressMetrics => {
    const countryAnnualWaste = countryComparison.annualWaste
    const countryRecyclingRate = countryComparison.recyclingRate
    const countryCo2FromPlastic = countryComparison.co2FromPlastic
    
    // Calculate depot's contribution to country goals
    const depotContributionToWaste = (depotData.totalProcessed / countryAnnualWaste) * 100
    const depotContributionToRecycling = (depotData.recyclingRate / countryRecyclingRate) * 100
    const depotContributionToCo2 = (depotData.co2Saved / countryCo2FromPlastic) * 100
    
    // Calculate progress towards 2030 goals (assuming 50% reduction target)
    const targetReduction = 50
    const currentProgress = (depotContributionToWaste + depotContributionToRecycling + depotContributionToCo2) / 3
    
    // Calculate efficiency score (0-100)
    const efficiencyScore = Math.min(100, (depotData.processingEfficiency + depotData.qualityScore * 20) / 2)
    
    // Calculate impact score (0-100)
    const impactScore = Math.min(100, (depotContributionToWaste + depotContributionToRecycling + depotContributionToCo2) / 3)
    
    // Calculate economic score (0-100)
    const economicScore = Math.min(100, (depotData.totalValue / 1000) * 100)
    
    return {
      depotContributionToWaste,
      depotContributionToRecycling,
      depotContributionToCo2,
      currentProgress,
      targetReduction,
      remainingProgress: Math.max(0, targetReduction - currentProgress),
      efficiencyScore,
      impactScore,
      economicScore
    }
  }, [depotData, countryComparison])

  const impactAnalysis = useMemo(() => {
    return {
      bottlesDiverted: depotData.totalProcessed,
      bottlesDivertedPercentage: (depotData.totalProcessed / countryComparison.annualWaste) * 100,
      co2Reduced: depotData.co2Saved,
      co2ReducedPercentage: (depotData.co2Saved / countryComparison.co2FromPlastic) * 100,
      energySaved: depotData.energySaved,
      waterSaved: depotData.waterSaved,
      landfillDiverted: depotData.totalProcessed,
      oceanLeakagePrevented: depotData.totalProcessed * 0.042, // Assuming 4.2% ocean leakage rate
      equivalentTrees: Math.round(depotData.co2Saved / 0.4), // 0.4kg CO2 per tree per year
      equivalentCars: Math.round(depotData.co2Saved / 4.6) // 4.6kg CO2 per gallon of gasoline
    }
  }, [depotData, countryComparison])

  const efficiencyAnalysis = useMemo(() => {
    return {
      processingEfficiency: depotData.processingEfficiency,
      qualityScore: depotData.qualityScore,
      energyEfficiency: (depotData.energySaved / depotData.totalProcessed) * 100,
      waterEfficiency: (depotData.waterSaved / depotData.totalProcessed) * 100,
      costEfficiency: depotData.totalValue / depotData.totalProcessed,
      timeEfficiency: depotData.processingEfficiency / 100,
      wasteReduction: 100 - (depotData.totalProcessed * 0.1 / depotData.totalProcessed) * 100, // Assuming 10% waste
      recyclingRate: depotData.recyclingRate
    }
  }, [depotData])

  const economicAnalysis = useMemo(() => {
    const totalValue = depotData.totalValue
    const co2Savings = depotData.co2Saved * 0.05 // $0.05 per kg CO2
    const energySavings = depotData.energySaved * 0.12 // $0.12 per kWh
    const waterSavings = depotData.waterSaved * 0.003 // $0.003 per liter
    const totalSavings = co2Savings + energySavings + waterSavings
    
    return {
      totalValue,
      totalSavings,
      roi: (totalValue / 1000) * 100, // Assuming $1000 investment
      costPerBottle: totalValue / depotData.totalProcessed,
      savingsPerBottle: totalSavings / depotData.totalProcessed,
      breakEvenPoint: 1000 / (totalValue / depotData.totalProcessed),
      netBenefit: totalValue + totalSavings - 1000,
      paybackPeriod: 1000 / (totalValue / 30) // Assuming monthly returns
    }
  }, [depotData])

  const recommendations = useMemo(() => {
    const recs = []
    
    if (progressMetrics.efficiencyScore < 80) {
      recs.push({
        type: 'efficiency',
        priority: 'high',
        title: 'Improve Processing Efficiency',
        description: 'Current efficiency is below optimal. Consider upgrading equipment or optimizing workflows.',
        impact: 'Could increase efficiency by 15-20%',
        cost: 'Medium',
        timeframe: '3-6 months'
      })
    }
    
    if (progressMetrics.impactScore < 70) {
      recs.push({
        type: 'impact',
        priority: 'high',
        title: 'Scale Operations',
        description: 'Increase processing capacity to have greater environmental impact.',
        impact: 'Could double environmental impact',
        cost: 'High',
        timeframe: '6-12 months'
      })
    }
    
    if (economicAnalysis.roi < 50) {
      recs.push({
        type: 'economic',
        priority: 'medium',
        title: 'Optimize Economic Returns',
        description: 'Focus on higher-value materials and improve cost efficiency.',
        impact: 'Could improve ROI by 25-30%',
        cost: 'Low',
        timeframe: '1-3 months'
      })
    }
    
    if (efficiencyAnalysis.qualityScore < 4.0) {
      recs.push({
        type: 'quality',
        priority: 'medium',
        title: 'Improve Quality Control',
        description: 'Implement better sorting and quality control processes.',
        impact: 'Could increase quality score by 0.5-1.0 points',
        cost: 'Low',
        timeframe: '1-2 months'
      })
    }
    
    return recs
  }, [progressMetrics, economicAnalysis, efficiencyAnalysis])

  const trends = useMemo(() => {
    // Mock trend data - in real implementation, this would come from historical data
    // Use deterministic pseudo-random based on seed to avoid hydration mismatch
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    const generateTrend = (current: number, volatility: number = 0.1, seed: number = 0) => {
      const days = 30
      const trend = []
      let value = current * 0.8 // Start 20% lower
      
      for (let i = 0; i < days; i++) {
        // Use seeded random instead of Math.random() for consistency
        const randomValue = seededRandom(seed + i) - 0.5
        value += (current - value) / (days - i) + randomValue * volatility * current
        trend.push(Math.max(0, value))
      }
      
      return trend
    }
    
    return {
      bottlesCollected: generateTrend(depotData.totalProcessed, 0.15, depotData.totalProcessed),
      co2Saved: generateTrend(depotData.co2Saved, 0.1, depotData.co2Saved * 100),
      efficiency: generateTrend(depotData.processingEfficiency, 0.05, depotData.processingEfficiency * 100),
      value: generateTrend(depotData.totalValue, 0.2, depotData.totalValue * 100)
    }
  }, [depotData])

  return {
    isLoading,
    error,
    countryComparison,
    progressMetrics,
    impactAnalysis,
    efficiencyAnalysis,
    economicAnalysis,
    recommendations,
    trends,
    currentData
  }
}

