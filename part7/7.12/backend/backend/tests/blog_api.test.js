const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
let userId = undefined
let authorizationToken = undefined

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // create new User
  const userResponse = await api
    .post('/api/users')
    .send(helper.initialUser)
  userId = userResponse.body.id

  // login (get token)
  const loginResponse = await api.
    post('/api/login')
    .send({ username: helper.initialUser.username, password: helper.initialUser.password })
  authorizationToken = loginResponse.body.token

  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: userId }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${authorizationToken}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.equal(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authorizationToken}`)
  response.body.forEach((blog) => {
    assert(Object.keys(blog).includes('id'))
  })
})

test('successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'Georgy Blog',
    author: 'Georgy',
    url: 'georgu.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authorizationToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

  const titles = blogsInDb.map(blog => blog.title)
  assert(titles.includes('Georgy Blog'))
})


test('likes property is missing from the request', async () => {
  const newBlog = {
    title: 'Kate Blog',
    author: 'Kate',
    url: 'kate.com',
  }

  const result = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authorizationToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(result.body.likes, 0)
})

test('title is missing missing', async () => {
  const newBlog = {
    author: 'Kate',
    url: 'kate.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authorizationToken}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('url is missing missing', async () => {
  const newBlog = {
    title: 'Kate Blog',
    author: 'Kate',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authorizationToken}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDeletion[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${authorizationToken}`)
      .expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()

    assert.strictEqual(blogsAfterDeletion.length, blogsBeforeDeletion.length - 1)

    const titles = blogsAfterDeletion.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })

  test('fails with invalid id', async () => {
    await api
      .delete('/api/blogs/123123123')
      .set('Authorization', `Bearer ${authorizationToken}`)
      .expect(400)
  })
})

describe('update of blogs', () => {
  test('update all info in the blog with existing id', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    const newBlogInfo = {
      title: 'Vlada Blog',
      author: 'Vlada',
      url: 'vlada.com',
      likes: 7
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${authorizationToken}`)
      .send(newBlogInfo)
      .expect(200)

    newBlogInfo.id = blogToUpdate.id
    newBlogInfo.user = userId

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)
    // The user if a <Buffer ...> object, which I can't recreate manually
    newBlogInfo.user = updatedBlog.user

    assert.deepStrictEqual(updatedBlog, newBlogInfo)
  })

  test('update likes onlly of the blog with existing id', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    const newBlogInfo = {
      likes: 10
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${authorizationToken}`)
      .send(newBlogInfo)
      .expect(200)
    blogToUpdate.likes = newBlogInfo.likes

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

    assert.deepStrictEqual(updatedBlog, blogToUpdate)
  })

  test('update likes only of the blog with non-existing id', async () => {
    const newBlogInfo = {
      likes: 10
    }

    await api.put('/api/blogs/12312341')
      .set('Authorization', `Bearer ${authorizationToken}`)
      .send(newBlogInfo)
      .expect(400)
  })
})

describe('authorization token' , () => {
  test('authorization token is not provided', async () => {
    await api
      .get('/api/blogs')
      .expect(401)
  })

  test('authorization token is not provided, but wrong', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', 'Bearer wrongtoken')
      .expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})