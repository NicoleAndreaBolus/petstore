import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline } from '@mui/material'
import { CartProvider } from './context/CartContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* This CartProvider is what prevents the white screen crash! */}
    <CartProvider>
      <CssBaseline />
      <App />
    </CartProvider>
  </React.StrictMode>,
)