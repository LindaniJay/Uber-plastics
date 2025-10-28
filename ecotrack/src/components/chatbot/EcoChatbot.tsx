'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  ChevronDown,
  ChevronUp,
  Info,
  MapPin,
  Leaf,
  Recycle,
  Waves
} from 'lucide-react'
import caboVerdeData from '@/data/cabo_verde.json'
import saoTomeData from '@/data/sao_tome.json'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  suggestions?: string[]
}

interface IslandInfo {
  name: string
  population: number
  area: number
  islands: string[]
  plasticWaste: {
    annualGeneration: number
    recyclingRate: number
    oceanLeakage: number
  }
  initiatives: Array<{
    name: string
    description: string
    status: string
  }>
  challenges: string[]
  opportunities: string[]
}

export function EcoChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm EcoBot, your guide to environmental information about Cabo Verde and São Tomé. I can help you learn about plastic waste management, environmental initiatives, and sustainability efforts in these beautiful island nations. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Tell me about Cabo Verde's plastic waste situation",
        "What environmental initiatives exist in São Tomé?",
        "How can I help with ocean conservation?",
        "What are the main challenges these islands face?"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const caboVerde: IslandInfo = {
    name: "Cabo Verde",
    population: caboVerdeData.population,
    area: caboVerdeData.area,
    islands: caboVerdeData.islands,
    plasticWaste: {
      annualGeneration: caboVerdeData.plasticWaste.annualGeneration,
      recyclingRate: caboVerdeData.plasticWaste.recyclingRate,
      oceanLeakage: caboVerdeData.plasticWaste.oceanLeakage
    },
    initiatives: caboVerdeData.initiatives,
    challenges: caboVerdeData.challenges,
    opportunities: caboVerdeData.opportunities
  }

  const saoTome: IslandInfo = {
    name: "São Tomé and Príncipe",
    population: saoTomeData.population,
    area: saoTomeData.area,
    islands: saoTomeData.islands,
    plasticWaste: {
      annualGeneration: saoTomeData.plasticWaste.annualGeneration,
      recyclingRate: saoTomeData.plasticWaste.recyclingRate,
      oceanLeakage: saoTomeData.plasticWaste.oceanLeakage
    },
    initiatives: saoTomeData.initiatives,
    challenges: saoTomeData.challenges,
    opportunities: saoTomeData.opportunities
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Cabo Verde specific responses
    if (message.includes('cabo verde') || message.includes('cape verde')) {
      if (message.includes('plastic') || message.includes('waste')) {
        return `Cabo Verde generates ${caboVerde.plasticWaste.annualGeneration.toLocaleString()} tons of plastic waste annually, with only ${caboVerde.plasticWaste.recyclingRate}% being recycled. The country has implemented strong legislation including the Single-Use Plastic Law (2023) and eco-taxes to combat plastic pollution. Key initiatives include the "Plastic-Free Islands" program aiming to eliminate single-use plastics by 2030.`
      }
      if (message.includes('population') || message.includes('people')) {
        return `Cabo Verde has a population of ${caboVerde.population.toLocaleString()} people across ${caboVerde.islands.length} islands, with an area of ${caboVerde.area.toLocaleString()} km². The main islands are ${caboVerde.islands.slice(0, 5).join(', ')} and others.`
      }
      if (message.includes('initiative') || message.includes('program')) {
        return `Cabo Verde has several active environmental initiatives: ${caboVerde.initiatives.map(init => `"${init.name}" - ${init.description}`).join(', ')}. These programs focus on eliminating single-use plastics, ocean cleanup, and eco-tourism certification.`
      }
      if (message.includes('challenge') || message.includes('problem')) {
        return `Cabo Verde faces several challenges: ${caboVerde.challenges.join(', ')}. Despite these challenges, the country has strong community engagement and government commitment to sustainability.`
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

    // General environmental topics
    if (message.includes('ocean') || message.includes('marine') || message.includes('sea')) {
      return `Both islands face significant ocean pollution challenges. Cabo Verde has ${caboVerde.plasticWaste.oceanLeakage.toLocaleString()} tons of plastic leaking into the ocean annually, while São Tomé has ${saoTome.plasticWaste.oceanLeakage.toLocaleString()} tons. Both countries have active beach cleanup programs and marine conservation initiatives.`
    }

    if (message.includes('recycling') || message.includes('recycle')) {
      return `Recycling rates are low in both countries. Cabo Verde recycles ${caboVerde.plasticWaste.recyclingRate}% of its plastic waste, while São Tomé recycles only ${saoTome.plasticWaste.recyclingRate}%. Both countries are working to improve waste management infrastructure and public awareness.`
    }

    if (message.includes('help') || message.includes('how can i')) {
      return `You can help by: 1) Reducing single-use plastics, 2) Participating in beach cleanups, 3) Supporting local environmental initiatives, 4) Educating others about plastic pollution, 5) Choosing sustainable tourism options. Both countries have active community programs you can join!`
    }

    if (message.includes('tourism') || message.includes('travel')) {
      return `Both islands offer eco-tourism opportunities! Cabo Verde has eco-tourism certification programs for hotels and restaurants, while São Tomé has the Príncipe Biosphere Reserve. Tourism contributes ${caboVerde.opportunities.includes('Growing eco-tourism sector') ? '25%' : '15%'} to GDP in Cabo Verde and 15% in São Tomé.`
    }

    if (message.includes('government') || message.includes('policy') || message.includes('law')) {
      return `Both countries have strong environmental policies. Cabo Verde has the Single-Use Plastic Law (2023) and eco-taxes, while São Tomé has plastic bag regulations and comprehensive waste management plans. Both are signatories to international environmental conventions.`
    }

    // Default response
    return `I can help you learn about environmental issues in Cabo Verde and São Tomé. Try asking about: plastic waste management, environmental initiatives, ocean conservation, recycling programs, government policies, or how you can help. What specific topic interests you?`
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
    inputRef.current?.focus()
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">EcoBot</h3>
                  <p className="text-sm opacity-90">Environmental Guide</p>
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
                    <div className={`p-2 rounded-full ${message.isUser ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {message.isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.suggestions && (
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left text-xs p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
                            >
                              {suggestion}
                            </button>
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
                    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Ask about environmental issues..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-2 rounded-xl hover:opacity-80 disabled:opacity-50 transition-opacity duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}



