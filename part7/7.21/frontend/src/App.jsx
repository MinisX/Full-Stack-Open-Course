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
import { Button, Navbar, Nav } from 'react-bootstrap';

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

  const padding = { padding: 5 };

  return (
    <Router>
      <div className="container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  users
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ marginTop: 10 }}>
          {user ? (
            <>
              <em style={padding}>{user.name} logged in</em>
              <Button
                style={{ marginLeft: 10 }}
                variant="outline-dark"
                size="sm"
                onClick={handleLogout}>
                logout
              </Button>
            </>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
        </div>
        <Notification />
        {user === null ? (
          <Login />
        ) : (
          <div>
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
