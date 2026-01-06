
import { useEffect, useState } from 'react'

export function useFetch<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fn()
      .then((d) => mounted && setData(d))
      .catch((e) => mounted && setError(e?.message || 'Error'))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, deps)

  return { data, loading, error }
}
