/**
 * Chart Data Service
 * Provides realistic and dynamic data for charts and graphs
 */

export interface ChartDataPoint {
  date: string
  value: number
  category?: string
  region?: string
}

export interface WasteCompositionData {
  name: string
  value: number
  color: string
  percentage: number
}

export interface EnvironmentalTrendData {
  month: string
  co2Saved: number
  plasticCollected: number
  oceanProtection: number
  recyclingRate: number
  energySaved: number
}

export interface RegionalComparisonData {
  region: string
  recycling: number
  collection: number
  awareness: number
  infrastructure: number
  policy: number
}

export interface UserProgressData {
  day: number
  bottles: number
  co2: number
  points: number
  streak: number
}

export interface EconomicImpactData {
  category: string
  direct: number
  indirect: number
  multiplier: number
}

export class ChartDataService {
  private static instance: ChartDataService
  private cache: Map<string, any> = new Map()

  static getInstance(): ChartDataService {
    if (!ChartDataService.instance) {
      ChartDataService.instance = new ChartDataService()
    }
    return ChartDataService.instance
  }

  /**
   * Generate environmental trends data with realistic patterns
   */
  generateEnvironmentalTrends(timeframe: '6months' | '12months' = '6months'): EnvironmentalTrendData[] {
    const cacheKey = `environmental-trends-${timeframe}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const months = timeframe === '6months' ? 6 : 12
    const data: EnvironmentalTrendData[] = []
    
    for (let i = 0; i < months; i++) {
      const baseDate = new Date(2024, i)
      const seasonalFactor = this.getSeasonalFactor(i)
      const growthFactor = 1 + (i * 0.05) // 5% growth per month
      
      data.push({
        month: baseDate.toLocaleDateString('en-US', { month: 'short' }),
        co2Saved: Math.round((20 + Math.random() * 30 + i * 3) * seasonalFactor * growthFactor),
        plasticCollected: Math.round((500 + Math.random() * 200 + i * 50) * seasonalFactor * growthFactor),
        oceanProtection: Math.round((10 + Math.random() * 15 + i * 2) * seasonalFactor * growthFactor),
        recyclingRate: Math.round((15 + Math.random() * 10 + i * 1.5) * seasonalFactor),
        energySaved: Math.round((5 + Math.random() * 10 + i * 1) * seasonalFactor * growthFactor)
      })
    }

    this.cache.set(cacheKey, data)
    return data
  }

  /**
   * Generate waste composition data based on regional characteristics
   */
  generateWasteComposition(region: string = 'cabo-verde'): WasteCompositionData[] {
    const cacheKey = `waste-composition-${region}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const baseComposition = {
      'cabo-verde': [
        { name: 'PET Bottles', value: 45, color: '#10B981' },
        { name: 'HDPE Containers', value: 25, color: '#3B82F6' },
        { name: 'LDPE Bags', value: 15, color: '#F59E0B' },
        { name: 'PP Packaging', value: 10, color: '#EF4444' },
        { name: 'Other Plastics', value: 5, color: '#8B5CF6' }
      ],
      'sao-tome': [
        { name: 'PET Bottles', value: 40, color: '#10B981' },
        { name: 'HDPE Containers', value: 30, color: '#3B82F6' },
        { name: 'LDPE Bags', value: 20, color: '#F59E0B' },
        { name: 'PP Packaging', value: 7, color: '#EF4444' },
        { name: 'Other Plastics', value: 3, color: '#8B5CF6' }
      ]
    }

    const composition = baseComposition[region as keyof typeof baseComposition] || baseComposition['cabo-verde']
    const total = composition.reduce((sum, item) => sum + item.value, 0)
    
    const data = composition.map(item => ({
      ...item,
      percentage: Math.round((item.value / total) * 100)
    }))

    this.cache.set(cacheKey, data)
    return data
  }

