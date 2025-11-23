'use client'

import React, { Suspense } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { DataProvider } from '@/contexts/DataContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from 'react-hot-toast'

// Lazy load heavy components
const LazyToaster = () => (
  <Suspense fallback={null}>
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
  </Suspense>
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            {children}
            <LazyToaster />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}


