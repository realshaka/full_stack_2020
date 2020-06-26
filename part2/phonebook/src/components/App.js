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
    { name: 'Arto Hellas' }
	]) 
	const [ newName, setNewName ] = useState('')
  
	const handleNamesChange = (event) => {
      setNewName(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()
    const nameAdded = persons.some(person => person.name === newName)
    console.log(nameAdded)
    if (nameAdded) {
        
        alert(`${newName} is already added to phonebook`)
        return
    } 
    setPersons(persons.concat({name:newName}))
    setNewName('')
    console.log(persons) 
    }
    return (
        <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
            <div>
            name: <input value={newName} onChange={handleNamesChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <Names names={persons}/>
    </div>
    )
}

export default App