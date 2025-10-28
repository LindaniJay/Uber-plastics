import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { AuthNavbar } from '@/components/layout/AuthNavbar'
import dynamic from 'next/dynamic'
import { shouldShowPerformanceMetrics } from '@/utils/productionConfig'

// Lazy load the chatbot - remove ssr: false for Server Components
const EcoChatbot = dynamic(() => import('@/components/chatbot/EcoChatbot').then(mod => ({ default: mod.EcoChatbot })), {
  loading: () => null
})

// Performance monitor (development only) - hidden from UI but keeps functionality
const PerformanceMonitor = dynamic(() => import('@/components/ui/PerformanceMonitor').then(mod => ({ default: mod.PerformanceMonitor })), {
  loading: () => null
})

export const metadata: Metadata = {
  title: 'Uber Plastic - From Waste to Worth',
  description: 'Track plastic bottle collections, earn rewards, and make a real impact on our planet. Join the movement towards a cleaner, more sustainable future.',
  keywords: ['recycling', 'sustainability', 'environment', 'plastic bottles', 'eco-friendly', 'rewards'],
  authors: [{ name: 'Uber Plastic Team' }],
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/uber-plastic-logo.png',
    shortcut: '/uber-plastic-logo.png',
    apple: '/uber-plastic-logo.png',
  },
  openGraph: {
    title: 'Uber Plastic - From Waste to Worth',
    description: 'Track plastic bottle collections, earn rewards, and make a real impact on our planet.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/uber-plastic-logo.png',
        width: 1200,
        height: 630,
        alt: 'Uber Plastic Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uber Plastic - From Waste to Worth',
    description: 'Track plastic bottle collections, earn rewards, and make a real impact on our planet.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script src="/force-text-visibility.js" defer></script>
      </head>
      <body className="text-gray-900 dark:text-white font-sans">
        <Providers>
          <AuthNavbar />
          <main>
            {children}
          </main>
          <EcoChatbot />
          {/* Temporarily disabled PerformanceMonitor to fix loading issue */}
          {/* {shouldShowPerformanceMetrics && <PerformanceMonitor />} */}
        </Providers>
      </body>
    </html>
  )
}

