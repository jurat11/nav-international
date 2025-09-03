import { useState, useEffect } from 'react'
import { supabase, ManagementTeamMember } from '../lib/supabase'

export const useManagementTeam = () => {
  const [members, setMembers] = useState<ManagementTeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMembers = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('management_team')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error

      setMembers(data || [])
    } catch (err) {
      console.error('Error fetching management team:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch management team data')
    } finally {
      setLoading(false)
    }
  }

  const createMember = async (memberData: Omit<ManagementTeamMember, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('management_team')
        .insert([memberData])
        .select()
        .single()

      if (error) throw error

      await fetchMembers() // Refresh the list
      return data
    } catch (err) {
      console.error('Error creating management team member:', err)
      throw err
    }
  }

  const updateMember = async (id: string, memberData: Partial<ManagementTeamMember>) => {
    try {
      const { data, error } = await supabase
        .from('management_team')
        .update(memberData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      await fetchMembers() // Refresh the list
      return data
    } catch (err) {
      console.error('Error updating management team member:', err)
      throw err
    }
  }

  const deleteMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('management_team')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchMembers() // Refresh the list
    } catch (err) {
      console.error('Error deleting management team member:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return {
    members,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
    refetch: fetchMembers
  }
}

