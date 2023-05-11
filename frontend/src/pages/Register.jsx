import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigateTo = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    console.log(123)
    e.preventDefault()
    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.status === 200) {
      navigateTo('/login')
    } else {
      alert('Access denied')
    }
  }

  return (
    <>
      <form className='form--register' onSubmit={handleSubmit}>
        <h2 className='w3-center'>Register</h2>
        <input
          type='text'
          name='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Username'
          className='w3-block w3-input w3-border w3-margin-top w3-round'
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          className='w3-block w3-input w3-border w3-margin-top w3-round'
        />
        <button className='w3-button w3-block w3-margin-top w3-round'>
          Register
        </button>
      </form>
    </>
  )
}
