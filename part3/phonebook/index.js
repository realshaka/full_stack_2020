require('dotenv').config()

const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')


morgan.token('body', function (req) { if (!req.body) { return } else { return JSON.stringify(req.body) } })
morgan.token('tiny', ':method :url :status :res[content-length] - :response-time ms :body')

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())

// var persons = [
// 	{
// 		"name": "Arto Hellas",
// 		"number": "040-123456",
// 		"id": 1
// 	},
// 	{
// 		"name": "Ada Lovelace",
// 		"number": "39-44-5323523",
// 		"id": 2
// 	},
// 	{
// 		"name": "Dan Abramov",
// 		"number": "12-43-234345",
// 		"id": 3
// 	},
// 	{
// 		"name": "Mary Poppendieck",
// 		"number": "39-23-6423122",
// 		"id": 4
// 	},]

app.get('/api/persons', (req, res, next) => {
  Person
    .find({}).then(persons => {
      res.json(persons)
      console.log(persons)
    })
    .catch(error => next(error))
})

app.get('/info/', (req, res, next) => {
  const date = new Date()
  Person
    .find({}).then(persons => {
      res.send(
        `<div>
					<p>Phonebook has info of ${persons.length} people</p>
					<p>${date}</p
				</div>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  console.log(person)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name | !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person(body)
  //console.log(person)
  //persons = persons.concat(person)
  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedPerson => {
      res.status(200)
      res.json(savedPerson)
    })
    .catch(error => next(error))

  //console.log(persons)
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})