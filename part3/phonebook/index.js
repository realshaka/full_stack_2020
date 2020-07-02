const express = require('express')
const app = express()
var morgan = require('morgan')
const { json } = require('express')

morgan.token('body', function (req, res) { if (!req.body) {return} else {return JSON.stringify(req.body)}})
morgan.token('tiny', ':method :url :status :res[content-length] - :response-time ms :body')

app.use(express.json())
app.use(morgan('tiny'))


var persons = [
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	},]

app.get('/api/persons', (req, res) => {
	res.json(persons)
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

	const nameNotUnique = persons.some(person => person.name === body.name)
	if (nameNotUnique) {
		return res.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = body
	const id = Math.floor(Math.random() * Math.floor(2 ^ 9))
	person.id = id
	//console.log(person)
	persons = persons.concat(person)
	res.status(200)
	res.json(req.body)
	//console.log(persons)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)