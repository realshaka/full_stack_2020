import React from 'react'

const LoginStatus = ({ user }) => {
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogsUser')
    window.location.reload()
  }
  return (
    <div>
      <p>{user.name} logged in <button onClick={logout}>Log out</button></p>
    </div>
  )
}

export default LoginStatus