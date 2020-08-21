import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<NoteForm /> test blogForm input', () => {
  const createBLog = jest.fn()

  const test_blog = {
    author: 'tester',
    title: 'testing blog',
    url: 'test.com',
    user: {
      name: 'admin'
    },
    likes: 0
  }

  const component = render(
    <BlogForm createBlog={createBLog}/>
  )

  const form = component.container.querySelector('form')
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  fireEvent.change(author, {
    target: { value: test_blog.author }
  })
  fireEvent.change(title, {
    target: { value: test_blog.title }
  })
  fireEvent.change(url, {
    target: { value: test_blog.url }
  })
  fireEvent.submit(form)

  expect(createBLog.mock.calls).toHaveLength(1)
  expect(createBLog.mock.calls[0][0].author).toBe('tester')
  expect(createBLog.mock.calls[0][0].title).toBe('testing blog')
  expect(createBLog.mock.calls[0][0].url).toBe('test.com')
})