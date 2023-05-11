import React from 'react'

export default function Blogs() {
  return (
    <div
      className='w3-row w3-display-container w3-padding-top'
      style={{ marginTop: '70px' }}
    >
      <img src='/wedding_location.jpg' alt='' className='blog--image' />
      <div
        className='w3-display-right w3-padding w3-twothird'
        style={{ marginLeft: '30%' }}
      >
        <h3>Full-house battery backup coming later this year</h3>
        <span>
          <b> Patrick hag</b>
        </span>
        &nbsp; &nbsp;
        <span className='w3-wide w3-small w3-opacity'>2023-02-03</span>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          natus harum, odio dolor vitae expedita cumque! Illo iure eveniet
          illum, ipsum rem error laudantium neque!
        </p>
      </div>
    </div>
  )
}
