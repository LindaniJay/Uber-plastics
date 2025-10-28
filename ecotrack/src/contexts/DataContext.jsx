import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [collections, setCollections] = useState([])
  const [pickupRequests, setPickupRequests] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [rewards, setRewards] = useState([])
  const [badges, setBadges] = useState([])

  useEffect(() => {
    // Load data from localStorage
    const savedCollections = localStorage.getItem('ecotrack-collections')
    const savedPickupRequests = localStorage.getItem('ecotrack-pickup-requests')
    const savedLeaderboard = localStorage.getItem('ecotrack-leaderboard')
    const savedRewards = localStorage.getItem('ecotrack-rewards')
    const savedBadges = localStorage.getItem('ecotrack-badges')

    if (savedCollections) setCollections(JSON.parse(savedCollections))
    if (savedPickupRequests) setPickupRequests(JSON.parse(savedPickupRequests))
    if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard))
    if (savedRewards) setRewards(JSON.parse(savedRewards))
    if (savedBadges) setBadges(JSON.parse(savedBadges))

    // Initialize with sample data if empty
    if (!savedLeaderboard) {
      const sampleLeaderboard = [
        { id: 1, name: 'EcoWarrior123', polyMoney: 1250, bottles: 1250, type: 'individual' },
        { id: 2, name: 'Green Hotel', polyMoney: 980, bottles: 980, type: 'hub' },
        { id: 3, name: 'OceanSaver', polyMoney: 750, bottles: 750, type: 'individual' },
        { id: 4, name: 'Beach Resort', polyMoney: 650, bottles: 650, type: 'hub' },
        { id: 5, name: 'RecycleKing', polyMoney: 520, bottles: 520, type: 'individual' }
      ]
      setLeaderboard(sampleLeaderboard)
      localStorage.setItem('ecotrack-leaderboard', JSON.stringify(sampleLeaderboard))
    }

    if (!savedRewards) {
      const sampleRewards = [
        { id: 1, name: 'Coffee Voucher', polyMoney: 50, description: 'Free coffee at local café', available: true },
        { id: 2, name: 'Ferry Ticket', polyMoney: 200, description: '50% off ferry ticket', available: true },
        { id: 3, name: 'Mobile Data', polyMoney: 100, description: '1GB mobile data bonus', available: true },
        { id: 4, name: 'Eco T-Shirt', polyMoney: 300, description: 'Sustainable cotton t-shirt', available: true }
      ]
      setRewards(sampleRewards)
      localStorage.setItem('ecotrack-rewards', JSON.stringify(sampleRewards))
    }

    if (!savedBadges) {
      const sampleBadges = [
        { id: 1, name: 'First Steps', description: 'Collected your first bottle', icon: '🌱', unlocked: false },
        { id: 2, name: 'Eco Warrior', description: 'Collected 100 bottles', icon: '🛡️', unlocked: false },
        { id: 3, name: 'Ocean Hero', description: 'Collected 500 bottles', icon: '🌊', unlocked: false },
        { id: 4, name: 'Clean Coast Champion', description: 'Collected 1000 bottles', icon: '🏆', unlocked: false }
      ]
      setBadges(sampleBadges)
      localStorage.setItem('ecotrack-badges', JSON.stringify(sampleBadges))
    }
  }, [])

  const addCollection = (collection) => {
    const newCollection = {
      ...collection,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    const updatedCollections = [...collections, newCollection]
    setCollections(updatedCollections)
    localStorage.setItem('ecotrack-collections', JSON.stringify(updatedCollections))
  }

  const addPickupRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
    const updatedRequests = [...pickupRequests, newRequest]
    setPickupRequests(updatedRequests)
    localStorage.setItem('ecotrack-pickup-requests', JSON.stringify(updatedRequests))
  }

  const updatePickupRequest = (id, updates) => {
    const updatedRequests = pickupRequests.map(request =>
      request.id === id ? { ...request, ...updates } : request
    )
    setPickupRequests(updatedRequests)
    localStorage.setItem('ecotrack-pickup-requests', JSON.stringify(updatedRequests))
  }

  const updateLeaderboard = (userData) => {
    const updatedLeaderboard = leaderboard.map(user =>
      user.id === userData.id ? { ...user, ...userData } : user
    )
    setLeaderboard(updatedLeaderboard)
    localStorage.setItem('ecotrack-leaderboard', JSON.stringify(updatedLeaderboard))
  }

  const redeemReward = (rewardId) => {
    const updatedRewards = rewards.map(reward =>
      reward.id === rewardId ? { ...reward, available: false } : reward
    )
    setRewards(updatedRewards)
    localStorage.setItem('ecotrack-rewards', JSON.stringify(updatedRewards))
  }

  const unlockBadge = (badgeId) => {
    const updatedBadges = badges.map(badge =>
      badge.id === badgeId ? { ...badge, unlocked: true } : badge
    )
    setBadges(updatedBadges)
    localStorage.setItem('ecotrack-badges', JSON.stringify(updatedBadges))
  }

  const value = {
    collections,
    pickupRequests,
    leaderboard,
    rewards,
    badges,
    addCollection,
    addPickupRequest,
    updatePickupRequest,
    updateLeaderboard,
    redeemReward,
    unlockBadge
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
