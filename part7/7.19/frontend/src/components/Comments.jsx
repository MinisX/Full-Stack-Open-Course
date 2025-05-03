import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';

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
        <form onSubmit={handleCreate}>
          <div>
            <input
              type="text"
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
              placeholder="write comment here"
            />
            <button type="submit">add comment</button>
          </div>
        </form>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
