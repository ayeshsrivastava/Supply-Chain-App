import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShipments } from '../../context/ShipmentContext'
import { getWeatherByCity } from '../../services/weatherService'

const STATUS_STEPS = [
  { key: 'placed', label: 'Order Placed' },
  { key: 'dispatch', label: 'Dispatched' },
  { key: 'transit', label: 'In Transit' },
  { key: 'outfor', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' }
]

const FIELD =
  "w-full h-10 px-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"

export default function ShipmentForm() {
  const { addShipment } = useShipments()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    source: '',
    destination: '',
    carrier: 'Delhivery',
    distance: '',
    dispatchDate: '',
    expectedDate: '',
    status: 'placed'
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function formatCity(city) {
    return city
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const city = formatCity(form.destination)

      console.log("Fetching weather for:", city)

      // 🔥 Always safe (no crash)
      const weather = await getWeatherByCity(city + ", India")

      console.log("Weather result:", weather)

      const payload = {
        ...form,
        distance: Number(form.distance),
        weather
      }

      const id = await addShipment(payload)
      if (!id) return

      navigate(`/shipments/${id}`)

    } catch (err) {
      console.error("Form submit error:", err)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl max-w-3xl">
      <h2 className="text-lg font-semibold mb-5">Add Shipment</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Source + Destination */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="source"
            value={form.source}
            onChange={handleChange}
            className={FIELD}
            placeholder="Source city"
            required
          />
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className={FIELD}
            placeholder="Destination city"
            required
          />
        </div>

        {/* Carrier + Distance */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="carrier"
            value={form.carrier}
            onChange={handleChange}
            className={FIELD}
          >
            <option>Delhivery</option>
            <option>BlueDart</option>
            <option>DTDC</option>
            <option>India Post</option>
          </select>

          <input
            type="number"
            name="distance"
            value={form.distance}
            onChange={handleChange}
            className={FIELD}
            placeholder="Distance (km)"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="dispatchDate"
            value={form.dispatchDate}
            onChange={handleChange}
            className={FIELD}
          />
          <input
            type="date"
            name="expectedDate"
            value={form.expectedDate}
            onChange={handleChange}
            className={FIELD}
          />
        </div>

        {/* Status */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Shipment Status</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_STEPS.map(step => (
              <button
                key={step.key}
                type="button"
                onClick={() =>
                  setForm(prev => ({ ...prev, status: step.key }))
                }
                className={`px-3 py-1 rounded-full text-xs ${
                  form.status === step.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            {loading ? 'Fetching Weather...' : 'Create Shipment'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/shipments')}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}