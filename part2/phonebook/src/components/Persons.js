import React from 'react'
import service from './Service'

const DeletePerson = (props) => {
	const deletePerson = () => {
		console.log(props)
		const result = window.confirm(`Delete ${props.name}?`)
		if(result===true) {
			service.deletePerson(props.id)
			window.location.reload();
		}
	}
	return (
		<button onClick={deletePerson}>delete</button>
	)
}

const Persons = ({ persons }) => {
	
	return (
		<div>
			{persons.map(person =>
					<div key={person.name}>{person.name} {person.number} <DeletePerson name={person.name} id={person.id} /></div>
			)}
		</div>
	)
}

export default Persons