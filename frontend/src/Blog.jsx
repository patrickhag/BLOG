import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Blogs({
  _id,
  cover,
  title,
  summary,
  createdAt,
  author,
}) {
  return (
    <div
      className='w3-row w3-display-container w3-padding-top'
      style={{ marginTop: '70px' }}
    >
      <Link to={`/post/${_id}`}>
        <img
          src={`http://localhost:3001/${cover}`}
          alt=''
          className='blog--image'
        />
        <div
          style={{ marginLeft: '30%' }}
          className='w3-display-right w3-padding w3-twothird'
        >
          <h3>{title}</h3>
          <span>
            <b> {author.username} </b>
          </span>
          &nbsp; &nbsp;
          <span className='w3-small w3-opacity'>
            {format(new Date(createdAt), 'MMM d, yyyy HH:mm')}
          </span>
          <p>{summary}</p>
        </div>
      </Link>
    </div>
  )
}
