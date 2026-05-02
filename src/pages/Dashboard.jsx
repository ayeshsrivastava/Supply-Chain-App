import React, { useMemo } from 'react'
import { useShipments } from '../context/ShipmentContext'
import Loader from '../components/common/Loader'
import KpiCard from '../components/dashboard/KpiCard'
import {
  DelayBarChart,
  OnTimePieChart,
  TrendLineChart
} from '../components/dashboard/Charts'
import DelayStats from '../components/dashboard/DelayStats'
import { calculateStats } from '../utils/calculateStats'

export default function Dashboard() {
  const { rawShipments, loading, error } = useShipments()

  if (loading) return <Loader text="Loading analytics…" />
  if (error) return <p className="text-red-500">{error}</p>

  const stats = useMemo(() => calculateStats(rawShipments), [rawShipments])

  // Prepare chart data
  const barData = stats.carrierStats.map(c => ({
    name: c.name,
    delayed: c.delayed
  }))

  const trendData = [
    { day: 'Mon', delivered: 2, delayed: 1 },
    { day: 'Tue', delivered: 3, delayed: 1 },
    { day: 'Wed', delivered: 2, delayed: 2 },
    { day: 'Thu', delivered: 4, delayed: 1 },
    { day: 'Fri', delivered: 5, delayed: 1 },
    { day: 'Sat', delivered: 3, delayed: 2 },
    { day: 'Sun', delivered: 2, delayed: 1 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Carrier performance & delivery trends
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Shipments" value={stats.total} />
        <KpiCard label="Delayed" value={stats.delayed} accent="text-red-500" />
        <KpiCard label="Avg Delivery" value={`${stats.avgDays}d`} />
        <KpiCard label="On-time %" value={`${stats.onTimePct}%`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DelayBarChart data={barData} />
        <OnTimePieChart
          onTime={stats.total - stats.delayed}
          delayed={stats.delayed}
        />
      </div>

      <TrendLineChart data={trendData} />

      {/* Table */}
      <DelayStats carrierStats={stats.carrierStats} />
    </div>
  )
}