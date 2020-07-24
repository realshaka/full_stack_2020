import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginStatus from './components/LoginStatus'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

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

      blogService.setToken(user.token)
      notifyWith("Login Successful")
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notifyWith(error.response.data.error, 'error')
      //console.log(error.response.data.error)
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

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBLog} />
    </Togglable>
  )

  const BlogsList = (props) => {
    return (
      <div>
        {props.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog}/>
        )}
      </div>
    )
  }

  const addBLog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.setToken(user.token)
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`A new blog ${returnedBlog.title} by ${returnedBlog.author} is added`)
      })
      .catch(error => {
        console.log(error.response.data.error)
        notifyWith(`${error.response.data.error} `, 'error')
      })
  }

  const updateLikes = (blogObject) => {
    blogService.setToken(user.token)
    blogService.update(blogObject.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => 
          blog.id !== returnedBlog.id ? 
          blog : {...blog, likes: returnedBlog.likes}))
        notifyWith(`Liked blog ${returnedBlog.title}`)
      })
      .catch(error => {
        console.log(error.response.data.error)
        notifyWith(`${error.response.data.error} `, 'error')
      })
  }

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const deleteBlog = (id) => {
    blogService.setToken(user.token)
    const toDelete = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${toDelete.title} by ${toDelete.author}`)
    if (ok) {
      blogService.remove(id)
        .then(response => {
          setBlogs(blogs.filter(b => b.id !== id))
          notifyWith(`Deleted blog ${toDelete.title} by ${toDelete.author}`)
        }).catch(error => {
          console.log(error.response.data.error)
          notifyWith(`${error.response.data.error} `, 'error')
        })
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        <div>
          <LoginStatus user={user} />
          {blogForm()}
          {BlogsList(blogs)}
        </div>}
      {/* {BlogsList(blogs)} */}


    </div>
  )
}

export default App