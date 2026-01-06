
import React, { useState } from 'react'
import api from '@services/apiClient'
import { useAppointmentStore } from '@store/useAppointmentStore'

export default function Scheduler() {
  const [patientId, setPatientId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [status, setStatus] = useState<'scheduled' | 'completed' | 'cancelled'>('scheduled')
  const [message, setMessage] = useState<string | null>(null)
  const { addAppointment } = useAppointmentStore()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const datetime = new Date(`${date}T${time}`).toISOString()
    const payload = { patientId, datetime, status }
    try {
      const res = await api.post('/api/appointments', payload)
      const saved = res.data || { id: Math.random().toString(36).slice(2), ...payload }
      addAppointment(saved)
      setMessage('Appointment scheduled successfully.')
      setPatientId(''); setDate(''); setTime(''); setStatus('scheduled')
    } catch (err) {
      const local = { id: Math.random().toString(36).slice(2), ...payload }
      addAppointment(local)
      setMessage('Appointment scheduled locally (API not available).')
    }
  }

  return (
    <div className="card" style={{ maxWidth: 520 }}>
      <h2>Schedule Appointment</h2>
      <form onSubmit={onSubmit}>
        <label>Patient ID<br/>
          <input value={patientId} onChange={e => setPatientId(e.target.value)} required />
        </label>
        <br/>
        <label>Date<br/>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </label>
        <br/>
        <label>Time<br/>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
        </label>
        <br/>
        <label>Status<br/>
          <select value={status} onChange={e => setStatus(e.target.value as any)}>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <br/>
        <button className="btn btn-outline" type="submit">Create</button>
      </form>
      {message && <p style={{ color: '#22c55e' }}>{message}</p>}
      <p className="muted">Note: Validate patient existence and permissions on the server.</p>
    </div>
  )
}
