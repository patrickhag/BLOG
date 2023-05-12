import React from 'react'
import { format } from 'date-fns'

export default function Blogs({ title, summary, cover, content, createdAt }) {
  return (
    <div
      className='w3-row w3-display-container w3-padding-top'
      style={{ marginTop: '70px' }}
    >
      <img
        src='https://techcrunch.com/wp-content/uploads/2021/11/GettyImages-1236309559.jpg?w=1390&crop=1'
        alt=''
        className='blog--image'
      />
      <div
        className='w3-display-right w3-padding w3-twothird'
        style={{ marginLeft: '30%' }}
      >
        <h3>{title}</h3>
        <span>
          <b> Patrick hag </b>
        </span>
        &nbsp; &nbsp;
        <span className='w3-small w3-opacity'>
          {format(new Date(createdAt), 'MMM d, yyyy HH:mm')}
        </span>
        <p>{summary}</p>
      </div>
    </div>
  )
}
