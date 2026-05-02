import React from 'react'

const STEPS = [
  { key: 'placed', label: 'Order Placed' },
  { key: 'dispatch', label: 'Dispatched' },
  { key: 'transit', label: 'In Transit' },
  { key: 'outfor', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' }
]

export default function Timeline({ status }) {
  // 🔥 normalize status (handles bad data automatically)
  const normalize = (s) => {
    if (!s) return 'placed'

    const map = {
      'Order Placed': 'placed',
      'Dispatched': 'dispatch',
      'In Transit': 'transit',
      'Out for Delivery': 'outfor',
      'Delivered': 'delivered'
    }

    return map[s] || s
  }

  const currentStatus = normalize(status)

  const currentIndex = STEPS.findIndex(
    step => step.key === currentStatus
  )

  return (
    <div className="space-y-4">
      {STEPS.map((step, index) => {
        let state = 'pending'

        if (index < currentIndex) state = 'completed'
        else if (index === currentIndex) state = 'current'

        return (
          <div key={step.key} className="flex items-start gap-3">
            {/* Dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full
                  ${state === 'completed'
                    ? 'bg-green-500'
                    : state === 'current'
                    ? 'bg-blue-500'
                    : 'bg-gray-600'
                  }`}
              />
              {index !== STEPS.length - 1 && (
                <div className="w-[2px] h-10 bg-gray-700 mt-1" />
              )}
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-medium">
                {step.label}
              </p>
              <p className="text-xs text-gray-400">
                {state === 'completed'
                  ? 'Completed'
                  : state === 'current'
                  ? 'In progress'
                  : 'Pending'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}