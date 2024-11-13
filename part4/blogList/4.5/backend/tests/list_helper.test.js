const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const dummyBlogs = [
  {
    title: 'Test Blog2',
    author: 'Daniel',
    url: 'www.github.com',
    likes: 12
  },
  {
    title: 'Test Blog2',
    author: 'Daniel',
    url: 'www.github.com',
    likes: 0
  },
  {
    title: 'Test Blog2',
    author: 'Daniel',
    url: 'www.github.com',
    likes: 28
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]),0)
  })

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(
      listHelper.totalLikes([
        dummyBlogs[0]
      ]), 12)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(
      listHelper.totalLikes(dummyBlogs), 40)
  })
})

describe('favourite blog', () => {
  test('empty list', () => {
    assert.strictEqual(listHelper.favouriteBlog([]), undefined)
  })

  test('one element in the list', () => {
    assert.deepStrictEqual(listHelper.favouriteBlog([dummyBlogs[0]]), dummyBlogs[0])
  })

  test('big list', () => {
    assert.deepStrictEqual(listHelper.favouriteBlog(dummyBlogs), dummyBlogs[2])
  })
})