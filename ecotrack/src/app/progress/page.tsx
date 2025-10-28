'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  RefreshCw,
  Settings,
  Maximize2
} from 'lucide-react'
import { ProgressComparison } from '@/components/progress/ProgressComparison'
import { useProgressComparison, DepotData } from '@/hooks/useProgressComparison'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

export default function ProgressPage() {
  const { darkMode } = useTheme()
  const [selectedRegion, setSelectedRegion] = useState<'cabo-verde' | 'sao-tome'>('cabo-verde')
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mock depot data - in real implementation, this would come from your depot API
  const [depotData, setDepotData] = useState<DepotData>({
    totalProcessed: 2847,
    co2Saved: 125.6,
    energySaved: 2500,
    waterSaved: 1800,
    recyclingRate: 96.8,
    processingEfficiency: 94.2,
    totalValue: 1423.50,
    qualityScore: 4.2,
    lastUpdated: new Date().toISOString()
  })

  const { isLoading, countryComparison, progressMetrics, recommendations } = useProgressComparison(selectedRegion, depotData)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDepotData(prev => ({
        ...prev,
        totalProcessed: prev.totalProcessed + Math.floor(Math.random() * 5),
        co2Saved: prev.co2Saved + Math.random() * 0.5,
        energySaved: prev.energySaved + Math.random() * 10,
        waterSaved: prev.waterSaved + Math.random() * 8,
        totalValue: prev.totalValue + Math.random() * 2,
        lastUpdated: new Date().toISOString()
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Progress Analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="container py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Link
                href="/depot"
                className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  Plastic Pollution Progress Tracker
                </h1>
                <p className="text-xl text-blue-200">
                  Real-time impact analysis for {countryComparison.country}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {progressMetrics.currentProgress.toFixed(1)}%
              </div>
              <div className="text-sm text-blue-200">Progress to 2030 Goals</div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressMetrics.currentProgress, 100)}%` }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {depotData.totalProcessed.toLocaleString()}
              </div>
              <div className="text-sm text-blue-200">Bottles Processed</div>
              <div className="text-xs text-green-400 mt-1">
                +{((depotData.totalProcessed / countryComparison.annualWaste) * 100).toFixed(2)}% of country total
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {depotData.co2Saved.toFixed(1)}kg
              </div>
              <div className="text-sm text-blue-200">CO₂ Saved</div>
              <div className="text-xs text-green-400 mt-1">
                Equivalent to {Math.round(depotData.co2Saved / 0.4)} trees
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                ${depotData.totalValue.toFixed(2)}
              </div>
              <div className="text-sm text-blue-200">Economic Value</div>
              <div className="text-xs text-green-400 mt-1">
                ROI: {((depotData.totalValue / 1000) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Region and Timeframe Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Region Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-blue-200">Region</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedRegion('cabo-verde')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedRegion === 'cabo-verde'
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  Cabo Verde
                </button>
                <button
                  onClick={() => setSelectedRegion('sao-tome')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedRegion === 'sao-tome'
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  São Tomé & Príncipe
                </button>
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-blue-200">Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d" className="bg-slate-800">Last 7 Days</option>
                <option value="30d" className="bg-slate-800">Last 30 Days</option>
                <option value="90d" className="bg-slate-800">Last 90 Days</option>
                <option value="1y" className="bg-slate-800">Last Year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Progress Comparison Component */}
        <ProgressComparison
          depotData={depotData}
          selectedRegion={selectedRegion}
          timeframe={timeframe}
        />

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mt-8 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-6">AI-Powered Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    rec.priority === 'high' ? 'bg-red-500/10 border-red-500/20' :
                    rec.priority === 'medium' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-green-500/10 border-green-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${
                      rec.priority === 'high' ? 'text-red-200' :
                      rec.priority === 'medium' ? 'text-yellow-200' : 'text-green-200'
                    }`}>
                      {rec.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{rec.description}</p>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div><strong>Impact:</strong> {rec.impact}</div>
                    <div><strong>Cost:</strong> {rec.cost}</div>
                    <div><strong>Timeframe:</strong> {rec.timeframe}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mt-8 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Data Quality & Sources</h4>
              <p className="text-blue-200 text-sm">
                Last updated: {new Date(depotData.lastUpdated).toLocaleString()} • 
                Data confidence: 94.2% • 
                Sources: Depot operations, country statistics, environmental reports
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Live Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-blue-400 text-sm font-medium">Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                <span className="text-purple-400 text-sm font-medium">Real-time</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

