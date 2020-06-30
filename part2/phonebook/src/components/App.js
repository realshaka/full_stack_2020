import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'
import service from './Service'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNum, setNewNum] = useState('')
	const [filter, setFilter] = useState('')
	const [noti, setNoti] = useState(null)
	const personsToShow = persons.filter(person => person.name.toLowerCase().trim().includes(filter.trim().toLowerCase()) === true)

	const hook = () => {
		console.log('get data')
		service.getAll()
			.then(response => {
				console.log('data loaded')
				setPersons(response)
			})
	}
	useEffect(hook, [])

	const handleNamesChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumChange = (event) => {
		setNewNum(event.target.value)
	}

	const handleFilter = (event) => {
		setFilter(event.target.value)
	}
	
	const updatePhone = (name, phone) => {
		const message = `${name} is already added to phonebook, replace the old number with a new one? ` 
		const confirm = window.confirm(message)
		let personUpdate = persons.find(person => person.name === name )
		personUpdate = {...personUpdate, number: phone}
		if(confirm===true) {
			service.updatePerson(personUpdate)
			.then(response => {
				console.log('data updated')
				console.log(response)
				setPersons(persons.map(person => person.id !== personUpdate.id ? person: response))
			})
		}
	}
	
	const showNoti = (message) => {
		console.log(message)
		setNoti(message)
		setTimeout(() => {
			setNoti(null)
		}, 5000)
	}
	const addName = (event) => {
		let nameInput = newName.trim()
		let numInput = newNum.trim()
		event.preventDefault()
		const nameAdded = persons.some(person => person.name === nameInput)
		
		if (nameAdded) {
			updatePhone(nameInput, numInput)
			showNoti(`Updated ${nameInput} phone number`)
			//alert(`${nameInput} is already added to phonebook`)
			return
		}

		service.createPerson({ name: nameInput, number: numInput })
		.then(response => {
			setPersons(persons.concat(response))
			showNoti(`Added ${nameInput}`)
		})
		
		setNewName('')
		setNewNum('')
		console.log(persons)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={noti}/>
			<Filter value={filter} onChange={handleFilter} />
			<h2>Add a new</h2>
			<PersonForm onSubmit={addName} value={[newName, newNum]} onChange={[handleNamesChange, handleNumChange]} />
			<h2>Numbers</h2>
			<Persons persons={personsToShow} />
		</div>
	)
}

export default App