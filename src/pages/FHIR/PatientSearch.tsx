
import React, { useState } from 'react'
import { searchPatients } from '@services/fhirClient'

interface Row { id: string; name: string; gender?: string; birthDate?: string }

export default function PatientSearch() {
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await searchPatients(query)
      const entries: any[] = data?.entry || []
      const mapped: Row[] = entries.map((x: any) => {
        const r = x.resource
        const name = Array.isArray(r?.name) && r.name.length > 0
          ? `${(r.name[0].given || []).join(' ')} ${r.name[0].family || ''}`.trim()
          : 'Unknown'
        return { id: r?.id || 'n/a', name, gender: r?.gender, birthDate: r?.birthDate }
      })
      setRows(mapped)
    } catch (err: any) {
      setError(err?.message || 'Failed to search FHIR patients')
      setRows([])
    } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h2>FHIR Patient Search</h2>
        <form onSubmit={onSearch}>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="FHIR query (e.g. name=Smith&gender=male)" style={{ width: '100%' }} />
          <br/>
          <small className="muted">Uses /fhir/Patient?{`{query}`}. Common params: name, birthdate, gender.</small>
          <br/>
          <button className="btn btn-outline" type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
          {error && <p style={{ color: 'salmon' }}>{error}</p>}
        </form>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Gender</th><th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.name}</td><td>{r.gender || '-'}</td><td>{r.birthDate || '-'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="muted">No results yet. Try a search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
