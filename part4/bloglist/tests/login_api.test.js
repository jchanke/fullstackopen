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

  describe('login of', async () => {

    test('existing user succeeds with statuscode 200 if password is valid', async () => {
      const { username, password } = helper.initialUsers[0]
      const userForLogin = { username, password, }

      await api
        .post('/api/login')
        .send(userForLogin)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('existing user fails with statuscode 401 if password is incorrect', async () => {
      const { username } = helper.initialUsers[0]
      const userForLogin = { username, password: 'wrong password', }

      await api
        .post('/api/login')
        .send(userForLogin)
        .expect(401)
    })

    test('unknown user fails with statuscode 401', async () => {
      const { username, password, } = await helper.nonExistingUser()
      const userForLogin = { username, password, }

      await api
        .post('/api/login')
        .send(userForLogin)
        .expect(401)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})