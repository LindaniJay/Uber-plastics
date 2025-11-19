/**
 * Judging Criteria Compliance System
 * Ensures maximum poly money by addressing all judging criteria
 */

import { AdvancedScore } from './advancedScoringSystem'

export interface JudgingCriteria {
  innovation: {
    score: number
    maxScore: number
    criteria: string[]
    evidence: string[]
  }
  impact: {
    score: number
    maxScore: number
    criteria: string[]
    evidence: string[]
  }
  technicalExcellence: {
    score: number
    maxScore: number
    criteria: string[]
    evidence: string[]
  }
  sustainability: {
    score: number
    maxScore: number
    criteria: string[]
    evidence: string[]
  }
  scalability: {
    score: number
    maxScore: number
    criteria: string[]
    evidence: string[]
  }
  totalScore: number
  maxTotalScore: number
  grade: string
}

export interface ComplianceReport {
  judgingCriteria: JudgingCriteria
  recommendations: string[]
  actionItems: string[]
  evidencePortfolio: {
    screenshots: string[]
    demos: string[]
    documentation: string[]
    metrics: string[]
  }
}

export class JudgingCriteriaCompliance {
  private advancedScore: AdvancedScore
  private region: string

  constructor(advancedScore: AdvancedScore, region: string) {
    this.advancedScore = advancedScore
    this.region = region
  }

  /**
   * Generate comprehensive judging criteria compliance report
   */
  generateComplianceReport(): ComplianceReport {
    const judgingCriteria = this.assessJudgingCriteria()
    
    return {
      judgingCriteria,
      recommendations: this.generateRecommendations(judgingCriteria),
      actionItems: this.generateActionItems(judgingCriteria),
      evidencePortfolio: this.generateEvidencePortfolio()
    }
  }

  /**
   * Assess all judging criteria categories
   */
  public assessJudgingCriteria(): JudgingCriteria {
    const innovation = this.assessInnovation()
    const impact = this.assessImpact()
    const technicalExcellence = this.assessTechnicalExcellence()
    const sustainability = this.assessSustainability()
    const scalability = this.assessScalability()

    const totalScore = innovation.score + impact.score + technicalExcellence.score + 
                      sustainability.score + scalability.score
    const maxTotalScore = innovation.maxScore + impact.maxScore + technicalExcellence.maxScore + 
                         sustainability.maxScore + scalability.maxScore

    const grade = this.calculateGrade(totalScore, maxTotalScore)

    return {
      innovation,
      impact,
      technicalExcellence,
      sustainability,
      scalability,
      totalScore,
      maxTotalScore,
      grade
    }
  }

  /**
   * Assess Innovation criteria (25 poly money)
   */
  private assessInnovation() {
    const criteria = [
      "AI-powered bottle detection using TensorFlow.js",
      "Real-time camera overlay with confidence scores",
      "Regional data integration with policy frameworks",
      "Advanced scoring system with multiple multipliers",
      "PWA implementation with offline functionality",
      "Comprehensive insights dashboard with trade data",
      "Policy compliance tracking system",
      "Gamification with achievement system"
    ]

    const evidence = [
      "TensorFlow.js COCO-SSD model integration",
      "Live camera detection with bounding boxes",
      "Country-specific data from plastic waste profiles",
      "Multi-factor scoring algorithm",
      "Service worker for offline functionality",
      "Interactive charts and visualizations",
      "Real-time policy compliance checking",
      "Achievement badges and progress tracking"
    ]

    // Innovation score based on advanced features
    let score = 20 // Base score for AI detection
    score += this.advancedScore.breakdown.innovationBonus > 0 ? 3 : 0
    score += this.advancedScore.multipliers.innovationFactor > 1 ? 2 : 0

    return {
      score: Math.min(score, 25),
      maxScore: 25,
      criteria,
      evidence
    }
  }

