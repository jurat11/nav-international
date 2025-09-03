import React, { useState } from 'react'
import { useAdmin } from '../contexts/AdminContext'
import AdminLogin from '../components/admin/AdminLogin'
import AdminPanel from '../components/admin/AdminPanel'
import HistoryAdmin from '../components/admin/HistoryAdmin'
import ManagementTeamAdmin from '../components/admin/ManagementTeamAdmin'
import { Button } from '../components/ui/button'
import { FileText, Calendar, Users } from 'lucide-react'
import { cn } from '../lib/utils'

const Admin: React.FC = () => {
  const { isAuthenticated } = useAdmin()
  const [activeTab, setActiveTab] = useState<'blogs' | 'history' | 'management'>('blogs')

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-white/90">Manage your website content</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 border-b border-border">
          <Button
            variant={activeTab === 'blogs' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('blogs')}
            className={cn(
              "flex items-center gap-2",
              activeTab === 'blogs' 
                ? "bg-gradient-to-r from-primary to-secondary text-white" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="w-4 h-4" />
            Blog Posts
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex items-center gap-2",
              activeTab === 'history' 
                ? "bg-gradient-to-r from-primary to-secondary text-white" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Calendar className="w-4 h-4" />
            History Management
          </Button>
          <Button
            variant={activeTab === 'management' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('management')}
            className={cn(
              "flex items-center gap-2",
              activeTab === 'management' 
                ? "bg-gradient-to-r from-primary to-secondary text-white" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Users className="w-4 h-4" />
            Management Team
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'blogs' && <AdminPanel />}
        {activeTab === 'history' && <HistoryAdmin />}
        {activeTab === 'management' && <ManagementTeamAdmin />}
      </div>
    </div>
  )
}

export default Admin

