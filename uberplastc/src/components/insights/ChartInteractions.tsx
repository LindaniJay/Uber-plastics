'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Filter, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react'

interface ChartInteractionsProps {
  onTimeframeChange: (timeframe: string) => void
  onChartTypeChange: (chartType: string) => void
  onFilterChange: (filters: Record<string, any>) => void
  onExport: (format: 'png' | 'svg' | 'csv') => void
  onZoom: (direction: 'in' | 'out' | 'reset') => void
  currentTimeframe: string
  currentChartType: string
  availableFilters: string[]
}

export function ChartInteractions({
  onTimeframeChange,
  onChartTypeChange,
  onFilterChange,
  onExport,
  onZoom,
  currentTimeframe,
  currentChartType,
  availableFilters
}: ChartInteractionsProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [showFilters, setShowFilters] = useState(false)

  const timeframes = [
    { value: '1week', label: '1 Week' },
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ]

  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: TrendingUp },
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'pie', label: 'Pie Chart', icon: PieChartIcon },
    { value: 'area', label: 'Area Chart', icon: TrendingUp }
  ]

  const handleFilterChange = (filterKey: string, value: any) => {
    const newFilters = { ...activeFilters, [filterKey]: value }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setActiveFilters({})
    onFilterChange({})
  }

  const exportChart = (format: 'png' | 'svg' | 'csv') => {
    onExport(format)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" size={20} />
          Chart Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timeframe Selection */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <Calendar className="h-4 w-4" size={16} />
            Timeframe:
          </span>
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe.value}
              variant={currentTimeframe === timeframe.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTimeframeChange(timeframe.value)}
            >
              {timeframe.label}
            </Button>
          ))}
        </div>

        {/* Chart Type Selection */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <BarChart3 className="h-4 w-4" size={16} />
            Chart Type:
          </span>
          {chartTypes.map((chartType) => {
            const IconComponent = chartType.icon
            return (
              <Button
                key={chartType.value}
                variant={currentChartType === chartType.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onChartTypeChange(chartType.value)}
                className="flex items-center gap-1"
              >
                <IconComponent className="h-4 w-4" size={16} />
                {chartType.label}
              </Button>
            )
          })}
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <ZoomIn className="h-4 w-4" size={16} />
            Zoom:
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onZoom('in')}
            className="flex items-center gap-1"
          >
            <ZoomIn className="h-4 w-4" size={16} />
            Zoom In
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onZoom('out')}
            className="flex items-center gap-1"
          >
            <ZoomOut className="h-4 w-4" size={16} />
            Zoom Out
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onZoom('reset')}
            className="flex items-center gap-1"
          >
            <RotateCcw className="h-4 w-4" size={16} />
            Reset
          </Button>
        </div>

        {/* Export Controls */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <Download className="h-4 w-4" size={16} />
            Export:
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportChart('png')}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" size={16} />
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportChart('svg')}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" size={16} />
            SVG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportChart('csv')}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" size={16} />
            CSV
          </Button>
        </div>

        {/* Active Filters Display */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Active Filters:
            </span>
            {Object.entries(activeFilters).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {key}: {value}
                <button
                  onClick={() => handleFilterChange(key, null)}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
