// src/constants/shipmentStatus.js
export const STATUSES = {
  PLACED:   { key: 'placed',    label: 'Order Placed',     color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
  DISPATCH: { key: 'dispatch',  label: 'Dispatched',       color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  TRANSIT:  { key: 'transit',   label: 'In Transit',       color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  OUTFOR:   { key: 'outfor',    label: 'Out for Delivery', color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  DELIVERED:{ key: 'delivered', label: 'Delivered',        color: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  DELAYED:  { key: 'delayed',   label: 'Delayed',          color: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
}

export const TIMELINE_STEPS = [
  'Order Placed',
  'Dispatched',
  'In Transit',
  'Out for Delivery',
  'Delivered',
]

export const RISK_LEVELS = {
  LOW:    { key: 'low',    label: 'Low Risk',    badge: 'bg-green-50 text-green-700 border-green-200', bar: 'border-l-green-400' },
  MEDIUM: { key: 'medium', label: 'Medium Risk', badge: 'bg-amber-50 text-amber-700 border-amber-200', bar: 'border-l-amber-400' },
  HIGH:   { key: 'high',   label: 'High Risk',   badge: 'bg-red-50 text-red-700 border-red-200',       bar: 'border-l-red-500' },
}
