// src/components/dashboard/KpiCard.jsx
import React from 'react'

export default function KpiCard({ label, value, sub, accent }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4">
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">{label}</div>
      <div className={`text-3xl font-semibold ${accent || 'text-gray-900 dark:text-white'}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}
