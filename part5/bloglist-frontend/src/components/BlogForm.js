import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div className='formDiv'>
      <h3>New Blog</h3>
      <form onSubmit={addBlog}>
        <div >
          title: <input id='title' name="title" value={newBlog.title} onChange={handleBlogChange} />
        </div>
        <div >
          author: <input id='author' name="author" value={newBlog.author} onChange={handleBlogChange} />
        </div>
        <div >
          url: <input id = 'url' name="url" value={newBlog.url} onChange={handleBlogChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm