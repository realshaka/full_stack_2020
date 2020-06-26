import React, { useState } from 'react'

const Names = ({names}) => {
  return (
    <div>
      {names.map(n =>
          <div key={n.name}>{n.name}</div>
        )}
    </div>
  )
}


const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	const [ newName, setNewName ] = useState('')
  const	[ filter, setFilter] = useState('')
	
	const handleNamesChange = (event) => {
      setNewName(event.target.value)
  }
	const namesToShow = persons.filter(person => person.name.toLowerCase().trim().includes(filter.trim().toLowerCase()) === true)
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
			<div>
				filter show with <input value={filter} onChange={handleFilter}/>
			</div>
			<h2>Add a new</h2>
			<form onSubmit={addName}>
					<div>
					name: <input value={newName} onChange={handleNamesChange}/>
					</div>
					<div>number: <input /></div>
					<div>
					<button type="submit">add</button>
					</div>
			</form>
			<h2>Numbers</h2>
			<Names names={namesToShow}/>
	</div>
	)
}

export default App