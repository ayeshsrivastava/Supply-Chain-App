import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useShipments } from '../context/ShipmentContext'
import ShipmentList from '../components/shipment/ShipmentList'
import Loader from '../components/common/Loader'

export default function Home() {
  const navigate = useNavigate()

  const {
    shipments,
    rawShipments,
    loading,
    error,
    setStatusFilter,
    setCarrierFilter
  } = useShipments()

  if (loading) return <Loader text="Loading shipments…" />
  if (error) return <p className="text-red-500">{error}</p>

  const total = rawShipments.length
  const highRisk = rawShipments.filter(s => s.risk === 'high').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Shipments
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {total} total · {highRisk} high risk · updated just now
          </p>
        </div>

        <button
          onClick={() => navigate('/add')}
          className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
        >
          + Add Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="placed">Order Placed</option>
          <option value="dispatch">Dispatched</option>
          <option value="transit">In Transit</option>
          <option value="outfor">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="delayed">Delayed</option>
        </select>

        {/* Carrier Filter */}
        <select
          onChange={(e) => setCarrierFilter(e.target.value)}
          className="h-9 px-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <option value="all">All Carriers</option>
          <option value="BlueDart">BlueDart</option>
          <option value="DTDC">DTDC</option>
          <option value="Delhivery">Delhivery</option>
        </select>

        {/* Result Count */}
        <span className="ml-auto text-xs text-gray-400">
          {shipments.length} results
        </span>
      </div>

      {/* List */}
      <ShipmentList shipments={shipments} />
    </div>
  )
}