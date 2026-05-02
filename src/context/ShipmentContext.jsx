import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react'
import { shipmentService } from '../services/shipmentService'
import { predictDelay } from '../utils/delayPredictor'

const ShipmentContext = createContext()

export function ShipmentProvider({ children }) {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [carrierFilter, setCarrierFilter] = useState('all')

  function enrichShipment(s) {
    // Delivered → no risk
    if (s.status === 'delivered') {
      return {
        ...s,
        score: 0,
        riskLevel: 'low',
        riskLabel: 'No Risk'
      }
    }

    const pred = predictDelay(
      Number(s.distance || 0),
      s.weather || {}, // now weather is an object
      s.carrier
    )

    return { ...s, ...pred }
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await shipmentService.getAll()
        setShipments(data.map(enrichShipment))
      } catch (err) {
        console.error(err)
        setError('Failed to load shipments')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const addShipment = useCallback(async (data) => {
    try {
      const created = await shipmentService.create(data)
      const enriched = enrichShipment(created)
      setShipments(prev => [...prev, enriched])
      return created.id
    } catch (err) {
      console.error(err)
      return null
    }
  }, [])

  const updateShipment = useCallback(async (id, updates) => {
    try {
      const updated = await shipmentService.update(id, updates)
      const enriched = enrichShipment(updated)
      setShipments(prev =>
        prev.map(s => (s.id === id ? enriched : s))
      )
    } catch (err) {
      console.error(err)
    }
  }, [])

  const deleteShipment = useCallback(async (id) => {
    try {
      await shipmentService.remove(id)
      setShipments(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      console.error(err)
    }
  }, [])

  const filtered = useMemo(() => {
    return shipments.filter(s => {
      const matchSearch =
        s.source?.toLowerCase().includes(search.toLowerCase()) ||
        s.destination?.toLowerCase().includes(search.toLowerCase()) ||
        String(s.id).includes(search)

      const matchStatus =
        statusFilter === 'all' || s.status === statusFilter

      const matchCarrier =
        carrierFilter === 'all' || s.carrier === carrierFilter

      return matchSearch && matchStatus && matchCarrier
    })
  }, [shipments, search, statusFilter, carrierFilter])

  return (
    <ShipmentContext.Provider
      value={{
        shipments: filtered,
        rawShipments: shipments,
        loading,
        error,

        addShipment,
        updateShipment,
        deleteShipment,

        setSearch,
        setStatusFilter,
        setCarrierFilter
      }}
    >
      {children}
    </ShipmentContext.Provider>
  )
}

export function useShipments() {
  return useContext(ShipmentContext)
}