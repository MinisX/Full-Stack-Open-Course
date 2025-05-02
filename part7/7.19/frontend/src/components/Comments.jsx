import { useState } from 'react';

const Comments = ({ blog }) => {
  return (
    <>
      <h2>comments</h2>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
