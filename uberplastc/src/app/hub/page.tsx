'use client'

import { motion } from 'framer-motion'
import { 
  Building, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Target,
  Calendar,
  Award,
  DollarSign,
  MapPin,
  Clock,
  QrCode,
  Truck,
  Leaf,
  Globe,
  Home,
  ArrowRight,
  Settings,
  FileText
} from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

export default function HubDashboard() {
  return (
    <ProtectedRoute allowedRoles={['hub']}>
      <HubDashboardContent />
    </ProtectedRoute>
  )
}

function HubDashboardContent() {
  const { user } = useAuth()
  const { darkMode } = useTheme()

  // Mock data for hub dashboard
  const hubStats = {
    totalBottles: 2847,
    teamMembers: 12,
    monthlyGoal: 5000,
    co2Saved: 56.9,
    activePrograms: 3,
    totalRewards: 1250
  }

  const stats = [
    {
      icon: Building,
      title: 'Total Collections',
      value: hubStats.totalBottles,
      change: '+15% this month',
      changeType: 'positive' as const,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Team Members',
      value: hubStats.teamMembers,
      change: 'Active participants',
      changeType: 'neutral' as const,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Target,
      title: 'Monthly Goal',
      value: `${Math.round((hubStats.totalBottles / hubStats.monthlyGoal) * 100)}%`,
      change: `${hubStats.monthlyGoal - hubStats.totalBottles} bottles remaining`,
      changeType: 'positive' as const,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Leaf,
      title: 'CO₂ Saved',
      value: `${hubStats.co2Saved}kg`,
      change: 'Environmental impact',
      changeType: 'positive' as const,
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  const quickActions = [
    {
      title: 'Generate QR Code',
      description: 'Create collection QR codes for your team',
      icon: QrCode,
      color: 'from-blue-500 to-indigo-600',
      href: '/hub/settings'
    },
    {
      title: 'Schedule Pickup',
      description: 'Request waste collection service',
      icon: Truck,
      color: 'from-green-500 to-emerald-600',
      href: '/hub/team'
    },
    {
      title: 'Team Analytics',
      description: 'View detailed team performance',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      href: '/hub/analytics'
    },
    {
      title: 'Generate Report',
      description: 'Create sustainability reports',
      icon: FileText,
      color: 'from-teal-500 to-cyan-600',
      href: '/hub/reports'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'Team member collected 15 bottles',
      time: '2 hours ago',
      member: 'Sarah Johnson',
      type: 'collection',
      points: 75
    },
    {
      id: 2,
      action: 'Monthly goal 57% completed',
      time: '4 hours ago',
      member: 'System',
      type: 'milestone',
      points: 0
    },
    {
      id: 3,
      action: 'New team member joined',
      time: '1 day ago',
      member: 'Mike Chen',
      type: 'team',
      points: 0
    },
    {
      id: 4,
      action: 'Pickup request scheduled',
      time: '2 days ago',
      member: 'Admin',
      type: 'logistics',
      points: 0
    },
    {
      id: 5,
      action: 'Sustainability report generated',
      time: '3 days ago',
      member: 'System',
      type: 'report',
      points: 0
    },
    {
      id: 6,
      action: 'Team challenge completed',
      time: '4 days ago',
      member: 'Team',
      type: 'achievement',
      points: 200
    }
  ]

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Sustainability Manager',
      bottlesCollected: 245,
      points: 1225,
      lastActive: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Environmental Coordinator',
      bottlesCollected: 189,
      points: 945,
      lastActive: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Team Lead',
      bottlesCollected: 312,
      points: 1560,
      lastActive: '3 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Data Analyst',
      bottlesCollected: 156,
      points: 780,
      lastActive: '5 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const sustainabilityGoals = [
    {
      title: 'Zero Waste Office',
      description: 'Achieve 90% waste diversion from landfills',
      progress: 78,
      target: 90,
      deadline: 'Dec 2024',
      status: 'on-track'
    },
    {
      title: 'Carbon Neutral Operations',
      description: 'Reduce carbon footprint by 50%',
      progress: 35,
      target: 50,
      deadline: 'Jun 2025',
      status: 'behind'
    },
    {
      title: 'Employee Engagement',
      description: '100% team participation in eco programs',
      progress: 85,
      target: 100,
      deadline: 'Mar 2024',
      status: 'on-track'
    }
  ]

  const upcomingEvents = [
    {
      title: 'Sustainability Workshop',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Conference Room A',
      attendees: 25,
      type: 'workshop'
    },
    {
      title: 'Team Building Cleanup',
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Local Park',
      attendees: 40,
      type: 'community'
    },
    {
      title: 'Green Awards Ceremony',
      date: '2024-02-01',
      time: '6:00 PM',
      location: 'Grand Hall',
      attendees: 100,
      type: 'celebration'
    }
  ]

  const environmentalImpact = {
    totalBottles: 2847,
    co2Saved: 56.9,
    energySaved: 1250,
    waterSaved: 890,
    equivalentTrees: 142,
    oceanPlasticPrevented: 284
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className={`text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Welcome, {user?.name || 'Green Hub'}! 🏢
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your organization's sustainability initiatives and serve as a collection hub for your community.
          </p>
        </motion.div>

        {/* Navigation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Home Navigation */}
            <Link
              href="/"
              className="card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Home
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Back to main page
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 ml-auto" />
              </div>
            </Link>

            {/* Eco Insights Navigation */}
            <Link
              href="/insights"
              className="card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                    Eco Insights
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Environmental data & analytics
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 ml-auto" />
              </div>
            </Link>

            {/* Team Management */}
            <Link
              href="/institution/team"
              className="card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    Team Management
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage team members
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 ml-auto" />
              </div>
            </Link>

            {/* Settings */}
            <Link
              href="/institution/settings"
              className="card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    Settings
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Configure organization
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 ml-auto" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 group hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card"
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.member} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mt-8"
        >
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Team Performance
          </h2>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {member.role}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {member.bottlesCollected} bottles
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    {member.points} points
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {member.lastActive}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sustainability Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="card mt-8"
        >
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Sustainability Goals
          </h2>
          <div className="space-y-4">
            {sustainabilityGoals.map((goal, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {goal.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    goal.status === 'on-track' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    goal.status === 'behind' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {goal.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-gray-900 dark:text-white">{goal.progress}% / {goal.target}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.status === 'on-track' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        goal.status === 'behind' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                        'bg-gradient-to-r from-yellow-500 to-orange-600'
                      }`}
                      style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Deadline: {goal.deadline}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {goal.target - goal.progress}% remaining
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="card mt-8"
        >
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {event.title}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'workshop' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      event.type === 'community' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {event.type}
                    </span>
                    <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Environmental Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="card mt-8"
        >
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Environmental Impact Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {environmentalImpact.co2Saved}kg
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                CO₂ Saved
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {environmentalImpact.totalBottles.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Bottles Collected
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {environmentalImpact.equivalentTrees}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Trees Equivalent
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {environmentalImpact.energySaved}kWh
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Energy Saved
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">
                {environmentalImpact.waterSaved}L
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Water Saved
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {environmentalImpact.oceanPlasticPrevented}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Ocean Plastic Prevented
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}