'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Bot, 
  MapPin, 
  Leaf, 
  Recycle, 
  Waves,
  Info,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  TrendingUp,
  Globe,
  Users,
  Zap,
  BookOpen,
  Lightbulb,
  Target,
  BarChart3,
  Clock,
  Star,
  Heart,
  Shield,
  TreePine,
  Fish,
  Mountain,
  Sun,
  Moon
} from 'lucide-react'
import caboVerdeData from '@/data/cabo_verde.json'
import saoTomeData from '@/data/sao_tome.json'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  suggestions?: string[]
  type?: 'text' | 'data' | 'action'
  data?: any
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  color: string
  action: () => void
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to EcoBot! I'm your AI-powered assistant for both environmental information about Cabo Verde and São Tomé, and guidance on using the Uber Plastic platform. I can help you learn about plastic waste management, environmental initiatives, sustainability efforts, platform features, poly money rewards, and AI scanning. What would you like to explore today?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "How do I use the Uber Plastic platform?",
        "What is poly money and how do I earn it?",
        "How does the AI bottle scanning work?",
        "Tell me about Cabo Verde's environmental challenges",
        "What initiatives exist in São Tomé?",
        "How can I help with ocean conservation?",
        "What are the recycling rates in both countries?",
        "Show me environmental statistics"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickFacts, setShowQuickFacts] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'actions'>('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const caboVerde = {
    name: "Cabo Verde",
    population: caboVerdeData.population,
    area: caboVerdeData.area,
    islands: caboVerdeData.islands,
    plasticWaste: caboVerdeData.plasticWaste,
    initiatives: caboVerdeData.initiatives,
    challenges: caboVerdeData.challenges,
    opportunities: caboVerdeData.opportunities
  }

  const saoTome = {
    name: "São Tomé and Príncipe",
    population: saoTomeData.population,
    area: saoTomeData.area,
    islands: saoTomeData.islands,
    plasticWaste: saoTomeData.plasticWaste,
    initiatives: saoTomeData.initiatives,
    challenges: saoTomeData.challenges,
    opportunities: saoTomeData.opportunities
  }

  const quickActions: QuickAction[] = [
    {
      id: 'platform',
      title: 'Platform Guide',
      description: 'Learn how to use Uber Plastic',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      action: () => handleSendMessage('How do I use the Uber Plastic platform?')
    },
    {
      id: 'poly-money',
      title: 'Poly Money',
      description: 'Earn and redeem rewards',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      action: () => handleSendMessage('What is poly money and how do I earn it?')
    },
    {
      id: 'scanning',
      title: 'AI Scanning',
      description: 'Learn about bottle detection',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      action: () => handleSendMessage('How does the AI bottle scanning work?')
    },
    {
      id: 'stats',
      title: 'Environmental Stats',
      description: 'Get real-time environmental data',
      icon: BarChart3,
      color: 'from-cyan-500 to-cyan-600',
      action: () => handleSendMessage('Show me environmental statistics for both countries')
    },
    {
      id: 'solutions',
      title: 'Solutions & Initiatives',
      description: 'Discover active programs',
      icon: Lightbulb,
      color: 'from-purple-500 to-purple-600',
      action: () => handleSendMessage('What environmental initiatives are currently active?')
    },
    {
      id: 'help',
      title: 'How to Help',
      description: 'Take action today',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      action: () => handleSendMessage('How can I help with environmental conservation?')
    }
  ]

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Enhanced Statistics with Insights
    if (message.includes('statistic') || message.includes('data') || message.includes('number') || message.includes('insight')) {
      const totalWaste = caboVerde.plasticWaste.annualGeneration + saoTome.plasticWaste.annualGeneration
      const totalOceanLeakage = caboVerde.plasticWaste.oceanLeakage + saoTome.plasticWaste.oceanLeakage
      const avgRecyclingRate = (caboVerde.plasticWaste.recyclingRate + saoTome.plasticWaste.recyclingRate) / 2
      
      return `**📊 Environmental Data Insights:**

**🌍 Regional Overview:**
• Total population: ${(caboVerde.population + saoTome.population).toLocaleString()} people
• Combined plastic waste: ${totalWaste.toLocaleString()} tons/year
• Average recycling rate: ${avgRecyclingRate.toFixed(1)}%
• Total ocean leakage: ${totalOceanLeakage.toLocaleString()} tons/year

**🇨🇻 Cabo Verde Performance:**
• Population: ${caboVerde.population.toLocaleString()} across ${caboVerde.islands.length} islands
• Plastic waste: ${caboVerde.plasticWaste.annualGeneration.toLocaleString()} tons/year
• Recycling rate: ${caboVerde.plasticWaste.recyclingRate}% (${caboVerde.plasticWaste.recyclingRate > saoTome.plasticWaste.recyclingRate ? 'Better than regional average' : 'Below regional average'})
• Ocean leakage: ${caboVerde.plasticWaste.oceanLeakage.toLocaleString()} tons/year
• Active initiatives: ${caboVerde.initiatives.length} programs

**🇸🇹 São Tomé & Príncipe Performance:**
• Population: ${saoTome.population.toLocaleString()} on ${saoTome.islands.length} islands
• Plastic waste: ${saoTome.plasticWaste.annualGeneration.toLocaleString()} tons/year
• Recycling rate: ${saoTome.plasticWaste.recyclingRate}% (${saoTome.plasticWaste.recyclingRate > caboVerde.plasticWaste.recyclingRate ? 'Better than regional average' : 'Below regional average'})
• Ocean leakage: ${saoTome.plasticWaste.oceanLeakage.toLocaleString()} tons/year
• Environmental programs: ${saoTome.initiatives.length} initiatives

**💡 Key Insights:**
• Both countries face significant plastic waste challenges
• Recycling infrastructure needs improvement across the region
• Community engagement is strong with ${caboVerde.initiatives.length + saoTome.initiatives.length} active programs
• Ocean protection is a priority with beach cleanup initiatives

**🎯 Impact Potential:**
If both countries improved recycling rates to 50%, they could prevent ${Math.round(totalOceanLeakage * 0.5)} tons of plastic from entering the ocean annually!`
    }
    
    // Cabo Verde specific responses
    if (message.includes('cabo verde') || message.includes('cape verde')) {
      if (message.includes('plastic') || message.includes('waste')) {
        return `**Cabo Verde Plastic Waste Management:**

Cabo Verde generates ${caboVerde.plasticWaste.annualGeneration.toLocaleString()} tons of plastic waste annually, with only ${caboVerde.plasticWaste.recyclingRate}% being recycled. The country has implemented strong legislation including the Single-Use Plastic Law (2023) and eco-taxes to combat plastic pollution. 

Key initiatives include:
• "Plastic-Free Islands" program (eliminate single-use plastics by 2030)
• Beach cleanup campaigns
• Eco-tourism certification programs
• Community recycling initiatives

The government is committed to creating a circular economy and reducing ocean pollution!`
      }
      if (message.includes('population') || message.includes('people')) {
        return `**Cabo Verde Overview:**

Cabo Verde has a population of ${caboVerde.population.toLocaleString()} people across ${caboVerde.islands.length} islands, with a total area of ${caboVerde.area.toLocaleString()} km². 

Main islands include: ${caboVerde.islands.slice(0, 5).join(', ')} and others.

The country is known for its strong environmental policies and community-driven sustainability efforts!`
      }
      if (message.includes('initiative') || message.includes('program')) {
        return `**Cabo Verde Environmental Initiatives:**

Active programs include:
${caboVerde.initiatives.map(init => `• **${init.name}** - ${init.description}`).join('\n')}

These programs focus on eliminating single-use plastics, ocean cleanup, eco-tourism certification, and building sustainable communities!`
      }
      if (message.includes('challenge') || message.includes('problem')) {
        return `**Cabo Verde Environmental Challenges:**

Current challenges include:
${caboVerde.challenges.map(challenge => `• ${challenge}`).join('\n')}

Despite these challenges, the country has strong community engagement, government commitment to sustainability, and innovative solutions being implemented!`
      }
    }

    // São Tomé specific responses
    if (message.includes('são tomé') || message.includes('sao tome') || message.includes('principe')) {
      if (message.includes('plastic') || message.includes('waste')) {
        return `São Tomé and Príncipe generates ${saoTome.plasticWaste.annualGeneration.toLocaleString()} tons of plastic waste annually, with a recycling rate of only ${saoTome.plasticWaste.recyclingRate}%. The country has implemented plastic bag regulations and is working on comprehensive waste management plans.`
      }
      if (message.includes('population') || message.includes('people')) {
        return `São Tomé and Príncipe has a population of ${saoTome.population.toLocaleString()} people across ${saoTome.islands.length} main islands (${saoTome.islands.join(' and ')}), with an area of ${saoTome.area.toLocaleString()} km².`
      }
      if (message.includes('initiative') || message.includes('program')) {
        return `São Tomé has several environmental initiatives: ${saoTome.initiatives.map(init => `"${init.name}" - ${init.description}`).join(', ')}. The Príncipe Biosphere Reserve is a UNESCO-recognized sustainable development program.`
      }
      if (message.includes('challenge') || message.includes('problem')) {
        return `São Tomé faces challenges including: ${saoTome.challenges.join(', ')}. However, the country has strong government commitment and active community participation in conservation efforts.`
      }
    }

    // Enhanced Ocean/Marine insights
    if (message.includes('ocean') || message.includes('marine') || message.includes('sea')) {
      const totalOceanLeakage = caboVerde.plasticWaste.oceanLeakage + saoTome.plasticWaste.oceanLeakage
      const leakagePerCapita = totalOceanLeakage / (caboVerde.population + saoTome.population)
      
      return `**🌊 Ocean Pollution Data Analysis:**

**Current Situation:**
• Cabo Verde: ${caboVerde.plasticWaste.oceanLeakage.toLocaleString()} tons/year ocean leakage
• São Tomé: ${saoTome.plasticWaste.oceanLeakage.toLocaleString()} tons/year ocean leakage
• **Total regional leakage: ${totalOceanLeakage.toLocaleString()} tons/year**
• Per capita leakage: ${leakagePerCapita.toFixed(3)} kg/person/year

**Impact Assessment:**
• This is equivalent to ${Math.round(totalOceanLeakage / 1000)} metric tons of plastic entering the ocean
• At current rates, this could affect marine life across the Atlantic region
• Both countries have active beach cleanup programs and marine conservation initiatives

**Positive Actions:**
• Beach cleanup campaigns are active in both countries
• Marine protected areas are being established
• Community awareness programs are reducing single-use plastics
• Eco-tourism initiatives promote ocean conservation

**Recommendation:** Focus on reducing single-use plastics and improving waste collection systems to prevent ocean leakage.`
    }

    // Enhanced Recycling insights
    if (message.includes('recycling') || message.includes('recycle')) {
      const totalWaste = caboVerde.plasticWaste.annualGeneration + saoTome.plasticWaste.annualGeneration
      const totalRecycled = (caboVerde.plasticWaste.annualGeneration * caboVerde.plasticWaste.recyclingRate / 100) + 
                           (saoTome.plasticWaste.annualGeneration * saoTome.plasticWaste.recyclingRate / 100)
      const potentialRecycled = totalWaste * 0.5 // 50% target
      
      return `**♻️ Recycling Performance Analysis:**

**Current Recycling Rates:**
• Cabo Verde: ${caboVerde.plasticWaste.recyclingRate}% (${Math.round(caboVerde.plasticWaste.annualGeneration * caboVerde.plasticWaste.recyclingRate / 100)} tons recycled)
• São Tomé: ${saoTome.plasticWaste.recyclingRate}% (${Math.round(saoTome.plasticWaste.annualGeneration * saoTome.plasticWaste.recyclingRate / 100)} tons recycled)
• **Total recycled: ${Math.round(totalRecycled)} tons/year**

**Performance Gap:**
• Total plastic waste: ${totalWaste.toLocaleString()} tons/year
• Currently recycled: ${Math.round(totalRecycled)} tons (${((totalRecycled/totalWaste)*100).toFixed(1)}%)
• **Unrecycled waste: ${Math.round(totalWaste - totalRecycled)} tons/year**

**Improvement Potential:**
• If both countries reached 50% recycling rate: ${Math.round(potentialRecycled)} tons/year
• Additional recycling capacity needed: ${Math.round(potentialRecycled - totalRecycled)} tons/year
• This would prevent ${Math.round((potentialRecycled - totalRecycled) * 0.3)} tons from entering the ocean

**Recommendations:**
• Invest in recycling infrastructure
• Implement community collection programs
• Educate citizens about proper waste separation
• Create economic incentives for recycling`
    }

    // Enhanced Help/Action insights
    if (message.includes('help') || message.includes('how can i') || message.includes('action')) {
      const totalPopulation = caboVerde.population + saoTome.population
      const potentialImpact = totalPopulation * 0.1 // 10% participation
      
      return `**🤝 How You Can Make a Real Impact:**

**Individual Actions with Measurable Results:**
• **Reduce single-use plastics**: If ${Math.round(potentialImpact)} people reduced plastic use by 50%, we could prevent ${Math.round(potentialImpact * 0.5 * 0.1)} tons of waste annually
• **Participate in beach cleanups**: Join ${caboVerde.initiatives.length + saoTome.initiatives.length} active programs across both countries
• **Support local initiatives**: Contribute to community recycling programs
• **Educate others**: Share knowledge about plastic pollution impacts

**Community Impact Potential:**
• Total population in region: ${totalPopulation.toLocaleString()} people
• If 10% actively participated: ${Math.round(potentialImpact)} engaged citizens
• Potential waste reduction: ${Math.round(potentialImpact * 0.05)} tons/year
• Ocean pollution prevention: ${Math.round(potentialImpact * 0.02)} tons/year

**Available Programs:**
• Cabo Verde: ${caboVerde.initiatives.length} active environmental initiatives
• São Tomé: ${saoTome.initiatives.length} conservation programs
• Both countries have beach cleanup campaigns and eco-tourism opportunities

**Start Today:** Choose one action and commit to it consistently. Small individual actions create massive collective impact!`
    }

    // Enhanced Tourism insights
    if (message.includes('tourism') || message.includes('travel') || message.includes('eco-tourism')) {
      const totalArea = caboVerde.area + saoTome.area
      const populationDensity = (caboVerde.population + saoTome.population) / totalArea
      
      return `**🏝️ Eco-Tourism Data & Opportunities:**

**Regional Tourism Profile:**
• Total land area: ${totalArea.toLocaleString()} km² across ${caboVerde.islands.length + saoTome.islands.length} islands
• Population density: ${populationDensity.toFixed(1)} people/km²
• Both countries offer pristine natural environments for sustainable tourism

**Cabo Verde Eco-Tourism:**
• Eco-tourism certification programs for hotels and restaurants
• ${caboVerde.initiatives.length} environmental initiatives supporting sustainable tourism
• Focus on "Plastic-Free Islands" program for tourism industry
• Community-based tourism development

**São Tomé Eco-Tourism:**
• UNESCO-recognized Príncipe Biosphere Reserve
• ${saoTome.initiatives.length} conservation programs
• Sustainable development initiatives
• Biodiversity protection through tourism

**Tourism Impact Data:**
• Tourism contributes significantly to both economies
• Eco-tourism creates jobs while protecting environment
• Sustainable practices reduce plastic waste in tourism sector
• Community engagement through responsible tourism

**Recommendations for Travelers:**
• Choose eco-certified accommodations
• Participate in beach cleanup activities
• Support local environmental initiatives
• Minimize single-use plastics during travel
• Learn about local conservation efforts`
    }

    // Enhanced Government/Policy insights
    if (message.includes('government') || message.includes('policy') || message.includes('law')) {
      const totalInitiatives = caboVerde.initiatives.length + saoTome.initiatives.length
      
      return `**🏛️ Government Policy & Environmental Governance:**

**Policy Framework:**
• Cabo Verde: Single-Use Plastic Law (2023), eco-taxes, and comprehensive waste management regulations
• São Tomé: Plastic bag regulations, waste management plans, and environmental protection laws
• Both countries are signatories to international environmental conventions

**Implementation Data:**
• Total active environmental initiatives: ${totalInitiatives} programs
• Cabo Verde initiatives: ${caboVerde.initiatives.length} programs
• São Tomé initiatives: ${saoTome.initiatives.length} programs
• Government commitment: Strong policy framework with enforcement mechanisms

**Policy Effectiveness:**
• Legal framework supports environmental protection
• Community engagement through policy implementation
• International cooperation on environmental issues
• Economic incentives for sustainable practices

**Future Policy Directions:**
• Strengthening waste management infrastructure
• Expanding recycling programs
• Enhancing marine protection measures
• Promoting circular economy principles`
    }

    // New: Economic Impact insights
    if (message.includes('economic') || message.includes('cost') || message.includes('investment') || message.includes('money')) {
      const totalWaste = caboVerde.plasticWaste.annualGeneration + saoTome.plasticWaste.annualGeneration
      const potentialSavings = totalWaste * 0.3 * 100 // STN 100 per ton saved
      
      return `**💰 Economic Impact Analysis:**

**Current Economic Burden:**
• Total plastic waste: ${totalWaste.toLocaleString()} tons/year
• Estimated cleanup costs: STN ${Math.round(totalWaste * 50)}/year
• Tourism impact from pollution: Potential revenue loss
• Health costs from plastic pollution: Significant long-term burden

**Investment Opportunities:**
• Recycling infrastructure: High ROI potential
• Waste-to-energy projects: Economic and environmental benefits
• Eco-tourism development: Job creation and revenue generation
• Circular economy initiatives: Long-term economic sustainability

**Potential Economic Benefits:**
• If 30% waste reduction achieved: STN ${Math.round(potentialSavings)}/year savings
• Job creation in recycling sector: ${Math.round((caboVerde.population + saoTome.population) * 0.001)} potential jobs
• Tourism revenue protection: Maintains economic stability
• Health cost savings: Reduced pollution-related healthcare costs

**Recommendations:**
• Invest in waste management infrastructure
• Create economic incentives for recycling
• Develop green economy sectors
• Implement circular economy principles`
    }

    // New: Climate Change insights
    if (message.includes('climate') || message.includes('carbon') || message.includes('emission') || message.includes('global warming')) {
      const totalWaste = caboVerde.plasticWaste.annualGeneration + saoTome.plasticWaste.annualGeneration
      const co2Equivalent = totalWaste * 2.5 // Rough estimate: 2.5 tons CO2 per ton plastic
      
      return `**🌡️ Climate Change & Carbon Impact:**

**Carbon Footprint Analysis:**
• Total plastic waste: ${totalWaste.toLocaleString()} tons/year
• Estimated CO2 equivalent: ${Math.round(co2Equivalent)} tons/year
• Per capita carbon impact: ${(co2Equivalent / (caboVerde.population + saoTome.population)).toFixed(2)} tons/person/year

**Climate Impact Factors:**
• Plastic production emissions: Manufacturing and transportation
• Waste disposal emissions: Landfill and incineration
• Ocean pollution impact: Marine ecosystem disruption
• Tourism carbon footprint: Travel and accommodation

**Mitigation Strategies:**
• Reduce single-use plastics: Immediate carbon reduction
• Improve recycling rates: Lower production emissions
• Waste-to-energy projects: Alternative to fossil fuels
• Sustainable tourism practices: Lower carbon footprint

**Climate Goals Alignment:**
• Both countries committed to international climate agreements
• Local climate action through waste reduction
• Community resilience building
• Sustainable development pathways

**Impact Potential:**
• 50% waste reduction could prevent ${Math.round(co2Equivalent * 0.5)} tons CO2/year
• Equivalent to taking ${Math.round(co2Equivalent * 0.5 / 4.6)} cars off the road annually`
    }

    // Platform usage questions
    if (message.includes('platform') || message.includes('how to use') || message.includes('how does this work') || message.includes('uber plastic')) {
      return `**How to Use the Uber Plastic Platform:**

**Getting Started:**
1. **Registration**: Create an account and choose your role (Individual, Institution, Collector, or Depot)
2. **Profile Setup**: Complete your profile with relevant information
3. **Dashboard Access**: Navigate to your role-specific dashboard

**For Individuals:**
• **Log Plastic**: Use the camera to scan and log plastic bottles
• **Earn Poly Money**: Get rewarded for each bottle you collect
• **Track Progress**: Monitor your environmental impact and earnings
• **Redeem Rewards**: Use your poly money for various rewards
• **Leaderboard**: Compete with other users in your area

**For Institutions:**
• **Team Management**: Add and manage team members
• **Analytics**: View detailed reports on your organization's impact
• **Goal Setting**: Set and track environmental targets
• **Resource Planning**: Plan and coordinate collection activities

**For Collectors:**
• **Route Planning**: Optimize collection routes for efficiency
• **Performance Tracking**: Monitor collection metrics and performance
• **Schedule Management**: Plan and manage collection schedules
• **Equipment Tracking**: Monitor and maintain collection equipment

**For Depots:**
• **Processing Management**: Track plastic processing activities
• **Quality Control**: Ensure proper sorting and processing
• **Inventory Management**: Monitor processed materials
• **Analytics**: View processing efficiency and output data

**Key Features:**
• **AI-Powered Scanning**: Advanced bottle detection and classification
• **Real-time Tracking**: Live updates on collection activities
• **Environmental Impact**: Detailed metrics on CO2 reduction and waste diverted
• **Community Features**: Connect with other users and share achievements
• **Mobile App**: Access all features on your smartphone

**Support:**
• **Help Center**: Comprehensive guides and tutorials
• **Live Chat**: Get instant help from our support team
• **Video Tutorials**: Step-by-step video guides for all features

Need help with a specific feature? Just ask!`
    }

    if (message.includes('poly money') || message.includes('rewards') || message.includes('earn')) {
      return `**Poly Money & Rewards System:**

**What is Poly Money?**
Poly Money is our digital currency that rewards users for environmental actions. It's earned through plastic collection and other eco-friendly activities.

**How to Earn Poly Money:**
• **Bottle Collection**: Earn poly money for each plastic bottle you collect and log
• **Quality Bonus**: Higher rewards for properly sorted and clean bottles
• **Streak Bonuses**: Extra poly money for consistent daily collection
• **Community Challenges**: Participate in group activities for bonus rewards
• **Referral Program**: Earn poly money for inviting friends to join

**Reward Categories:**
• **Gift Cards**: Exchange poly money for popular retailer gift cards
• **Eco Products**: Sustainable products and eco-friendly items
• **Local Services**: Discounts on local services and experiences
• **Charitable Donations**: Donate poly money to environmental causes
• **Premium Features**: Unlock advanced platform features

**Redemption Process:**
1. **Browse Rewards**: Check available rewards in the rewards section
2. **Select Item**: Choose the reward you want to redeem
3. **Confirm Purchase**: Use your poly money balance to complete the transaction
4. **Receive Reward**: Get your reward delivered or access digital items

**Poly Money Balance:**
• **Real-time Updates**: Your balance updates immediately after each collection
• **Transaction History**: View all your earnings and redemptions
• **Expiration**: Poly money doesn't expire, so you can save up for bigger rewards

**Tips for Maximizing Earnings:**
• **Daily Collection**: Maintain a consistent collection routine
• **Quality Focus**: Ensure bottles are clean and properly sorted
• **Community Participation**: Join group challenges and events
• **Refer Friends**: Invite others to increase your earning potential

Start collecting today and turn your environmental impact into valuable rewards!`
    }

    if (message.includes('scan') || message.includes('camera') || message.includes('detect') || message.includes('ai')) {
      return `**AI-Powered Bottle Scanning:**

**How the Scanner Works:**
• **Camera Access**: Grant camera permissions to start scanning
• **AI Detection**: Advanced machine learning identifies plastic bottles
• **Automatic Classification**: Bottles are automatically sorted by type and condition
• **Quality Assessment**: The system evaluates bottle condition and cleanliness
• **Instant Results**: Get immediate feedback on your collection

**Scanning Process:**
1. **Open Scanner**: Tap the "Take Photo" button in the Log Plastic section
2. **Position Bottle**: Place the bottle in the camera frame
3. **Wait for Detection**: The AI will automatically detect and analyze the bottle
4. **Review Results**: Check the detection results and bottle classification
5. **Confirm Collection**: Accept the results to log your collection
6. **Earn Poly Money**: Receive your poly money reward instantly

**AI Features:**
• **Bottle Recognition**: Identifies various types of plastic bottles
• **Condition Analysis**: Assesses bottle quality and cleanliness
• **Material Detection**: Determines plastic type and recyclability
• **Volume Calculation**: Estimates bottle size and weight
• **Quality Scoring**: Provides quality ratings for better rewards

**Tips for Better Scanning:**
• **Good Lighting**: Ensure adequate lighting for clear photos
• **Clean Bottles**: Rinse bottles before scanning for better detection
• **Clear Background**: Use a plain background for better AI recognition
• **Stable Position**: Hold the camera steady for accurate detection
• **Multiple Angles**: Try different angles if initial detection fails

**Troubleshooting:**
• **Detection Issues**: Try repositioning the bottle or improving lighting
• **Camera Problems**: Check camera permissions and restart the app
• **Network Issues**: Ensure stable internet connection for AI processing
• **Quality Concerns**: Contact support if you disagree with quality ratings

The AI scanner makes plastic collection easy and rewarding!`
    }

    // Default response
    return `I can help you learn about environmental issues in Cabo Verde and São Tomé, or guide you through using the Uber Plastic platform. Try asking about: plastic waste management, environmental initiatives, ocean conservation, recycling programs, government policies, how to use the platform, poly money rewards, or AI scanning features. What specific topic interests you?`
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          "Tell me more about recycling programs",
          "What are the main environmental challenges?",
          "How can tourists help?",
          "What government policies exist?"
        ]
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const quickFacts = [
    {
      icon: MapPin,
      title: "Cabo Verde",
      facts: [
        `${caboVerde.population.toLocaleString()} people across ${caboVerde.islands.length} islands`,
        `${caboVerde.plasticWaste.annualGeneration.toLocaleString()} tons plastic waste/year`,
        `${caboVerde.plasticWaste.recyclingRate}% recycling rate`,
        `${caboVerde.initiatives.length} active environmental initiatives`
      ]
    },
    {
      icon: Leaf,
      title: "São Tomé and Príncipe",
      facts: [
        `${saoTome.population.toLocaleString()} people on ${saoTome.islands.length} islands`,
        `${saoTome.plasticWaste.annualGeneration.toLocaleString()} tons plastic waste/year`,
        `${saoTome.plasticWaste.recyclingRate}% recycling rate`,
        `${saoTome.initiatives.length} environmental programs`
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">EcoBot</h1>
              <p className="text-lg text-gray-300 mt-1">AI Environmental Assistant</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your intelligent guide to environmental information about Cabo Verde and São Tomé. 
            Learn about plastic waste management, conservation efforts, and how you can make a real difference.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-2 border border-gray-600/30">
            <div className="flex space-x-2">
              {[
                { id: 'chat', label: 'Chat', icon: MessageCircle },
                { id: 'insights', label: 'Insights', icon: BarChart3 },
                { id: 'actions', label: 'Quick Actions', icon: Zap }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-600/30 h-[600px] flex flex-col">
              {/* Chat Header */}
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">EcoBot Assistant</h3>
                    <p className="text-sm opacity-90">Environmental Guide</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                        <span className="text-sm">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`p-2 rounded-full ${message.isUser ? 'bg-green-500' : 'bg-gray-600'}`}>
                            {message.isUser ? <MessageCircle className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                      </div>
                          <div className={`rounded-2xl px-4 py-3 ${
                        message.isUser 
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                              : 'bg-gray-700 text-white border border-gray-600'
                      }`}>
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.suggestions && (
                              <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                                  <motion.button
                                key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                onClick={() => handleSuggestionClick(suggestion)}
                                    className="group block w-full text-left text-xs p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20"
                              >
                                    <div className="flex items-center space-x-2">
                                      <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                                      <span className="group-hover:text-green-100 transition-colors duration-200">
                                {suggestion}
                                      </span>
                                    </div>
                                  </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                          <div className="p-2 rounded-full bg-gray-600">
                            <Bot className="h-4 w-4 text-white" />
                      </div>
                          <div className="bg-gray-700 rounded-2xl px-4 py-3 border border-gray-600">
                        <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                    <div ref={messagesEndRef} />
              </div>

              {/* Input */}
                  <div className="p-4 border-t border-gray-600/30">
                    <div className="flex space-x-3">
                  <input
                        ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask about environmental issues..."
                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all duration-200 shadow-lg"
                  >
                        <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Facts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Facts Toggle */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-600/30 p-6">
              <button
                onClick={() => setShowQuickFacts(!showQuickFacts)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center space-x-3">
                      <Info className="h-5 w-5 text-green-400" />
                      <h3 className="font-semibold text-white">Quick Facts</h3>
                </div>
                    {showQuickFacts ? <ChevronUp className="h-5 w-5 text-gray-300" /> : <ChevronDown className="h-5 w-5 text-gray-300" />}
              </button>
              
              {showQuickFacts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-4"
                >
                  {quickFacts.map((country, index) => {
                    const Icon = country.icon
                    return (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Icon className="h-5 w-5 text-green-600" />
                          <h4 className="font-medium text-gray-900 dark:text-white">{country.title}</h4>
                        </div>
                        <ul className="space-y-2">
                          {country.facts.map((fact, factIndex) => (
                            <li key={factIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </div>

            {/* Suggested Topics */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-600/30 p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <Leaf className="h-5 w-5 text-green-400 mr-2" />
                Suggested Topics
              </h3>
                  <div className="space-y-3">
                    {[
                      { topic: "Environmental data insights", icon: BarChart3, color: "from-cyan-500 to-cyan-600" },
                      { topic: "Ocean pollution analysis", icon: Waves, color: "from-teal-500 to-teal-600" },
                      { topic: "Recycling performance", icon: Recycle, color: "from-pink-500 to-pink-600" },
                      { topic: "Economic impact data", icon: TrendingUp, color: "from-green-500 to-green-600" },
                      { topic: "Climate change impact", icon: Sun, color: "from-yellow-500 to-yellow-600" },
                      { topic: "How to make an impact", icon: Target, color: "from-red-500 to-red-600" },
                      { topic: "Eco-tourism opportunities", icon: Globe, color: "from-blue-500 to-blue-600" },
                      { topic: "Government policies", icon: Shield, color: "from-orange-500 to-orange-600" },
                      { topic: "How to use the platform", icon: BookOpen, color: "from-purple-500 to-purple-600" },
                      { topic: "Poly money and rewards", icon: Star, color: "from-indigo-500 to-indigo-600" },
                      { topic: "AI bottle scanning", icon: Zap, color: "from-emerald-500 to-emerald-600" }
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.button
                    key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSuggestionClick(item.topic)}
                          className="group w-full text-left p-3 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 hover:border-green-500/50 transition-all duration-300 flex items-center space-x-3"
                        >
                          <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 font-medium">
                            {item.topic}
                          </span>
                        </motion.button>
                      )
                    })}
              </div>
            </div>

            {/* Environmental Icons */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Environmental Focus</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Recycle className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Recycling</p>
                </div>
                <div className="text-center">
                  <Waves className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Ocean Health</p>
                </div>
                <div className="text-center">
                  <Leaf className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Sustainability</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Island Nations</p>
                </div>
              </div>
            </div>
          </motion.div>
            </motion.div>
          )}

          {/* Quick Actions Tab */}
          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={action.action}
                      className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-green-500/50 transition-all duration-300 group text-left"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-gray-400 text-sm">{action.description}</p>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Environmental Stats */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 text-green-400 mr-3" />
                    Environmental Statistics
                  </h3>
                  <div className="space-y-4">
                    {quickFacts.map((country, index) => {
                      const Icon = country.icon
                      return (
                        <div key={index} className="bg-gray-700/50 rounded-xl p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon className="h-5 w-5 text-green-400" />
                            <h4 className="font-medium text-white">{country.title}</h4>
                          </div>
                          <ul className="space-y-2">
                            {country.facts.map((fact, factIndex) => (
                              <li key={factIndex} className="text-sm text-gray-300 flex items-start">
                                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {fact}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Environmental Focus Areas */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Target className="w-6 h-6 text-green-400 mr-3" />
                    Focus Areas
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Recycle, label: 'Recycling', color: 'from-blue-500 to-blue-600' },
                      { icon: Waves, label: 'Ocean Health', color: 'from-cyan-500 to-cyan-600' },
                      { icon: Leaf, label: 'Sustainability', color: 'from-green-500 to-green-600' },
                      { icon: MapPin, label: 'Island Nations', color: 'from-purple-500 to-purple-600' }
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div key={index} className="bg-gray-700/50 rounded-xl p-4 text-center group hover:bg-gray-600/50 transition-colors duration-300">
                          <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-sm text-white font-medium">{item.label}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}



