import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { Button, Form } from 'react-bootstrap';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();

    dispatch(addComment(blog, comment));
  };

  return (
    <>
      <h2>comments</h2>
      <ul>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
              placeholder="write comment here"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            add comment
          </Button>
        </Form>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
