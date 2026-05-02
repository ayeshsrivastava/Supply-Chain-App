import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShipments } from '../../context/ShipmentContext'

export default function Navbar() {
  const navigate = useNavigate()

  const {
    rawShipments,
    setSearch
  } = useShipments()

  // 🔔 Notification state
  const [openNotif, setOpenNotif] = useState(false)

  // 👤 Profile state
  const [openProfile, setOpenProfile] = useState(false)

  const notifRef = useRef(null)
  const profileRef = useRef(null)

  // 🔥 Derived data
  const highRisk = rawShipments.filter(s => s.risk === 'high')
  const delayed = rawShipments.filter(s => s.status === 'delayed')
  const total = rawShipments.length

  // 🔥 Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by route or ID..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/2 h-10 px-4 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none"
      />

      <div className="flex items-center gap-4">

        {/* 🔔 Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2 rounded-lg hover:bg-gray-800"
          >
            🔔

            {highRisk.length > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
                {highRisk.length}
              </span>
            )}
          </button>

          {openNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-3 z-50">
              <p className="text-sm font-semibold mb-2">High Risk Shipments</p>

              {highRisk.length === 0 ? (
                <p className="text-xs text-gray-400">No alerts</p>
              ) : (
                highRisk.map(s => (
                  <div key={s.id} className="text-xs py-1 border-b border-gray-700">
                    #{s.id} — {s.source} → {s.destination}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 👤 Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center"
          >
            MR
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 z-50">

              {/* Header */}
              <div className="mb-3">
                <p className="text-sm font-semibold">Manas Raj</p>
                <p className="text-xs text-gray-400">Supply Manager</p>
              </div>

              {/* Stats */}
              <div className="text-xs text-gray-300 space-y-1 mb-3">
                <p>Total Shipments: {total}</p>
                <p>High Risk: {highRisk.length}</p>
                <p>Delayed: {delayed.length}</p>
              </div>

              <div className="border-t border-gray-700 my-2" />

              {/* Actions */}
              <div className="flex flex-col gap-2 text-sm">
                <button
                  onClick={() => {
                    navigate('/analytics')
                    setOpenProfile(false)
                  }}
                  className="text-left hover:text-blue-400"
                >
                  View Analytics
                </button>

                <button
                  onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                  }}
                  className="text-left text-red-400 hover:text-red-500"
                >
                  Logout
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  )
}