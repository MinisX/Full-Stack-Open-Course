import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const Blog = () => {
  const { id, showDeleteButton } = useParams();
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = blogs.find((b) => b.id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs());
    }
  }, [blogs]);

  if (!blog) {
    return null;
  }

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
        <Comments blog={blog} />
      </div>
    </div>
  );
};

export default Blog;
