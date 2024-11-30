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

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }