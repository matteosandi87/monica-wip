import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import { Network, Users, Activity, Settings } from 'lucide-react'
import './App.css'

// Import components (will be created in subsequent steps)
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import NetworkGraph from './pages/NetworkGraph'
import Settings from './pages/Settings'
import { HealthCheck } from './components/HealthCheck'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null)

  // Check backend health on app start
  useEffect(() => {
    checkBackendHealth()
  }, [])

  const checkBackendHealth = async () => {
    try {
      const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8001'
      const response = await fetch(`${backendUrl}/api/health`)
      
      if (response.ok) {
        const data = await response.json()
        setIsHealthy(true)
        toast.success('Connected to NetworkSync API')
        console.log('Backend health:', data)
      } else {
        setIsHealthy(false)
        toast.error('Backend connection failed')
      }
    } catch (error) {
      setIsHealthy(false)
      toast.error('Cannot connect to backend')
      console.error('Health check failed:', error)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Network className="h-8 w-8 text-primary-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-900">NetworkSync</h1>
                </div>
                
                <nav className="flex space-x-8">
                  <a href="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                  <a href="/contacts" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Contacts
                  </a>
                  <a href="/network" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Network
                  </a>
                  <a href="/settings" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Settings
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {isHealthy === false && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Backend Connection Issue
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>Cannot connect to the NetworkSync API. Please ensure the backend server is running.</p>
                      <button 
                        onClick={checkBackendHealth}
                        className="mt-2 btn-primary text-sm"
                      >
                        Retry Connection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/network" element={<NetworkGraph />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  NetworkSync v1.0.0 - Professional Relationship Intelligence
                </p>
                <HealthCheck />
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App