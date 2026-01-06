
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar: React.FC = () => (
  <aside className="app-sidebar">
    <nav>
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/patients">Patients</NavLink>
      <NavLink to="/appointments">Appointments</NavLink>
      <NavLink to="/appointments/schedule">Schedule</NavLink>
      <NavLink to="/fhir/patients">FHIR Patients</NavLink>
    </nav>
  </aside>
)
