import { useState, useEffect } from 'react'
import { supabase, HistoryYear, HistoryEvent, HistoryYearWithEvents } from '../lib/supabase'

export const useHistory = () => {
  const [years, setYears] = useState<HistoryYearWithEvents[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchYears = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all years with their events
      const { data: yearsData, error: yearsError } = await supabase
        .from('history_years')
        .select(`
          *,
          events:history_events(*)
        `)
        .order('year', { ascending: false })

      if (yearsError) throw yearsError

      setYears(yearsData || [])
    } catch (err) {
      console.error('Error fetching history years:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch history data')
    } finally {
      setLoading(false)
    }
  }

  const createYear = async (yearData: Omit<HistoryYear, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('history_years')
        .insert([yearData])
        .select()
        .single()

      if (error) throw error

      await fetchYears() // Refresh the list
      return data
    } catch (err) {
      console.error('Error creating history year:', err)
      throw err
    }
  }

  const updateYear = async (id: string, yearData: Partial<HistoryYear>) => {
    try {
      const { data, error } = await supabase
        .from('history_years')
        .update(yearData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      await fetchYears() // Refresh the list
      return data
    } catch (err) {
      console.error('Error updating history year:', err)
      throw err
    }
  }

  const deleteYear = async (id: string) => {
    try {
      const { error } = await supabase
        .from('history_years')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchYears() // Refresh the list
    } catch (err) {
      console.error('Error deleting history year:', err)
      throw err
    }
  }

  const createEvent = async (eventData: Omit<HistoryEvent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('history_events')
        .insert([eventData])
        .select()
        .single()

      if (error) throw error

      await fetchYears() // Refresh the list
      return data
    } catch (err) {
      console.error('Error creating history event:', err)
      throw err
    }
  }

  const updateEvent = async (id: string, eventData: Partial<HistoryEvent>) => {
    try {
      const { data, error } = await supabase
        .from('history_events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      await fetchYears() // Refresh the list
      return data
    } catch (err) {
      console.error('Error updating history event:', err)
      throw err
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('history_events')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchYears() // Refresh the list
    } catch (err) {
      console.error('Error deleting history event:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchYears()
  }, [])

  return {
    years,
    loading,
    error,
    createYear,
    updateYear,
    deleteYear,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchYears
  }
}

