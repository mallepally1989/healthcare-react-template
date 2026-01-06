
import React, { useMemo, useState } from 'react'
import api from '@services/apiClient'
import patientsMock from '@mocks/data/patients.json'

interface Patient { id: string; name: string; gender?: string; dob?: string }

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>(patientsMock as Patient[])
  const [query, setQuery] = useState('')

  async function load() {
    try {
      const res = await api.get('/api/patients')
      setPatients(res.data)
    } catch (e) {
      setPatients(patientsMock as Patient[])
    }
  }

  React.useEffect(() => { load() }, [])
  const filtered = useMemo(() => patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase())), [patients, query])

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h2>Patients</h2>
        <input placeholder="Search by name" value={query} onChange={e => setQuery(e.target.value)} />
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Gender</th><th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><a href={`/patients/${p.id}`}>{p.name}</a></td>
                <td>{p.gender || '-'}</td>
                <td>{p.dob || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
