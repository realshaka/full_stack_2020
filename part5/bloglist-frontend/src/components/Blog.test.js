import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Test Blog', () => {
  let component
  const mockHandler = jest.fn()

  const test_blog = {
    author: 'tester',
    title: 'testing blog',
    url: 'test.com',
    user: {
      name: 'admin'
    },
    likes: 0
  }

  beforeEach(() => {
    component = render(
      <Blog blog={test_blog} updateLikes={mockHandler} deleteBlog={mockHandler} />
    )
  })

  test('render blog', () => {
    const basic = component.container.querySelector('.blog-basic')
    expect(basic).toHaveTextContent(
      test_blog.title
    )
    expect(basic).toHaveTextContent(
      test_blog.author
    )

    const detail = component.container.querySelector('.blog-detail')
    expect(detail).toHaveStyle('display: none')
  })

  test('click button, detail is shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const detail = component.container.querySelector('.blog-detail')
    expect(detail).not.toHaveStyle('display: none')
  })

  test('click button twice', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

