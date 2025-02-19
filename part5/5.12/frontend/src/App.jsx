import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogCreate from './components/BlogCreate'
import blogService from './services/blogs'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ error: false, text: '' })

  const sortBlogs = (blogsToSort) => {
    return [...blogsToSort].sort((a, b) => a.likes - b.likes)
  }

  useEffect(() => {
    if(notification !== null)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }, [notification])

  useEffect(() => {
    if(user !== null)
      blogService.getAll().then(blogs => setBlogs(sortBlogs(blogs)))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlog = (updatedBlog) => {
    setBlogs(prevBlogs => {
      if (updatedBlog.deleted)
        return prevBlogs.filter(b => b.id !== updatedBlog.id)

      const newBlogs = prevBlogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      return sortBlogs(newBlogs)
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
    <div>
      <Notification notification={notification}/>
      {user === null
        ?
        <Login setUser={setUser} setNotification={setNotification}/>
        :
        <div>
          <h2>blogs</h2>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <br/><br/>

          <Togglable buttonLabel='create new blog'>
            <h2>create new</h2>
            <BlogCreate blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
          </Togglable>

          <br/><br/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} setNotification={setNotification} showDeleteButton={blog.user.username === user.username}/>
          )}
        </div>
      }
    </div>
  )
}

export default App