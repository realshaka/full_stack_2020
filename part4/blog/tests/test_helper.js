const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    title: "test1",
    author: "tantan",
    url: "www.somthing.org",
    likes: 45
  },
  {
    title: "test2",
    author: "tantan",
    url: "www.somthing.org",
    likes: 45
  },
]

const initialUsers = [
  {
    username: "admin",
    name: "tantan",
    password: "sthsecret"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}