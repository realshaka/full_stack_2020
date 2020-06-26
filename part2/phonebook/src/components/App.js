import React, { useState } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	
	const [ newName, setNewName ] = useState('')
  const	[ filter, setFilter] = useState('')
	const personsToShow = persons.filter(person => person.name.toLowerCase().trim().includes(filter.trim().toLowerCase()) === true)
	
	const handleNamesChange = (event) => {
      setNewName(event.target.value)
  }
	
	const handleFilter = (event) =>{
		setFilter(event.target.value)
	}

  const addName = (event) => {
		let nameInput = newName.trim()
    event.preventDefault()
    const nameAdded = persons.some(person => person.name === nameInput)
    console.log(nameAdded)
    if (nameAdded) {
        alert(`${nameInput} is already added to phonebook`)
        return
		} 
    setPersons(persons.concat({name:nameInput}))
    setNewName('')
    console.log(persons) 
		}
	
	return (
			<div>
			<h2>Phonebook</h2>
			<Filter value={filter} onChange={handleFilter}/>
			<h2>Add a new</h2>
			<PersonForm onSubmit={addName} value={newName} onChange={handleNamesChange}/>
			<h2>Numbers</h2>
			<Persons persons={personsToShow}/>
	</div>
	)
}

export default App