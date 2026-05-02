import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useShipments } from '../context/ShipmentContext'
import Timeline from "../components/timeline/Timeline"

export default function ShipmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { rawShipments, deleteShipment } = useShipments()

  const shipment = rawShipments.find(s => String(s.id) === id)

  if (!shipment) {
    return (
      <div className="p-6 text-gray-400">
        Shipment not found
      </div>
    )
  }

  return (
    <div className="p-6">
      
      {/* 🔙 Back */}
      <button
        onClick={() => navigate('/shipments')}
        className="text-blue-400 mb-4"
      >
        ← Back to shipments
      </button>

      {/* 📦 Header */}
      <h1 className="text-2xl font-bold">
        {shipment.source} → {shipment.destination}
      </h1>

      <p className="text-gray-400 mb-6">
        Carrier: {shipment.carrier} · Distance: {shipment.distance} km
      </p>

      {/* 🚚 Timeline */}
      <Timeline status={shipment.status} />

      {/* 🌦 WEATHER DISPLAY (NEW) */}
      {shipment.weather && typeof shipment.weather === 'object' && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Weather Conditions</h3>
          <p>🌡 Temp: {shipment.weather.temperature}°C</p>
          <p>💨 Wind: {shipment.weather.wind} km/h</p>
          <p>🌧 Rain: {shipment.weather.rain} mm</p>
        </div>
      )}

      {/* ⚠️ DELAY PREDICTION (FIXED) */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Delay Prediction
        </h3>

        <p className="text-xl font-bold">
          {shipment.score ?? 0} / 10
        </p>

        <p
          className={`mt-1 ${
            shipment.riskLevel === 'high'
              ? 'text-red-400'
              : shipment.riskLevel === 'medium'
              ? 'text-yellow-400'
              : 'text-green-400'
          }`}
        >
          {shipment.riskLabel || 'No Risk'}
        </p>
      </div>

      {/* 🧩 ACTIONS */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(`/edit/${shipment.id}`)}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Edit Shipment
        </button>

        <button
          onClick={() => {
            deleteShipment(shipment.id)
            navigate('/shipments')
          }}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}