// src/components/shipment/ShipmentList.jsx
import React, { useMemo } from 'react'
import ShipmentCard from './ShipmentCard'

export default function ShipmentList({ shipments }) {
  if (!shipments.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        <svg className="mx-auto mb-3 opacity-40" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M4 15h32" stroke="currentColor" strokeWidth="2"/>
          <path d="M14 22h12M14 27h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="text-sm">No shipments match your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {shipments.map(s => <ShipmentCard key={s.id} shipment={s} />)}
    </div>
  )
}
