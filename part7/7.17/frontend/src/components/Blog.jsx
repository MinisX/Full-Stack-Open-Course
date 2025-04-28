import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id, showDeleteButton } = useParams();
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = blogs.find((b) => b.id === id);
  const dispatch = useDispatch();

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
        <h2>{blog.title}</h2>
      </div>

      <div className="extra_content">
        <br />
        {blog.url}
        <br />
        {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        added by {blog.author}
        <br />
        {showDeleteButton && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
