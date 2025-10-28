import { useState, useEffect } from 'react'

export interface CountryData {
  name: string
  code: string
  region: string
  island_nation: boolean
  blue_economy: {
    ocean_area_km2: number
    coastal_length_km: number
    marine_protected_areas: number
    fishing_contribution_gdp: number
  }
  plastic_data: {
    imports: {
      total_tonnes_2021: number
      growth_rate_2014_2021: number
      packaging_share: number
      textiles_share: number
      tubes_share: number
      by_year: Record<string, number>
    }
    recycling: {
      capacity_tonnes_per_year: number
      current_rate: number
      infrastructure_gap_index: number
      collection_points: number
      processing_facilities: number
    }
    environmental_impact: {
      co2_per_bottle_kg: number
      ocean_plastic_reduction_per_bottle_kg: number
      marine_ecosystem_benefit_score: number
    }
  }
  economic_indicators: {
    gdp_per_capita_usd: number
    population: number
    urbanization_rate: number
    tourism_contribution_gdp: number
  }
  sustainability_goals: {
    plastic_reduction_target_2030: number
    recycling_rate_target_2030: number
    marine_protection_target_2030: number
  }
}

export interface CountrySummary {
  totalImports: number
  growthRate: number
  packagingDominance: number
  recyclingRate: number
  infrastructureGap: number
  co2PerBottle: number
  oceanImpactPerBottle: number
  marineEcosystemScore: number
}

export function useCountryData(countryCode: string) {
  const [data, setData] = useState<CountryData | null>(null)
  const [summary, setSummary] = useState<CountrySummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/data/countries/${countryCode.toLowerCase()}.json`)
        if (!response.ok) {
          throw new Error(`Failed to load data for ${countryCode}`)
        }

        const countryData: CountryData = await response.json()
        setData(countryData)

        // Generate summary
        const countrySummary: CountrySummary = {
          totalImports: countryData.plastic_data.imports.total_tonnes_2021,
          growthRate: countryData.plastic_data.imports.growth_rate_2014_2021,
          packagingDominance: countryData.plastic_data.imports.packaging_share,
          recyclingRate: countryData.plastic_data.recycling.current_rate,
          infrastructureGap: countryData.plastic_data.recycling.infrastructure_gap_index,
          co2PerBottle: countryData.plastic_data.environmental_impact.co2_per_bottle_kg,
          oceanImpactPerBottle: countryData.plastic_data.environmental_impact.ocean_plastic_reduction_per_bottle_kg,
          marineEcosystemScore: countryData.plastic_data.environmental_impact.marine_ecosystem_benefit_score
        }

        setSummary(countrySummary)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load country data')
        console.error('Error loading country data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (countryCode) {
      loadCountryData()
    }
  }, [countryCode])

  const calculateEcoScore = (bottles: number): number => {
    if (!data) return 0
    
    const { co2_per_bottle_kg, ocean_plastic_reduction_per_bottle_kg, marine_ecosystem_benefit_score } = data.plastic_data.environmental_impact
    
    const co2Saved = bottles * co2_per_bottle_kg
    const oceanImpact = bottles * ocean_plastic_reduction_per_bottle_kg
    const ecosystemBenefit = bottles * marine_ecosystem_benefit_score
    
    // Weighted eco-score (0-100)
    return Math.round((co2Saved * 0.4 + oceanImpact * 0.4 + ecosystemBenefit * 0.2) * 100)
  }

  const getContextualInsight = (bottles: number): string => {
    if (!data) return ''
    
    const co2Saved = bottles * data.plastic_data.environmental_impact.co2_per_bottle_kg
    const oceanImpact = bottles * data.plastic_data.environmental_impact.ocean_plastic_reduction_per_bottle_kg
    
    if (data.code === 'CV') {
      return `Your ${bottles} bottles saved ${co2Saved.toFixed(2)} kg CO₂ and prevented ${oceanImpact.toFixed(2)} kg of ocean plastic. In Cabo Verde, where packaging makes up 72% of plastic imports, every bottle recycled helps protect our marine ecosystems!`
    } else if (data.code === 'ST') {
      return `Your ${bottles} bottles saved ${co2Saved.toFixed(2)} kg CO₂ and prevented ${oceanImpact.toFixed(2)} kg of ocean plastic. São Tomé's smaller recycling capacity means your impact is even more valuable for our island's sustainability!`
    }
    
    return `Your ${bottles} bottles made a positive environmental impact!`
  }

  const getImportTrendData = () => {
    if (!data) return []
    
    return Object.entries(data.plastic_data.imports.by_year).map(([year, value]) => ({
      year: parseInt(year),
      imports: value,
      country: data.name
    }))
  }

  const getRecyclingComparison = () => {
    if (!data) return null
    
    return {
      current: data.plastic_data.recycling.current_rate,
      target: data.sustainability_goals.recycling_rate_target_2030,
      capacity: data.plastic_data.recycling.capacity_tonnes_per_year,
      gap: data.plastic_data.recycling.infrastructure_gap_index
    }
  }

  return {
    data,
    summary,
    loading,
    error,
    calculateEcoScore,
    getContextualInsight,
    getImportTrendData,
    getRecyclingComparison
  }
}
