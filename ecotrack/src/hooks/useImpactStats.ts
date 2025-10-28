import { useMemo } from 'react'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'

// Regional factors for CO₂ calculation
const REGIONAL_FACTORS = {
  'cabo-verde': {
    co2PerBottle: 0.12, // kg CO₂ per bottle
    plasticImportFactor: 0.7,
    tourismMultiplier: 1.3,
    seasonalVariation: 0.4,
    islandIsolationFactor: 1.2
  },
  'sao-tome': {
    co2PerBottle: 0.15, // kg CO₂ per bottle
    plasticImportFactor: 0.65,
    tourismMultiplier: 1.1,
    seasonalVariation: 0.3,
    islandIsolationFactor: 1.4
  },
  'default': {
    co2PerBottle: 0.1, // kg CO₂ per bottle
    plasticImportFactor: 0.5,
    tourismMultiplier: 1.0,
    seasonalVariation: 0.2,
    islandIsolationFactor: 1.0
  }
}

export function useImpactStats(region: string = 'cabo-verde') {
  const { userStats, getTodayScans, getWeeklyStats, getMonthlyStats } = useEcoTrackStore()
  
  const regionalFactor = REGIONAL_FACTORS[region as keyof typeof REGIONAL_FACTORS] || REGIONAL_FACTORS.default
  
  const impactStats = useMemo(() => {
    const todayScans = getTodayScans()
    const weeklyStats = getWeeklyStats()
    const monthlyStats = getMonthlyStats()
    
    // Calculate CO₂ savings with regional factors
    const baseCo2PerBottle = regionalFactor.co2PerBottle
    const adjustedCo2PerBottle = baseCo2PerBottle * regionalFactor.islandIsolationFactor
    
    // Calculate points with cleanliness multiplier
    const cleanlinessMultiplier = 1.0 + (userStats.totalBottles * 0.01) // Increases with experience
    const pointsPerBottle = 5 * cleanlinessMultiplier
    
    // Calculate earnings with regional economic factors
    const baseEarningsPerBottle = 0.05
    const adjustedEarningsPerBottle = baseEarningsPerBottle * regionalFactor.tourismMultiplier
    
    return {
      // Current stats
      totalBottles: userStats.totalBottles,
      totalCo2Saved: userStats.totalCo2Saved,
      totalPoints: userStats.totalPoints,
      totalEarnings: userStats.totalEarnings,
      
      // Today's impact
      todayBottles: todayScans.reduce((acc, scan) => acc + scan.bottles, 0),
      todayCo2Saved: todayScans.reduce((acc, scan) => acc + scan.co2Saved, 0),
      todayPoints: todayScans.reduce((acc, scan) => acc + scan.points, 0),
      todayEarnings: todayScans.reduce((acc, scan) => acc + scan.earnings, 0),
      
      // Weekly impact
      weeklyBottles: weeklyStats.bottles,
      weeklyCo2Saved: weeklyStats.co2Saved,
      weeklyPoints: weeklyStats.points,
      weeklyEarnings: weeklyStats.earnings,
      
      // Monthly impact
      monthlyBottles: monthlyStats.bottles,
      monthlyCo2Saved: monthlyStats.co2Saved,
      monthlyPoints: monthlyStats.points,
      monthlyEarnings: monthlyStats.earnings,
      
      // Environmental impact calculations
      environmentalImpact: {
        // CO₂ savings in different units
        co2SavedKg: userStats.totalCo2Saved,
        co2SavedTons: userStats.totalCo2Saved / 1000,
        co2SavedEquivalent: {
          treesPlanted: Math.round(userStats.totalCo2Saved * 2.5),
          carMilesSaved: Math.round(userStats.totalCo2Saved * 2.2),
          electricitySaved: Math.round(userStats.totalCo2Saved * 1.5)
        },
        
        // Plastic waste impact
        plasticWasteReduced: {
          bottlesEquivalent: Math.round(userStats.totalCo2Saved * 1000 / 0.5),
          oceanWastePrevented: Math.round(userStats.totalBottles * 0.8),
          landfillSpaceSaved: Math.round(userStats.totalBottles * 0.3)
        },
        
        // Regional impact
        regionalImpact: {
          importReduction: Math.round(userStats.totalBottles * regionalFactor.plasticImportFactor),
          tourismImpact: Math.round(userStats.totalBottles * regionalFactor.tourismMultiplier),
          seasonalVariation: Math.round(userStats.totalBottles * regionalFactor.seasonalVariation)
        }
      },
      
      // Achievement levels
      achievementLevels: {
        bottles: {
          current: userStats.totalBottles,
          next: Math.ceil(userStats.totalBottles / 50) * 50,
          progress: (userStats.totalBottles % 50) / 50
        },
        co2: {
          current: userStats.totalCo2Saved,
          next: Math.ceil(userStats.totalCo2Saved / 5) * 5,
          progress: (userStats.totalCo2Saved % 5) / 5
        },
        points: {
          current: userStats.totalPoints,
          next: Math.ceil(userStats.totalPoints / 100) * 100,
          progress: (userStats.totalPoints % 100) / 100
        }
      },
      
      // Regional factors
      regionalFactor,
      
      // Streak information
      streak: weeklyStats.streak,
      longestStreak: weeklyStats.longestStreak,
      
      // Efficiency metrics
      efficiency: {
        bottlesPerDay: userStats.totalBottles / Math.max(1, Math.ceil((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))),
        co2PerBottle: adjustedCo2PerBottle,
        pointsPerBottle: pointsPerBottle,
        earningsPerBottle: adjustedEarningsPerBottle
      }
    }
  }, [userStats, getTodayScans, getWeeklyStats, getMonthlyStats, regionalFactor])
  
  return impactStats
}

// Helper function to get regional factor
export function getRegionalFactor(region: string) {
  return REGIONAL_FACTORS[region as keyof typeof REGIONAL_FACTORS] || REGIONAL_FACTORS.default
}

// Helper function to calculate CO₂ savings
export function calculateCo2Saved(bottles: number, region: string = 'cabo-verde') {
  const factor = getRegionalFactor(region)
  return bottles * factor.co2PerBottle * factor.islandIsolationFactor
}

// Helper function to calculate points
export function calculatePoints(bottles: number, totalBottles: number = 0) {
  const cleanlinessMultiplier = 1.0 + (totalBottles * 0.01)
  return Math.round(bottles * 5 * cleanlinessMultiplier)
}

// Helper function to calculate earnings
export function calculateEarnings(bottles: number, region: string = 'cabo-verde') {
  const factor = getRegionalFactor(region)
  return bottles * 0.05 * factor.tourismMultiplier
}

