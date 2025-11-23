'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  FileText, 
  Award, 
  TrendingUp, 
  Shield, 
  Globe,
  CheckCircle,
  AlertTriangle,
  Star,
  BarChart3
} from 'lucide-react'
import { generateJudgingReport, getJudgingScore } from '@/utils/judgingCriteriaCompliance'
import { calculateRegionalScore } from '@/utils/advancedScoringSystem'

interface JudgingReportGeneratorProps {
  region: string
  userStats: {
    totalBottles: number
    totalScans: number
    co2Saved: number
    points: number
  }
}

export function JudgingReportGenerator({ region, userStats }: JudgingReportGeneratorProps) {
  const [report, setReport] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async () => {
    setIsGenerating(true)
    
    // Simulate scan data for demonstration
    const scanData = {
      bottlesDetected: userStats.totalBottles,
      bottleTypes: ['PET', 'HDPE', 'LDPE', 'PP'],
      location: {
        country: region,
        region: region === 'cabo-verde' ? 'West Africa' : 'Central Africa'
      },
      timestamp: new Date(),
      userLevel: Math.floor(userStats.totalScans / 10) + 1,
      scanQuality: 0.9
    }

    const advancedScore = calculateRegionalScore(scanData, region)
    const judgingReport = generateJudgingReport(advancedScore, region)
    
    setReport(judgingReport)
    setIsGenerating(false)
  }

  useEffect(() => {
    generateReport()
  }, [region, userStats])

  const downloadReport = () => {
    if (!report) return

    const reportData = {
      title: "EcoTrack Judging Criteria Compliance Report",
      generated: new Date().toISOString(),
      region: region,
      userStats: userStats,
      judgingCriteria: report.judgingCriteria,
      recommendations: report.recommendations,
      actionItems: report.actionItems,
      evidencePortfolio: report.evidencePortfolio
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ecotrack-judging-report-${region}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating judging report...</p>
        </div>
      </div>
    )
  }

  if (!report) return null

  const { judgingCriteria } = report
  const totalPercentage = (judgingCriteria.totalScore / judgingCriteria.maxTotalScore) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Judging Criteria Compliance</h2>
          <p className="text-gray-600">Comprehensive assessment for maximum points</p>
        </div>
        <Button onClick={downloadReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {judgingCriteria.totalScore}
              </div>
              <div className="text-sm text-gray-600">Total Score</div>
              <div className="text-xs text-gray-500">out of {judgingCriteria.maxTotalScore}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {totalPercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Percentage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {judgingCriteria.grade}
              </div>
              <div className="text-sm text-gray-600">Grade</div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={totalPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Criteria Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Innovation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Innovation ({judgingCriteria.innovation.score}/{judgingCriteria.innovation.maxScore})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-bold">{judgingCriteria.innovation.score}</span>
              </div>
              <Progress 
                value={(judgingCriteria.innovation.score / judgingCriteria.innovation.maxScore) * 100} 
                className="h-2" 
              />
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Features:</h4>
                <ul className="text-xs space-y-1">
                  {judgingCriteria.innovation.criteria.slice(0, 4).map((criterion: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Impact ({judgingCriteria.impact.score}/{judgingCriteria.impact.maxScore})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-bold">{judgingCriteria.impact.score}</span>
              </div>
              <Progress 
                value={(judgingCriteria.impact.score / judgingCriteria.impact.maxScore) * 100} 
                className="h-2" 
              />
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Impact Metrics:</h4>
                <ul className="text-xs space-y-1">
                  {judgingCriteria.impact.criteria.slice(0, 4).map((criterion: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Excellence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Technical Excellence ({judgingCriteria.technicalExcellence.score}/{judgingCriteria.technicalExcellence.maxScore})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-bold">{judgingCriteria.technicalExcellence.score}</span>
              </div>
              <Progress 
                value={(judgingCriteria.technicalExcellence.score / judgingCriteria.technicalExcellence.maxScore) * 100} 
                className="h-2" 
              />
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Technical Features:</h4>
                <ul className="text-xs space-y-1">
                  {judgingCriteria.technicalExcellence.criteria.slice(0, 4).map((criterion: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sustainability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Sustainability ({judgingCriteria.sustainability.score}/{judgingCriteria.sustainability.maxScore})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-bold">{judgingCriteria.sustainability.score}</span>
              </div>
              <Progress 
                value={(judgingCriteria.sustainability.score / judgingCriteria.sustainability.maxScore) * 100} 
                className="h-2" 
              />
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Sustainability Features:</h4>
                <ul className="text-xs space-y-1">
                  {judgingCriteria.sustainability.criteria.slice(0, 4).map((criterion: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recommendations for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.recommendations.map((recommendation: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Evidence Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Screenshots</h4>
              <ul className="space-y-1 text-sm">
                {report.evidencePortfolio.screenshots.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Key Metrics</h4>
              <ul className="space-y-1 text-sm">
                {report.evidencePortfolio.metrics.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
