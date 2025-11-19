'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  // Ensure we always have a valid language (default to 'en')
  const safeLanguage = language || 'en'
  const currentLanguage = languages.find(lang => lang.code === safeLanguage) || languages[0]

  return (
    <div className="relative">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium text-gray-700 dark:text-gray-300"
        title={`Current language: ${currentLanguage.name}`}
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wide">
          {currentLanguage.code}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as 'en' | 'sw' | 'pt')
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors duration-200 ${
                    safeLanguage === lang.code
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {safeLanguage === lang.code && (
                    <span className="ml-auto text-green-600 dark:text-green-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Compact version for mobile/small spaces
export function LanguageSwitcherCompact() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  // Ensure we always have a valid language (default to 'en')
  const safeLanguage = language || 'en'
  const currentLanguage = languages.find(lang => lang.code === safeLanguage) || languages[0]

  return (
    <div className="relative">
      {/* Compact Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        title={`Current language: ${currentLanguage?.name}`}
      >
        <span className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
          {currentLanguage?.code}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as 'en' | 'sw' | 'pt')
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-2 px-2 py-1.5 text-xs transition-colors duration-200 ${
                    safeLanguage === lang.code
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="font-medium">{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}



