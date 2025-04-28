import { useState } from 'react';

const Comments = ({ blogID }) => {
  const [comments, setComments] = useState([]);
  return (
    <>
      <h2>comments</h2>
      <ul>
        {comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </>
  );
};
