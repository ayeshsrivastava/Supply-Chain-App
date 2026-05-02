// src/constants/carriers.js
// reliability: 0–1 scale (1 = most reliable)
export const CARRIERS = [
  { name: 'Delhivery',  reliability: 0.92, avgDays: 2.8 },
  { name: 'Ekart',      reliability: 0.87, avgDays: 3.1 },
  { name: 'DTDC',       reliability: 0.80, avgDays: 3.4 },
  { name: 'BlueDart',   reliability: 0.65, avgDays: 5.2 },
  { name: 'India Post', reliability: 0.55, avgDays: 6.0 },
]

export const CARRIER_NAMES = CARRIERS.map(c => c.name)
