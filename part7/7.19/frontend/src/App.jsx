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
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';

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
        <div>
          <Link style={{ padding: 5 }} to="/">
            blogs
          </Link>
          <Link style={{ padding: 5 }} to="/users">
            users
          </Link>
        </div>
        <Notification />
        {user === null ? (
          <Login />
        ) : (
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
            <h2>blogs</h2>
            <br />
            <br />
            <Togglable buttonLabel="create new blog">
              <h2>create new</h2>
              <BlogCreate />
            </Togglable>
            <br />
            <br />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {sortBlogs(blogs).map((blog) => (
                      <div key={blog.id}>
                        <Link to={`/blogs/${blog.id}/${blog.user.username === user.username}`}>
                          {blog.title} {blog.author}
                        </Link>
                      </div>
                    ))}
                  </>
                }
              />
              <Route path="/blogs/:id/:showDeleteButton" element={<Blog />} />
              <Route
                path="/users"
                element={
                  <>
                    <h2>Users</h2>
                    <Users />
                  </>
                }
              />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
