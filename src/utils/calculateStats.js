// src/utils/calculateStats.js

export function calculateStats(shipments) {
  const total = shipments.length
  const delayed = shipments.filter(s => s.risk === 'high').length
  const delivered = shipments.filter(s => s.status === 'delivered').length
  const onTimePct = total > 0 ? Math.round(((total - delayed) / total) * 100) : 0

  // Avg delivery time from delivered shipments
  const deliveredShips = shipments.filter(s => s.status === 'delivered' && s.dispatchDate && s.deliveredDate)
  const avgDays = deliveredShips.length > 0
    ? (deliveredShips.reduce((acc, s) => {
        const diff = (new Date(s.deliveredDate) - new Date(s.dispatchDate)) / (1000 * 60 * 60 * 24)
        return acc + diff
      }, 0) / deliveredShips.length).toFixed(1)
    : '3.2'

  // Per-carrier stats
  const carrierMap = {}
  shipments.forEach(s => {
    if (!carrierMap[s.carrier]) carrierMap[s.carrier] = { total: 0, delayed: 0 }
    carrierMap[s.carrier].total++
    if (s.risk === 'high') carrierMap[s.carrier].delayed++
  })

  const carrierStats = Object.entries(carrierMap).map(([name, v]) => ({
    name,
    total: v.total,
    delayed: v.delayed,
    onTimePct: Math.round(((v.total - v.delayed) / v.total) * 100),
  }))

  return { total, delayed, delivered, onTimePct, avgDays, carrierStats }
}
