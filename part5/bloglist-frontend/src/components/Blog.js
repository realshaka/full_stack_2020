import React, { useState } from 'react'
const Blog = ({ blog }) => {
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
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button>like</button>
          </div>
        <div>{blog.user.username}</div>
      </div>
    </div>
  )

}

export default Blog
