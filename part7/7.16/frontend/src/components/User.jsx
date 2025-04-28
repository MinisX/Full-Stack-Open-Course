import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeUsers } from '../reducers/usersReducer';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);
  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers()); // Fetch users if not already loaded
    }
  }, [users]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <br />
      <h3>added blogs</h3>
      <ul>{user && user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}</ul>
    </>
  );
};

export default User;
