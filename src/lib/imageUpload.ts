import { supabase } from './supabase'

export const uploadHistoryImage = async (file: File): Promise<string> => {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('blog-images') // Reusing the same bucket
      .upload(`history/${fileName}`, file)

    if (error) {
      if (error.message.includes('Bucket not found')) {
        throw new Error('Storage bucket not found. Please run the SQL setup script in Supabase to create the required storage bucket.')
      }
      throw error
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(`history/${fileName}`)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}