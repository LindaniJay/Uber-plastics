'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { 
  Building, 
  Users, 
  BarChart3, 
  Award, 
  TrendingUp,
  Leaf,
  Target,
  Calendar,
  MapPin,
  DollarSign,
  Recycle
} from 'lucide-react'

export default function InstitutionPage() {
  return (
    <ProtectedRoute allowedRoles={['institution']}>
      <InstitutionContent />
    </ProtectedRoute>
  )
}

function InstitutionContent() {
  const { user } = useAuth()

  const stats = [
    {
      icon: Users,
      title: 'Team Members',
      value: '24',
      change: '+3 this month',
      changeType: 'positive' as const,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Recycle,
      title: 'Bottles Collected',
      value: '1,247',
      change: '+156 this week',
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: DollarSign,
      title: 'Total Savings',
      value: 'STN 2,450',
      change: '+STN 320 this month',
      changeType: 'positive' as const,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Leaf,
      title: 'CO₂ Saved (kg)',
      value: '124.7',
      change: '+15.6 this week',
      changeType: 'positive' as const,
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container py-4 md:py-8 px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Institution Dashboard
          </h1>
          <p className="text-base md:text-lg text-blue-100">
            Manage your organization's sustainability initiatives and environmental impact.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{stat.value}</h3>
              <p className="text-blue-200 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex flex-col items-center space-y-2">
              <Users className="w-6 h-6" />
              <span className="text-sm font-medium">Team Management</span>
            </button>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex flex-col items-center space-y-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm font-medium">Analytics</span>
            </button>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 flex flex-col items-center space-y-2">
              <Award className="w-6 h-6" />
              <span className="text-sm font-medium">Rewards</span>
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex flex-col items-center space-y-2">
              <Target className="w-6 h-6" />
              <span className="text-sm font-medium">Goals</span>
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: 'New team member joined', time: '2 hours ago', icon: Users },
              { action: 'Monthly collection target reached', time: '1 day ago', icon: Target },
              { action: 'Sustainability report generated', time: '3 days ago', icon: BarChart3 },
              { action: 'Reward points distributed', time: '1 week ago', icon: Award }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <activity.icon className="w-5 h-5 text-blue-300" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-blue-200 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}








