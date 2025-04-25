import { useState, useEffect } from 'react';
import userService from '../services/users';
import { Table } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .getAll()
      .then((result) => setUsers(result))
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
      {users.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

export default Users;
