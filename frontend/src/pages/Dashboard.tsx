import { useState, useEffect } from 'react'
import { Users, Network, Activity, TrendingUp, Plus, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

interface DashboardStats {
  totalContacts: number
  networkConnections: number
  recentInteractions: number
  networkGrowth: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    networkConnections: 0,
    recentInteractions: 0,
    networkGrowth: '+0%'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // Mock data for now - will be replaced with actual API calls
      setTimeout(() => {
        setStats({
          totalContacts: 142,
          networkConnections: 1250,
          recentInteractions: 23,
          networkGrowth: '+12%'
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast.error('Failed to load dashboard data')
      setIsLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, title, value, change, color }: {
    icon: any
    title: string
    value: string | number
    change?: string
    color: string
  }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    value
                  )}
                </div>
                {change && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {change}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back! Here's an overview of your professional network.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchDashboardData}
              disabled={isLoading}
              className="btn-secondary"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            title="Total Contacts"
            value={stats.totalContacts}
            color="text-blue-600"
          />
          <StatCard
            icon={Network}
            title="Network Connections"
            value={stats.networkConnections}
            change={stats.networkGrowth}
            color="text-green-600"
          />
          <StatCard
            icon={Activity}
            title="Recent Interactions"
            value={stats.recentInteractions}
            color="text-yellow-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Network Growth"
            value={stats.networkGrowth}
            color="text-purple-600"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Import Contacts</h3>
                  <p className="text-sm text-gray-500">From LinkedIn, CSV, or other sources</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center">
                <Network className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Analyze Network</h3>
                  <p className="text-sm text-gray-500">Discover connections and insights</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Log Interaction</h3>
                  <p className="text-sm text-gray-500">Record meetings, calls, and messages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Your latest networking activities and interactions.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center text-gray-500">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by adding contacts or logging interactions to see your activity here.
              </p>
              <div className="mt-6">
                <button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}