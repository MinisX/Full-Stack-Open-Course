import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const users = useSelector(({ users }) => users);
  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  return (
    <>
      <h2>added blogs</h2>
      <ul>{user && user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}</ul>
    </>
  );
};

export default User;
