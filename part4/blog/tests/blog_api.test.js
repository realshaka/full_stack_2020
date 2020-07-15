const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    const user = {
      username: 'tester',
      name: 'tester',
      password: 'tester',
    };
    await User.deleteMany({})
    const regUser = await api.post('/api/users').send(user);
    await Blog.deleteMany({})
    const blogObjs = helper.initialBlogs.map(blog => new Blog({...blog, user:regUser.body.id}))
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

      const user = {
        username: "tester",
        password: "tester"
      }
      
      const loggedUser = await api.post('/api/login').send(user)
      
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + loggedUser.body.token)
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

      const user = {
        username: "tester",
        password: "tester"
      }
      
      const loggedUser = await api.post('/api/login').send(user)

      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + loggedUser.body.token)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('fails with status code 401 if no token', async () => {
      const newBlog = {
        title: "newTest"
      }

      
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('set likes default', async() => {
      const newBlog = {
        title: "newTest",
        author: "tantan",
        url: "www.somthing.org",
      }

      const user = {
        username: "tester",
        password: "tester"
      }
      
      const loggedUser = await api.post('/api/login').send(user)

      const res = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + loggedUser.body.token)
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
      
      const user = {
        username: "tester",
        password: "tester"
      }
        
      const loggedUser = await api.post('/api/login').send(user)
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'bearer ' + loggedUser.body.token)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
  
      const url = blogsAtEnd.map(r => r.url)
  
      expect(url).not.toContain(blogToDelete.url)
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

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({ username: 'tester', password: 'sekret' })
      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'testUser',
        name: 'tantan',
        password: 'sthsecret',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'tester',
        name: 'tester',
        password: 'sthsecret',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username invalid', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'r',
        name: 'tuntun',
        password: 'sthsecret',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('username and password must be longer than 3 characters')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})