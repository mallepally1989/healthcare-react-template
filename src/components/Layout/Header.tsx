
import React from 'react'
import { useAuthStore } from '@store/useAuthStore'

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore()
  return (
    <header className="app-header">
      <h1>{import.meta.env.VITE_APP_NAME || 'Healthcare Portal'}</h1>
      <div className="spacer" />
      {user ? (
        <div className="user-area">
          <span>Signed in as <strong>{user.name}</strong></span>
          <button onClick={logout} className="btn btn-outline">Logout</button>
        </div>
      ) : null}
    </header>
  )
}
