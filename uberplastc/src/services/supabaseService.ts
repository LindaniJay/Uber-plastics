import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/**
 * Supabase Database Service
 * Provides functions to interact with Supabase tables
 */

// Generic function to fetch data from a table
export async function fetchFromTable<T>(
  tableName: string,
  select: string = '*',
  filters?: Record<string, any>,
  orderBy?: { column: string; ascending?: boolean },
  limit?: number
): Promise<T[]> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured. Please set your environment variables.')
    return []
  }

  try {
    let query = supabase.from(tableName).select(select)

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })
    }

    // Apply ordering if provided
    if (orderBy) {
      query = query.order(orderBy.column, {
        ascending: orderBy.ascending ?? true,
      })
    }

    // Apply limit if provided
    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error)
      throw error
    }

    return data as T[]
  } catch (error) {
    console.error(`Failed to fetch from ${tableName}:`, error)
    return []
  }
}

// Insert data into a table
export async function insertIntoTable<T>(
  tableName: string,
  data: T | T[]
): Promise<T[]> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured. Please set your environment variables.')
    return []
  }

  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select()

    if (error) {
      console.error(`Error inserting into ${tableName}:`, error)
      throw error
    }

    return insertedData as T[]
  } catch (error) {
    console.error(`Failed to insert into ${tableName}:`, error)
    return []
  }
}

// Update data in a table
export async function updateTable<T>(
  tableName: string,
  id: string | number,
  updates: Partial<T>
): Promise<T | null> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured. Please set your environment variables.')
    return null
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating ${tableName}:`, error)
      throw error
    }

    return data as T
  } catch (error) {
    console.error(`Failed to update ${tableName}:`, error)
    return null
  }
}

// Delete data from a table
export async function deleteFromTable(
  tableName: string,
  id: string | number
): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured. Please set your environment variables.')
    return false
  }

  try {
    const { error } = await supabase.from(tableName).delete().eq('id', id)

    if (error) {
      console.error(`Error deleting from ${tableName}:`, error)
      throw error
    }

    return true
  } catch (error) {
    console.error(`Failed to delete from ${tableName}:`, error)
    return false
  }
}

// Get a single record by ID
export async function getById<T>(
  tableName: string,
  id: string | number
): Promise<T | null> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured. Please set your environment variables.')
    return null
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error(`Error fetching ${tableName} by id:`, error)
      return null
    }

    return data as T
  } catch (error) {
    console.error(`Failed to fetch ${tableName} by id:`, error)
    return null
  }
}

// Real-time subscription helper
export function subscribeToTable<T>(
  tableName: string,
  callback: (payload: any) => void,
  filter?: string
) {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured. Please set your environment variables.')
    return { unsubscribe: () => {} }
  }

  const channel = supabase
    .channel(`${tableName}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: tableName,
        filter: filter,
      },
      callback
    )
    .subscribe()

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel)
    },
  }
}



