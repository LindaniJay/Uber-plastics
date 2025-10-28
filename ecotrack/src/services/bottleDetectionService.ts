interface BottleDetectionResult {
  bottles: number
  confidence: number
  detections: Array<{
    class: string
    confidence: number
    bbox: {
      x1: number
      y1: number
      x2: number
      y2: number
    }
    size?: string
    material?: string
  }>
  eco_score: {
    total: number
    level: string
    color: string
    co2_saved: number
    points_earned: number
    earnings: number
  }
  eco_insights: string[]
  bottle_details?: {
    count: number
    size: string
    material: string
    description: string
  }
  processing_time_ms?: number
}

import { performanceService } from './performanceService'

class BottleDetectionService {
  private baseUrl: string
  private requestCache = new Map<string, BottleDetectionResult>()

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:8000'
  }

  async detectBottlesFromFile(file: File): Promise<BottleDetectionResult> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${this.baseUrl}/detect-bottles`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error detecting bottles from file:', error)
      // Return mock data as fallback
      return this.getMockDetection()
    }
  }

  async detectBottlesFromBase64(imageData: string): Promise<BottleDetectionResult> {
    // Create cache key from image data hash
    const imageHash = this.hashImageData(imageData)
    const cacheKey = `detection:${imageHash}`
    
    // Check cache first
    const cached = this.requestCache.get(cacheKey)
    if (cached) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 Using cached detection result')
      }
      return cached
    }

    return performanceService.measurePerformance(
      'Bottle Detection API',
      async () => {
        try {
          const response = await fetch(`${this.baseUrl}/detect-bottles-base64`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_data: imageData }),
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const result = await response.json()
          
          // Cache the result for 5 minutes
          this.requestCache.set(cacheKey, result)
          setTimeout(() => this.requestCache.delete(cacheKey), 300000)
          
          return result
        } catch (error) {
          console.error('Error detecting bottles from base64:', error)
          // Return mock data as fallback
          return this.getMockDetection()
        }
      }
    )
  }

  private hashImageData(imageData: string): string {
    // Simple hash function for image data
    let hash = 0
    for (let i = 0; i < imageData.length; i++) {
      const char = imageData.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(36)
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`)
      const result = await response.json()
      return result.status === 'healthy'
    } catch (error) {
      console.error('Python API health check failed:', error)
      return false
    }
  }

  async getModelInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/model-info`)
      return await response.json()
    } catch (error) {
      console.error('Error getting model info:', error)
      return null
    }
  }

  private getMockDetection(): BottleDetectionResult {
    // Fallback mock detection when Python API is not available - Always returns 1 bottle, 330ml, PET plastic
    const bottleCount = 1
    const confidence = 0.95

    return {
      bottles: bottleCount,
      confidence,
      detections: [
        {
          class: 'bottle',
          confidence,
          bbox: {
            x1: 100,
            y1: 100,
            x2: 200,
            y2: 300
          },
          size: '330ml',
          material: 'PET plastic'
        }
      ],
      eco_score: {
        total: Math.min(bottleCount * 20, 100),
        level: 'excellent',
        color: '#10B981',
        co2_saved: bottleCount * 0.1,
        points_earned: bottleCount * 5,
        earnings: bottleCount * 0.05
      },
      eco_insights: [
        'Great! You found 1 bottle (330ml PET plastic). Every bottle counts for the environment!',
        'PET plastic bottles are 100% recyclable and help reduce waste in landfills.',
        'This 330ml bottle can be recycled into new products, saving energy and resources.'
      ],
      bottle_details: {
        count: 1,
        size: '330ml',
        material: 'PET plastic',
        description: 'Standard 330ml PET plastic bottle'
      }
    }
  }
}

export const bottleDetectionService = new BottleDetectionService()
export type { BottleDetectionResult }


