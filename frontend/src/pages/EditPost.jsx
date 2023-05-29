import React, { useEffect, useState } from 'react'
import Editor from '../Editor'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState('')
  const [content, setContent] = useState('')
  const [redirect, setRedirect] = useState(false)

  const navigateTo = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:3001/post/${id}`).then(res => {
      res.json().then(postInfo => {
        setTitle(postInfo.title)
        setContent(postInfo.content)
        setSummary(postInfo.summary)
      })
    })
  }, [])

  async function updatePost(e) {
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('id', id)
    if (files?.[0]) {
      data.set('file', files?.[0])
    }
    const response = await fetch(`http://localhost:3001/post/${id}`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })
    if (response.ok) {
      setRedirect(true)
    }
  }

  if (redirect) {
    navigateTo('/post/' + id)
  }

  return (
    <form className='w3-margin' onSubmit={updatePost}>
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
        Update post
      </button>
    </form>
  )
}
