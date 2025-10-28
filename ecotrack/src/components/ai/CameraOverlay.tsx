'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
  confidence: number
  label: string
}

interface CameraOverlayProps {
  boundingBoxes: BoundingBox[]
  containerWidth: number
  containerHeight: number
  isDetecting: boolean
  totalBottles: number
}

export function CameraOverlay({ 
  boundingBoxes, 
  containerWidth, 
  containerHeight, 
  isDetecting, 
  totalBottles 
}: CameraOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw bounding boxes
    boundingBoxes.forEach((box, index) => {
      const x = box.x * containerWidth
      const y = box.y * containerHeight
      const width = box.width * containerWidth
      const height = box.height * containerHeight

      // Draw bounding box
      ctx.strokeStyle = `hsl(${120 + index * 30}, 70%, 50%)`
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, width, height)

      // Draw label background
      const labelText = `${box.label} (${Math.round(box.confidence * 100)}%)`
      const textMetrics = ctx.measureText(labelText)
      const labelWidth = textMetrics.width + 16
      const labelHeight = 24

      ctx.fillStyle = `hsla(${120 + index * 30}, 70%, 50%, 0.8)`
      ctx.fillRect(x, y - labelHeight, labelWidth, labelHeight)

      // Draw label text
      ctx.fillStyle = 'white'
      ctx.font = 'bold 14px Inter, sans-serif'
      ctx.fillText(labelText, x + 8, y - 8)
    })
  }, [boundingBoxes, containerWidth, containerHeight])

  return (
    <div className="relative w-full h-full">
      {/* Detection Counter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-10"
      >
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: isDetecting ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5, repeat: isDetecting ? Infinity : 0 }}
              className="w-3 h-3 bg-white rounded-full"
            />
            <span className="font-bold">
              {totalBottles} Bottle{totalBottles !== 1 ? 's' : ''} Detected
            </span>
          </div>
        </div>
      </motion.div>

      {/* AI Status Indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 right-4 z-10"
      >
        <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: isDetecting ? 360 : 0 }}
              transition={{ duration: 2, repeat: isDetecting ? Infinity : 0, ease: "linear" }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-sm font-medium">
              {isDetecting ? 'AI Scanning...' : 'Ready'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Canvas for drawing bounding boxes */}
      <canvas
        ref={canvasRef}
        width={containerWidth}
        height={containerHeight}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Scanning Grid Overlay */}
      {isDetecting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <div className="w-full h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-0">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-green-400/30"
                  />
                ))}
              </div>
            </div>
            
            {/* Scanning line */}
            <motion.div
              animate={{ y: [0, containerHeight, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
            />
          </div>
        </motion.div>
      )}

      {/* Detection Points Animation */}
      {boundingBoxes.map((box, index) => (
        <motion.div
          key={`${box.x}-${box.y}-${index}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: index * 0.1 }}
          className="absolute z-30"
          style={{
            left: `${box.x * 100}%`,
            top: `${box.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="w-4 h-4 bg-green-400 rounded-full shadow-lg"
          />
        </motion.div>
      ))}
    </div>
  )
}


