import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginStatus from './components/LoginStatus'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )

      console.log(user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }


  const BlogsList = (props) => {
    return (
      <div>
        {props.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const addBLog = (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    blogService.create(newBlog)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setNewBlog({
          title: '',
          author: '',
          url: ''
        })
      })
    blogService.setToken(user.token)
  }
  return (
    <div>
      <h2>blogs</h2>

      {user === null ?
        loginForm() :
        <div>
          <LoginStatus user={user} />
          <BlogForm title={newBlog.title} author={newBlog.author} url={newBlog.url} handleBlogChange={handleBlogChange} onSubmit={addBLog} />
          {BlogsList(blogs)}
        </div>}
      {/* {BlogsList(blogs)} */}


    </div>
  )
}

export default App