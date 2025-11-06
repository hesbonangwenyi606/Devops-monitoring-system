import React, { useState } from 'react'
import API from '../api'

export default function Login(){
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [msg, setMsg] = useState('')
  const submit = async e => {
    e.preventDefault()
    try{
      const r = await API.post('/auth/login', { username: u, password: p })
      localStorage.setItem('token', r.data.token)
      setMsg('Logged in — token saved')
    }catch(e){ setMsg('Login failed') }
  }
  return (
    <form onSubmit={submit} style={{ maxWidth: 360 }}>
      <h2>Login</h2>
      <input value={u} onChange={e=>setU(e.target.value)} placeholder='username' />
      <br />
      <input value={p} onChange={e=>setP(e.target.value)} placeholder='password' type='password' />
      <br />
      <button type='submit'>Login</button>
      <div>{msg}</div>
    </form>
  )
}
