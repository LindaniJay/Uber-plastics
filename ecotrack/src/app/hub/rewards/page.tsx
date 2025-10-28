'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Gift, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye,
  Edit,
  Trash2,
  Star,
  DollarSign,
  Calendar,
  Filter,
  Search
} from 'lucide-react'

interface Reward {
  id: string
  title: string
  description: string
  polyMoneyCost: number
  category: string
  status: 'active' | 'inactive' | 'draft'
  maxRedemptions?: number
  currentRedemptions: number
  createdAt: string
  image?: string
}

interface RewardRequest {
  id: string
  citizenId: string
  citizenName: string
  rewardId: string
  rewardTitle: string
  polyMoneyCost: number
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  reviewedAt?: string
  notes?: string
}

export default function InstitutionRewardsPage() {
  const [activeTab, setActiveTab] = useState<'rewards' | 'requests'>('rewards')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<RewardRequest | null>(null)

  // Mock data for rewards
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel water bottle with Uber Plastic branding',
      polyMoneyCost: 500,
      category: 'Eco Products',
      status: 'active',
      maxRedemptions: 100,
      currentRedemptions: 23,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Gift Card - Local Grocery Store',
      description: '$25 gift card for sustainable shopping',
      polyMoneyCost: 750,
      category: 'Gift Cards',
      status: 'active',
      maxRedemptions: 50,
      currentRedemptions: 12,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Tree Planting Certificate',
      description: 'Certificate for a tree planted in your name',
      polyMoneyCost: 300,
      category: 'Environmental Impact',
      status: 'active',
      currentRedemptions: 45,
      createdAt: '2024-01-25'
    }
  ])

  // Mock data for reward requests
  const [requests, setRequests] = useState<RewardRequest[]>([
    {
      id: '1',
      citizenId: 'citizen_001',
      citizenName: 'Maria Santos',
      rewardId: '1',
      rewardTitle: 'Eco-Friendly Water Bottle',
      polyMoneyCost: 500,
      status: 'pending',
      requestedAt: '2024-01-28T10:30:00Z'
    },
    {
      id: '2',
      citizenId: 'citizen_002',
      citizenName: 'João Silva',
      rewardId: '2',
      rewardTitle: 'Gift Card - Local Grocery Store',
      polyMoneyCost: 750,
      status: 'approved',
      requestedAt: '2024-01-27T14:20:00Z',
      reviewedAt: '2024-01-28T09:15:00Z'
    },
    {
      id: '3',
      citizenId: 'citizen_003',
      citizenName: 'Ana Costa',
      rewardId: '3',
      rewardTitle: 'Tree Planting Certificate',
      polyMoneyCost: 300,
      status: 'rejected',
      requestedAt: '2024-01-26T16:45:00Z',
      reviewedAt: '2024-01-27T11:30:00Z',
      notes: 'Insufficient poly money balance'
    }
  ])

  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' as const, reviewedAt: new Date().toISOString() }
        : req
    ))
  }

  const handleRejectRequest = (requestId: string, notes: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' as const, reviewedAt: new Date().toISOString(), notes }
        : req
    ))
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

  const pendingCount = requests.filter(r => r.status === 'pending').length
  const approvedCount = requests.filter(r => r.status === 'approved').length
  const rejectedCount = requests.filter(r => r.status === 'rejected').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Reward Management</h1>
          <p className="text-gray-300">Create and manage rewards, approve citizen requests</p>
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
                { id: 'rewards', label: 'Manage Rewards', icon: Gift },
                { id: 'requests', label: 'Review Requests', icon: Users, badge: pendingCount }
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
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
        {activeTab === 'rewards' && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Create Reward Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Available Rewards</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Reward</span>
              </button>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, index) => (
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
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Poly Money Cost</span>
                      <span className="text-green-400 font-semibold">{reward.polyMoneyCost}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Category</span>
                      <span className="text-white text-sm">{reward.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Redemptions</span>
                      <span className="text-white text-sm">
                        {reward.currentRedemptions}/{reward.maxRedemptions || '∞'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                        style={{ width: `${(reward.currentRedemptions / (reward.maxRedemptions || 100)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reward.status === 'active' ? 'bg-green-400/10 text-green-400' :
                      reward.status === 'inactive' ? 'bg-red-400/10 text-red-400' :
                      'bg-yellow-400/10 text-yellow-400'
                    }`}>
                      {reward.status}
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>View Details</span>
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

            {/* Requests Table */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-600/30 overflow-hidden">
              <div className="p-6 border-b border-gray-600/30">
                <h2 className="text-xl font-semibold text-white">Reward Requests</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Citizen</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reward</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Requested</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600/30">
                    {requests.map((request) => {
                      const StatusIcon = getStatusIcon(request.status)
                      return (
                        <tr key={request.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{request.citizenName}</div>
                            <div className="text-sm text-gray-400">{request.citizenId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{request.rewardTitle}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-400 font-semibold">{request.polyMoneyCost}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {new Date(request.requestedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {request.status === 'pending' ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleApproveRequest(request.id)}
                                  className="text-green-400 hover:text-green-300 transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => setSelectedRequest(request)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400">Reviewed</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
