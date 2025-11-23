'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  ChevronDown, 
  Check,
  MapPin,
  TrendingUp,
  Recycle
} from 'lucide-react'

interface Country {
  code: string
  name: string
  flag: string
  region: string
  isIsland: boolean
  recyclingRate: number
  infrastructureGap: number
}

interface CountrySelectorProps {
  selectedCountry: string
  onCountryChange: (countryCode: string) => void
  className?: string
}

const countries: Country[] = [
  {
    code: 'cabo_verde',
    name: 'Cabo Verde',
    flag: '🇨🇻',
    region: 'West Africa',
    isIsland: true,
    recyclingRate: 16,
    infrastructureGap: 84
  },
  {
    code: 'sao_tome',
    name: 'São Tomé and Príncipe',
    flag: '🇸🇹',
    region: 'Central Africa',
    isIsland: true,
    recyclingRate: 12,
    infrastructureGap: 88
  },
  {
    code: 'ghana',
    name: 'Ghana',
    flag: '🇬🇭',
    region: 'West Africa',
    isIsland: false,
    recyclingRate: 18,
    infrastructureGap: 82
  }
]

export function CountrySelector({ 
  selectedCountry, 
  onCountryChange, 
  className = '' 
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCountryData, setSelectedCountryData] = useState<Country | null>(null)

  useEffect(() => {
    const country = countries.find(c => c.code === selectedCountry)
    setSelectedCountryData(country || null)
  }, [selectedCountry])

  const handleCountrySelect = (countryCode: string) => {
    onCountryChange(countryCode)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Selected Country Display */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-left transition-all duration-300 hover:bg-white/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {selectedCountryData?.flag}
            </div>
            <div>
              <div className="font-semibold text-white">
                {selectedCountryData?.name}
              </div>
              <div className="text-sm text-blue-200">
                {selectedCountryData?.region}
                {selectedCountryData?.isIsland && ' • Island Nation'}
              </div>
            </div>
          </div>
          <ChevronDown 
            className={`h-5 w-5 text-white transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
        
        {/* Quick Stats */}
        {selectedCountryData && (
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Recycle className="h-4 w-4 text-green-400" />
              <div>
                <div className="text-xs text-blue-200">Recycling Rate</div>
                <div className="text-sm font-medium text-white">
                  {selectedCountryData.recyclingRate}%
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <div>
                <div className="text-xs text-blue-200">Infrastructure Gap</div>
                <div className="text-sm font-medium text-white">
                  {selectedCountryData.infrastructureGap}%
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl z-50"
          >
            <div className="p-2">
              {countries.map((country, index) => (
                <motion.button
                  key={country.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCountrySelect(country.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    selectedCountry === country.code
                      ? 'bg-white/20 text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{country.flag}</div>
                    <div>
                      <div className="font-medium">{country.name}</div>
                      <div className="text-xs text-blue-200">
                        {country.region}
                        {country.isIsland && ' • Island Nation'}
                      </div>
                    </div>
                  </div>
                  
                  {selectedCountry === country.code && (
                    <Check className="h-5 w-5 text-green-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
