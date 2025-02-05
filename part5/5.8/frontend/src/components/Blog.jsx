import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotification }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const handleLike = () => {
    console.log(blog.id)
    try{
        blogService.update({likes: updatedBlog.likes + 1, title: updatedBlog.title, author: updatedBlog.author, url: updatedBlog.url}, updatedBlog.id)
        .then(newBlog => {
          console.log(newBlog)
          setUpdatedBlog(newBlog)
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
      {updatedBlog.title} <button onClick={() => setViewDetails(!viewDetails)}>{viewDetails ? 'hide' : 'view'}</button>
      {viewDetails && (
      <>
        <br/>
        {updatedBlog.author}
        <br/>
        {updatedBlog.url}
        <br/>
        {updatedBlog.likes} <button onClick={handleLike}>like</button>
      </>
    )}
    </div>  
  )
}

export default Blog