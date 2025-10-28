# 🌱 EcoTrack - From Waste to Worth

> **AI-Powered Plastic Waste Tracking & Environmental Impact Platform**

EcoTrack is a comprehensive web application that uses AI-powered camera detection to track plastic bottle collections, calculate environmental impact, and reward users for their sustainability efforts. Built with Next.js, TypeScript, and TensorFlow.js.

## 🎯 **Key Features**

### 🤖 **AI-Powered Detection**
- **Real-time bottle detection** using TensorFlow.js and COCO-SSD
- **Live camera overlay** with bounding boxes and confidence scores
- **Automatic counting** and reward calculation
- **Mock detection fallback** for development and testing

### 📊 **Comprehensive Dashboard**
- **Live statistics** with animated counters
- **Environmental impact** visualization
- **Achievement system** with badges and progress tracking
- **Rewards widget** with redeemable coupons
- **Recent scans** history and analytics

### 🌍 **Regional Data Integration**
- **Cabo Verde dataset** with real environmental data
- **São Tomé & Príncipe dataset** with local insights
- **Regional impact factors** for accurate CO₂ calculations
- **Interactive insights dashboard** with charts and visualizations

### 📱 **Progressive Web App (PWA)**
- **Offline functionality** with service worker
- **Mobile-optimized** camera interface
- **App-like experience** with native features
- **Push notifications** for achievements

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with camera support

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ecotrack.git
cd ecotrack

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🏗️ **Project Structure**

```
src/
├── app/                          # Next.js app directory
│   ├── individual/              # Individual user pages
│   │   └── dashboard/           # Main dashboard
│   ├── scan/                    # AI scanner page
│   ├── insights/                # Environmental insights
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                  # React components
│   ├── ai/                      # AI detection components
│   │   ├── CameraScanner.tsx    # Main scanner component
│   │   ├── EducationPopup.tsx   # Educational content
│   │   ├── CameraOverlay.tsx    # Detection overlay
│   │   └── RewardPopup.tsx      # Reward confirmation
│   ├── dashboard/               # Dashboard components
│   │   ├── StatsCard.tsx        # Statistics cards
│   │   ├── AchievementCard.tsx  # Achievement display
│   │   └── ProgressRing.tsx     # Progress indicators
│   └── layout/                  # Layout components
│       └── Navbar.tsx           # Navigation
├── hooks/                       # Custom React hooks
│   ├── useBottleDetection.ts    # AI detection logic
│   └── useImpactStats.ts        # Impact calculations
├── store/                       # State management
│   └── useEcoTrackStore.ts      # Zustand store
├── contexts/                    # React contexts
│   ├── AuthContext.tsx          # Authentication
│   └── ThemeContext.tsx         # Theme management
├── data/                        # Static data
│   ├── cabo_verde.json          # Cabo Verde dataset
│   └── sao_tome.json            # São Tomé dataset
└── utils/                       # Utility functions
```

## 🤖 **AI Detection System**

### TensorFlow.js Integration
```typescript
// Load COCO-SSD model for object detection
const model = await cocoSsd.load()

// Detect objects in video frame
const predictions = await model.detect(videoElement)
const bottles = predictions.filter(p => 
  p.class.includes('bottle') || p.class.includes('cup')
)
```

### Mock Detection (Development)
```typescript
// Fallback detection for development
const mockDetection = () => {
  const bottles = Math.floor(Math.random() * 6) + 1
  const confidence = Math.random() * 0.2 + 0.8
  return { bottles, confidence }
}
```

## 📊 **Data Integration**

### Regional Datasets
- **Cabo Verde**: 550,000 population, 15,000 tons annual plastic waste
- **São Tomé**: 220,000 population, 8,500 tons annual plastic waste
- **Environmental factors**: CO₂ emissions, recycling rates, ocean leakage
- **Economic data**: GDP, tourism impact, waste management costs

### Impact Calculations
```typescript
// CO₂ savings with regional factors
const co2Saved = bottles * regionalFactor.co2PerBottle * regionalFactor.islandIsolationFactor

// Points with cleanliness multiplier
const points = bottles * 5 * (1.0 + totalBottles * 0.01)

// Earnings with tourism multiplier
const earnings = bottles * 0.05 * regionalFactor.tourismMultiplier
```

## 🎨 **UI/UX Features**

### Design System
- **Color palette**: Eco-friendly greens, teals, and blues
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth Framer Motion transitions
- **Responsive**: Mobile-first design with desktop optimization

### Components
- **StatsCard**: Animated statistics with trend indicators
- **AchievementCard**: Progress tracking with unlock animations
- **ProgressRing**: Circular progress indicators
- **CameraScanner**: Full-screen camera interface with AI overlay

## 📱 **PWA Features**

### Service Worker
- **Offline caching** for static assets
- **Background sync** for scan results
- **Push notifications** for achievements
- **Update handling** for app versions

### Manifest
- **App icons** in multiple sizes
- **Splash screens** for different devices
- **Shortcuts** for quick access
- **Theme colors** for native integration

## 🧪 **Testing & Validation**

### System Validation
```bash
# Run comprehensive validation
node scripts/validate-system.js
```

### Manual Testing Checklist
- [ ] Camera opens and detects bottles
- [ ] Detection updates live bottle count
- [ ] Points and CO₂ stats reflect on dashboard
- [ ] Insights data visible with charts
- [ ] No broken routes or console errors
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] Smooth animations (no jank)
- [ ] All data stored persistently

## 🚀 **Deployment**

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Docker
```bash
# Build Docker image
docker build -t ecotrack .

# Run container
docker run -p 3000:3000 ecotrack
```

### Environment Variables
```env
NEXT_PUBLIC_APP_URL=https://ecotrack.vercel.app
NEXT_PUBLIC_AI_MODEL_URL=/models/coco-ssd
NEXT_PUBLIC_REGION=cabo-verde
```

## 🔧 **Configuration**

### Next.js Configuration
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
})
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#10B981',
        'eco-blue': '#3B82F6',
        'eco-purple': '#7C3AED',
      },
    },
  },
  plugins: [],
}
```

## 📈 **Performance Optimization**

### Bundle Optimization
- **Code splitting** with dynamic imports
- **Image optimization** with Next.js Image
- **Lazy loading** for heavy components
- **Tree shaking** for unused code

### Runtime Performance
- **React.memo** for component optimization
- **useCallback** for function memoization
- **Web Workers** for AI model loading
- **Efficient state management** with Zustand

## 🌍 **Environmental Impact**

### Real-world Data
- **Cabo Verde**: 70% plastic import dependency
- **São Tomé**: 65% plastic import dependency
- **Regional factors**: Island isolation, tourism impact
- **CO₂ calculations**: Based on real environmental studies

### Impact Metrics
- **CO₂ savings**: 0.1-0.15kg per bottle (regional factors)
- **Ocean protection**: 0.8 bottles prevented per scan
- **Tree equivalent**: 2.5 trees per kg CO₂ saved
- **Economic impact**: Tourism multiplier effects

## 🤝 **Contributing**

### Development Setup
```bash
# Fork the repository
git clone https://github.com/your-username/ecotrack.git
cd ecotrack

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Code Style
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional commits** for commit messages

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **TensorFlow.js** for AI model integration
- **Next.js** for the React framework
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **Cabo Verde** and **São Tomé** environmental data

## 📞 **Support**

For support, email support@ecotrack.app or join our Discord community.

---

**🌱 Every scan makes a difference - Start tracking your impact today!**