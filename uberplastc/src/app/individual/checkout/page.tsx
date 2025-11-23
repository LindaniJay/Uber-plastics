'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, Recycle, Coins, Leaf, ArrowLeft, ArrowRight } from 'lucide-react'
import { useEcoTrackStore } from '@/store/useEcoTrackStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const router = useRouter()
  const { detectionHistory, currentDetection } = useEcoTrackStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get latest detection with validation
  const latest = currentDetection || detectionHistory[0] || null

  // Validate and normalize latest detection data
  const validatedData = latest ? {
    bottles: Number.isFinite(latest.bottles) && latest.bottles > 0 ? Math.floor(Number(latest.bottles)) : 0,
    earnings: Number.isFinite(latest.earnings) ? Number(latest.earnings) : (Number.isFinite(latest.bottles) ? Math.floor(Number(latest.bottles)) * 0.05 : 0),
    co2Saved: Number.isFinite(latest.co2Saved) ? Number(latest.co2Saved) : (Number.isFinite(latest.bottles) ? Math.floor(Number(latest.bottles)) * 0.1 : 0),
    polyMoney: Number.isFinite(latest.polyMoney) ? Number(latest.polyMoney) : (Number.isFinite(latest.bottles) ? Math.floor(Number(latest.bottles)) * 5 : 0),
    confidence: Number.isFinite(latest.confidence) ? Number(latest.confidence) : 0
  } : null

  const handleConfirm = async () => {
    if (!validatedData || validatedData.bottles <= 0) {
      setError('No valid scan data found. Please scan bottles first.')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Data is already saved by BottleScanner when "Complete Checkout" was clicked
      // Just ensure currentDetection is set properly for consistency
      // Navigate to dashboard
      router.push('/individual/dashboard')
    } catch (err) {
      console.error('Error confirming scan:', err)
      setError(err instanceof Error ? err.message : 'Failed to confirm scan. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleCancel = () => {
    router.push('/individual/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative rounded-2xl p-6 md:p-8 backdrop-blur-xl bg-white/10 border border-white/20 text-white shadow-[0_12px_50px_rgba(0,0,0,0.35)]"
      >
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-white/5" />

        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Confirm Log</h1>
          </div>
          <Link href="/individual/dashboard" className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-xl p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
            {error}
          </div>
        )}

        {validatedData && validatedData.bottles > 0 ? (
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl p-4 bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2 text-emerald-300">
                <Recycle className="h-5 w-5" />
                <span className="text-sm">Bottles</span>
              </div>
              <div className="text-3xl font-extrabold">{validatedData.bottles}</div>
            </div>

            <div className="rounded-xl p-4 bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2 text-yellow-300">
                <Coins className="h-5 w-5" />
                <span className="text-sm">Earnings</span>
              </div>
              <div className="text-3xl font-extrabold">STN {validatedData.earnings.toFixed(2)}</div>
              <div className="text-xs text-white/70">Poly Money: {validatedData.polyMoney}</div>
            </div>

            <div className="rounded-xl p-4 bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2 text-teal-300">
                <Leaf className="h-5 w-5" />
                <span className="text-sm">CO₂ Saved</span>
              </div>
              <div className="text-3xl font-extrabold">{validatedData.co2Saved.toFixed(1)}kg</div>
              <div className="text-xs text-white/70">Confidence: {Math.round(validatedData.confidence * 100)}%</div>
            </div>
          </div>
        ) : (
          <div className="relative rounded-xl p-6 bg-white/10 border border-white/15 backdrop-blur-md text-white/80 mb-6">
            No recent scan found. Please scan bottles first.
            <Link href="/scan" className="block mt-4 text-emerald-400 hover:text-emerald-300">
              Go to Scanner →
            </Link>
          </div>
        )}

        <div className="relative flex items-center justify-between">
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all disabled:opacity-60"
          >
            <ArrowLeft className="h-4 w-4" /> Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!validatedData || validatedData.bottles <= 0 || isProcessing}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                Confirm & Checkout <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
