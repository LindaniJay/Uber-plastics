'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

interface DetectionResult {
  bottles: number
  confidence: number
  boundingBoxes: Array<{
    x: number
    y: number
    width: number
    height: number
    confidence: number
    label: string
  }>
}

interface UseBottleDetectionOptions {
  enableRealAI?: boolean
  mockDetectionInterval?: number
}

export function useBottleDetection(options: UseBottleDetectionOptions = {}) {
  const { enableRealAI = true, mockDetectionInterval = 2000 } = options
  
  const [isLoading, setIsLoading] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const modelRef = useRef<cocoSsd.ObjectDetection | null>(null)
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize TensorFlow.js model
  useEffect(() => {
    if (!enableRealAI) return

    const loadModel = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Load COCO-SSD model
        const model = await cocoSsd.load()
        modelRef.current = model
        setIsModelLoaded(true)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load AI model:', err)
        setError('Failed to load AI model. Using mock detection.')
        setIsLoading(false)
      }
    }

    loadModel()
  }, [enableRealAI])

  // Mock detection function - Always returns 1 bottle, 330ml, PET plastic
  const mockDetection = useCallback((): DetectionResult => {
    const bottles = 1
    const boundingBoxes = [{
      x: 0.3,
      y: 0.2,
      width: 0.4,
      height: 0.6,
      confidence: 0.98,
      label: 'PET Bottle 330ml'
    }]

    return {
      bottles,
      confidence: 0.98,
      boundingBoxes
    }
  }, [])

  // Real AI detection function
  const realDetection = useCallback(async (imageElement: HTMLImageElement | HTMLVideoElement): Promise<DetectionResult> => {
    if (!modelRef.current) {
      throw new Error('Model not loaded')
    }

    const predictions = await modelRef.current.detect(imageElement)
    
    // Filter for bottle-related objects
    const bottleObjects = predictions.filter(prediction => {
      const label = prediction.class.toLowerCase()
      return label.includes('bottle') || 
             label.includes('cup') || 
             label.includes('wine glass') ||
             label.includes('drink')
    })

    const boundingBoxes = bottleObjects.map((prediction, index) => ({
      x: prediction.bbox[0] / imageElement.width,
      y: prediction.bbox[1] / imageElement.height,
      width: prediction.bbox[2] / imageElement.width,
      height: prediction.bbox[3] / imageElement.height,
      confidence: prediction.score,
      label: `Bottle ${index + 1}`
    }))

    return {
      bottles: bottleObjects.length,
      confidence: bottleObjects.length > 0 ? Math.max(...bottleObjects.map(p => p.score)) : 0,
      boundingBoxes
    }
  }, [])

  // Main detection function
  const detectBottles = useCallback(async (imageElement: HTMLImageElement | HTMLVideoElement) => {
    try {
      setError(null)
      
      let result: DetectionResult
      
      if (enableRealAI && isModelLoaded && modelRef.current) {
        result = await realDetection(imageElement)
      } else {
        // Use mock detection
        result = mockDetection()
      }
      
      setDetectionResult(result)
      return result
    } catch (err) {
      console.error('Detection failed:', err)
      setError('Detection failed. Please try again.')
      
      // Fallback to mock detection
      const result = mockDetection()
      setDetectionResult(result)
      return result
    }
  }, [enableRealAI, isModelLoaded, realDetection, mockDetection])

  // Start continuous detection
  const startDetection = useCallback((imageElement: HTMLImageElement | HTMLVideoElement) => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
    }

    // Initial detection
    detectBottles(imageElement)

    // Set up interval for continuous detection
    detectionIntervalRef.current = setInterval(() => {
      detectBottles(imageElement)
    }, mockDetectionInterval)
  }, [detectBottles, mockDetectionInterval])

  // Stop continuous detection
  const stopDetection = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
    }
  }, [])

  return {
    isLoading,
    isModelLoaded,
    detectionResult,
    error,
    detectBottles,
    startDetection,
    stopDetection,
    clearDetection: () => setDetectionResult(null)
  }
}


