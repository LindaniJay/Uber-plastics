'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamically import BottleScanner to avoid SSR issues
const BottleScanner = dynamic(() => import('@/components/ai/BottleScanner').then(mod => ({ default: mod.BottleScanner })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen">Loading scanner...</div>
})

export default function ScanPage() {
  const router = useRouter()

  const handleScanComplete = (results: any) => {
    console.log('Scan completed:', results)
    // Redirect to checkout to confirm and finalize logging
    router.push('/individual/checkout')
  }

  const handleClose = () => {
    router.back()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BottleScanner
        onClose={handleClose}
        onScanComplete={handleScanComplete}
      />
    </motion.div>
  )
}


