import React, { useEffect, useState } from 'react'
import Blog from '../Blog'

export default function Index() {
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/post')
      .then(res => res.json())
      .then(data => {
        setAllPosts(data)
      })
  }, [])

  return (
    <>
      {allPosts.length > 0 &&
        allPosts.map(post => <Blog key={post._id} {...post} />)}
    </>
  )
}
