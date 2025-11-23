// Utility functions for insights page export and sharing

export interface ExportData {
  region: string
  timeframe: string
  metrics: any
  kpiData: any[]
  regionalComparison: any[]
  timestamp: string
}

export function exportToCSV(data: ExportData): void {
  const csvRows: string[] = []
  
  // Header
  csvRows.push('Environmental Analytics Dashboard Export')
  csvRows.push(`Region: ${data.region}`)
  csvRows.push(`Timeframe: ${data.timeframe}`)
  csvRows.push(`Generated: ${data.timestamp}`)
  csvRows.push('')
  
  // KPI Metrics
  csvRows.push('KPI Metrics')
  csvRows.push('Metric,Value,Change,Subtitle,Benchmark')
  data.kpiData.forEach(metric => {
    csvRows.push(`"${metric.title}","${metric.value}","${metric.change}","${metric.subtitle}","${metric.benchmark}"`)
  })
  csvRows.push('')
  
  // Regional Comparison
  csvRows.push('Regional Comparison')
  csvRows.push('Region,Bottles,CO2,Poly Money,Efficiency,Population,Per Capita')
  data.regionalComparison.forEach(region => {
    csvRows.push(`"${region.region}","${region.bottles}","${region.co2}","${region.polyMoney}","${region.efficiency}","${region.population}","${region.perCapita}"`)
  })
  
  // Create blob and download
  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `eco-insights-${data.region}-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToJSON(data: ExportData): void {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `eco-insights-${data.region}-${new Date().toISOString().split('T')[0]}.json`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function shareDashboard(region: string, timeframe: string): void {
  const url = `${window.location.origin}/insights?region=${region}&timeframe=${timeframe}`
  const title = `Environmental Analytics Dashboard - ${region}`
  const text = `Check out the environmental analytics for ${region}`
  
  if (navigator.share) {
    navigator.share({
      title,
      text,
      url
    }).catch(err => {
      console.log('Error sharing:', err)
      // Fallback to clipboard
      copyToClipboard(url)
    })
  } else {
    // Fallback to clipboard
    copyToClipboard(url)
  }
}

export function copyToClipboard(text: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('Cannot access clipboard in SSR'))
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise((resolve, reject) => {
      if (document.execCommand('copy')) {
        resolve()
      } else {
        reject(new Error('Copy failed'))
      }
      document.body.removeChild(textArea)
    })
  }
}

export function saveBookmark(region: string, timeframe: string, viewMode: string): void {
  if (typeof window === 'undefined') return
  const bookmarks = JSON.parse(localStorage.getItem('eco-insights-bookmarks') || '[]')
  const bookmark = {
    id: Date.now().toString(),
    region,
    timeframe,
    viewMode,
    createdAt: new Date().toISOString()
  }
  
  // Check if bookmark already exists
  const exists = bookmarks.find((b: any) => 
    b.region === region && b.timeframe === timeframe && b.viewMode === viewMode
  )
  
  if (!exists) {
    bookmarks.push(bookmark)
    localStorage.setItem('eco-insights-bookmarks', JSON.stringify(bookmarks))
  }
}

export function getBookmarks(): any[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('eco-insights-bookmarks') || '[]')
}

export function removeBookmark(id: string): void {
  if (typeof window === 'undefined') return
  const bookmarks = getBookmarks()
  const filtered = bookmarks.filter((b: any) => b.id !== id)
  localStorage.setItem('eco-insights-bookmarks', JSON.stringify(filtered))
}

export function isBookmarked(region: string, timeframe: string, viewMode: string): boolean {
  const bookmarks = getBookmarks()
  return bookmarks.some((b: any) => 
    b.region === region && b.timeframe === timeframe && b.viewMode === viewMode
  )
}



