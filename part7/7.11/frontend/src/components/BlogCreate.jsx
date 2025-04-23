import { useState } from 'react';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const BlogCreate = ({ setBlogs, blogs }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url
    };

    try {
      blogService.create(blogObject).then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));
      dispatch(
        setNotificationWithTimeout(
          { error: false, text: `The blog ${title} was created succesfully` },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout({ error: true, text: 'The blog creation has failed' }, 5)
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogCreate;
