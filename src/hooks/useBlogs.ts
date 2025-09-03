import { useState, useEffect } from 'react'
import { supabase, Blog } from '../lib/supabase'

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      console.log('Fetching blogs from Supabase...')
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('Supabase response:', { data, error })
      
      if (error) throw error
      setBlogs(data || [])
      console.log('Blogs set:', data || [])
    } catch (err) {
      console.error('Error fetching blogs:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createBlog = async (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()

      if (error) throw error
      
      if (data) {
        setBlogs(prev => [data[0], ...prev])
      }
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog')
      throw err
    }
  }

  const updateBlog = async (id: string, blogData: Partial<Omit<Blog, 'id' | 'created_at'>>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update({ ...blogData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      
      if (data) {
        setBlogs(prev => prev.map(blog => blog.id === id ? data[0] : blog))
      }
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update blog')
      throw err
    }
  }

  const deleteBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setBlogs(prev => prev.filter(blog => blog.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog')
      throw err
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return {
    blogs,
    loading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    refetch: fetchBlogs
  }
}
