
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/useAuthStore'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Replace with backend auth
    login({ id: '1', name: 'Dr. Jane Doe', role: 'clinician' }, 'fake-jwt-token')
    navigate('/')
  }

  return (
    <div className="card" style={{ maxWidth: 420 }}>
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        <label>Email<br/>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </label>
        <br/>
        <label>Password<br/>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </label>
        <br/>
        <button className="btn btn-outline" type="submit">Login</button>
      </form>
    </div>
  )
}
