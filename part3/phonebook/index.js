const express = require('express')
const app = express()

const persons = [
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
	const person = persons.find(person => person.id === id)
	if(person==null) {
		res.status(404).end()
	}
	console.log(person)
	res.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)