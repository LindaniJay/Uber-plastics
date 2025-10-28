'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  X, 
  Lightbulb, 
  BookOpen, 
  Globe, 
  Leaf,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react'
import caboVerdeData from '@/data/cabo_verde.json'
import saoTomeData from '@/data/sao_tome.json'

interface EducationPopupProps {
  isOpen: boolean
  onClose: () => void
  region: 'cabo-verde' | 'sao-tome'
  bottlesCollected: number
}

interface EducationContent {
  id: string
  type: 'fact' | 'quiz' | 'tip'
  title: string
  content: string
  image?: string
  options?: string[]
  correctAnswer?: number
  explanation?: string
}

export function EducationPopup({ isOpen, onClose, region, bottlesCollected }: EducationPopupProps) {
  const [currentContent, setCurrentContent] = useState<EducationContent | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [contentIndex, setContentIndex] = useState(0)
  
  const regionData = region === 'cabo-verde' ? caboVerdeData : saoTomeData
  
  const educationContent: EducationContent[] = [
    {
      id: 'plastic-import',
      type: 'fact',
      title: 'Plastic Import Reality',
      content: `${regionData.country} imports ${(regionData.plasticWaste.annualGeneration * regionData.regionalFactors.plasticImportFactor).toFixed(0)} tons of plastic annually, with ${(regionData.regionalFactors.plasticImportFactor * 100).toFixed(0)}% being packaging materials. Your ${bottlesCollected} bottles help reduce this dependency!`
    },
    {
      id: 'ocean-impact',
      type: 'fact',
      title: 'Ocean Protection',
      content: `Every year, ${regionData.plasticWaste.oceanLeakage} tons of plastic leak into the ocean from ${regionData.country}. By recycling ${bottlesCollected} bottles, you've prevented approximately ${(bottlesCollected * 0.8).toFixed(1)} bottles from reaching the ocean.`
    },
    {
      id: 'co2-savings',
      type: 'fact',
      title: 'Climate Impact',
      content: `Your ${bottlesCollected} bottles saved approximately ${(bottlesCollected * 0.1).toFixed(1)}kg of CO₂. This is equivalent to planting ${Math.round(bottlesCollected * 0.25)} trees or driving ${Math.round(bottlesCollected * 0.22)} fewer miles.`
    },
    {
      id: 'recycling-quiz',
      type: 'quiz',
      title: 'Recycling Knowledge',
      content: `What percentage of waste in ${regionData.country} is currently recycled?`,
      options: [
        `${regionData.plasticWaste.recyclingRate}%`,
        `${regionData.plasticWaste.recyclingRate + 10}%`,
        `${regionData.plasticWaste.recyclingRate - 5}%`,
        '25%'
      ],
      correctAnswer: 0,
      explanation: `${regionData.country} currently recycles ${regionData.plasticWaste.recyclingRate}% of its waste. There's significant room for improvement!`
    },
    {
      id: 'tourism-impact',
      type: 'quiz',
      title: 'Tourism & Waste',
      content: `How much does tourism contribute to ${regionData.country}'s GDP?`,
      options: [
        `${regionData.economicData.tourismContribution}%`,
        '15%',
        '35%',
        '50%'
      ],
      correctAnswer: 0,
      explanation: `Tourism contributes ${regionData.economicData.tourismContribution}% to ${regionData.country}'s GDP, making sustainable tourism practices crucial for the economy.`
    },
    {
      id: 'waste-reduction-tip',
      type: 'tip',
      title: 'Waste Reduction Tip',
      content: `Did you know? ${regionData.country} generates ${regionData.plasticWaste.perCapita}kg of plastic waste per person annually. You can reduce this by:`,
      options: [
        'Using reusable water bottles',
        'Bringing your own shopping bags',
        'Choosing products with less packaging',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All of these actions help reduce plastic waste and support a circular economy!'
    }
  ]
  
  useEffect(() => {
    if (isOpen && educationContent.length > 0) {
      setCurrentContent(educationContent[contentIndex])
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }, [isOpen, contentIndex])
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
  }
  
  const handleNext = () => {
    if (contentIndex < educationContent.length - 1) {
      setContentIndex(contentIndex + 1)
    } else {
      onClose()
    }
  }
  
  const handlePrevious = () => {
    if (contentIndex > 0) {
      setContentIndex(contentIndex - 1)
    }
  }
  
  const isCorrect = selectedAnswer === currentContent?.correctAnswer
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Eco Education
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {contentIndex + 1} of {educationContent.length}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {currentContent && (
                <motion.div
                  key={currentContent.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Content Type Icon */}
                  <div className="flex items-center space-x-2">
                    {currentContent.type === 'fact' && (
                      <BookOpen className="h-5 w-5 text-blue-500" />
                    )}
                    {currentContent.type === 'quiz' && (
                      <Globe className="h-5 w-5 text-purple-500" />
                    )}
                    {currentContent.type === 'tip' && (
                      <Leaf className="h-5 w-5 text-green-500" />
                    )}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">
                      {currentContent.type}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentContent.title}
                  </h3>
                  
                  {/* Content */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentContent.content}
                  </p>
                  
                  {/* Quiz Options */}
                  {currentContent.type === 'quiz' && currentContent.options && (
                    <div className="space-y-3">
                      {currentContent.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                            selectedAnswer === null
                              ? 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600'
                              : selectedAnswer === index
                              ? isCorrect
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : index === currentContent.correctAnswer
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white">
                              {option}
                            </span>
                            {selectedAnswer === index && (
                              <CheckCircle className={`h-5 w-5 ${
                                isCorrect ? 'text-green-500' : 'text-red-500'
                              }`} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Explanation */}
                  {showExplanation && currentContent.explanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
                    >
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Explanation
                          </h4>
                          <p className="text-blue-800 dark:text-blue-200 text-sm">
                            {currentContent.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handlePrevious}
                disabled={contentIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              
              <div className="flex space-x-2">
                {educationContent.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === contentIndex
                        ? 'bg-green-500'
                        : index < contentIndex
                        ? 'bg-green-300'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <span>
                  {contentIndex === educationContent.length - 1 ? 'Finish' : 'Next'}
                </span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}