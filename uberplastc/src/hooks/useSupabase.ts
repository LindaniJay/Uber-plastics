'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { fetchFromTable, insertIntoTable, updateTable, deleteFromTable, getById } from '@/services/supabaseService'

interface UseSupabaseOptions {
  table: string
  select?: string
  filters?: Record<string, any>
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
  realtime?: boolean
}

/**
 * React hook for fetching data from Supabase
 */
export function useSupabaseQuery<T>(options: UseSupabaseOptions) {
  const { table, select = '*', filters, orderBy, limit, realtime = false } = options
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase is not configured'))
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const result = await fetchFromTable<T>(table, select, filters, orderBy, limit)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'))
    } finally {
      setLoading(false)
    }
  }, [table, select, JSON.stringify(filters), JSON.stringify(orderBy), limit])

  useEffect(() => {
    fetchData()

    if (realtime) {
      const channel = supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table,
          },
          () => {
            fetchData()
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [fetchData, realtime, table])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

/**
 * React hook for CRUD operations
 */
export function useSupabaseMutation<T>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const insert = useCallback(async (table: string, data: T | T[]) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured')
    }

    try {
      setLoading(true)
      setError(null)
      const result = await insertIntoTable<T>(table, data)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to insert data')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const update = useCallback(async (table: string, id: string | number, updates: Partial<T>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured')
    }

    try {
      setLoading(true)
      setError(null)
      const result = await updateTable<T>(table, id, updates)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update data')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (table: string, id: string | number) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured')
    }

    try {
      setLoading(true)
      setError(null)
      const result = await deleteFromTable(table, id)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete data')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return { insert, update, remove, loading, error }
}



