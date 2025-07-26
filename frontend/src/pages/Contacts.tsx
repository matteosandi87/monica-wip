import { useState, useEffect } from 'react'
import { Search, Plus, Filter, Grid, List, MoreVertical } from 'lucide-react'
import toast from 'react-hot-toast'

interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  title?: string
  notes?: string
  created_at: string
  updated_at: string
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8001'
      const response = await fetch(`${backendUrl}/api/contacts`, {
        headers: {
          'Authorization': 'Bearer mock-token' // Will be replaced with real auth
        }
      })

      if (response.ok) {
        const data = await response.json()
        // For now, show mock data since backend returns placeholder
        setContacts([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            company: 'Tech Corp',
            title: 'Software Engineer',
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@startup.com',
            company: 'Startup Inc',
            title: 'Product Manager',
            created_at: '2024-01-14T15:30:00Z',
            updated_at: '2024-01-14T15:30:00Z'
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@consulting.com',
            company: 'Consulting Co',
            title: 'Senior Consultant',
            created_at: '2024-01-13T09:15:00Z',
            updated_at: '2024-01-13T09:15:00Z'
          }
        ])
        toast.success('Contacts loaded successfully')
      } else {
        toast.error('Failed to load contacts')
      }
    } catch (error) {
      toast.error('Error connecting to server')
      console.error('Fetch contacts error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {contact.name}
              </div>
              <div className="text-sm text-gray-500">
                {contact.title} {contact.company ? `at ${contact.company}` : ''}
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
        {contact.email && (
          <div className="mt-4">
            <div className="text-sm text-gray-500">{contact.email}</div>
          </div>
        )}
      </div>
    </div>
  )

  const ContactListItem = ({ contact }: { contact: Contact }) => (
    <div className="bg-white px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
            <div className="text-sm text-gray-500">{contact.email}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-900">{contact.company}</div>
          <div className="text-sm text-gray-500">{contact.title}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
            <p className="mt-2 text-gray-600">
              manage your professional network
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm border ${
                  viewMode === 'grid'
                    ? 'bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:text-gray-700'
                } rounded-l-md`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm border-t border-r border-b ${
                  viewMode === 'list'
                    ? 'bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:text-gray-700'
                } rounded-r-md`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                  <option value="">All Companies</option>
                  <option value="tech-corp">Tech Corp</option>
                  <option value="startup-inc">Startup Inc</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                  <option value="">All Titles</option>
                  <option value="engineer">Engineer</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                  <option value="">All Tags</option>
                  <option value="client">Client</option>
                  <option value="colleague">Colleague</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contacts Display */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-500">Loading contacts...</span>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first contact.'}
          </p>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 text-sm text-gray-500">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {filteredContacts.map((contact) => (
                <ContactListItem key={contact.id} contact={contact} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}