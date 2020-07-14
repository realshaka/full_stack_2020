const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjs = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjs.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.length).toBe(helper.initialBlogs.length)
  })

  test('id defined', async () => {
    const res = await api.get('/api/blogs')
    res.body.map(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).not.toBeDefined()
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: "newTest",
        author: "tantan",
        url: "www.somthing.org",
        likes: 43
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const url = blogsAtEnd.map(n => n.url)
      expect(url).toContain('www.somthing.org')
    })

    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        title: "newTest"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('set likes default', async() => {
      const newBlog = {
        title: "newTest",
        author: "tantan",
        url: "www.somthing.org",
      }

      const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
      
      expect(res.body.likes).toBe(0)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
  
      const url = blogsAtEnd.map(r => r.url)
  
      expect(url).not.toContain(blogToDelete.content)
    })
  })

  describe('update a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogs= await helper.blogsInDb()
      const blogToUpdateID = blogs[0].id
      const update = { likes: 99 }

      const result = await api
        .put(`/api/blogs/${blogToUpdateID}`)
        .send(update)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.likes).toBe(update.likes)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})