
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@services/apiClient'

interface PatientDetail { id: string; name: string; gender?: string; dob?: string; address?: string }

export default function PatientDetail() {
  const { id } = useParams()
  const [patient, setPatient] = useState<PatientDetail | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/api/patients/${id}`)
        setPatient(res.data)
      } catch (e) {
        setPatient({ id: id || '', name: 'Unknown', gender: 'unknown', dob: '', address: '' })
      }
    }
    load()
  }, [id])

  return (
    <div className="card">
      <h2>Patient Detail</h2>
      {patient ? (
        <div>
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Address:</strong> {patient.address}</p>
        </div>
      ) : (<p className="muted">Loading...</p>)}
    </div>
  )
}
