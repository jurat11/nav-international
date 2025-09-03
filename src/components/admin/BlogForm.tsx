import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import RichTextEditor from './RichTextEditor'
import { Blog } from '../../lib/supabase'
import { uploadHistoryImage } from '../../lib/imageUpload'
import { X, Upload, Image as ImageIcon } from 'lucide-react'

interface BlogFormProps {
  blog?: Blog | null
  onSubmit: (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const BlogForm: React.FC<BlogFormProps> = React.memo(({ blog, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [imageUploading, setImageUploading] = useState(false)

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        image_url: blog.image_url,
        date: blog.date
      })
    }
  }, [blog])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting blog:', error)
    }
  }, [formData, onSubmit])

  const handleFormClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleFormKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Prevent form submission on Enter key in rich text editor
    if (e.key === 'Enter' && e.target !== e.currentTarget) {
      e.stopPropagation()
    }
  }, [])

  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    setImageUploading(true)
    try {
      const url = await uploadHistoryImage(file)
      return url
    } finally {
      setImageUploading(false)
    }
  }, [])

  const handleFeaturedImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageUploading(true)
      try {
        const url = await uploadHistoryImage(file)
        setFormData(prev => ({ ...prev, image_url: url }))
      } catch (error) {
        console.error('Error uploading featured image:', error)
      } finally {
        setImageUploading(false)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]" style={{ display: 'flex' }}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gradient">
              {blog ? 'Edit Blog' : 'Create New Blog'}
            </CardTitle>
            <CardDescription>
              {blog ? 'Update the blog post' : 'Add a new blog post to the press center'}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="hover:bg-secondary/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form 
          onSubmit={handleSubmit} 
          onClick={handleFormClick}
          onKeyDown={handleFormKeyDown}
          className="space-y-6"
        >
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter blog title"
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Enter a short description of the blog post"
                rows={3}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Featured Image</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    className="hidden"
                    id="featured-image-upload"
                    disabled={imageUploading}
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-secondary rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors disabled:opacity-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Upload className="w-4 h-4" />
                    {imageUploading ? 'Uploading...' : 'Upload Image'}
                  </label>
                  <span className="text-sm text-muted-foreground">or</span>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => handleChange('image_url', e.target.value)}
                    placeholder="Enter image URL"
                    className="transition-all duration-300 focus:ring-2 focus:ring-secondary"
                  />
                </div>
                {formData.image_url && (
                  <div className="relative">
                    <img
                      src={formData.image_url}
                      alt="Featured image preview"
                      className="w-full h-48 object-cover rounded-lg border border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setFormData(prev => ({ ...prev, image_url: '' }))
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => handleChange('content', content)}
                onImageUpload={handleImageUpload}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading || imageUploading}
                className="flex-1 bg-secondary hover:bg-secondary/90 transition-all duration-300 hover:scale-105"
              >
                {loading ? 'Saving...' : imageUploading ? 'Uploading...' : (blog ? 'Update Blog' : 'Create Blog')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm
