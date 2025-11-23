import type { Metadata } from 'next'
import { Suspense } from 'react'
// import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { AuthNavbar } from '@/components/layout/AuthNavbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { ViewportMeta } from '@/components/ui/ViewportMeta'
import { shouldShowPerformanceMetrics } from '@/utils/productionConfig'
// import ChatbotMount from '@/components/chatbot/ChatbotMount'

// Chatbot disabled - commented out to avoid webpack module resolution errors


// const inter = Inter({ 
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['system-ui', 'arial']
// })

// Use system font instead
const inter = { className: 'font-sans' }

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'UberPlastics - From Waste to Worth',
  description: 'Track plastic bottle collections, earn rewards, and make a real impact on our planet. Join the movement towards a cleaner, more sustainable future.',
  keywords: ['recycling', 'sustainability', 'environment', 'plastic bottles', 'eco-friendly', 'rewards'],
  authors: [{ name: 'UberPlastics Team' }],
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
    title: 'UberPlastics - From Waste to Worth',
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
    title: 'UberPlastics - From Waste to Worth',
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

        <ViewportMeta />
      </head>
      <body className={`${inter.className} text-gray-900 dark:text-white screen-fit ios-fix`}>
        <Providers>
          {/* Flex container ensures proper layout structure: header (sticky), main (flexible), and footer elements */}
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50">
              <AuthNavbar />
            </header>
            <main className="flex-grow content-fit pt-4 md:pt-0 pb-20 md:pb-0">
              {children}
            </main>
            <Suspense fallback={null}>
              <MobileBottomNav />
            </Suspense>
            {/* Chatbot disabled */}
            {/* <Suspense fallback={null}>
              <ChatbotMount />
            </Suspense> */}
            {/* Temporarily disabled PerformanceMonitor to fix loading issue */}
            {/* {shouldShowPerformanceMetrics && <PerformanceMonitor />} */}
          </div>
        </Providers>
      </body>
    </html>
  )
}