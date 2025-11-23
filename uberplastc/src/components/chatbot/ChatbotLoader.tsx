'use client'

import { useEffect, useState, type ComponentType } from 'react'

// Simple wrapper that manually loads the component after mount to avoid webpack issues
// This component is safe to import statically because it doesn't import EcoChatbot at module level
export default function ChatbotLoader() {
  const [mounted, setMounted] = useState(false)
  const [ChatbotComponent, setChatbotComponent] = useState<ComponentType | null>(null)

  useEffect(() => {
    // Only load after client-side hydration to avoid SSR/webpack issues
    setMounted(true)

    // Manually import the chatbot component after mount
    // This avoids webpack trying to resolve the module at build/SSR time
    const loadChatbot = async () => {
      try {
        // Use dynamic import to load the module
        const mod = await import('./EcoChatbot')
        
        // Try default export first, then named export
        const Component = mod.default || mod.EcoChatbot
        
        // Verify it's a valid React component
        if (Component && typeof Component === 'function') {
          // Store the component in state to trigger re-render
          setChatbotComponent(() => Component)
        }
      } catch (err) {
        // Silently fail - don't render chatbot if it fails to load
        // This prevents crashes from module resolution issues
        if (process.env.NODE_ENV === 'development') {
          console.debug('Chatbot failed to load:', err)
        }
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadChatbot()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Don't render anything until mounted and component loaded
  // This ensures no SSR mismatch and no webpack module resolution during SSR
  if (!mounted || !ChatbotComponent) {
    return null
  }

  // Render the chatbot component
  // Using a wrapper to catch any render errors
  try {
    const Component = ChatbotComponent
    return <Component />
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error rendering chatbot:', error)
    }
    return null
  }
}
