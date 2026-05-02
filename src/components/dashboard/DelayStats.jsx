// src/components/dashboard/DelayStats.jsx
import React from 'react'

export default function DelayStats({ carrierStats }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Carrier performance</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800">
            <th className="text-left pb-2 font-medium">Carrier</th>
            <th className="text-right pb-2 font-medium">Shipments</th>
            <th className="text-right pb-2 font-medium">Delayed</th>
            <th className="text-right pb-2 font-medium">On-time %</th>
          </tr>
        </thead>
        <tbody>
          {carrierStats.map(c => (
            <tr key={c.name} className="border-b border-gray-50 dark:border-gray-800/60 last:border-0">
              <td className="py-2.5 font-medium text-gray-900 dark:text-white">{c.name}</td>
              <td className="py-2.5 text-right text-gray-500">{c.total}</td>
              <td className="py-2.5 text-right text-gray-500">{c.delayed}</td>
              <td className={`py-2.5 text-right font-semibold ${c.onTimePct >= 85 ? 'text-green-600' : c.onTimePct >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
                {c.onTimePct}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
