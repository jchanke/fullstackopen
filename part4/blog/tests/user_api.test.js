const assert = require('node:assert')
const { test, after, beforeEach, describe, } = require('node:test')

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

describe('when there are initially some users', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
    for (let { username, name, password } of helper.initialUsers) {
      const passwordHash = await bcrypt.hash(password, 10)
      const user = new User({ username, name, passwordHash })
      await user.save()
    }
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, helper.initialUsers.length)
  })

  test('a specific user is within the returned user', async () => {
    const response = await api.get('/api/users')
    const usernames = response.body.map(user => user.username)
    for (let user of helper.initialUsers) {
      assert(usernames.includes(user.username))
    }
  })

  test('user fields are `id`, not `_id`', async () => {
    const users = await helper.usersInDb()
    assert(users[0].id)
    assert(!users[0]._id)
    assert(!users[0].__v)
  })

  describe('creation of new users', async () => {

    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'mblum',
        name: 'Manuel Blum',
        password: 'mblum',
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernamesAtEnd = usersAtEnd.map(user => user.username)
      assert(usernamesAtEnd.includes(user.username))
    })

    test('fails with proper statuscode and message if username already exists', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = helper.initialUsers[0]

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error.includes('expected `username` to be unique'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with statuscode 400 if username is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        name: 'Wang Hao',
        password: 'hwang',
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(response.body)

      assert(response.body.error.includes('Path `username` is required'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with statuscode 400 if password is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'hwang',
        name: 'Wang Hao',
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(response.body)

      assert(response.body.error.includes('please provide a password'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with statuscode 400 when username < 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'me',
        name: 'Me Myself',
        password: 'memyself'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(response.body)

      assert(response.body.error.includes('User validation failed'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with statuscode 400 and message when password < 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'hwang',
        name: 'Wang Hao',
        password: 'me',
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error.includes('password must be at least 3 characters'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})