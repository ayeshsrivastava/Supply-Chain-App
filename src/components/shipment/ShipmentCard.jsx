// src/components/shipment/ShipmentCard.jsx
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatShort } from '../../utils/formatDate'
import { STATUSES, RISK_LEVELS } from '../../constants/shipmentStatus'

const RISK_BORDER = { high: 'border-l-red-500', medium: 'border-l-amber-400', low: 'border-l-green-400' }
const PROGRESS_COLOR = { high: 'bg-red-400', medium: 'bg-amber-400', low: 'bg-blue-500' }

const ShipmentCard = memo(function ShipmentCard({ shipment }) {
  const navigate = useNavigate()
  const { id, source, destination, carrier, distance, status, risk, expectedDate, total } = shipment

  const statusInfo = Object.values(STATUSES).find(s => s.key === status) || STATUSES.TRANSIT
  const riskInfo   = RISK_LEVELS[risk?.toUpperCase()] || RISK_LEVELS.LOW

  // Progress % based on step
  const stepPct = { placed: 10, dispatch: 30, transit: 55, outfor: 80, delivered: 100, delayed: 55 }
  const progress = stepPct[status] || 10

  return (
    <div
      onClick={() => navigate(`/shipments/${id}`)}
      className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 border-l-4 ${RISK_BORDER[risk]} rounded-xl p-4 cursor-pointer card-hover select-none`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">#{id}</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${riskInfo.badge}`}>
          {riskInfo.label}
        </span>
      </div>

      {/* Route */}
      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
        {source} → {destination}
      </div>
      <div className="text-xs text-gray-400 mb-3">{carrier} · {distance.toLocaleString()} km · Score {total}</div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full progress-animate ${PROGRESS_COLOR[risk]}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
        <span className="text-[11px] text-gray-400">ETA {formatShort(expectedDate)}</span>
      </div>
    </div>
  )
})

export default ShipmentCard