  /**
   * Assess Impact criteria (25 poly money)
   */
  private assessImpact() {
    const criteria = [
      "Measurable environmental impact (CO₂ savings)",
      "Real-world data integration (Cabo Verde & São Tomé)",
      "Policy alignment with national legislation",
      "Economic impact calculation with regional factors",
      "Ocean protection metrics",
      "Community engagement through gamification",
      "Educational content and awareness raising",
      "Scalable impact measurement"
    ]

    const evidence = [
      `${this.advancedScore.breakdown.environmentalImpact} CO₂ poly money saved`,
      "Integration with UNEP plastic waste profiles",
      "Compliance with Law 22/X/2023 and Law 8/2020",
      `$${this.advancedScore.breakdown.economicImpact} economic value`,
      "Ocean leakage prevention metrics",
      "User engagement through poly money and achievements",
      "Educational popups with regional data",
      "Scalable impact tracking system"
    ]

    let score = 15 // Base score for impact measurement
    score += this.advancedScore.breakdown.environmentalImpact > 100 ? 5 : 0
    score += this.advancedScore.breakdown.economicImpact > 50 ? 3 : 0
    score += this.advancedScore.complianceStatus.nationalPolicies ? 2 : 0

    return {
      score: Math.min(score, 25),
      maxScore: 25,
      criteria,
      evidence
    }
  }

  /**
   * Assess Technical Excellence criteria (20 poly money)
   */
  private assessTechnicalExcellence() {
    const criteria = [
      "Modern tech stack (Next.js, TypeScript, Tailwind)",
      "AI/ML integration with TensorFlow.js",
      "Responsive design and mobile optimization",
      "Performance optimization and code splitting",
      "Type safety with TypeScript",
      "Component-based architecture",
      "State management with Zustand",
      "Real-time data processing"
    ]

    const evidence = [
      "Next.js 14 with App Router",
      "TensorFlow.js COCO-SSD model",
      "Mobile-first responsive design",
      "Dynamic imports and lazy loading",
      "Full TypeScript implementation",
      "Reusable React components",
      "Zustand store for state management",
      "Real-time camera detection processing"
    ]

    let score = 15 // Base score for modern tech stack
    score += this.advancedScore.breakdown.dataAccuracy > 50 ? 3 : 0
    score += this.advancedScore.multipliers.regionalFactor > 1 ? 2 : 0

    return {
      score: Math.min(score, 20),
      maxScore: 20,
      criteria,
      evidence
    }
  }

  /**
   * Assess Sustainability criteria (15 poly money)
   */
  private assessSustainability() {
    const criteria = [
      "Environmental sustainability focus",
      "Circular economy principles",
      "Waste reduction and recycling promotion",
      "Sustainable development goals alignment",
      "Long-term environmental impact",
      "Community sustainability engagement",
      "Resource efficiency optimization",
      "Carbon footprint reduction"
    ]

    const evidence = [
      "Plastic waste reduction focus",
      "Reusable bottle promotion (19L bottles)",
      "Recycling rate improvement tracking",
      "SDG 12, 13, 14, 15 alignment",
      "Long-term CO₂ savings tracking",
      "Community cleanup initiatives",
      "Efficient waste management",
      "Carbon footprint calculation"
    ]

    let score = 10 // Base score for sustainability focus
    score += this.advancedScore.complianceStatus.nationalPolicies ? 3 : 0
    score += this.advancedScore.breakdown.environmentalImpact > 200 ? 2 : 0

    return {
      score: Math.min(score, 15),
      maxScore: 15,
      criteria,
      evidence
    }
  }

  /**
   * Assess Scalability criteria (15 poly money)
   */
  private assessScalability() {
    const criteria = [
      "Multi-region support (Cabo Verde, São Tomé)",
      "Scalable architecture design",
      "Data-driven decision making",
      "Extensible policy framework",
      "International convention support",
      "Modular component design",
      "API-ready architecture",
      "Cloud deployment ready"
    ]

    const evidence = [
      "Multi-country data integration",
      "Modular React components",
      "Real-time data analytics",
      "Flexible policy compliance system",
      "International convention tracking",
      "Reusable component library",
      "RESTful API structure",
      "Vercel deployment configuration"
    ]

    let score = 10 // Base score for multi-region support
    score += this.region !== 'default' ? 3 : 0
    score += this.advancedScore.complianceStatus.internationalConventions ? 2 : 0

    return {
      score: Math.min(score, 15),
      maxScore: 15,
      criteria,
      evidence
    }
  }

  /**
   * Calculate grade based on total score
   */
  private calculateGrade(totalScore: number, maxScore: number): string {
    const percentage = (totalScore / maxScore) * 100
    
    if (percentage >= 95) return 'A+'
    if (percentage >= 90) return 'A'
    if (percentage >= 85) return 'A-'
    if (percentage >= 80) return 'B+'
    if (percentage >= 75) return 'B'
    if (percentage >= 70) return 'B-'
    if (percentage >= 65) return 'C+'
    if (percentage >= 60) return 'C'
    return 'D'
  }

