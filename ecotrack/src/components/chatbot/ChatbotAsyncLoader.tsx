'use client'

import { useEffect, useState } from 'react'

/**
 * Fully lazy-loaded chatbot loader that doesn't import anything at module level
 * This prevents webpack from trying to resolve modules during SSR/build
 */
export default function ChatbotAsyncLoader() {
  const [mounted, setMounted] = useState(false)
  const [Chatbot, setChatbot] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Only load after client-side mount
    setMounted(true)

    // Load chatbot component completely dynamically
    // This happens at runtime, not at build/SSR time
    const loadChatbot = async () => {
      try {
        // First load ChatbotLoader
        const loaderMod = await import('./ChatbotLoader')
        const LoaderComponent = loaderMod.default

        if (LoaderComponent && typeof LoaderComponent === 'function') {
          setChatbot(() => LoaderComponent)
        }
      } catch (err) {
        // Silently fail - don't render chatbot
        console.debug('Chatbot failed to load:', err)
      }
    }

    // Delay loading slightly to ensure DOM is ready
    const timer = setTimeout(loadChatbot, 200)
    return () => clearTimeout(timer)
  }, [])

  // Don't render until mounted and component loaded
  if (!mounted || !Chatbot) {
    return null
  }

  return <Chatbot />
}





