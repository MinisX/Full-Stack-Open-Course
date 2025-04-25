import { useState, useEffect } from 'react';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Login from './components/Login';
import BlogCreate from './components/BlogCreate';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout, sessionLogin, setUser } from './reducers/userReducer';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);

  const sortBlogs = (blogsToSort) => {
    return [...blogsToSort].sort((a, b) => a.likes - b.likes);
  };

  useEffect(() => {
    if (user !== null) dispatch(initializeBlogs());
  }, [user]);

  useEffect(() => {
    dispatch(sessionLogin());
  }, []);

  const handleLogout = () => {
    dispatch(doLogout());
  };

  return (
    <Router>
      <div className="container">
        <Notification />
        {user === null ? (
          <Login />
        ) : (
          <div>
            <h2>blogs</h2>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
            <br />
            <br />
            <Togglable buttonLabel="create new blog">
              <h2>create new</h2>
              <BlogCreate />
            </Togglable>
            <br />
            <br />
            {sortBlogs(blogs).map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                showDeleteButton={blog.user.username === user.username}
              />
            ))}
            <h2>Users</h2>
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
