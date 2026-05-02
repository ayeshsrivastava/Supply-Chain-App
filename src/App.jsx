import React from 'react'
import { ShipmentProvider } from './context/ShipmentContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <ThemeProvider>
      <ShipmentProvider>
        <AppRoutes />
      </ShipmentProvider>
    </ThemeProvider>
  )
}