  /**
   * Generate regional comparison data
   */
  generateRegionalComparison(): RegionalComparisonData[] {
    const cacheKey = 'regional-comparison'
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const data: RegionalComparisonData[] = [
      { 
        region: 'Cabo Verde', 
        recycling: 16, 
        collection: 45, 
        awareness: 60, 
        infrastructure: 35, 
        policy: 70 
      },
      { 
        region: 'São Tomé', 
        recycling: 12, 
        collection: 35, 
        awareness: 45, 
        infrastructure: 25, 
        policy: 55 
      },
      { 
        region: 'Regional Avg', 
        recycling: 14, 
        collection: 40, 
        awareness: 52, 
        infrastructure: 30, 
        policy: 62 
      },
      { 
        region: 'Global Avg', 
        recycling: 9, 
        collection: 25, 
        awareness: 35, 
        infrastructure: 20, 
        policy: 40 
      }
    ]

    this.cache.set(cacheKey, data)
    return data
  }

  /**
   * Generate user progress data with realistic patterns
   */
  generateUserProgress(days: number = 30): UserProgressData[] {
    const cacheKey = `user-progress-${days}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const data: UserProgressData[] = []
    let streak = 0
    let maxStreak = 0

    for (let i = 1; i <= days; i++) {
      // Weekend effect (lower activity on weekends)
      const isWeekend = i % 7 === 0 || i % 7 === 6
      const weekendFactor = isWeekend ? 0.6 : 1
      
      // Random activity with some consistency
      const baseActivity = 5 + Math.random() * 15
      const bottles = Math.round(baseActivity * weekendFactor)
      const co2 = Math.round((bottles * 0.02 + Math.random() * 0.5) * 100) / 100
      const points = Math.round(bottles * 2 + Math.random() * 10)
      
      // Streak calculation
      if (bottles > 0) {
        streak++
        maxStreak = Math.max(maxStreak, streak)
      } else {
        streak = 0
      }

      data.push({
        day: i,
        bottles,
        co2,
        points,
        streak
      })
    }

    this.cache.set(cacheKey, data)
    return data
  }

  /**
   * Generate economic impact data
   */
  generateEconomicImpact(region: string = 'cabo-verde'): EconomicImpactData[] {
    const cacheKey = `economic-impact-${region}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const multipliers = {
      'cabo-verde': 1.5,
      'sao-tome': 1.2
    }

    const multiplier = multipliers[region as keyof typeof multipliers] || 1.5

    const data: EconomicImpactData[] = [
      { 
        category: 'Tourism Revenue', 
        direct: 120000, 
        indirect: 180000, 
        multiplier: multiplier * 1.2 
      },
      { 
        category: 'Waste Management', 
        direct: 45000, 
        indirect: 25000, 
        multiplier: multiplier * 0.8 
      },
      { 
        category: 'Recycling Industry', 
        direct: 30000, 
        indirect: 15000, 
        multiplier: multiplier * 1.1 
      },
      { 
        category: 'Environmental Services', 
        direct: 20000, 
        indirect: 10000, 
        multiplier: multiplier * 0.9 
      }
    ]

    this.cache.set(cacheKey, data)
    return data
  }

  /**
   * Generate CO₂ reduction methods data
   */
  generateCO2Reduction(): any[] {
    const cacheKey = 'co2-reduction'
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const data = [
      { 
        method: 'Recycling', 
        co2Reduced: 2.5, 
        cost: 0.1, 
        efficiency: 85, 
        costBenefit: 25 
      },
      { 
        method: 'Incineration', 
        co2Reduced: 1.8, 
        cost: 0.3, 
        efficiency: 70, 
        costBenefit: 6 
      },
      { 
        method: 'Landfill', 
        co2Reduced: 0.5, 
        cost: 0.05, 
        efficiency: 30, 
        costBenefit: 10 
      },
      { 
        method: 'Ocean Dumping', 
        co2Reduced: 0.1, 
        cost: 0.02, 
        efficiency: 5, 
        costBenefit: 5 
      }
    ]

    this.cache.set(cacheKey, data)
    return data
  }

  /**
   * Get seasonal factor for realistic data patterns
   */
  private getSeasonalFactor(month: number): number {
    // Higher activity in summer months (May-September)
    const summerMonths = [4, 5, 6, 7, 8] // 0-indexed
    return summerMonths.includes(month) ? 1.2 : 0.9
  }

  /**
   * Clear cache for fresh data
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get cached data or generate new
   */
  getCachedData<T>(key: string, generator: () => T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }
    const data = generator()
    this.cache.set(key, data)
    return data
  }
}

export const chartDataService = ChartDataService.getInstance()
