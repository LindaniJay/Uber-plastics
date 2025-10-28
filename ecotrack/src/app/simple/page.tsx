'use client'

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Simple Test Page
      </h1>
      <p className="text-lg text-gray-600">
        This is a minimal page without any complex components or contexts.
      </p>
      <div className="mt-8 p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">
          If you can see this page, the basic Next.js setup is working.
        </p>
      </div>
    </div>
  )
}