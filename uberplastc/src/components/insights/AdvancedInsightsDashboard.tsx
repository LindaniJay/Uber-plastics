'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  Globe, 
  Shield, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  MapPin,
  Users,
  Recycle
} from 'lucide-react'
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
  Cell 
} from 'recharts'
import { getCountryInsights, calculateRegionalScore } from '@/utils/advancedScoringSystem'
import caboVerdeData from '@/data/cabo_verde.json'
import saoTomeData from '@/data/sao_tome.json'

interface AdvancedInsightsDashboardProps {
  region: string
  userStats: {
    totalBottles: number
    totalScans: number
    co2Saved: number
    points: number
  }
}

export function AdvancedInsightsDashboard({ region, userStats }: AdvancedInsightsDashboardProps) {
  const [insights, setInsights] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const countryInsights = getCountryInsights(region)
    setInsights(countryInsights)
  }, [region])

  if (!insights) return <div>Loading insights...</div>

  const countryData = region === 'cabo-verde' ? caboVerdeData : saoTomeData

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Annual Plastic Waste</p>
                <p className="text-2xl font-bold text-green-600">
                  {insights.keyMetrics.annualPlasticWaste.toLocaleString()} tons
                </p>
              </div>
              <Recycle className="h-8 w-8 text-green-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recycling Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {insights.keyMetrics.recyclingRate}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ocean Leakage</p>
                <p className="text-2xl font-bold text-red-600">
                  {insights.keyMetrics.oceanLeakage.toLocaleString()} tons/year
                </p>
              </div>
              <Globe className="h-8 w-8 text-red-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Beach Litter Density</p>
                <p className="text-2xl font-bold text-orange-600">
                  {insights.keyMetrics.beachLitter.toLocaleString()}/km²
                </p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
          <TabsTrigger value="trade">Trade Data</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Environmental Impact Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" size={20} />
                  Environmental Impact Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={generateEnvironmentalData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="co2Saved" stackId="1" stroke="#10B981" fill="#10B981" />
                    <Area type="monotone" dataKey="oceanProtection" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Policy Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" size={20} />
                  Policy Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.policyHighlights.map((policy: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{policy.title}</h4>
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" size={16} />
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                    <p className="text-xs text-green-600 font-medium">{policy.impact}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* User Impact Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" size={20} />
                Your Impact Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{userStats.totalBottles}</p>
                  <p className="text-sm text-gray-600">Bottles Collected</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{userStats.co2Saved.toFixed(2)} kg</p>
                  <p className="text-sm text-gray-600">CO₂ Saved</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{userStats.points}</p>
                  <p className="text-sm text-gray-600">Points Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policy Tab */}
        <TabsContent value="policy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* National Policies */}
            <Card>
              <CardHeader>
                <CardTitle>National Policy Framework</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {countryData.policyFramework.plasticLegislation && (
                  <div className="space-y-3">
                    {Object.entries(countryData.policyFramework.plasticLegislation).map(([key, policy]: [string, any]) => (
                      <div key={key} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-lg">{policy.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                        {policy.prohibitions && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-red-600">Prohibited:</p>
                            <ul className="text-xs text-gray-600 list-disc list-inside">
                              {policy.prohibitions.map((item: string, index: number) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* International Conventions */}
            <Card>
              <CardHeader>
                <CardTitle>International Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Ratified Conventions</h4>
                    <div className="space-y-1">
                      {countryData.policyFramework.internationalConventions.ratified.map((convention: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" size={16} />
                          <span className="text-sm">{convention}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {(countryData.policyFramework.internationalConventions as any).notRatified && (
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Not Ratified</h4>
                      <div className="space-y-1">
                        {(countryData.policyFramework.internationalConventions as any).notRatified.map((convention: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-600" size={16} />
                            <span className="text-sm">{convention}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trade Data Tab */}
        <TabsContent value="trade" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Import Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Plastic Import Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={generateTradeData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="primary" fill="#3B82F6" />
                    <Bar dataKey="products" fill="#10B981" />
                    <Bar dataKey="waste" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Problematic Plastics */}
            <Card>
              <CardHeader>
                <CardTitle>Problematic Plastics Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {countryData.detailedTradeData?.problematicPlastics?.hsCodes?.map((hsCode: string, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">{hsCode.split(':')[0]}</span>
                        <Badge variant="destructive">High Impact</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{hsCode.split(':')[1]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Impact Tab */}
        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CO₂ Impact */}
            <Card>
              <CardHeader>
                <CardTitle>CO₂ Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Your CO₂ Savings</span>
                    <span className="font-bold text-green-600">{userStats.co2Saved.toFixed(2)} kg</span>
                  </div>
                  <Progress value={(userStats.co2Saved / 100) * 100} className="h-2" />
                  <p className="text-xs text-gray-600">
                    Equivalent to {((userStats.co2Saved * 2.5) / 1000).toFixed(2)} trees planted
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Economic Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Economic Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" size={16} />
                      Tourism Multiplier
                    </span>
                    <span className="font-bold">{countryData.regionalFactors.tourismMultiplier}x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Economic Value Created</span>
                    <span className="font-bold text-green-600">
                      STN ${(userStats.totalBottles * 0.05 * countryData.regionalFactors.tourismMultiplier).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" size={20} />
                  Current Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.challenges.map((challenge: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{challenge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" size={20} />
                  Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.opportunities.map((opportunity: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions for data generation
function generateEnvironmentalData() {
  return [
    { month: 'Jan', co2Saved: 12, oceanProtection: 8 },
    { month: 'Feb', co2Saved: 15, oceanProtection: 10 },
    { month: 'Mar', co2Saved: 18, oceanProtection: 12 },
    { month: 'Apr', co2Saved: 22, oceanProtection: 15 },
    { month: 'May', co2Saved: 25, oceanProtection: 18 },
    { month: 'Jun', co2Saved: 28, oceanProtection: 20 }
  ]
}

function generateTradeData() {
  return [
    { type: 'Primary Forms', primary: 24, products: 76, waste: 0 },
    { type: 'Product Forms', primary: 14, products: 86, waste: 0 },
    { type: 'Waste Forms', primary: 0, products: 0, waste: 100 }
  ]
}
