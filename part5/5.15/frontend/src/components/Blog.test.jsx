import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    author: 'Daniel',
    url: 'daniel.com',
    title: 'Daniel Blog',
    likes: 3
  }

  const updateBlog = vi.fn()
  const setNotification = vi.fn()
  // this function is created for test purposes of exercise 5.15 to not change the logic of my implementation
  const forTestPurposes = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        setNotification={setNotification}
        updateBlog={updateBlog}
        showDeleteButton={false}
        forTestPurposes={forTestPurposes}/>
    ).container
  })

  test('render blog main content', () => {
    const div = container.querySelector('.main_content')

    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
    expect(div).not.toHaveTextContent(`${blog.likes}`)
  })

  test('view button click and URL with likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.extra_content')

    expect(div).toHaveTextContent(`${blog.url}`)
    expect(div).toHaveTextContent(`${blog.likes}`)
  })

  test('like button click twice -> updateBlog clicked twice', async () => {
    const user = userEvent.setup()

    // open extra content
    let button = screen.getByText('view')
    await user.click(button)

    // click like button
    button = screen.getByText('like')
    await user.dblClick(button)

    expect(forTestPurposes.mock.calls).toHaveLength(2)
  })
})