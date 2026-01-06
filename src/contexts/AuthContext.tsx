
import React, { createContext, useContext } from 'react'
import { useAuthStore } from '@store/useAuthStore'

interface AuthContextType { isAuthenticated: boolean }
const AuthContext = createContext<AuthContextType>({ isAuthenticated: false })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthStore()
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
