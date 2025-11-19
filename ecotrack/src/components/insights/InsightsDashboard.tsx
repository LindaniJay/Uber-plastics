'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Recycle, 
  Waves, 
  Fish,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useCountryData } from '@/hooks/useCountryData'
import { useTheme } from '@/contexts/ThemeContext'

const COLORS = ['#00A9A5', '#003366', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']

interface CountryCardProps {
  name: string
  imports: string[]
  growth: string
  recyclingRate: number
  infrastructureGap: number
  oceanArea: number
  marineProtectedAreas: number
}

function CountryCard({ 
  name, 
  imports, 
  growth, 
  recyclingRate, 
  infrastructureGap, 
  oceanArea, 
  marineProtectedAreas 
}: CountryCardProps) {
  const { darkMode } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card hover:scale-105 transition-all duration-300 ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h3>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Island Nation</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Main Imports</span>
              <span className="text-xs text-gray-500">{growth} Growth</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {imports.map((item, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Recycle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Recycling Rate</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(recyclingRate * 100)}%
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Infrastructure Gap</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(infrastructureGap * 100)}%
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Waves className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-300">Ocean Area</span>
              </div>
              <span className="font-medium">
                {(oceanArea / 1000).toFixed(0)}k km²
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <div className="flex items-center space-x-2">
                <Fish className="h-4 w-4 text-teal-500" />
                <span className="text-gray-600 dark:text-gray-300">Protected Areas</span>
              </div>
              <span className="font-medium">{marineProtectedAreas}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function InsightsDashboard() {
  const { darkMode } = useTheme()
  const [selectedCountry, setSelectedCountry] = useState('cabo_verde')
  const [showComparison, setShowComparison] = useState(false)
  
  const { data: caboVerdeData, summary: caboVerdeSummary, getImportTrendData, getRecyclingComparison } = useCountryData('cabo_verde')
  const { data: saoTomeData, summary: saoTomeSummary } = useCountryData('sao_tome')
  
  const importTrendData = useMemo(() => getImportTrendData(), [getImportTrendData])
  const recyclingComparison = useMemo(() => getRecyclingComparison(), [getRecyclingComparison])
  
  const packagingData = [
    { name: 'Cabo Verde', packaging: 72, textiles: 18, tubes: 10 },
    { name: 'São Tomé', packaging: 78, textiles: 12, tubes: 10 }
  ]
  
  const growthComparison = [
    { name: 'Cabo Verde', growth: 15, imports: 1250 },
    { name: 'São Tomé', growth: 8, imports: 320 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900">
      {/* Ocean Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            🌊 Plastic Insights Dashboard
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real-time sustainability data from Cabo Verde & São Tomé and Príncipe
          </p>
        </motion.div>

        {/* Country Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2">
            <button
              onClick={() => setSelectedCountry('cabo_verde')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCountry === 'cabo_verde'
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🇨🇻 Cabo Verde
            </button>
            <button
              onClick={() => setSelectedCountry('sao_tome')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCountry === 'sao_tome'
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🇸🇹 São Tomé
            </button>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                showComparison
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {showComparison ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              Compare
            </button>
          </div>
        </motion.div>

        {/* Key Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
          >
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">
              {selectedCountry === 'cabo_verde' ? '1,250' : '320'}
            </div>
            <div className="text-blue-200">Tonnes Plastic Imports (2021)</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
          >
            <Recycle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">
              {selectedCountry === 'cabo_verde' ? '16%' : '12%'}
            </div>
            <div className="text-blue-200">Current Recycling Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
          >
            <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">
              {selectedCountry === 'cabo_verde' ? '84%' : '88%'}
            </div>
            <div className="text-blue-200">Infrastructure Gap</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
          >
            <Waves className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">
              {selectedCountry === 'cabo_verde' ? '734k' : '160k'}
            </div>
            <div className="text-blue-200">Ocean Area (km²)</div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Import Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Plastic Import Trends (2014-2021)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={importTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="year" 
                  stroke="white"
                  fontSize={12}
                />
                <YAxis 
                  stroke="white"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="imports"
                  stroke="#00A9A5"
                  fill="url(#colorGradient)"
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A9A5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00A9A5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Packaging Dominance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Packaging Dominance Share</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Packaging', value: selectedCountry === 'cabo_verde' ? 72 : 78 },
                    { name: 'Textiles', value: selectedCountry === 'cabo_verde' ? 18 : 12 },
                    { name: 'Tubes', value: 10 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {packagingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Country Comparison */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Country Comparison</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CountryCard
                  name="Cabo Verde"
                  imports={['Packaging', 'Textiles', 'Tubes']}
                  growth="Modest"
                  recyclingRate={0.16}
                  infrastructureGap={0.84}
                  oceanArea={734265}
                  marineProtectedAreas={12}
                />
                <CountryCard
                  name="São Tomé and Príncipe"
                  imports={['Packaging only']}
                  growth="Small"
                  recyclingRate={0.12}
                  infrastructureGap={0.88}
                  oceanArea={160000}
                  marineProtectedAreas={3}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blue Economy Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-8 text-center"
        >
          <Waves className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">Blue Economy Impact</h3>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-6">
            Both Cabo Verde and São Tomé are net importers of plastics, with packaging materials making up over 70% of imports. 
            This highlights why recycling incentive systems like EcoTrack are crucial for small island nations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Fish className="h-8 w-8 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Marine Protection</div>
              <div className="text-blue-200">Critical for island ecosystems</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Recycle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Recycling Gap</div>
              <div className="text-blue-200">Infrastructure needs investment</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Global Impact</div>
              <div className="text-blue-200">Every bottle matters</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
