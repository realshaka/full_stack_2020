const { default: BlogForm } = require("../../src/components/BlogForm")
import service from '../../src/services/blogs'
describe('Blog app', function () {
  const host = 'http://localhost:3000'
  const user = {
    name: 'tester1',
    username: 'tester1',
    password: 'secret'
  }

  const blogs = [
    {
      author: 'tester',
      title: 'testing blog',
      url: 'test.com',
    },
    {
      author: 'tester1',
      title: 'testing blog 1',
      url: 'test1.com',
    },
    {
      author: 'tester2',
      title: 'most liked',
      url: 'test2.com',
    }
  ]
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit(host)
  })

  it.skip('Login form is shown', function () {
    cy.get('#username').type('user')
    cy.get('#password').type('password')
    cy.get('#login_btn').click()
  })

  describe('Login', function () {
    it.skip('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login_btn').click()

      cy.contains('logged in').click()
    })

    it.skip('fails with wrong credentials', function () {
      cy.get('#username').type('user')
      cy.get('#password').type('password')
      cy.get('#login_btn').click()

      cy.contains('invalid username or password')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login_btn').click()
    })
    it.skip('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('tester')
      cy.get('#url').type('testing.com')
      cy.contains('add').click()

      cy.visit(host)
      cy.contains('test blog').click()
      cy.contains('view').click()
    })

    it.skip('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('tester')
      cy.get('#url').type('testing.com')
      cy.contains('add').click()

      cy.visit(host)
      cy.contains('test blog').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it.skip('A blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('tester')
      cy.get('#url').type('testing.com')
      cy.contains('add').click()

      cy.visit(host)
      cy.contains('test blog').click()
      cy.contains('view').click()
      cy.get('.blog').should('exist')
      cy.contains('remove').click()
      cy.get('.blog').should('not.exist')
    })

    it('Blogs are sorted by likes', function () {
      for (let i in blogs) {
        cy.get('#show-btn').contains('new blog').click()
        cy.get('#title').type(blogs[i].title)
        cy.get('#author').type(blogs[i].author)
        cy.get('#url').type(blogs[i].url)
        cy.get('#add-btn').click()
      }

      /* cy.get('#show-btn').contains('new blog').click()
        cy.get('#title').type(blogs[2].title)
        cy.get('#author').type(blogs[2].author)
        cy.get('#url').type(blogs[2].url)
        cy.get('#add-btn').click() */
      cy.wait(4000)
      //cy.contains('most liked').parent().find('#view-btn').click()
      cy.wait(2000)
      cy.get('[id^=view-btn]').click({ multiple: true })

      for (let i = 0; i < 3; i++) {
        cy.get('.blog-detail').contains('most liked').parent().find('#like-btn').click()
      }

      cy.visit(host)
      cy.get('[id^=view-btn]').click({ multiple: true })
      cy.get('.blog').first().should('contain', 'most liked')

    })
  })
})