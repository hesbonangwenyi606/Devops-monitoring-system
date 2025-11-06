import React, { useEffect, useState } from 'react'
import API from '../api'

export default function Dashboard(){
  const [nodes, setNodes] = useState([])
  useEffect(()=>{
    const t = async ()=>{
      try{
        const token = localStorage.getItem('token')
        const r = await API.get('/nodes', { headers: { Authorization: `Bearer ${token}` } })
        setNodes(r.data)
      }catch(e){ console.error(e) }
    }
    t()
  },[])

  return (
    <div>
      <h2>Nodes</h2>
      {nodes.length===0 ? <div>No nodes found</div> : (
        <ul>{nodes.map(n=> <li key={n.id}>{n.name} — {n.ip} — {n.status} — Alerts: {n.alerts.length}</li>)}</ul>
      )}
      <h3>Grafana</h3>
      <iframe title='grafana' src='http://localhost:3000/d/000000012/prometheus-overview' style={{ width: '100%', height: 400 }} />
    </div>
  )
}
