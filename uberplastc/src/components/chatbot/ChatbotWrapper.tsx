'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Client component wrapper for ChatbotLoader with dynamic import
const ChatbotLoader = dynamic(() => import('./ChatbotLoader'), {
  ssr: false,
  loading: () => null
})

export default function ChatbotWrapper() {
  return (
    <Suspense fallback={null}>
      <ChatbotLoader />
    </Suspense>
  )
}







