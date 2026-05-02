// src/services/shipmentService.js
// Swap BASE_URL to your JSON Server or real API endpoint
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({ baseURL: BASE_URL })

export const shipmentService = {
  getAll:    ()       => api.get('/shipments').then(r => r.data),
  getById:   (id)     => api.get(`/shipments/${id}`).then(r => r.data),
  create:    (data)   => api.post('/shipments', data).then(r => r.data),
  update:    (id, d)  => api.put(`/shipments/${id}`, d).then(r => r.data),
  remove:    (id)     => api.delete(`/shipments/${id}`).then(r => r.data),
}
