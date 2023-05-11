import React, { useContext, useState } from 'react'

import { Navigate } from 'react-router-dom'
import { userContext } from '../UserContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(userContext)

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })
    if (response.ok) {
      response.json().then(retrieverdUserInfo => {
        setUserInfo(retrieverdUserInfo)
      })
      setRedirect(true)
    } else {
      alert('Access denied')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <form className='form--login' onSubmit={handleSubmit}>
        <h2 className='w3-center'>Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          className='w3-block w3-input w3-border w3-margin-top w3-round'
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          className='w3-block w3-input w3-border w3-margin-top w3-round'
        />
        <button className='w3-button w3-block w3-margin-top w3-round'>
          Login
        </button>
      </form>
    </>
  )
}
