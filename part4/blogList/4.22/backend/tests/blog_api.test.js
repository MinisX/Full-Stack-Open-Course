const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.equal(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
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
      .expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()

    assert.strictEqual(blogsAfterDeletion.length, blogsBeforeDeletion.length - 1)

    const titles = blogsAfterDeletion.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })

  test('fails with invalid id', async () => {
    await api
      .delete('/api/blogs/123123123')
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

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlogInfo).expect(200)
    newBlogInfo.id = blogToUpdate.id

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

    assert.deepStrictEqual(updatedBlog, newBlogInfo)
  })

  test('update likes onlly of the blog with existing id', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    const newBlogInfo = {
      likes: 10
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlogInfo).expect(200)
    blogToUpdate.likes = newBlogInfo.likes

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

    assert.deepStrictEqual(updatedBlog, blogToUpdate)
  })

  test('update likes only of the blog with non-existing id', async () => {
    const newBlogInfo = {
      likes: 10
    }

    await api.put('/api/blogs/12312341').send(newBlogInfo).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})