import { useState } from 'react'
import { Save, Key, Database, Bell, User, Shield, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'integrations', name: 'Integrations', icon: Key },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
  ]

  const ProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your account profile information and email address.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            defaultValue="John"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            defaultValue="Doe"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            rows={3}
            defaultValue="Professional networker and relationship manager."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  )

  const IntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">API Integrations</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure connections to external services and platforms.
        </p>
      </div>

      <div className="space-y-4">
        {/* LinkedIn Integration */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">Li</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">LinkedIn</h4>
                <p className="text-sm text-gray-500">Import contacts and connections</p>
              </div>
            </div>
            <button className="btn-secondary">
              Connect
            </button>
          </div>
        </div>

        {/* OpenAI Integration */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">AI</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">OpenAI</h4>
                <p className="text-sm text-gray-500">AI-powered insights and analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="password"
                placeholder="API Key"
                className="w-32 px-3 py-1 text-sm border border-gray-300 rounded-md"
              />
              <button className="btn-primary text-sm">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Supabase Status */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Supabase</h4>
                <p className="text-sm text-gray-500">Database and authentication</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-yellow-600">Configuring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const DatabaseSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Database Configuration</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure your Supabase database connection and settings.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Configuration Required
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Please configure your Supabase credentials in the environment variables to enable full functionality.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supabase URL
          </label>
          <input
            type="url"
            placeholder="https://your-project.supabase.co"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Anon Key
          </label>
          <input
            type="password"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Role Key
          </label>
          <input
            type="password"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <button className="btn-primary">
          <Database className="w-4 h-4 mr-2" />
          Test Connection
        </button>
      </div>
    </div>
  )

  const NotificationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to be notified about network activities and updates.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">New Connection Requests</h4>
            <p className="text-sm text-gray-500">Get notified when someone wants to connect</p>
          </div>
          <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600">
            <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Reminder Notifications</h4>
            <p className="text-sm text-gray-500">Reminders for follow-ups and tasks</p>
          </div>
          <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600">
            <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">AI Insights</h4>
            <p className="text-sm text-gray-500">Weekly network analysis and recommendations</p>
          </div>
          <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-gray-200">
            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
          </button>
        </div>
      </div>
    </div>
  )

  const PrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Privacy & Security</h3>
        <p className="mt-1 text-sm text-gray-500">
          Control your data privacy and account security settings.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-base font-medium text-gray-900">Data Sharing</h4>
          <div className="mt-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Allow network sharing</span>
                <p className="text-sm text-gray-500">Let trusted contacts see mutual connections</p>
              </div>
              <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-gray-200">
                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-base font-medium text-gray-900">Account Security</h4>
          <div className="mt-2 space-y-4">
            <button className="btn-secondary">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-base font-medium text-gray-900">Data Management</h4>
          <div className="mt-2 space-y-4">
            <button className="btn-secondary">
              Download My Data
            </button>
            <button className="btn text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />
      case 'integrations':
        return <IntegrationsSettings />
      case 'database':
        return <DatabaseSettings />
      case 'notifications':
        return <NotificationsSettings />
      case 'privacy':
        return <PrivacySettings />
      default:
        return <ProfileSettings />
    }
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
              {renderTabContent()}
            </div>
            
            {/* Save Button */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}