import { useState } from 'react';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const Blog = ({ blog, updateBlog, showDeleteButton }) => {
  const dispatch = useDispatch();
  const [viewDetails, setViewDetails] = useState(false);

  const handleLike = () => {
    try {
      blogService
        .update(
          { likes: blog.likes + 1, title: blog.title, author: blog.author, url: blog.url },
          blog.id
        )
        .then((newBlog) => {
          updateBlog(newBlog);
          dispatch(
            setNotificationWithTimeout(
              {
                error: false,
                text: `The blog ${newBlog.title} has received like`
              },
              5
            )
          );
        });
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout(
          { error: true, text: `The blog like has failed: ${exception.message}` },
          5
        )
      );
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Do you really want to delete blog ${blog.title} ?`))
      try {
        blogService.remove(blog.id).then(() => {
          dispatch(
            setNotificationWithTimeout(
              {
                error: false,
                text: `The blog "${blog.title}" was deleted successfully`
              },
              5
            )
          );
          updateBlog({ ...blog, deleted: true });
        });
      } catch (exception) {
        dispatch(
          setNotificationWithTimeout(
            {
              error: true,
              text: `The blog ${blog.title} was not deleted: ${exception.message}`
            },
            5
          )
        );
      }
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
