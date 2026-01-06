
import { create } from 'zustand'

interface User { id: string; name: string; role: 'admin' | 'clinician' | 'staff' | 'patient' }
interface State {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<State>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null })
}))
