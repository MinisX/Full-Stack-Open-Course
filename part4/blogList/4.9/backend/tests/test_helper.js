const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Daniel Blog',
    author: 'Daniel',
    url: 'daniel.com',
    likes: 3
  },
  {
    title: 'Denis Blog',
    author: 'Denis',
    url: 'denis.com',
    likes: 2
  }
]

module.exports = { initialBlogs }