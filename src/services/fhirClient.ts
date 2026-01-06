
import axios from 'axios'

export const fhirApi = axios.create({
  baseURL: import.meta.env.VITE_FHIR_BASE_URL || 'http://localhost:5000/fhir',
  timeout: 15000
})

export async function searchPatients(query: string = '') {
  const res = await fhirApi.get(`/Patient${query ? `?${query}` : ''}`)
  return res.data
}
