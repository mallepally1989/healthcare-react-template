
import React from 'react'
export default function Dashboard() {
  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p className="muted">Welcome to the Healthcare Portal.</p>
      <ul>
        <li>Patients: view & search</li>
        <li>Appointments: schedule & track</li>
        <li>FHIR: connect to standardized resources</li>
      </ul>
    </div>
  )
}
