# 🚀 EcoTrack Vercel Deployment Guide

This guide will help you deploy EcoTrack to Vercel with both the Next.js frontend and Python backend.

## 📋 Prerequisites

- [Vercel account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/cli) installed globally
- Node.js 18+ installed
- Python 3.9+ installed (for backend)

## 🔧 Installation

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Install Dependencies
```bash
# Frontend dependencies
cd ecotrack
npm install

# Backend dependencies
cd python-backend
pip install -r requirements.txt
```

## 🚀 Quick Deployment

### Option 1: Automated Script (Recommended)

**For Linux/Mac:**
```bash
chmod +x scripts/deploy-vercel.sh
./scripts/deploy-vercel.sh
```

**For Windows PowerShell:**
```powershell
.\scripts\deploy-vercel.ps1
```

### Option 2: Manual Deployment

#### Deploy Frontend
```bash
cd ecotrack
vercel --prod
```

#### Deploy Backend
```bash
cd python-backend
vercel --prod
```

## ⚙️ Environment Variables Setup

After deployment, configure these environment variables in your Vercel dashboard:

### Frontend Environment Variables
- `NEXT_PUBLIC_APP_URL`: Your frontend Vercel URL
- `NEXT_PUBLIC_PYTHON_API_URL`: Your backend Vercel URL
- `NEXT_PUBLIC_REGION`: `cabo-verde` or `sao-tome`
- `NEXT_PUBLIC_CONFIDENCE_THRESHOLD`: `0.5`
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: `false`
- `NEXT_PUBLIC_ENABLE_OFFLINE_MODE`: `true`

### Backend Environment Variables
- `PYTHON_API_URL`: Your backend Vercel URL
- `CONFIDENCE_THRESHOLD`: `0.5`
- `ALLOWED_ORIGINS`: Your frontend Vercel URL
- `LOG_LEVEL`: `INFO`
- `MAX_FILE_SIZE`: `10485760`

## 🔗 Setting Up Environment Variables

### Method 1: Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with appropriate values

### Method 2: Vercel CLI
```bash
# Frontend
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_PYTHON_API_URL production

# Backend
vercel env add PYTHON_API_URL production
vercel env add CONFIDENCE_THRESHOLD production
```

## 📁 Project Structure for Deployment

```
ecotrack/
├── vercel.json                 # Frontend Vercel config
├── next.config.js             # Next.js config
├── package.json               # Dependencies
├── env.example               # Environment template
├── scripts/
│   ├── deploy-vercel.sh      # Linux/Mac deployment
│   └── deploy-vercel.ps1     # Windows deployment
└── python-backend/
    ├── vercel.json           # Backend Vercel config
    ├── main.py              # FastAPI app
    ├── requirements.txt     # Python dependencies
    └── env.example          # Backend env template
```

## 🔄 Continuous Deployment

### GitHub Integration
1. Connect your GitHub repository to Vercel
2. Enable automatic deployments on push
3. Set up branch-based deployments:
   - `main` → Production
   - `develop` → Preview

### Environment-Specific Deployments
- **Production**: `vercel --prod`
- **Preview**: `vercel`
- **Development**: `vercel dev`

## 🛠️ Configuration Files

### Frontend Vercel Config (`vercel.json`)
- Optimized caching for static assets
- PWA service worker configuration
- Security headers
- API rewrites for backend integration

### Backend Vercel Config (`python-backend/vercel.json`)
- Python 3.9 runtime
- CORS configuration
- Function timeout settings
- Environment variable mapping

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Enable Vercel Analytics in dashboard
2. Add `NEXT_PUBLIC_GA_ID` environment variable
3. Configure custom events for user interactions

### Performance Monitoring
- Built-in Vercel Speed Insights
- Core Web Vitals tracking
- Real User Monitoring (RUM)

## 🔒 Security Configuration

### Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### CORS
- Configured for frontend-backend communication
- Environment-specific origins
- Preflight request handling

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs
vercel logs

# Local build test
npm run build
```

#### 2. Environment Variables Not Loading
- Verify variable names match exactly
- Check production vs preview environments
- Ensure `NEXT_PUBLIC_` prefix for client-side vars

#### 3. Python Backend Issues
```bash
# Test locally
cd python-backend
python main.py

# Check dependencies
pip list
```

#### 4. API Connection Issues
- Verify backend URL in environment variables
- Check CORS configuration
- Test API endpoints directly

### Debug Commands
```bash
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Inspect environment
vercel env ls
```

## 📈 Performance Optimization

### Frontend Optimizations
- Automatic code splitting
- Image optimization
- Static asset caching
- Service worker caching

### Backend Optimizations
- Function cold start optimization
- Model loading optimization
- Response compression
- Connection pooling

## 🔄 Updates & Maintenance

### Updating Dependencies
```bash
# Frontend
npm update
npm audit fix

# Backend
pip install --upgrade -r requirements.txt
```

### Redeployment
```bash
# Full redeploy
vercel --prod --force

# Specific project
vercel --prod --scope [team-name]
```

## 📞 Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/

## 🎯 Next Steps After Deployment

1. **Test all functionality**
   - Camera detection
   - Dashboard statistics
   - API endpoints
   - PWA features

2. **Configure custom domain**
   - Add domain in Vercel dashboard
   - Update DNS records
   - Update environment variables

3. **Set up monitoring**
   - Enable Vercel Analytics
   - Configure error tracking
   - Set up uptime monitoring

4. **Optimize performance**
   - Monitor Core Web Vitals
   - Optimize images and assets
   - Implement caching strategies

---

**🌱 Your EcoTrack application is now live and ready to help users track their environmental impact!**
