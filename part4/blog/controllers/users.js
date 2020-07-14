const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const username = body.username
  const password = body.password
  const contentMissing  = !username | !password

  if (contentMissing) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const invalidContent = username.length < 3 | password.length < 3
  if (invalidContent) {
    return response.status(400).json({
      error: 'username and password must be longer than 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter