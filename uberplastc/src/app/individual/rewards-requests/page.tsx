'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Gift, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star,
  DollarSign,
  Calendar,
  Plus,
  Eye,
  AlertCircle
} from 'lucide-react'

interface Reward {
  id: string
  title: string
  description: string
  polyMoneyCost: number
  category: string
  image?: string
  available: boolean
}

interface RewardRequest {
  id: string
  rewardId: string
  rewardTitle: string
  polyMoneyCost: number
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  reviewedAt?: string
  notes?: string
}

export default function CitizenRewardsRequestsPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'requests'>('available')
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Mock user data
  const userPolyMoney = 1250

  // Mock available rewards
  const availableRewards: Reward[] = [
    {
      id: '1',
      title: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel water bottle with Uber Plastic branding. Perfect for reducing single-use plastic consumption.',
      polyMoneyCost: 500,
      category: 'Eco Products',
      available: true
    },
    {
      id: '2',
      title: 'Gift Card - Local Grocery Store',
      description: '$25 gift card for sustainable shopping at local eco-friendly stores.',
      polyMoneyCost: 750,
      category: 'Gift Cards',
      available: true
    },
    {
      id: '3',
      title: 'Tree Planting Certificate',
      description: 'Certificate for a tree planted in your name. Help reforestation efforts.',
      polyMoneyCost: 300,
      category: 'Environmental Impact',
      available: true
    },
    {
      id: '4',
      title: 'Solar Panel Installation Discount',
      description: '20% discount on solar panel installation for your home.',
      polyMoneyCost: 2000,
      category: 'Green Energy',
      available: true
    },
    {
      id: '5',
      title: 'Eco-Friendly Cleaning Kit',
      description: 'Complete set of natural, biodegradable cleaning products.',
      polyMoneyCost: 400,
      category: 'Eco Products',
      available: true
    }
  ]

  // Mock user's reward requests
  const [userRequests, setUserRequests] = useState<RewardRequest[]>([
    {
      id: '1',
      rewardId: '1',
      rewardTitle: 'Eco-Friendly Water Bottle',
      polyMoneyCost: 500,
      status: 'pending',
      requestedAt: '2024-01-28T10:30:00Z'
    },
    {
      id: '2',
      rewardId: '3',
      rewardTitle: 'Tree Planting Certificate',
      polyMoneyCost: 300,
      status: 'approved',
      requestedAt: '2024-01-25T14:20:00Z',
      reviewedAt: '2024-01-26T09:15:00Z'
    },
    {
      id: '3',
      rewardId: '2',
      rewardTitle: 'Gift Card - Local Grocery Store',
      polyMoneyCost: 750,
      status: 'rejected',
      requestedAt: '2024-01-20T16:45:00Z',
      reviewedAt: '2024-01-21T11:30:00Z',
      notes: 'Insufficient poly money balance at time of request'
    }
  ])

  const handleRequestReward = (reward: Reward) => {
    if (userPolyMoney >= reward.polyMoneyCost) {
      const newRequest: RewardRequest = {
        id: Date.now().toString(),
        rewardId: reward.id,
        rewardTitle: reward.title,
        polyMoneyCost: reward.polyMoneyCost,
        status: 'pending',
        requestedAt: new Date().toISOString()
      }
      setUserRequests(prev => [newRequest, ...prev])
      setShowRequestModal(false)
      setSelectedReward(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'approved': return 'text-green-400 bg-green-400/10'
      case 'rejected': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock
      case 'approved': return CheckCircle
      case 'rejected': return XCircle
      default: return Clock
    }
  }

  const pendingCount = userRequests.filter(r => r.status === 'pending').length
  const approvedCount = userRequests.filter(r => r.status === 'approved').length
  const rejectedCount = userRequests.filter(r => r.status === 'rejected').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Rewards & Requests</h1>
          <p className="text-gray-300">Browse available rewards and track your requests</p>
        </motion.div>

        {/* Poly Money Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Your Poly Money Balance</p>
                <p className="text-3xl font-bold text-white">{userPolyMoney.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Available for rewards</p>
              <p className="text-green-400 font-semibold">Ready to redeem</p>
            </div>
          </div>
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
                { id: 'available', label: 'Available Rewards', icon: Gift },
                { id: 'requests', label: 'My Requests', icon: Clock, badge: pendingCount }
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
                    {tab.badge && tab.badge > 0 && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === 'available' && (
          <motion.div
            key="available"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{reward.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{reward.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Poly Money Cost</span>
                      <span className="text-green-400 font-semibold">{reward.polyMoneyCost}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Category</span>
                      <span className="text-white text-sm">{reward.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Your Balance</span>
                      <span className={`text-sm font-medium ${
                        userPolyMoney >= reward.polyMoneyCost ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {userPolyMoney}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedReward(reward)
                        setShowRequestModal(true)
                      }}
                      disabled={userPolyMoney < reward.polyMoneyCost}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        userPolyMoney >= reward.polyMoneyCost
                          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {userPolyMoney >= reward.polyMoneyCost ? 'Request Reward' : 'Insufficient Balance'}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'requests' && (
          <motion.div
            key="requests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Request Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-400/10 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-white">{pendingCount}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-400/10 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Approved</p>
                    <p className="text-2xl font-bold text-white">{approvedCount}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-400/10 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Rejected</p>
                    <p className="text-2xl font-bold text-white">{rejectedCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {userRequests.map((request, index) => {
                const StatusIcon = getStatusIcon(request.status)
                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(request.status)}`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{request.rewardTitle}</h3>
                          <p className="text-gray-400 text-sm">
                            Requested on {new Date(request.requestedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">{request.polyMoneyCost} Poly Money</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>

                    {request.reviewedAt && (
                      <div className="mt-4 p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-gray-300 text-sm">
                              Reviewed on {new Date(request.reviewedAt).toLocaleDateString()}
                            </p>
                            {request.notes && (
                              <p className="text-gray-400 text-sm mt-1">{request.notes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Request Modal */}
        {showRequestModal && selectedReward && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-600/30"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Request Reward</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">Reward:</p>
                  <p className="text-white font-medium">{selectedReward.title}</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Cost:</p>
                  <p className="text-green-400 font-semibold">{selectedReward.polyMoneyCost} Poly Money</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Your Balance:</p>
                  <p className="text-white">{userPolyMoney} Poly Money</p>
                </div>
                <div className="p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 text-sm font-medium">Approval Required</p>
                      <p className="text-gray-300 text-sm mt-1">
                        Your request will be reviewed by an institution. You'll be notified once it's approved or rejected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRequestReward(selectedReward)}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
                >
                  Submit Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}



