const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const connect_database = (mongoDB_uri) => {
  mongoose.connect(mongoDB_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connection to MongoDB:', error.message)
    })
}

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
  connect_database(config.TEST_MONGODB_URI)
  console.log(process.env.NODE_ENV)
  console.log(config.TEST_MONGODB_URI)
} else {
  connect_database(config.MONGODB_URI)
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

logger.info('connecting to', config.MONGODB_URI)

module.exports = app