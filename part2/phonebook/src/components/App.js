import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
	const [ persons, setPersons ] = useState([]) 
	const [ newName, setNewName ] = useState('')
	const [	newNum, setNewNum ] = useState('')
  const	[ filter, setFilter] = useState('')
	const personsToShow = persons.filter(person => person.name.toLowerCase().trim().includes(filter.trim().toLowerCase()) === true)
	
	const hook = () => {
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}
	useEffect(hook, [])

	const handleNamesChange = (event) => {
    setNewName(event.target.value)
  }
	
	const handleNumChange = (event) => {
		setNewNum(event.target.value)
	}
	
	const handleFilter = (event) =>{
		setFilter(event.target.value)
	}

  const addName = (event) => {
		let nameInput = newName.trim()
		let numInput = newNum.trim()
    event.preventDefault()
    const nameAdded = persons.some(person => person.name === nameInput)
    console.log(nameAdded)
    if (nameAdded) {
        alert(`${nameInput} is already added to phonebook`)
        return
		} 
    setPersons(persons.concat({name:nameInput, number:numInput}))
		setNewName('')
		setNewNum('')
    console.log(persons) 
		}	

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} onChange={handleFilter}/>
			<h2>Add a new</h2>
			<PersonForm onSubmit={addName} value={[newName, newNum]} onChange={[handleNamesChange, handleNumChange]}/>
			<h2>Numbers</h2>
			<Persons persons={personsToShow}/>
		</div>
	)
}

export default App