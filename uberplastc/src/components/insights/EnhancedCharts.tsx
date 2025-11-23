'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
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
  ScatterChart,
  Scatter,
  ComposedChart,
  Legend
} from 'recharts'
import { chartDataService } from '@/services/chartDataService'
import { ChartInteractions } from './ChartInteractions'
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon,
  Activity,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

interface EnhancedChartsProps {
  region: string
  userStats: {
    totalBottles: number
    totalScans: number
    co2Saved: number
    points: number
  }
}

export function EnhancedCharts({ region, userStats }: EnhancedChartsProps) {
  const [chartData, setChartData] = useState<any>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months')
  const [selectedChartType, setSelectedChartType] = useState('line')
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    generateChartData()
  }, [region, selectedTimeframe, selectedChartType, activeFilters])

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe)
  }

  const handleChartTypeChange = (chartType: string) => {
    setSelectedChartType(chartType)
  }

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters)
  }

  const handleExport = (format: 'png' | 'svg' | 'csv') => {
    console.log(`Exporting chart as ${format}`)
    // Implement actual export functionality here
  }

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    console.log(`Zooming ${direction}`)
    // Implement zoom functionality here
  }

  const generateChartData = async () => {
    setIsLoading(true)
    // Simulate data fetching
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const data = {
      environmentalTrends: chartDataService.generateEnvironmentalTrends(selectedTimeframe as '6months' | '12months'),
      wasteComposition: chartDataService.generateWasteComposition(region),
      regionalComparison: chartDataService.generateRegionalComparison(),
      userProgress: chartDataService.generateUserProgress(selectedTimeframe === '6months' ? 30 : 90),
      economicImpact: chartDataService.generateEconomicImpact(region),
      co2Reduction: chartDataService.generateCO2Reduction()
    }
    
    setChartData(data)
    setIsLoading(false)
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2">Loading charts...</span>
      </div>
    )
  }

  if (!chartData) return null

  return (
    <div className="space-y-6">
      {/* Interactive Chart Controls */}
      <ChartInteractions
        onTimeframeChange={handleTimeframeChange}
        onChartTypeChange={handleChartTypeChange}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onZoom={handleZoom}
        currentTimeframe={selectedTimeframe}
        currentChartType={selectedChartType}
        availableFilters={['region', 'category', 'dateRange']}
      />

      {/* Environmental Trends - Enhanced Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" size={20} />
            Environmental Impact Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData.environmentalTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="co2Saved" 
                stackId="1" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="plasticCollected" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="recyclingRate" 
                stroke="#F59E0B" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Waste Composition - Enhanced Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" size={20} />
              Waste Composition Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.wasteComposition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.wasteComposition.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Comparison - Enhanced Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" size={20} />
              Regional Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.regionalComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="recycling" fill="#10B981" name="Recycling Rate %" />
                <Bar dataKey="collection" fill="#3B82F6" name="Collection Rate %" />
                <Bar dataKey="awareness" fill="#F59E0B" name="Awareness %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Progress - Scatter Plot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" size={20} />
            Your Daily Progress Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={chartData.userProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" name="Day" />
              <YAxis yAxisId="left" dataKey="bottles" name="Bottles" />
              <YAxis yAxisId="right" dataKey="co2" name="CO₂ Saved" orientation="right" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter yAxisId="left" dataKey="bottles" fill="#10B981" name="Bottles Collected" />
              <Scatter yAxisId="right" dataKey="co2" fill="#3B82F6" name="CO₂ Saved (kg)" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Economic Impact - Stacked Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" size={20} />
            Economic Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.economicImpact}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="direct" stackId="a" fill="#10B981" name="Direct Impact" />
              <Bar dataKey="indirect" stackId="a" fill="#3B82F6" name="Indirect Impact" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* CO₂ Reduction Methods - Enhanced Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" size={20} />
            CO₂ Reduction Methods Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData.co2Reduction}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="co2Reduced" fill="#10B981" name="CO₂ Reduced (kg)" />
              <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#EF4444" name="Efficiency %" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
