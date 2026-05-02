// src/pages/AddShipment.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import ShipmentForm from '../components/shipment/ShipmentForm'

export default function AddShipment() {
  return (
    <div className="page-enter">
      <Link to="/shipments" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to shipments
      </Link>

      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Add shipment</h1>
      <p className="text-sm text-gray-400 mb-6">Enter details to start tracking and get a delay prediction</p>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
        <ShipmentForm />
      </div>
    </div>
  )
}
