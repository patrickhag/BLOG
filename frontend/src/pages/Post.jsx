import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { userContext } from '../UserContext'

export default function Post() {
  const navigateTo = useNavigate()
  const { id } = useParams()
  const { userInfo } = useContext(userContext)
  const [postInfo, setPostInfo] = useState(null)

  const author = postInfo?.author._id

  useEffect(() => {
    getPosts()
  }, [])

  function getPosts() {
    fetch(`http://localhost:3001/post/${id}`)
      .then(res => res.json())
      .then(data => setPostInfo(data))
      .catch(error => console.log('Error:', error))
  }

  return (
    <>
      {postInfo && (
        <div style={{ margin: '3%' }}>
          <div className='w3-center'>
            <h2>{postInfo.title}</h2>
            <p className='w3-opacity'>
              {format(new Date(postInfo.createdAt), 'MMM dd, yyyy HH:mm')}
            </p>
            <p>by {postInfo.author.username}</p>
            {userInfo?.id === author && (
              <Link to={`/edit-post/${id}`}>
                <button className='w3-margin-bottom w3-button w3-round'>
                  <i className='fa fa-edit'></i> Edit this post
                </button>
              </Link>
            )}
          </div>
          <img
            src={`http://localhost:3001/${postInfo.cover}`}
            alt=''
            className='w3-image'
          />
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
      )}
    </>
  )
}
