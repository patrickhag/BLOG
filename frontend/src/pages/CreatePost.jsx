import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
import Editor from '../Editor'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function createNewPost(ev) {
    ev.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])

    const response = await fetch('http://localhost:3001/create', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
    if (response.ok) {
      setRedirect(true)
    } else {
      alert('Please login in order to create new post')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  const widthStyle = { width: 505.6 }
  return (
    <form className='w3-margin' onSubmit={createNewPost}>
      <input
        type='text'
        placeholder='Title'
        className='w3-input w3-border w3-margin w3-round'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type='text'
        name='summary'
        value={summary}
        onChange={e => setSummary(e.target.value)}
        placeholder='Summary'
        className='w3-input w3-border w3-margin w3-round'
      />
      <input
        type='file'
        className='w3-input w3-margin w3-round'
        onChange={e => setFiles(e.target.files)}
      />
      <Editor value={content} onChange={setContent} />

      <button className='w3-button w3-margin-top w3-block w3-dark-grey w3-round'>
        Create post
      </button>
    </form>
  )
}
