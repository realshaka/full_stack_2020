require('dotenv').config()

const express = require('express')
const app = express()
var morgan = require('morgan')
const { json } = require('express')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('body', function (req, res) { if (!req.body) { return } else { return JSON.stringify(req.body) } })
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

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/info/', (req, res) => {
	const date = new Date()
	const text = `Phonebook has info of ${persons.length} people 
    \n${date}`
	console.log(text)
	res.end(text)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	let person = persons.find(person => person.id === id)
	if (person == null) {
		res.status(404).end()
	}
	console.log(person)
	res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	console.log(persons)
	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const body = req.body
	if (!body.name | !body.number) {
		return res.status(400).json({
			error: 'content missing'
		})
	}

	const person = new Person(body)
	//console.log(person)
	//persons = persons.concat(person)
	person.save().then(savedPerson => {
		res.status(200)
		res.json(savedPerson)
	})
	
	//console.log(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})