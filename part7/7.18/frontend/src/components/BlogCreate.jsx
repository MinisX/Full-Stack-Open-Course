import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogCreate = () => {
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

    dispatch(createBlog(blogObject));
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
