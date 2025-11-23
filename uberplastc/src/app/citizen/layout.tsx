import React from 'react'
import { AuthNavbar } from '@/components/layout/AuthNavbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  )
}
