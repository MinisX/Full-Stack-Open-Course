import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogCreate from './BlogCreate'
import blogService from '../services/blogs'

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
  vi.mock('../services/blogs', () => ({
    default: {
      update: vi.fn(),
      create: vi.fn()
    }
  }))

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        setNotification={setNotification}
        updateBlog={updateBlog}
        showDeleteButton={false}/>
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
    blogService.update.mockResolvedValue({
      ...blog, // Spreads the existing properties of the 'blog' object
      likes: blog.likes + 1 // Simulates incrementing the like count
    })
    const user = userEvent.setup()

    // open extra content
    let button = screen.getByText('view')
    await user.click(button)

    // click like button
    button = screen.getByText('like')
    await user.dblClick(button)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })

  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const newBlog = {
      author: 'DanielTitle',
      url: 'DanielAuthor',
      title: 'DanielUrl',
      likes: 0
    }

    blogService.create.mockResolvedValue(newBlog)

    const setBlogs = vi.fn()
    const setNotification = vi.fn()
    const user = userEvent.setup()

    render(<BlogCreate setBlogs={setBlogs} blogs={[]} setNotification={setNotification}/>)

    const inputTitle = screen.getByPlaceholderText('write title here')
    const inputAuthor = screen.getByPlaceholderText('write author here')
    const inputUrl = screen.getByPlaceholderText('write url here')
    const sendButton = screen.getByText('create')

    await user.type(inputTitle, newBlog.title)
    await user.type(inputAuthor, newBlog.author)
    await user.type(inputUrl, newBlog.url)

    await user.click(sendButton)

    expect(setBlogs.mock.calls).toHaveLength(1)

    // Verify that setBlogs was called with an array containing the new blog object
    expect(setBlogs).toHaveBeenCalledWith([newBlog])
  })
})