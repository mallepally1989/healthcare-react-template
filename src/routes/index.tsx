
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '@pages/Dashboard'
import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'
import PatientList from '@pages/Patients/PatientList'
import PatientDetail from '@pages/Patients/PatientDetail'
import AppointmentList from '@pages/Appointments/AppointmentList'
import Scheduler from '@pages/Appointments/Scheduler'
import PatientSearch from '@pages/FHIR/PatientSearch'
import { ProtectedRoute } from '@components/common/ProtectedRoute'

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/"
      element={
        <ProtectedRoute roles={["admin", "clinician", "staff"]}>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/patients"
      element={
        <ProtectedRoute roles={["admin", "clinician", "staff"]}>
          <PatientList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/patients/:id"
      element={
        <ProtectedRoute roles={["admin", "clinician", "staff"]}>
          <PatientDetail />
        </ProtectedRoute>
      }
    />

    <Route
      path="/appointments"
      element={
        <ProtectedRoute roles={["admin", "clinician", "staff"]}>
          <AppointmentList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/appointments/schedule"
      element={
        <ProtectedRoute roles={["admin", "clinician", "staff"]}>
          <Scheduler />
        </ProtectedRoute>
      }
    />

    <Route
      path="/fhir/patients"
      element={
        <ProtectedRoute roles={["admin", "clinician", "staff"]}>
          <PatientSearch />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)
