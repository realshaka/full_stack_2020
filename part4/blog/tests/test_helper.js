const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}