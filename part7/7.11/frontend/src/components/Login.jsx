import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const Login = ({ setUser }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(
        setNotificationWithTimeout(
          { error: false, text: `You have succesfully logged in as ${username}` },
          5
        )
      );
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotificationWithTimeout({ error: true, text: 'Wrong credentials' }, 5));
      console.error('Wrong credetinals');
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
