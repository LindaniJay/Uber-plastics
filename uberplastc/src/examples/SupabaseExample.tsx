'use client'

/**
 * Example component demonstrating how to use Supabase in your EcoTrack application
 * 
 * This is just an example - replace 'users' with your actual table names
 */

import { useSupabaseQuery, useSupabaseMutation } from '@/hooks/useSupabase'
import { useState } from 'react'

// Define your table type based on your Supabase schema
interface User {
  id: string
  name: string
  email: string
  created_at?: string
}

export function SupabaseExample() {
  // Example 1: Fetch data using the hook
  const { data: users, loading, error, refetch } = useSupabaseQuery<User>({
    table: 'users',
    select: '*',
    // Optional filters
    // filters: { status: 'active' },
    // Optional ordering
    orderBy: { column: 'created_at', ascending: false },
    // Optional limit
    limit: 10,
    // Optional real-time updates
    realtime: false,
  })

  // Example 2: Mutation operations
  const { insert, update, remove, loading: mutating } = useSupabaseMutation<User>()
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')

  const handleInsert = async () => {
    try {
      await insert('users', {
        name: newUserName,
        email: newUserEmail,
      } as User)
      setNewUserName('')
      setNewUserEmail('')
      refetch() // Refresh the list
      alert('User created successfully!')
    } catch (err) {
      alert('Failed to create user: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const handleUpdate = async (userId: string) => {
    try {
      await update('users', userId, { name: 'Updated Name' })
      refetch() // Refresh the list
      alert('User updated successfully!')
    } catch (err) {
      alert('Failed to update user: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      await remove('users', userId)
      refetch() // Refresh the list
      alert('User deleted successfully!')
    } catch (err) {
      alert('Failed to delete user: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  if (loading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Integration Example</h1>
      
      {/* Create New User */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Create New User</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleInsert}
            disabled={mutating || !newUserName || !newUserEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {mutating ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Users List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <strong>{user.name}</strong> - {user.email}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}



