'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Client-only wrapper that uses dynamic import to avoid webpack resolution issues
// This prevents SSR from trying to resolve ChatbotProvider's internal dependencies
const ChatbotProvider = dynamic(() => import('./ChatbotProvider'), {
  ssr: false,
  loading: () => null
})

export default function ChatbotMount() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only load after client-side hydration to avoid any Webpack issues during SSR
    setMounted(true)
  }, [])

  // Don't render anything until mounted - prevents Webpack from trying to resolve modules during SSR
  if (!mounted) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <ChatbotProvider />
    </Suspense>
  )
}
