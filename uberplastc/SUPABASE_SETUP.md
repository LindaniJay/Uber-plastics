# Supabase Setup Guide

This guide will help you connect your EcoTrack application to your Supabase database.

## Step 1: Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (this will be your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this will be your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root of the `ecotrack` directory (if it doesn't exist)
2. Copy the contents from `env.example`
3. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Never commit `.env.local` to git. It should already be in `.gitignore`.

## Step 3: Use Supabase in Your Application

### Basic Usage Example

```typescript
import { fetchFromTable, insertIntoTable, updateTable } from '@/services/supabaseService'

// Fetch all records from a table
const users = await fetchFromTable('users')

// Fetch with filters
const activeUsers = await fetchFromTable('users', '*', { status: 'active' })

// Fetch with ordering and limit
const recentPosts = await fetchFromTable(
  'posts',
  '*',
  undefined,
  { column: 'created_at', ascending: false },
  10
)

// Insert a new record
const newUser = await insertIntoTable('users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// Update a record
const updated = await updateTable('users', userId, {
  name: 'Jane Doe'
})

// Get a single record by ID
import { getById } from '@/services/supabaseService'
const user = await getById('users', userId)
```

### Using the Supabase Client Directly

For more advanced queries, you can use the Supabase client directly:

```typescript
import { supabase } from '@/lib/supabase'

// Complex query with joins
const { data, error } = await supabase
  .from('users')
  .select(`
    *,
    posts (*),
    profiles (*)
  `)
  .eq('status', 'active')

// Real-time subscriptions
const channel = supabase
  .channel('users_changes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'users'
  }, (payload) => {
    console.log('New user added:', payload.new)
  })
  .subscribe()
```

### React Component Example

```typescript
'use client'

import { useEffect, useState } from 'react'
import { fetchFromTable } from '@/services/supabaseService'

interface User {
  id: string
  name: string
  email: string
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchFromTable<User>('users')
      setUsers(data)
      setLoading(false)
    }
    loadUsers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name} - {user.email}</div>
      ))}
    </div>
  )
}
```

## Step 4: Row Level Security (RLS)

Make sure to configure Row Level Security policies in your Supabase dashboard for each table to control access:

1. Go to **Authentication** → **Policies** in your Supabase dashboard
2. Create policies for your tables based on your access requirements
3. Test your policies to ensure they work as expected

## Available Functions

The `supabaseService.ts` provides the following helper functions:

- `fetchFromTable()` - Fetch data with optional filters, ordering, and limits
- `insertIntoTable()` - Insert new records
- `updateTable()` - Update existing records
- `deleteFromTable()` - Delete records
- `getById()` - Get a single record by ID
- `subscribeToTable()` - Subscribe to real-time changes

For more advanced queries, use the `supabase` client directly from `@/lib/supabase`.

## Troubleshooting

### "Supabase is not configured" error

- Make sure you've created `.env.local` file
- Verify your environment variables are correctly set
- Restart your development server after adding environment variables

### Connection errors

- Verify your Supabase URL and key are correct
- Check your Supabase project is active and not paused
- Ensure your network allows connections to Supabase

### RLS Policy errors

- Check your Row Level Security policies in Supabase dashboard
- Ensure your policies allow the operations you're trying to perform
- Verify you're authenticated if your policies require authentication



