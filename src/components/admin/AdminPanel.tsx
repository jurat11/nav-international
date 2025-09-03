import React, { useState } from 'react'
import { useAdmin } from '../../contexts/AdminContext'
import { useBlogs } from '../../hooks/useBlogs'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import BlogForm from './BlogForm'
import { Blog } from '../../lib/supabase'
import { Plus, Edit, Trash2, LogOut, Calendar, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminPanel: React.FC = () => {
  const { logout } = useAdmin()
  const { blogs, loading, error, createBlog, updateBlog, deleteBlog } = useBlogs()
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const handleCreateBlog = async (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
    setFormLoading(true)
    try {
      await createBlog(blogData)
      setShowForm(false)
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateBlog = async (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingBlog) return
    
    setFormLoading(true)
    try {
      await updateBlog(editingBlog.id, blogData)
      setEditingBlog(null)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Debug logging
  // console.log('AdminPanel - loading:', loading, 'blogs:', blogs, 'error:', error, 'editingBlog:', editingBlog, 'showForm:', showForm)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage blog posts for the press center</p>
          </div>
          <div className="flex gap-4">
            <Link to="/press">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                View Press Center
              </Button>
            </Link>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{blogs.length}</div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {blogs.filter(blog => {
                  const blogDate = new Date(blog.created_at)
                  const now = new Date()
                  return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear()
                }).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Latest Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {blogs.length > 0 ? formatDate(blogs[0].created_at) : 'No posts'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Blog Posts</h2>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-secondary hover:bg-secondary/90 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Blog
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Blogs List */}
        <div className="grid gap-6">
          {blogs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground text-lg">No blog posts yet.</p>
                <p className="text-muted-foreground">Create your first blog post to get started.</p>
              </CardContent>
            </Card>
          ) : (
            blogs.map((blog) => (
              <Card key={blog.id} className="transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{blog.title}</CardTitle>
                      <CardDescription className="text-base mb-3">{blog.excerpt}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.date)}
                        </div>
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                          {formatDate(blog.created_at)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingBlog(blog)}
                        className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {blog.image_url && (
                      <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {blog.content.length > 200 
                        ? `${blog.content.substring(0, 200)}...` 
                        : blog.content
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Forms */}
        {showForm && (
          <div className="fixed inset-0 z-[9999]">
            <BlogForm
              onSubmit={handleCreateBlog}
              onCancel={() => setShowForm(false)}
              loading={formLoading}
            />
          </div>
        )}

        {editingBlog && (
          <div className="fixed inset-0 z-[9999]">
            <BlogForm
              blog={editingBlog}
              onSubmit={handleUpdateBlog}
              onCancel={() => setEditingBlog(null)}
              loading={formLoading}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
