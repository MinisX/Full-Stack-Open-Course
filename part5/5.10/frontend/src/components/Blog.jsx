import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, setNotification }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const handleLike = () => {
    console.log(blog.id)
    try{
        blogService.update({likes: blog.likes + 1, title: blog.title, author: blog.author, url: blog.url}, blog.id)
        .then(newBlog => {
          updateBlog(newBlog)
          setNotification({error: false, text: `The blog ${newBlog.title} has received like`})
        })
      }catch(exception){
          setNotification({error: true, text: `The blog like has failed: ${exception.message}`})
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
      {blog.title} <button onClick={() => setViewDetails(!viewDetails)}>{viewDetails ? 'hide' : 'view'}</button>
      {viewDetails && (
      <>
        <br/>
        {blog.author}
        <br/>
        {blog.url}
        <br/>
        {blog.likes} <button onClick={handleLike}>like</button>
      </>
    )}
    </div>  
  )
}

export default Blog