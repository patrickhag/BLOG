import React, { useEffect, useState } from 'react'
import { useContext } from 'react'

import { Link } from 'react-router-dom'
import { userContext } from './UserContext'

export default function Header() {
  const { userInfo, setUserInfo } = useContext(userContext)

  useEffect(() => {
    if (userInfo?.username) {
      fetch('http://localhost:3001/profile', {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => setUserInfo(data))
    }
  }, [userInfo?.username])

  function logout() {
    fetch('http://localhost:3001/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <div className='w3-bar'>
      <header className='w3-medium w3-right'>
        {username && (
          <>
            <Link to='/create-new-post' className='w3-bar-item'>
              Create new post
            </Link>
            <Link onClick={logout} className='w3-bar-item'>
              Logout ({username})
            </Link>
          </>
        )}
        {!username && (
          <>
            <Link to='/login' className='w3-bar-item'>
              Login
            </Link>
            <Link to='/register' className='w3-bar-item'>
              Register
            </Link>
          </>
        )}
      </header>
      <a href='/' className='w3-xlarge'>
        Tix's blog
      </a>
    </div>
  )
}
