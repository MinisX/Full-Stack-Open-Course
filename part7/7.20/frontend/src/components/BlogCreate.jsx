import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={handleCreate}>
        <Form.Group className="mb-3">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </Form.Group>
        <Button style={{ marginBottom: 10 }} variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogCreate;
