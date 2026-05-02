// src/pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
      <span className="text-6xl font-semibold text-gray-200 dark:text-gray-700">404</span>
      <p className="text-sm">This page doesn't exist.</p>
      <Link to="/shipments" className="text-sm text-blue-500 hover:underline">← Back to shipments</Link>
    </div>
  )
}
