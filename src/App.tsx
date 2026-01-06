
import React from 'react'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/AuthContext'
import './styles/global.css'

export default function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="app-content">
            <AppRoutes />
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}
