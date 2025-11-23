'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BoundingBox {
  x1: number
  y1: number
  x2: number
  y2: number
  confidence: number
  class: string
  size?: string
  material?: string
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
      const x = box.x1
      const y = box.y1
      const width = box.x2 - box.x1
      const height = box.y2 - box.y1

      // Draw bounding box with gradient effect
      const gradient = ctx.createLinearGradient(x, y, x + width, y + height)
      gradient.addColorStop(0, `hsla(${120 + index * 30}, 70%, 50%, 0.8)`)
      gradient.addColorStop(1, `hsla(${120 + index * 30}, 70%, 30%, 0.8)`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, width, height)

      // Draw label background
      const labelText = `${box.class} (${Math.round(box.confidence * 100)}%)`
      const textMetrics = ctx.measureText(labelText)
      const labelWidth = textMetrics.width + 16
      const labelHeight = 28

      // Draw label background with rounded corners effect
      ctx.fillStyle = `hsla(${120 + index * 30}, 70%, 50%, 0.9)`
      ctx.fillRect(x, y - labelHeight, labelWidth, labelHeight)

      // Draw label text
      ctx.fillStyle = 'white'
      ctx.font = 'bold 14px Inter, sans-serif'
      ctx.fillText(labelText, x + 8, y - 8)

      // Draw additional info if available
      if (box.size || box.material) {
        const infoText = `${box.size || ''} ${box.material || ''}`.trim()
        if (infoText) {
          const infoMetrics = ctx.measureText(infoText)
          const infoWidth = infoMetrics.width + 12
          const infoHeight = 20

          ctx.fillStyle = `hsla(${120 + index * 30}, 70%, 30%, 0.9)`
          ctx.fillRect(x, y + height + 2, infoWidth, infoHeight)

          ctx.fillStyle = 'white'
          ctx.font = '12px Inter, sans-serif'
          ctx.fillText(infoText, x + 6, y + height + 15)
        }
      }
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
            <span className="font-bold text-sm">
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
      <AnimatePresence>
        {isDetecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                      animate={{ opacity: 0.18 }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-emerald-400/40"
                    />
                  ))}
                </div>
              </div>
              
              {/* Horizontal scanning line with glow */}
              <motion.div
                animate={{ y: [0, containerHeight, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-1.5"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(52,211,153,0.9) 50%, rgba(0,0,0,0) 100%)',
                  boxShadow: '0 0 20px rgba(52,211,153,0.6), 0 0 40px rgba(16,185,129,0.35)'
                }}
              />

              {/* Vertical scanning line with glow (slightly phase-shifted) */}
              <motion.div
                animate={{ x: [0, containerWidth, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-0 bottom-0 w-1.5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(52,211,153,0.9) 50%, rgba(0,0,0,0) 100%)',
                  boxShadow: '0 0 20px rgba(52,211,153,0.6), 0 0 40px rgba(16,185,129,0.35)'
                }}
              />

              {/* Corner sweep accents */}
              <div className="absolute inset-0">
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <motion.div
                    key={pos}
                    className={`absolute ${pos} w-12 h-12`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  >
                    <div className="absolute top-0 left-0 w-8 h-0.5 bg-emerald-400/80" />
                    <div className="absolute top-0 left-0 w-0.5 h-8 bg-emerald-400/80" />
                    <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-emerald-400/80" />
                    <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-emerald-400/80" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detection Points Animation */}
      <AnimatePresence>
        {boundingBoxes.map((box, index) => (
          <motion.div
            key={`${box.x1}-${box.y1}-${index}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: index * 0.1 }}
            className="absolute z-30"
            style={{
              left: `${box.x1 + (box.x2 - box.x1) / 2}px`,
              top: `${box.y1 + (box.y2 - box.y1) / 2}px`,
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
      </AnimatePresence>

      {/* Detection Summary */}
      {totalBottles > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 z-10"
        >
          <div className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                />
                <span className="text-sm font-medium">Detection Complete</span>
              </div>
              <div className="text-sm font-bold text-green-400">
                {totalBottles} bottle{totalBottles !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}