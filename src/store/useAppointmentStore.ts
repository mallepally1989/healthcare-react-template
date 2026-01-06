
import { create } from 'zustand'

export interface Appointment {
  id: string
  patientId: string
  datetime: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

interface State {
  items: Appointment[]
  setAppointments: (items: Appointment[]) => void
  addAppointment: (a: Appointment) => void
}

export const useAppointmentStore = create<State>((set) => ({
  items: [],
  setAppointments: (items) => set({ items }),
  addAppointment: (a) => set((s) => ({ items: [a, ...s.items] }))
}))
