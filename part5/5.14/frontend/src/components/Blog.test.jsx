import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render blog main content', () => {
  const blog = {
    author: 'Daniel',
    url: 'daniel.com',
    title: 'Daniel Blog',
    likes: 3
  }

  const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.main_content')

  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(div).not.toHaveTextContent(`${blog.url}`)
  expect(div).not.toHaveTextContent(`${blog.likes}`)
})