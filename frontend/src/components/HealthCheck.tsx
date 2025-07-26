import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface HealthStatus {
  status: string
  message: string
  timestamp: string
  version: string
}

export function HealthCheck() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const checkHealth = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8001'
      const response = await fetch(`${backendUrl}/api/health`)
      
      if (response.ok) {
        const data: HealthStatus = await response.json()
        setHealth(data)
      } else {
        setError(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
    
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    if (isLoading) {
      return <Loader2 className="w-4 h-4 animate-spin" />
    }
    
    if (error || !health || health.status !== 'healthy') {
      return <XCircle className="w-4 h-4 text-red-500" />
    }
    
    return <CheckCircle className="w-4 h-4 text-green-500" />
  }

  const getStatusText = () => {
    if (isLoading) return 'Checking...'
    if (error) return 'Disconnected'
    if (!health) return 'Unknown'
    return health.status === 'healthy' ? 'Connected' : 'Issues'
  }

  const getStatusColor = () => {
    if (isLoading) return 'text-gray-500'
    if (error || !health || health.status !== 'healthy') return 'text-red-600'
    return 'text-green-600'
  }

  return (
    <div className="flex items-center space-x-2">
      {getStatusIcon()}
      <span className={`text-sm font-medium ${getStatusColor()}`}>
        API: {getStatusText()}
      </span>
      {health && (
        <span className="text-xs text-gray-400">
          v{health.version}
        </span>
      )}
    </div>
  )
}