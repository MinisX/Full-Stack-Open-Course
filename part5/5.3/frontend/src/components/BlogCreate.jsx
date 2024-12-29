import {useState} from 'react'
import blogService from '../services/blogs'

const BlogCreate = ({setBlogs, blogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }

    blogService.create(blogObject)
    .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
          <div>
            title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author 
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>  
    </div>
  )
}

export default BlogCreate