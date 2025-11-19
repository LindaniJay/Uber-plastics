'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  X,
  Plus,
  Trophy,
  BadgeCheck,
  Coins,
  Leaf
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useState, useEffect, useMemo, useCallback } from 'react'

interface RewardPopupProps {
  isOpen: boolean
  onClose: () => void
  onScanAgain?: () => void
  onAddToDashboard: () => void
  bottles?: number
  points?: number
  earnings?: number
  co2Saved?: number
  confidence?: number
  bottleDetails?: {
    count: number
    size: string
    material: string
    description: string
  }
}

export function RewardPopup({
  isOpen,
  onClose,
  onScanAgain,
  onAddToDashboard,
  bottles: rawBottles = 0,
  points: rawPoints = 0,
  earnings: rawEarnings = 0,
  co2Saved: rawCo2Saved = 0,
  confidence: rawConfidence = 0,
  bottleDetails
}: RewardPopupProps) {
  const { darkMode } = useTheme()
  const [showConfetti, setShowConfetti] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<'summary' | 'checkout'>('checkout')
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Normalize and validate all input values
  const bottles = useMemo(() => {
    const val = Number(rawBottles)
    return Number.isFinite(val) && val > 0 ? Math.max(0, Math.floor(val)) : 0
  }, [rawBottles])

  const confidence = useMemo(() => {
    const val = Number(rawConfidence)
    return Number.isFinite(val) ? Math.max(0, Math.min(100, Math.round(val))) : 0
  }, [rawConfidence])

  const earnings = useMemo(() => {
    const val = Number(rawEarnings)
    if (!Number.isFinite(val)) {
      // Calculate from bottles if not provided
      return bottles * 0.05
    }
    return Math.max(0, val)
  }, [rawEarnings, bottles])

  const co2Saved = useMemo(() => {
    const val = Number(rawCo2Saved)
    if (!Number.isFinite(val)) {
      // Calculate from bottles if not provided
      return bottles * 0.1
    }
    return Math.max(0, val)
  }, [rawCo2Saved, bottles])

  const points = useMemo(() => {
    const val = Number(rawPoints)
    if (!Number.isFinite(val)) {
      // Calculate from bottles if not provided
      return bottles * 5
    }
    return Math.max(0, val)
  }, [rawPoints, bottles])

  const confidencePct = useMemo(() => Math.round(confidence), [confidence])

  // Simple achievement logic
  const unlockedAchievements = useMemo(() => {
    const list = [
      {
        id: 'starter',
        title: 'First Step',
        desc: 'Logged a bottle collection',
        unlocked: bottles >= 1,
        icon: BadgeCheck
      },
      {
        id: 'bulk',
        title: 'Bulk Collector',
        desc: '5+ bottles in one go',
        unlocked: bottles >= 5,
        icon: Trophy
      },
      {
        id: 'sharp-ai',
        title: 'AI Master',
        desc: '90%+ detection confidence',
        unlocked: confidencePct >= 90,
        icon: BadgeCheck
      }
    ]
    return list.filter(a => a.unlocked)
  }, [bottles, confidencePct])

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalBonusPoints = useMemo(() => {
    let bonus = 0
    if (bottles > 5) bonus += (bottles - 5) * 5
    if (confidencePct >= 95) bonus += 10
    return bonus
  }, [bottles, confidencePct])

  const handleAddToDashboard = useCallback(async () => {
    // Validate data before proceeding
    if (bottles <= 0) {
      setError('Invalid number of bottles. Please scan again.')
      return
    }

    if (step === 'summary') {
      setStep('checkout')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Fire confetti
      try {
        setShowConfetti(true)
        const confettiModule = await import('canvas-confetti')
        const confetti = confettiModule.default
        
        const canvas = document.createElement('canvas')
        canvas.style.position = 'fixed'
        canvas.style.inset = '0'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.pointerEvents = 'none'
        document.body.appendChild(canvas)

        const fire = (confetti as any).create(canvas, { resize: true, useWorker: false })
        fire({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#059669', '#34D399', '#6EE7B7']
        })

        setTimeout(() => {
          setShowConfetti(false)
          try { document.body.removeChild(canvas) } catch (_e) { void 0 }
        }, 2500)
      } catch (_) {
        setShowConfetti(false)
      }

      // Call parent callback - let parent (BottleScanner) handle saving to store
      onAddToDashboard()
    } catch (err) {
      console.error('Error processing checkout:', err)
      setError(err instanceof Error ? err.message : 'Failed to process checkout. Please try again.')
      setIsProcessing(false)
    }
  }, [bottles, onAddToDashboard, step])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="text-6xl">🎉</div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ 
              type: 'spring',
              damping: 24,
              stiffness: 280,
              duration: 0.5
            }}
            className="absolute inset-4 flex items-center justify-center p-4"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className={`w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl max-h-full flex flex-col overflow-hidden`}>
              {/* Header */}
              <div className="relative bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 z-10"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-white" />
                </button>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="h-10 w-10" />
                </motion.div>

                <h2 className="text-2xl font-bold text-center mb-1">Scan Complete</h2>
                <p className="text-green-100 text-center text-sm">
                  {bottles} bottle{bottles !== 1 ? 's' : ''} detected • {confidencePct}% confidence
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Error message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/* Stepper */}
                <div className="flex items-center justify-center space-x-3 mb-1">
                  <div className={`h-2 w-16 rounded-full ${step === 'summary' ? 'bg-emerald-500' : 'bg-emerald-300/40'}`}></div>
                  <div className={`h-2 w-16 rounded-full ${step === 'checkout' ? 'bg-emerald-500' : 'bg-emerald-300/40'}`}></div>
                </div>

                {step === 'summary' && (
                  <>
                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="glass-card rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Earned</span>
                          <Coins className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">STN ${earnings.toFixed(2)}</div>
                      </div>
                      <div className="glass-card rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Points</span>
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">+{points}</div>
                      </div>
                      <div className="glass-card rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">CO₂ Saved</span>
                          <Leaf className="h-4 w-4 text-teal-500" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{co2Saved.toFixed(1)} kg</div>
                      </div>
                      <div className="glass-card rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Bottles</span>
                          <BadgeCheck className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{bottles}</div>
                      </div>
                    </div>

                    {/* Confidence badge */}
                    <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                      <div className="flex items-center space-x-2">
                        <BadgeCheck className="h-5 w-5" />
                        <span className="font-semibold">AI Confidence</span>
                      </div>
                      <span className="font-bold">{confidencePct}%</span>
                    </div>

                    {/* Bottle details (optional) */}
                    {bottleDetails && (
                      <div className="glass-card rounded-xl p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-semibold">{bottleDetails.size}</span> {bottleDetails.material} bottle{bottles > 1 ? 's' : ''}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {unlockedAchievements.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">New achievements</h3>
                        <div className="space-y-2">
                          {unlockedAchievements.map(a => {
                            const Icon = a.icon
                            return (
                              <div key={a.id} className="flex items-center justify-between glass-card rounded-xl p-3">
                                <div className="flex items-center space-x-3">
                                  <Icon className="h-5 w-5 text-green-500" />
                                  <div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{a.title}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-300">{a.desc}</div>
                                  </div>
                                </div>
                                {totalBonusPoints > 0 && (
                                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">+{totalBonusPoints}</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {step === 'checkout' && (
                  <>
                    <div className="glass-card rounded-xl p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Items</span>
                        <span className="text-sm font-semibold">{bottles} bottle{bottles !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Points</span>
                        <span className="text-sm font-semibold">+{points}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Earnings</span>
                        <span className="text-sm font-semibold">STN ${earnings.toFixed(2)}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <span className="text-sm font-semibold">Total</span>
                        <span className="text-sm font-bold">STN ${earnings.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <label className="text-sm font-semibold text-gray-900 dark:text-white">Notes (optional)</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 p-2 text-sm focus:outline-none"
                        rows={3}
                        placeholder="Add any info for pickup or verification"
                      />
                      <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="accent-emerald-500" />
                        <span>I confirm these items are accurate</span>
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 space-y-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToDashboard}
                  disabled={(step === 'checkout' && !agree) || isProcessing || bottles <= 0}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[56px] flex items-center justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        <span>{step === 'summary' ? 'Proceed to Checkout' : 'Complete Checkout'}</span>
                      </>
                    )}
                  </div>
                </motion.button>

                <div className="flex space-x-3">
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={step === 'checkout' ? () => setStep('summary') : (onScanAgain ?? onClose)}
                    disabled={isProcessing}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 min-h-[48px] flex items-center justify-center text-sm disabled:opacity-60"
                  >
                    {step === 'checkout' ? 'Back' : 'Scan Again'}
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    disabled={isProcessing}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 min-h-[48px] flex items-center justify-center text-sm disabled:opacity-60"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
