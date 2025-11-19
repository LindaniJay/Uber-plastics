import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve absolute path to project root (where next.config.mjs is located)
// Normalize the path to ensure proper format on Windows
// This ensures Next.js uses the correct workspace root even if there are parent lockfiles
const projectRoot = path.normalize(path.resolve(__dirname))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  // Output configuration for Vercel
  output: 'standalone',
  // Fix workspace root inference in monorepo/multi-lockfile environments
  // Explicitly set the absolute root to the project directory to avoid Next.js detecting parent lockfiles
  // This silences the warning: "We detected multiple lockfiles and selected the directory of..."
  // The path must be absolute and point to where package-lock.json is located in this project
  // Using path.resolve ensures it's an absolute path on Windows
  outputFileTracingRoot: path.resolve(__dirname),
  
  // External packages for server components
  serverExternalPackages: ['@tensorflow/tfjs', '@tensorflow-models/coco-ssd'],
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    // Enable optimizations for faster startup
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'localhost' },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Webpack customization
  webpack: (config, { dev, isServer }) => {
    // Development optimizations (Windows dev experience)
    if (dev && !isServer) {
      config.cache = { type: 'memory' }
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    // Optimize bundle splitting for better performance
    if (!isServer) {
      config.optimization = config.optimization || {}
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              if (!module.size) return false
              return module.size() > 160000 && /node_modules/.test(module.identifier())
            },
            name(module) {
              const hash = crypto.createHash('sha1')
              hash.update(module.identifier())
              return hash.digest('hex').substring(0, 8)
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
      }
    }

    return config
  },

  // Headers for security and caching
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production'
    
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // CSP for production
          ...(isProduction ? [{
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https:; worker-src 'self' blob:;"
          }] : [{
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' http: https: ws: wss: http://localhost:8000; worker-src 'self' blob:;"
          }])
        ]
      },
      // Service worker headers
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      },
      // Static assets caching
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/individual/dashboard',
        permanent: true,
      },
      {
        source: '/scanner',
        destination: '/scan',
        permanent: true,
      },
    ]
  },

  // Rewrites for API integration
  async rewrites() {
    return [
      {
        source: '/api/python/:path*',
        destination: `${process.env.NEXT_PUBLIC_PYTHON_API_URL || 'https://uberplastics-api.vercel.app'}/:path*`,
      },
    ]
  },

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Compression
  compress: true,

  // Power optimization
  poweredByHeader: false,

  // Trailing slash handling
  trailingSlash: false,

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

