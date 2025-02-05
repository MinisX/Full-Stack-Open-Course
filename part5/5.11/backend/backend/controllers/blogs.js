const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// catch of exception is handled by express-async-errors library
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    ...body, user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  // if the entry does not exist, then it is still "removed"
  if(blog === null || blog === undefined)
    return response.status(204).end()

  if (blog.user.toString() === user.id.toString() ){
    await Blog.deleteOne()
    return response.status(204).end()
  }else{
    return response.status(401).json({ error: 'invalid user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const user = request.user
  await Blog.findByIdAndUpdate(request.params.id, { ...request.body, user: user.id }, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
})

/*
  A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,”
  capable only of performing middleware and routing functions. Every Express application has a built-in app router.
*/
module.exports = blogsRouter