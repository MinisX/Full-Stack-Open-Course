import { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false)
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
        {blog.likes} <button>like</button>
      </>
    )}
    </div>  
  )
}

export default Blog