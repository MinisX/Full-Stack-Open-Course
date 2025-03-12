const { test, after, beforeEach, describe } = require('node:test')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('invalid users not created', () => {
  test('username not long enough' , async () => {
    const newUser = {
      username: 'as',
      name: 'Daniel',
      password: '123456'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, {
        error: 'User validation failed: username: Path `username` (`as`) is shorter than the minimum allowed length (3).'
      })

    const usersInDb = await helper.usersInDb()
    assert.strictEqual(usersInDb.length, 0)
  })

  test('password not long enough' , async () => {
    const newUser = {
      username: 'asd',
      name: 'Daniel',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, {
        error: 'Password must be at least 3 characters long'
      })

    const usersInDb = await helper.usersInDb()
    assert.strictEqual(usersInDb.length, 0)
  })

  test('username not provided' , async () => {
    const newUser = {
      name: 'Daniel',
      password: '123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, {
        error: 'User validation failed: username: Path `username` is required.'
      })

    const usersInDb = await helper.usersInDb()
    assert.strictEqual(usersInDb.length, 0)
  })

  test('password not provided' , async () => {
    const newUser = {
      username: 'asd',
      name: 'Daniel',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, {
        error: 'Password must be at least 3 characters long'
      })

    const usersInDb = await helper.usersInDb()
    assert.strictEqual(usersInDb.length, 0)
  })
})

after(async () => {
  await mongoose.connection.close()
})