  /**
   * Generate recommendations for improvement
   */
  private generateRecommendations(criteria: JudgingCriteria): string[] {
    const recommendations: string[] = []

    if (criteria.innovation.score < criteria.innovation.maxScore * 0.9) {
      recommendations.push("Enhance AI detection accuracy with additional model training")
    }

    if (criteria.impact.score < criteria.impact.maxScore * 0.9) {
      recommendations.push("Implement more detailed impact metrics and reporting")
    }

    if (criteria.technicalExcellence.score < criteria.technicalExcellence.maxScore * 0.9) {
      recommendations.push("Add more comprehensive testing and error handling")
    }

    if (criteria.sustainability.score < criteria.sustainability.maxScore * 0.9) {
      recommendations.push("Integrate more sustainability metrics and SDG tracking")
    }

    if (criteria.scalability.score < criteria.scalability.maxScore * 0.9) {
      recommendations.push("Add support for additional countries and regions")
    }

    return recommendations
  }

  /**
   * Generate actionable items for improvement
   */
  private generateActionItems(criteria: JudgingCriteria): string[] {
    const actionItems: string[] = []

    // Innovation actions
    actionItems.push("Implement advanced AI model fine-tuning for better accuracy")
    actionItems.push("Add machine learning model retraining capabilities")
    actionItems.push("Create advanced analytics dashboard with predictive insights")

    // Impact actions
    actionItems.push("Integrate real-time environmental data APIs")
    actionItems.push("Add social impact measurement capabilities")
    actionItems.push("Implement community impact tracking")

    // Technical actions
    actionItems.push("Add comprehensive unit and integration tests")
    actionItems.push("Implement advanced error handling and logging")
    actionItems.push("Add performance monitoring and optimization")

    // Sustainability actions
    actionItems.push("Add carbon footprint tracking for users")
    actionItems.push("Implement sustainability goal setting and tracking")
    actionItems.push("Add environmental education content")

    // Scalability actions
    actionItems.push("Add support for additional African countries")
    actionItems.push("Implement multi-language support")
    actionItems.push("Create API for third-party integrations")

    return actionItems
  }

  /**
   * Generate evidence portfolio for judging
   */
  private generateEvidencePortfolio() {
    return {
      screenshots: [
        "AI detection in action with bounding boxes",
        "Dashboard with real-time statistics",
        "Insights page with comprehensive data",
        "Mobile-responsive design on different devices",
        "Achievement system and gamification",
        "Policy compliance tracking interface"
      ],
      demos: [
        "Live camera detection demonstration",
        "Dashboard navigation and features",
        "Mobile app functionality",
        "Offline capability demonstration",
        "Data visualization and charts",
        "Achievement system showcase"
      ],
      documentation: [
        "Technical architecture documentation",
        "API documentation and endpoints",
        "Data integration methodology",
        "Policy compliance framework",
        "Scoring algorithm explanation",
        "Deployment and scaling guide"
      ],
      metrics: [
        `Total Score: ${this.advancedScore.totalScore}`,
        `Environmental Impact: ${this.advancedScore.breakdown.environmentalImpact}`,
        `Policy Compliance: ${this.advancedScore.breakdown.policyCompliance}`,
        `Economic Impact: ${this.advancedScore.breakdown.economicImpact}`,
        `Innovation Bonus: ${this.advancedScore.breakdown.innovationBonus}`,
        `Data Accuracy: ${this.advancedScore.breakdown.dataAccuracy}`
      ]
    }
  }
}

// Export utility functions
export function generateJudgingReport(advancedScore: AdvancedScore, region: string): ComplianceReport {
  const compliance = new JudgingCriteriaCompliance(advancedScore, region)
  return compliance.generateComplianceReport()
}

export function getJudgingScore(advancedScore: AdvancedScore, region: string): JudgingCriteria {
  const compliance = new JudgingCriteriaCompliance(advancedScore, region)
  // Call the (now) public assessment method directly
  return compliance.assessJudgingCriteria()
}

// Add this near the bottom (small helper to centralize app URL)
export const recommendedMetadataBase = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
