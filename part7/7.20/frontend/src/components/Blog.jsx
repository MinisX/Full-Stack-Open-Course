import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { Button } from 'react-bootstrap';

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
        {blog.likes}{' '}
        <Button variant="primary" onClick={handleLike}>
          like
        </Button>
        <br />
        added by {blog.author}
        <br />
        {showDeleteButton && (
          <Button variant="primary" onClick={handleRemove}>
            remove
          </Button>
        )}
        <Comments blog={blog} />
      </div>
    </div>
  );
};

export default Blog;
