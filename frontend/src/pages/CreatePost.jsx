import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
  })

  function handleChange(e) {
    // console.log(e.target)
    setFormData(prevFormData => {
      // const {name, value} = e.target
      return { ...prevFormData, [e.target.name]: e.target.value }
    })
  }

  console.log(formData.title)

  return (
    <form className='w3-margin'>
      <input
        type='text'
        placeholder='Title'
        className='w3-input w3-border w3-margin w3-round'
        name='title'
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type='text'
        name='summary'
        value={formData.summary}
        onChange={handleChange}
        placeholder='Summary'
        className='w3-input w3-border w3-margin w3-round'
      />
      <input
        type='file'
        name=''
        id=''
        className='w3-input w3-margin w3-round'
      />
      <ReactQuill
        value={formData.content}
        modules={modules}
        formats={formats}
      />
      <button className='w3-button w3-margin-top w3-block w3-dark-grey w3-round'>
        Create post
      </button>
    </form>
  )
}
