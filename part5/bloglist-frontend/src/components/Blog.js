import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    updateLikes({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const deleteThis = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='blog-basic' style={hideWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button id='view-btn' onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div className='blog-detail' style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div className='blog-detail'>{blog.url}</div>
        <div className='blog-detail'>
          likes: {blog.likes}
          <button id='like-btn' onClick={addLike} style={{ color: '#0000FF' }}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <button onClick={deleteThis} style={{ color: '#FF0000' }}>remove</button>
      </div>
    </div>
  )

}

export default Blog
