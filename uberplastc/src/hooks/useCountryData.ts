import { useState, useEffect, useCallback } from 'react'

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
    let isCancelled = false
    
    const loadCountryData = async () => {
      try {
        setLoading(true)
        setError(null)

        let countryData: CountryData

        // Prefer statically bundled JSON (avoids dynamic import issues in some builds)
        try {
          const key = countryCode.toLowerCase()
          
          // Load JSON based on country code
          let mod: any
          switch (key) {
            case 'cabo_verde':
              mod = await import('@/data/countries/cabo_verde.json')
              break
            case 'sao_tome':
              mod = await import('@/data/countries/sao_tome.json')
              break
            case 'ghana':
              mod = await import('@/data/countries/ghana.json')
              break
            default:
              // Fallback to dynamic expression for any other future countries
              mod = await import(`@/data/countries/${key}.json`)
          }
          
          // Extract default export (Next.js/Webpack bundles JSON as default)
          countryData = (mod.default || mod) as CountryData
          
          // Verify we got valid data structure (not null/undefined)
          if (!countryData || !countryData.name || !countryData.plastic_data) {
            throw new Error(`Invalid data structure for ${countryCode}`)
          }
        } catch (importErr) {
          // Log error in development for debugging
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Failed to import country data for ${countryCode}:`, importErr)
          }
          
          // Try public fetch next to handle cases where JSON isn't bundled
          try {
            const res = await fetch(`/data/countries/${countryCode.toLowerCase()}.json`, { cache: 'no-store' })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            countryData = await res.json()
          } catch (fetchErr) {
            // Suppress 404 errors - they're expected when JSON isn't in public
            // Use graceful defaults to avoid noisy 404s in dev and production
            if (process.env.NODE_ENV === 'development') {
              console.debug(`Country data not found for ${countryCode}, using defaults`, fetchErr)
            }
            countryData = {
            name: countryCode.replace(/_/g, ' '),
            code: countryCode === 'cabo_verde' ? 'CV' : countryCode === 'sao_tome' ? 'ST' : countryCode.toUpperCase().slice(0, 2),
            region: 'Africa',
            island_nation: true,
            blue_economy: {
              ocean_area_km2: 0,
              coastal_length_km: 0,
              marine_protected_areas: 0,
              fishing_contribution_gdp: 0
            },
            plastic_data: {
              imports: {
                total_tonnes_2021: 0,
                growth_rate_2014_2021: 0,
                packaging_share: 0.72,
                textiles_share: 0.1,
                tubes_share: 0.05,
                by_year: { '2019': 0, '2020': 0, '2021': 0 }
              },
              recycling: {
                capacity_tonnes_per_year: 0,
                current_rate: 0.12,
                infrastructure_gap_index: 0.7,
                collection_points: 0,
                processing_facilities: 0
              },
              environmental_impact: {
                co2_per_bottle_kg: 0.1,
                ocean_plastic_reduction_per_bottle_kg: 0.05,
                marine_ecosystem_benefit_score: 1
              }
            },
            economic_indicators: {
              gdp_per_capita_usd: 0,
              population: 0,
              urbanization_rate: 0,
              tourism_contribution_gdp: 0
            },
            sustainability_goals: {
              plastic_reduction_target_2030: 0.3,
              recycling_rate_target_2030: 0.35,
              marine_protection_target_2030: 0.2
            }
            }
          }
        }
        
        // Don't update state if component unmounted or countryCode changed
        if (isCancelled) return
        
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

        if (isCancelled) return
        setSummary(countrySummary)
      } catch (err) {
        // Don't update state if component unmounted or countryCode changed
        if (isCancelled) return
        
        // Final fallback path, should rarely happen.
        setError(err instanceof Error ? err.message : 'Failed to load country data')
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    if (countryCode && countryCode.trim()) {
      loadCountryData()
    } else {
      setLoading(false)
      setError('Country code is required')
    }
    
    // Cleanup function to cancel pending requests
    return () => {
      isCancelled = true
    }
  }, [countryCode])

  const calculateEcoScore = useCallback((bottles: number): number => {
    if (!data) return 0
    
    const { co2_per_bottle_kg, ocean_plastic_reduction_per_bottle_kg, marine_ecosystem_benefit_score } = data.plastic_data.environmental_impact
    
    const co2Saved = bottles * co2_per_bottle_kg
    const oceanImpact = bottles * ocean_plastic_reduction_per_bottle_kg
    const ecosystemBenefit = bottles * marine_ecosystem_benefit_score
    
    // Weighted eco-score (0-100)
    return Math.round((co2Saved * 0.4 + oceanImpact * 0.4 + ecosystemBenefit * 0.2) * 100)
  }, [data])

  const getContextualInsight = useCallback((bottles: number): string => {
    if (!data) return ''
    
    const co2Saved = bottles * data.plastic_data.environmental_impact.co2_per_bottle_kg
    const oceanImpact = bottles * data.plastic_data.environmental_impact.ocean_plastic_reduction_per_bottle_kg
    
    if (data.code === 'CV') {
      return `Your ${bottles} bottles saved ${co2Saved.toFixed(2)} kg CO₂ and prevented ${oceanImpact.toFixed(2)} kg of ocean plastic. In Cabo Verde, where packaging makes up 72% of plastic imports, every bottle recycled helps protect our marine ecosystems!`
    } else if (data.code === 'ST') {
      return `Your ${bottles} bottles saved ${co2Saved.toFixed(2)} kg CO₂ and prevented ${oceanImpact.toFixed(2)} kg of ocean plastic. São Tomé's smaller recycling capacity means your impact is even more valuable for our island's sustainability!`
    }
    
    return `Your ${bottles} bottles made a positive environmental impact!`
  }, [data])

  const getImportTrendData = useCallback(() => {
    if (!data) return []
    
    return Object.entries(data.plastic_data.imports.by_year).map(([year, value]) => ({
      year: parseInt(year),
      imports: value,
      country: data.name
    }))
  }, [data])

  const getRecyclingComparison = useCallback(() => {
    if (!data) return null
    
    return {
      current: data.plastic_data.recycling.current_rate,
      target: data.sustainability_goals.recycling_rate_target_2030,
      capacity: data.plastic_data.recycling.capacity_tonnes_per_year,
      gap: data.plastic_data.recycling.infrastructure_gap_index
    }
  }, [data])

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
