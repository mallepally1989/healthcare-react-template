
import React, { useEffect } from 'react'
import api from '@services/apiClient'
import { useAppointmentStore, Appointment } from '@store/useAppointmentStore'

export default function AppointmentList() {
  const { items, setAppointments } = useAppointmentStore()

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/api/appointments')
        setAppointments(res.data)
      } catch (e) {
        const seed: Appointment[] = [
          { id: 'a1', patientId: '1', datetime: new Date().toISOString(), status: 'scheduled' },
          { id: 'a2', patientId: '2', datetime: new Date().toISOString(), status: 'completed' }
        ]
        setAppointments(seed)
      }
    }
    load()
  }, [setAppointments])

  return (
    <div className="card">
      <h2>Appointments</h2>
      <p className="muted">Use the scheduler to add a new appointment.</p>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Patient</th><th>Date/Time</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.patientId}</td>
              <td>{new Date(a.datetime).toLocaleString()}</td>
              <td>{a.status}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={4} className="muted">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
