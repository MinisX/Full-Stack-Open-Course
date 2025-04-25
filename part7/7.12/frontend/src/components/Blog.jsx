import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog, showDeleteButton }) => {
  const dispatch = useDispatch();
  const [viewDetails, setViewDetails] = useState(false);

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (window.confirm(`Do you really want to delete blog ${blog.title} ?`))
      dispatch(removeBlog(blog));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div className="main_content">
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)}>
          {viewDetails ? 'hide' : 'view'}
        </button>
      </div>
      {viewDetails && (
        <div className="extra_content">
          <br />
          {blog.url}
          <br />
          {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {showDeleteButton && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
