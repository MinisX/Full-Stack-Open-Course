import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, setNotification, showDeleteButton }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const handleLike = () => {
    try{
      blogService.update({ likes: blog.likes + 1, title: blog.title, author: blog.author, url: blog.url }, blog.id)
        .then(newBlog => {
          updateBlog(newBlog)
          setNotification({ error: false, text: `The blog ${newBlog.title} has received like` })
        })
    }catch(exception){
      setNotification({ error: true, text: `The blog like has failed: ${exception.message}` })
    }
  }

  const handleRemove = () => {
    if(window.confirm(`Do you really want to delete blog ${blog.title} ?`))
      try{
        blogService.remove(blog.id)
          .then(() => {
            setNotification({ error: false, text: `The blog "${blog.title}" was deleted successfully` })
            updateBlog({ ...blog, deleted: true })
          })
      }catch(exception){
        setNotification({ error: true, text: `The blog ${blog.title} was not deleted: ${exception.message}` })
      }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div className='main_content'>
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)}>{viewDetails ? 'hide' : 'view'}</button>
      </div>
      {viewDetails && (
        <div className='extra_content'>
          <br/>
          {blog.url}
          <br/>
          {blog.likes} <button onClick={handleLike}>like</button>
          <br/>
          {showDeleteButton && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog