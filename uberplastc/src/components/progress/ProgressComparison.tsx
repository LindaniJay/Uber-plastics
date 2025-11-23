'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Award,
  Leaf,
  Recycle,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Gauge
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import caboVerdeData from '@/data/cabo_verde_real_data.json'
import saoTomeData from '@/data/sao_tome_real_data.json'
import zanzibarData from '@/data/zanzibar_real_data.json'
import seychellesData from '@/data/seychelles_real_data.json'
import comorosData from '@/data/comoros_real_data.json'
import madagascarData from '@/data/madagascar_real_data.json'

interface ProgressComparisonProps {
  depotData: {
    totalProcessed: number
    co2Saved: number
    energySaved: number
    waterSaved: number
    recyclingRate: number
    processingEfficiency: number
    totalValue: number
    qualityScore: number
  }
  selectedRegion: 'cabo-verde' | 'sao-tome' | 'zanzibar' | 'seychelles' | 'comoros' | 'madagascar'
  timeframe: '7d' | '30d' | '90d' | '1y'
}

export function ProgressComparison({ depotData, selectedRegion, timeframe }: ProgressComparisonProps) {
  const { darkMode } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState<'impact' | 'efficiency' | 'economic' | 'environmental'>('impact')

  const currentData = 
    selectedRegion === 'cabo-verde' ? caboVerdeData :
    selectedRegion === 'sao-tome' ? saoTomeData :
    selectedRegion === 'zanzibar' ? zanzibarData :
    selectedRegion === 'seychelles' ? seychellesData :
    selectedRegion === 'comoros' ? comorosData :
    selectedRegion === 'madagascar' ? madagascarData :
    caboVerdeData as any

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate progress metrics
  const calculateProgress = () => {
    const countryAnnualWaste = currentData?.plasticWaste?.annualGeneration || 12000
    const countryRecyclingRate = currentData?.plasticWaste?.recyclingRate || 8.5
    const countryCo2FromPlastic = currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 180
    
    // Calculate depot's contribution to country goals
    const depotContributionToWaste = (depotData.totalProcessed / countryAnnualWaste) * 100
    const depotContributionToRecycling = (depotData.recyclingRate / countryRecyclingRate) * 100
    const depotContributionToCo2 = (depotData.co2Saved / countryCo2FromPlastic) * 100
    
    // Calculate progress towards 2030 goals (assuming 50% reduction target)
    const targetReduction = 50
    const currentProgress = (depotContributionToWaste + depotContributionToRecycling + depotContributionToCo2) / 3
    
    return {
      depotContributionToWaste,
      depotContributionToRecycling,
      depotContributionToCo2,
      currentProgress,
      targetReduction,
      remainingProgress: Math.max(0, targetReduction - currentProgress)
    }
  }

  const progress = calculateProgress()

  // Impact metrics
  const impactMetrics = [
    {
      title: 'Plastic Waste Diverted',
      depotValue: depotData.totalProcessed,
      countryBaseline: currentData?.plasticWaste?.annualGeneration || 12000,
      unit: 'bottles',
      icon: Recycle,
      color: 'from-blue-500 to-blue-600',
      progress: progress.depotContributionToWaste,
      impact: 'Prevents plastic from entering landfills and oceans'
    },
    {
      title: 'CO₂ Emissions Reduced',
      depotValue: depotData.co2Saved,
      countryBaseline: currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 180,
      unit: 'kg',
      icon: Leaf,
      color: 'from-green-500 to-green-600',
      progress: progress.depotContributionToCo2,
      impact: 'Equivalent to planting trees and reducing carbon footprint'
    },
    {
      title: 'Recycling Rate Improvement',
      depotValue: depotData.recyclingRate,
      countryBaseline: currentData?.plasticWaste?.recyclingRate || 8.5,
      unit: '%',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      progress: progress.depotContributionToRecycling,
      impact: 'Increases overall country recycling efficiency'
    },
    {
      title: 'Economic Value Generated',
      depotValue: depotData.totalValue,
      countryBaseline: currentData?.economicData?.recyclingValue || 0.8,
      unit: '$',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-600',
      progress: (depotData.totalValue / 1000) * 100, // Assuming $1000 as baseline
      impact: 'Creates economic value from waste materials'
    }
  ]

  // Efficiency metrics
  const efficiencyMetrics = [
    {
      title: 'Processing Efficiency',
      value: depotData.processingEfficiency,
      benchmark: 90,
      unit: '%',
      icon: Gauge,
      color: 'from-teal-500 to-cyan-600',
      status: depotData.processingEfficiency >= 90 ? 'excellent' : depotData.processingEfficiency >= 75 ? 'good' : 'needs_improvement'
    },
    {
      title: 'Quality Score',
      value: depotData.qualityScore,
      benchmark: 4.5,
      unit: '/5',
      icon: Award,
      color: 'from-pink-500 to-rose-600',
      status: depotData.qualityScore >= 4.5 ? 'excellent' : depotData.qualityScore >= 4.0 ? 'good' : 'needs_improvement'
    },
    {
      title: 'Energy Efficiency',
      value: depotData.energySaved,
      benchmark: 2000,
      unit: 'kWh',
      icon: Zap,
      color: 'from-indigo-500 to-purple-600',
      status: depotData.energySaved >= 2000 ? 'excellent' : depotData.energySaved >= 1500 ? 'good' : 'needs_improvement'
    },
    {
      title: 'Water Conservation',
      value: depotData.waterSaved,
      benchmark: 1500,
      unit: 'L',
      icon: Activity,
      color: 'from-cyan-500 to-blue-600',
      status: depotData.waterSaved >= 1500 ? 'excellent' : depotData.waterSaved >= 1000 ? 'good' : 'needs_improvement'
    }
  ]

  // Environmental impact comparison
  const environmentalComparison = [
    {
      metric: 'Annual Plastic Waste',
      countryValue: currentData?.plasticWaste?.annualGeneration || 12000,
      depotContribution: depotData.totalProcessed,
      unit: 'tons/bottles',
      impact: 'Depot processes 0.02% of country\'s annual plastic waste'
    },
    {
      metric: 'Recycling Rate',
      countryValue: currentData?.plasticWaste?.recyclingRate || 8.5,
      depotContribution: depotData.recyclingRate,
      unit: '%',
      impact: 'Depot achieves 11x higher recycling rate than country average'
    },
    {
      metric: 'CO₂ from Plastic',
      countryValue: currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 180,
      depotContribution: depotData.co2Saved,
      unit: 'tons/kg',
      impact: 'Depot prevents 0.07% of country\'s plastic-related CO₂ emissions'
    },
    {
      metric: 'Ocean Leakage',
      countryValue: currentData?.plasticWaste?.oceanLeakage || 4.2,
      depotContribution: 0, // Depot prevents ocean leakage
      unit: '%',
      impact: 'Depot prevents 100% of processed plastic from ocean leakage'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Analyzing Progress Data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container py-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Plastic Pollution Progress Tracker
              </h1>
              <p className="text-xl text-blue-200">
                Depot Impact vs {currentData?.country} National Data • {new Date().toLocaleDateString()}
              </p>
            </div>
            
            {/* Progress Overview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {progress.currentProgress.toFixed(1)}%
                </div>
                <div className="text-sm text-blue-200">Progress Towards 2030 Goals</div>
                <div className="w-32 h-2 bg-white/10 rounded-full mx-auto mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress.currentProgress, 100)}%` }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metric Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10"
        >
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'impact', label: 'Impact Analysis', icon: Target },
              { key: 'efficiency', label: 'Efficiency Metrics', icon: Gauge },
              { key: 'economic', label: 'Economic Impact', icon: DollarSign },
              { key: 'environmental', label: 'Environmental Data', icon: Leaf }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedMetric === key
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Impact Analysis */}
        {selectedMetric === 'impact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                      <metric.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-200">vs Country</div>
                      <div className="text-xs text-green-400">+{metric.progress.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-blue-200">{metric.title}</h3>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white">
                        {metric.depotValue.toLocaleString()} {metric.unit}
                      </div>
                      <div className="text-xs text-blue-300">
                        Country baseline: {metric.countryBaseline.toLocaleString()} {metric.unit}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-blue-300">
                        <span>Contribution</span>
                        <span>{metric.progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(metric.progress, 100)}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                        />
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 mt-2">
                      {metric.impact}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">Progress Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {progress.currentProgress.toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-200">Current Progress</div>
                  <div className="text-xs text-gray-400 mt-1">Towards 2030 Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {progress.remainingProgress.toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-200">Remaining Progress</div>
                  <div className="text-xs text-gray-400 mt-1">To reach targets</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {((progress.currentProgress / progress.targetReduction) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-200">Goal Achievement</div>
                  <div className="text-xs text-gray-400 mt-1">Overall completion</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Efficiency Metrics */}
        {selectedMetric === 'efficiency' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {efficiencyMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                      <metric.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-400' :
                      metric.status === 'good' ? 'bg-blue-400' : 'bg-yellow-400'
                    }`} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-blue-200">{metric.title}</h3>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white">
                        {metric.value.toLocaleString()} {metric.unit}
                      </div>
                      <div className="text-xs text-blue-300">
                        Benchmark: {metric.benchmark.toLocaleString()} {metric.unit}
                      </div>
                    </div>
                    
                    {/* Performance Indicator */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-blue-300">
                        <span>Performance</span>
                        <span className={`${
                          metric.status === 'excellent' ? 'text-green-400' :
                          metric.status === 'good' ? 'text-blue-400' : 'text-yellow-400'
                        }`}>
                          {metric.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((metric.value / metric.benchmark) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-2 rounded-full ${
                            metric.status === 'excellent' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                            metric.status === 'good' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Environmental Data Comparison */}
        {selectedMetric === 'environmental' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Environmental Impact Comparison</h3>
              <div className="space-y-6">
                {environmentalComparison.map((item, index) => (
                  <motion.div
                    key={item.metric}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{item.metric}</h4>
                      <div className="text-sm text-blue-200">{item.unit}</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-blue-200">Country Baseline</div>
                        <div className="text-2xl font-bold text-blue-400">
                          {item.countryValue.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-blue-200">Depot Contribution</div>
                        <div className="text-2xl font-bold text-green-400">
                          {item.depotContribution.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-200 text-sm">{item.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Economic Impact */}
        {selectedMetric === 'economic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6">Economic Impact Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Total Value Generated</span>
                    <span className="text-2xl font-bold text-green-400">${depotData.totalValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Cost Savings (CO₂)</span>
                    <span className="text-lg font-semibold text-blue-400">${(depotData.co2Saved * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Energy Savings</span>
                    <span className="text-lg font-semibold text-yellow-400">${(depotData.energySaved * 0.12).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Water Savings</span>
                    <span className="text-lg font-semibold text-cyan-400">${(depotData.waterSaved * 0.003).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6">ROI Analysis</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {((depotData.totalValue / 1000) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-blue-200">Return on Investment</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Investment</span>
                      <span className="text-white">$1,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Returns</span>
                      <span className="text-green-400">${depotData.totalValue}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((depotData.totalValue / 1000) * 100, 100)}%` }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-200 font-semibold">Expand Operations</span>
              </div>
              <p className="text-green-200 text-sm">Increase processing capacity to reach 2030 goals faster</p>
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-200 font-semibold">Improve Efficiency</span>
              </div>
              <p className="text-blue-200 text-sm">Optimize processes to achieve 95%+ efficiency rates</p>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center mb-2">
                <Globe className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-purple-200 font-semibold">Scale Impact</span>
              </div>
              <p className="text-purple-200 text-sm">Replicate successful model across other regions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

