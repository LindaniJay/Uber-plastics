'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Award,
  Target,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  Filter,
  Search
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function InstitutionTeamPage() {
  const { darkMode } = useTheme()

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Sustainability Coordinator',
      department: 'Marketing',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-01-15',
      bottlesCollected: 156,
      points: 780,
      status: 'active',
      avatar: 'SJ',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Environmental Engineer',
      department: 'Engineering',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-02-20',
      bottlesCollected: 142,
      points: 710,
      status: 'active',
      avatar: 'MC',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'HR Manager',
      department: 'Human Resources',
      email: 'lisa.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2023-03-10',
      bottlesCollected: 128,
      points: 640,
      status: 'active',
      avatar: 'LR',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Finance Analyst',
      department: 'Finance',
      email: 'david.kim@company.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-04-05',
      bottlesCollected: 115,
      points: 575,
      status: 'active',
      avatar: 'DK',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      role: 'Operations Manager',
      department: 'Operations',
      email: 'emma.wilson@company.com',
      phone: '+1 (555) 567-8901',
      joinDate: '2023-05-12',
      bottlesCollected: 108,
      points: 540,
      status: 'active',
      avatar: 'EW',
      color: 'from-pink-500 to-pink-600'
    }
  ]

  const teamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(member => member.status === 'active').length,
    totalBottles: teamMembers.reduce((sum, member) => sum + member.bottlesCollected, 0),
    totalPoints: teamMembers.reduce((sum, member) => sum + member.points, 0),
    averageBottles: Math.round(teamMembers.reduce((sum, member) => sum + member.bottlesCollected, 0) / teamMembers.length),
    topPerformer: teamMembers.reduce((prev, current) => (prev.bottlesCollected > current.bottlesCollected) ? prev : current)
  }

  const departments = [
    { name: 'Marketing', members: 6, bottles: 420, color: 'from-blue-500 to-blue-600' },
    { name: 'Engineering', members: 8, bottles: 380, color: 'from-green-500 to-green-600' },
    { name: 'HR', members: 3, bottles: 180, color: 'from-purple-500 to-purple-600' },
    { name: 'Finance', members: 4, bottles: 160, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Operations', members: 3, bottles: 107, color: 'from-pink-500 to-pink-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg mb-6 inline-block">
            <Users className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Team Management
            </h1>
            <p className="text-blue-100 text-lg">
              Manage your sustainability team members
            </p>
          </div>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Team Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {teamStats.totalMembers}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Members
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {teamStats.activeMembers}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Active Members
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {teamStats.totalBottles}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Bottles Collected
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {teamStats.totalPoints}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Points
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>All Departments</span>
          </button>
        </motion.div>

        {/* Team Members */}
        <div className="space-y-6 mb-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-r ${member.color} text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg`}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {member.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {member.role} • {member.department}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {member.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.bottlesCollected}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    bottles collected
                  </div>
                  <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.points} points
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Joined: {new Date(member.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    Edit
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Department Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-gradient-to-r ${dept.color} p-6 rounded-xl text-white`}
              >
                <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-90">Members:</span>
                    <span className="font-bold">{dept.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Bottles:</span>
                    <span className="font-bold">{dept.bottles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Avg per member:</span>
                    <span className="font-bold">{Math.round(dept.bottles / dept.members)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add Member Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
            <UserPlus className="h-6 w-6" />
            <span>Add Team Member</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
