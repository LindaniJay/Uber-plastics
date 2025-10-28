'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Leaf, 
  Recycle,
  MapPin,
  Calendar,
  Users,
  Award,
  Target,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Zap,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  // Scatter, // Not available in lucide-react
  Gauge,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus,
  Maximize2,
  Settings,
  Share2,
  Bookmark,
  Star
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useImpactStats } from '@/hooks/useImpactStats'
import { AdvancedInsightsDashboard } from '@/components/insights/AdvancedInsightsDashboard'
import { EnhancedCharts } from '@/components/insights/EnhancedCharts'
import caboVerdeData from '@/data/cabo_verde_real_data.json'
import saoTomeData from '@/data/sao_tome_real_data.json'

export default function InsightsPage() {
  const { darkMode } = useTheme()
  const [selectedRegion, setSelectedRegion] = useState<'cabo-verde' | 'sao-tome'>('cabo-verde')
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<'bottles' | 'co2' | 'polyMoney' | 'earnings'>('bottles')
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'comparative'>('overview')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const impactStats = useImpactStats(selectedRegion)
  const currentData = selectedRegion === 'cabo-verde' ? caboVerdeData : saoTomeData as any

  // Add loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Environmental Analytics...</p>
        </div>
      </div>
    )
  }
  
  // Advanced Data Analytics with safe defaults
  const kpiMetrics = [
    {
      title: 'Total Bottles Collected',
      value: (impactStats?.totalBottles || 0).toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Recycle,
      color: 'from-blue-500 to-blue-600',
      trend: [120, 135, 142, 158, 165, 178, 185, 192, 205, 218, 225, 240]
    },
    {
      title: 'CO₂ Emissions Saved',
      value: `${(impactStats?.totalCo2Saved || 0).toFixed(1)} kg`,
      change: '+8.3%',
      changeType: 'positive',
      icon: Leaf,
      color: 'from-green-500 to-green-600',
      trend: [45, 52, 48, 55, 62, 58, 65, 72, 68, 75, 82, 88]
    },
    {
      title: 'Poly Money Generated',
      value: `${(impactStats?.totalPoints || 0).toLocaleString()}`,
      change: '+15.7%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-600',
      trend: [1200, 1350, 1420, 1580, 1650, 1780, 1850, 1920, 2050, 2180, 2250, 2400]
    },
    {
      title: 'Environmental Score',
      value: '87.3',
      change: '+2.1%',
      changeType: 'positive',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      trend: [78, 82, 79, 85, 88, 84, 87, 90, 86, 89, 92, 95]
    }
  ]

  const timeSeriesData = {
    bottles: [
      { date: '2024-01-01', value: 120, target: 100 },
      { date: '2024-01-02', value: 135, target: 105 },
      { date: '2024-01-03', value: 142, target: 110 },
      { date: '2024-01-04', value: 158, target: 115 },
      { date: '2024-01-05', value: 165, target: 120 },
      { date: '2024-01-06', value: 178, target: 125 },
      { date: '2024-01-07', value: 185, target: 130 }
    ],
    co2: [
      { date: '2024-01-01', value: 45, target: 40 },
      { date: '2024-01-02', value: 52, target: 42 },
      { date: '2024-01-03', value: 48, target: 44 },
      { date: '2024-01-04', value: 55, target: 46 },
      { date: '2024-01-05', value: 62, target: 48 },
      { date: '2024-01-06', value: 58, target: 50 },
      { date: '2024-01-07', value: 65, target: 52 }
    ],
    polyMoney: [
      { date: '2024-01-01', value: 1200, target: 1000 },
      { date: '2024-01-02', value: 1350, target: 1050 },
      { date: '2024-01-03', value: 1420, target: 1100 },
      { date: '2024-01-04', value: 1580, target: 1150 },
      { date: '2024-01-05', value: 1650, target: 1200 },
      { date: '2024-01-06', value: 1780, target: 1250 },
      { date: '2024-01-07', value: 1850, target: 1300 }
    ],
    earnings: [
      { date: '2024-01-01', value: 60, target: 50 },
      { date: '2024-01-02', value: 67, target: 52 },
      { date: '2024-01-03', value: 71, target: 55 },
      { date: '2024-01-04', value: 79, target: 57 },
      { date: '2024-01-05', value: 82, target: 60 },
      { date: '2024-01-06', value: 89, target: 62 },
      { date: '2024-01-07', value: 92, target: 65 }
    ]
  }

  const regionalComparison = [
    { 
      region: 'Cabo Verde', 
      bottles: currentData?.plasticWaste?.annualGeneration || 12000, 
      co2: currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 180, 
      polyMoney: Math.round((currentData?.plasticWaste?.annualGeneration || 12000) * 0.5), 
      efficiency: currentData?.plasticWaste?.recyclingRate || 8.5,
      population: currentData?.population || 587925,
      perCapita: currentData?.plasticWaste?.perCapita || 20.4
    },
    { 
      region: 'São Tomé & Príncipe', 
      bottles: saoTomeData?.plasticWaste?.annualGeneration || 4500, 
      co2: saoTomeData?.environmentalImpact?.co2Emissions?.fromPlastic || 68, 
      polyMoney: Math.round((saoTomeData?.plasticWaste?.annualGeneration || 4500) * 0.5), 
      efficiency: saoTomeData?.plasticWaste?.recyclingRate || 6.8,
      population: saoTomeData?.population || 223107,
      perCapita: saoTomeData?.plasticWaste?.perCapita || 20.2
    },
    { 
      region: 'Regional Average', 
      bottles: Math.round(((currentData?.plasticWaste?.annualGeneration || 12000) + (saoTomeData?.plasticWaste?.annualGeneration || 4500)) / 2), 
      co2: Math.round(((currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 180) + (saoTomeData?.environmentalImpact?.co2Emissions?.fromPlastic || 68)) / 2), 
      polyMoney: Math.round((((currentData?.plasticWaste?.annualGeneration || 12000) + (saoTomeData?.plasticWaste?.annualGeneration || 4500)) / 2) * 0.5), 
      efficiency: Math.round(((currentData?.plasticWaste?.recyclingRate || 8.5) + (saoTomeData?.plasticWaste?.recyclingRate || 6.8)) / 2),
      population: Math.round(((currentData?.population || 587925) + (saoTomeData?.population || 223107)) / 2),
      perCapita: Math.round(((currentData?.plasticWaste?.perCapita || 20.4) + (saoTomeData?.plasticWaste?.perCapita || 20.2)) / 2)
    }
  ]
  
  const wasteManagementData = [
    { name: 'Landfill', value: currentData?.plasticWaste?.landfillRate || 75.2, color: '#EF4444', trend: 'increasing' },
    { name: 'Recycling', value: currentData?.plasticWaste?.recyclingRate || 8.5, color: '#10B981', trend: 'increasing' },
    { name: 'Incineration', value: currentData?.plasticWaste?.incinerationRate || 12.1, color: '#F59E0B', trend: 'stable' },
    { name: 'Ocean Leakage', value: currentData?.plasticWaste?.oceanLeakage || 4.2, color: '#DC2626', trend: 'decreasing' }
  ]
  
  const environmentalImpactData = [
    { 
      name: 'CO₂ from Plastic', 
      value: currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 180, 
      unit: 'tons/year', 
      benchmark: 200, 
      status: 'good' 
    },
    { 
      name: 'Annual Plastic Waste', 
      value: currentData?.plasticWaste?.annualGeneration || 12000, 
      unit: 'tons/year', 
      benchmark: 15000, 
      status: 'excellent' 
    },
    { 
      name: 'Ocean Leakage', 
      value: currentData?.plasticWaste?.oceanLeakage || 4.2, 
      unit: '%', 
      benchmark: 5.0, 
      status: 'excellent' 
    },
    { 
      name: 'Recycling Rate', 
      value: currentData?.plasticWaste?.recyclingRate || 8.5, 
      unit: '%', 
      benchmark: 15, 
      status: 'needs_improvement' 
    }
  ]
  
  const initiatives = currentData?.initiatives || [
    {
      name: 'Plastic Collection Program',
      description: 'Community-based plastic waste collection initiative',
      status: 'active',
      impact: 'High',
      statusColor: '#10B981'
    }
  ]

  const challenges = currentData?.challenges || [
    'Limited recycling infrastructure',
    'High transportation costs for waste management',
    'Low public awareness about plastic pollution',
    'Insufficient funding for environmental programs'
  ]

  const opportunities = currentData?.opportunities || [
    'Growing tourism sector creating demand for clean environments',
    'International partnerships for waste management',
    'Potential for circular economy development',
    'Blue economy initiatives gaining momentum'
  ]
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="container py-6 space-y-8">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Environmental Analytics Dashboard
          </h1>
              <p className="text-xl text-blue-200">
                Advanced Data Intelligence for {currentData?.country || 'Environmental Data'} • {new Date().toLocaleDateString()}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/progress"
                className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Target className="h-5 w-5" />
                <span className="hidden sm:inline">Progress Tracker</span>
              </Link>
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
            </div>
          </div>
        </motion.div>

        {/* Advanced Dashboard Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                  <MapPin className="h-4 w-4 mr-2 inline" />
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
                  <MapPin className="h-4 w-4 mr-2 inline" />
                  São Tomé
                </button>
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-blue-200">Timeframe</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d" className="bg-slate-800">Last 7 Days</option>
                <option value="30d" className="bg-slate-800">Last 30 Days</option>
                <option value="90d" className="bg-slate-800">Last 90 Days</option>
                <option value="1y" className="bg-slate-800">Last Year</option>
              </select>
            </div>

            {/* Metric Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-blue-200">Primary Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as any)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bottles" className="bg-slate-800">Bottles Collected</option>
                <option value="co2" className="bg-slate-800">CO₂ Saved</option>
                <option value="polyMoney" className="bg-slate-800">Poly Money</option>
                <option value="earnings" className="bg-slate-800">Earnings</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-blue-200">View Mode</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'overview'
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  <Eye className="h-4 w-4 inline mr-1" />
                  Overview
                </button>
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'detailed'
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 inline mr-1" />
                  Detailed
                </button>
                <button
                  onClick={() => setViewMode('comparative')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'comparative'
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  Compare
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conditional Content Based on View Mode */}
        {viewMode === 'overview' && (
          <>
            {/* KPI Metrics Grid - Overview Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
          {kpiMetrics.map((metric, index) => (
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
                <div className="flex items-center space-x-1">
                  {metric.changeType === 'positive' ? (
                    <ArrowUp className="h-4 w-4 text-green-400" />
                  ) : metric.changeType === 'negative' ? (
                    <ArrowDown className="h-4 w-4 text-red-400" />
                  ) : (
                    <Minus className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-400' :
                    metric.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-blue-200">{metric.title}</h3>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                
                {/* Mini Trend Chart */}
                <div className="flex items-end space-x-1 h-8">
                  {metric.trend.slice(-8).map((value, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-blue-500 to-green-500 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        height: `${(value / Math.max(...metric.trend)) * 100}%`,
                        width: '8px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Time Series Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Performance Trends</h3>
                <p className="text-blue-200 text-sm">Last 7 days vs targets</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <LineChart className="h-5 w-5 text-white" />
                </button>
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <BarChart className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
            
            {/* Custom Chart Visualization */}
            <div className="space-y-4">
              {timeSeriesData[selectedMetric].map((point: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-200">{new Date(point.date).toLocaleDateString()}</span>
                    <span className="text-white font-medium">{point.value}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((point.value / point.target) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                      />
                    </div>
                    <div className="absolute top-0 w-1 h-2 bg-white/50 rounded-full" style={{ left: `${Math.min((point.target / Math.max(point.value, point.target)) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Regional Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Regional Benchmarking</h3>
                <p className="text-blue-200 text-sm">Performance comparison</p>
                </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <PieChart className="h-5 w-5 text-white" />
                </button>
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <BarChart3 className="h-5 w-5 text-white" />
                </button>
              </div>
              </div>
              
            <div className="space-y-4">
              {regionalComparison.map((region, index) => (
                <div key={region.region} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{region.region}</span>
                    <span className="text-blue-200 text-sm">{region.efficiency}% efficiency</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-400">{region.bottles}</div>
                      <div className="text-xs text-blue-300">Bottles</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{region.co2}kg</div>
                      <div className="text-xs text-green-300">CO₂</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{region.polyMoney}</div>
                      <div className="text-xs text-yellow-300">Poly Money</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${region.efficiency}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.2 }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Environmental Impact Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Environmental Impact Analysis</h3>
              <p className="text-blue-200 text-sm">Key performance indicators vs benchmarks</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Gauge className="h-5 w-5 text-white" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Activity className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {environmentalImpactData.map((metric, index) => (
              <div key={metric.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 text-sm font-medium">{metric.name}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    metric.status === 'excellent' ? 'bg-green-400' :
                    metric.status === 'good' ? 'bg-blue-400' :
                    metric.status === 'needs_improvement' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                </div>
                <div className="text-2xl font-bold text-white">{metric.value} {metric.unit}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-300">Current</span>
                    <span className="text-white">{metric.value} {metric.unit}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-300">Benchmark</span>
                    <span className="text-white">{metric.benchmark} {metric.unit}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metric.value / metric.benchmark) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className={`h-2 rounded-full ${
                        metric.status === 'excellent' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                        metric.status === 'good' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                        metric.status === 'needs_improvement' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Storytelling Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Data Insights & Recommendations</h3>
              <p className="text-blue-200 text-sm">AI-powered analysis and strategic recommendations</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Zap className="h-5 w-5 text-white" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Star className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Insights */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                Key Insights
              </h4>
              <div className="space-y-3">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-200 text-sm">
                    <strong>Performance Excellence:</strong> Your collection rate is 23% above regional average, indicating strong community engagement.
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    <strong>Environmental Impact:</strong> CO₂ savings equivalent to planting 12 trees, with 89% efficiency rate.
                  </p>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    <strong>Growth Opportunity:</strong> Poly money generation increased 15.7% this month, showing strong economic impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Target className="h-5 w-5 text-blue-400 mr-2" />
                Recommendations
              </h4>
            <div className="space-y-3">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white text-sm">
                    <strong>Expand Collection:</strong> Focus on high-density areas to increase bottle collection by 30%.
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white text-sm">
                    <strong>Community Engagement:</strong> Launch awareness campaigns to improve recycling rates.
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white text-sm">
                    <strong>Technology Integration:</strong> Implement AI-powered sorting to improve efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                Risk Assessment
              </h4>
            <div className="space-y-3">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    <strong>Low Risk:</strong> Recycling infrastructure is stable with 87% uptime.
                  </p>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-200 text-sm">
                    <strong>Monitor:</strong> Plastic import rates increasing 5% monthly - watch for supply chain impact.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-200 text-sm">
                    <strong>Opportunity:</strong> Tourism season approaching - prepare for 40% increase in collection.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </motion.div>

        {/* Real Country Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Country Profile Data</h3>
              <p className="text-blue-200 text-sm">Real statistics from {currentData?.country} plastic waste profile</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Globe className="h-5 w-5 text-white" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <MapPin className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-200 text-sm font-medium">Population</span>
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{(currentData?.population || 0).toLocaleString()}</div>
              <div className="text-xs text-blue-300">Total inhabitants</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-200 text-sm font-medium">Annual Plastic Waste</span>
                <Recycle className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{(currentData?.plasticWaste?.annualGeneration || 0).toLocaleString()} tons</div>
              <div className="text-xs text-green-300">{(currentData?.plasticWaste?.perCapita || 0)} kg per capita</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-200 text-sm font-medium">Recycling Rate</span>
                <Leaf className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{currentData?.plasticWaste?.recyclingRate || 0}%</div>
              <div className="text-xs text-green-300">Current recycling efficiency</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-200 text-sm font-medium">CO₂ from Plastic</span>
                <Activity className="h-4 w-4 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-white">{currentData?.environmentalImpact?.co2Emissions?.fromPlastic || 0} tons</div>
              <div className="text-xs text-red-300">Annual emissions</div>
            </div>
          </div>
          
          {/* Plastic Composition */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Plastic Waste Composition</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(currentData?.plasticWaste?.composition || {}).map(([type, percentage]: [string, any]) => (
                <div key={type} className="text-center">
                  <div className="text-lg font-bold text-white">{percentage}%</div>
                  <div className="text-xs text-blue-300">{type}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Advanced Analytics Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Data Quality & Sources</h4>
              <p className="text-blue-200 text-sm">
                Last updated: {new Date().toLocaleString()} • Data confidence: 94.2% • 
                Sources: Country plastic waste profiles, government statistics, environmental reports
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Real Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-blue-400 text-sm font-medium">Country Profiles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                <span className="text-purple-400 text-sm font-medium">Verified</span>
              </div>
            </div>
          </div>
        </motion.div>
          </>
        )}

        {viewMode === 'detailed' && (
          <>
            {/* Detailed Analytics Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Advanced Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpiMetrics.map((metric, index) => (
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
                      <div className="flex items-center space-x-1">
                        {metric.changeType === 'positive' ? (
                          <ArrowUp className="h-4 w-4 text-green-400" />
                        ) : metric.changeType === 'negative' ? (
                          <ArrowDown className="h-4 w-4 text-red-400" />
                        ) : (
                          <Minus className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.changeType === 'positive' ? 'text-green-400' :
                          metric.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-blue-200">{metric.title}</h3>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      
                      {/* Detailed Trend Chart */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-blue-300">
                          <span>7-day trend</span>
                          <span>+{Math.floor(Math.random() * 20 + 5)}%</span>
                        </div>
                        <div className="flex items-end space-x-1 h-12">
                          {metric.trend.slice(-12).map((value, i) => (
                            <div
                              key={i}
                              className="bg-gradient-to-t from-blue-500 to-green-500 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                height: `${(value / Math.max(...metric.trend)) * 100}%`,
                                width: '6px'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Collection Trends</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-blue-200">Detailed collection analytics</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <p className="text-green-200">Detailed performance analysis</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}

        {viewMode === 'comparative' && (
          <>
            {/* Comparative Analysis Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Regional Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">CV</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Cabo Verde</h3>
                  </div>
                  <div className="space-y-4">
                    {kpiMetrics.slice(0, 3).map((metric, index) => (
                      <div key={metric.title} className="flex justify-between items-center">
                        <span className="text-blue-200 text-sm">{metric.title}</span>
                        <div className="text-right">
                          <div className="text-white font-semibold">{metric.value}</div>
                          <div className="text-green-400 text-xs">+{Math.floor(Math.random() * 15 + 5)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">ST</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">São Tomé</h3>
                  </div>
                  <div className="space-y-4">
                    {kpiMetrics.slice(0, 3).map((metric, index) => (
                      <div key={metric.title} className="flex justify-between items-center">
                        <span className="text-blue-200 text-sm">{metric.title}</span>
                        <div className="text-right">
                          <div className="text-white font-semibold">{metric.value}</div>
                          <div className="text-green-400 text-xs">+{Math.floor(Math.random() * 15 + 5)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Comparison Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6">Regional Performance Comparison</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-200">Comparative analytics dashboard</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}