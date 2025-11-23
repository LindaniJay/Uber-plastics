'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Client component wrapper for ChatbotLoader with dynamic import
const ChatbotLoader = dynamic(() => import('./ChatbotLoader'), {
  ssr: false,
  loading: () => null
})

export default function ChatbotProvider() {
  return (
    <Suspense fallback={null}>
      <ChatbotLoader />
    </Suspense>
  )
}






