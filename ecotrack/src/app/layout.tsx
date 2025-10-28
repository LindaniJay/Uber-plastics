import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { AuthNavbar } from '@/components/layout/AuthNavbar'
import { ViewportMeta } from '@/components/ui/ViewportMeta'
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


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
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
  other: {
    'Content-Security-Policy': process.env.NODE_ENV === 'development' 
      ? "default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' ws: wss:;"
      : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
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
  maximumScale: 1,
  userScalable: false,
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
        <ViewportMeta />
      </head>
      <body className={`${inter.className} text-gray-900 dark:text-white screen-fit ios-fix`}>
        <Providers>
          <AuthNavbar />
          <main className="content-fit">
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