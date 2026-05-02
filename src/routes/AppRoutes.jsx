// src/routes/AppRoutes.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import AddShipment from '../pages/AddShipment'
import ShipmentDetails from '../pages/ShipmentDetails'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/shipments" replace />} />
          <Route path="shipments"         element={<Home />} />
          <Route path="shipments/:id"     element={<ShipmentDetails />} />
          <Route path="dashboard"         element={<Dashboard />} />
          <Route path="add"               element={<AddShipment />} />
          <Route path="*"                 element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
