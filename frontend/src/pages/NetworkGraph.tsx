import { useState, useEffect, useRef } from 'react'
import { RefreshCw, ZoomIn, ZoomOut, Download, Settings } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NetworkGraph() {
  const [isLoading, setIsLoading] = useState(false)
  const [networkData, setNetworkData] = useState<any>(null)
  const graphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadNetworkData()
  }, [])

  const loadNetworkData = async () => {
    setIsLoading(true)
    try {
      const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8001'
      const response = await fetch(`${backendUrl}/api/network/graph`, {
        headers: {
          'Authorization': 'Bearer mock-token'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setNetworkData(data)
        toast.success('Network graph loaded')
      } else {
        toast.error('Failed to load network graph')
      }
    } catch (error) {
      toast.error('Error loading network data')
      console.error('Network graph error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleZoomIn = () => {
    toast.info('Zoom in functionality - to be implemented')
  }

  const handleZoomOut = () => {
    toast.info('Zoom out functionality - to be implemented')
  }

  const handleDownload = () => {
    toast.info('Download graph functionality - to be implemented')
  }

  const handleSettings = () => {
    toast.info('Graph settings - to be implemented')
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Network Graph</h1>
            <p className="mt-2 text-gray-600">
              Visualize and analyze your professional network connections
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={loadNetworkData}
              disabled={isLoading}
              className="btn-secondary"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button onClick={handleSettings} className="btn-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
            <button onClick={handleDownload} className="btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Graph Controls */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Layout:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option value="force">Force Directed</option>
                <option value="circle">Circular</option>
                <option value="grid">Grid</option>
                <option value="hierarchy">Hierarchical</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option value="all">All Connections</option>
                <option value="strong">Strong Connections</option>
                <option value="recent">Recent Interactions</option>
                <option value="industry">By Industry</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={handleZoomIn}  
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div 
          ref={graphRef}
          className="network-graph-container relative"
          style={{ height: '600px' }}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="loading-spinner mx-auto mb-4"></div>
                <div className="text-gray-500">Loading network graph...</div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2C5.582 2 2 5.582 2 10s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 11a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm-6 1a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Network Visualization
                </h3>
                <p className="text-gray-500 mb-4 max-w-sm">
                  Your network graph will appear here. Import contacts to start building your network visualization.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Cytoscape.js integration pending</div>
                  <div>• Force-directed layout algorithm</div>
                  <div>• Interactive node exploration</div>
                  <div>• Path finding visualization</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Graph Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">N</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Nodes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    142
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">E</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Edges
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    347
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <span className="text-yellow-600 font-semibold text-sm">C</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Clusters
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    12
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">D</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg Degree
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    4.9
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Insights */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Network Insights</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            AI-powered analysis of your professional network structure and opportunities.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Key Connectors Identified</p>
                <p className="text-sm text-gray-500">
                  3 contacts act as bridges between different clusters in your network
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Network Diversity</p>
                <p className="text-sm text-gray-500">
                  Your network spans 8 different industries with strong tech representation
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Growth Opportunities</p>
                <p className="text-sm text-gray-500">
                  Consider connecting with 5 professionals to bridge network gaps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}