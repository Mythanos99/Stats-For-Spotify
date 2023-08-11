import React from 'react'
import Login from './Login' 
import Dashboard from './Dashboard'
import 'bootstrap/dist/css/bootstrap.css';

const code = new URLSearchParams(window.location.search).get('code')
export default function App() {
  return (
      code? <Dashboard code={code}/>: <Login/>
  )
}


