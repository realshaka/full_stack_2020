import React from 'react'

const PersonForm = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
				<div>
					name: <input value={props.value[0]} onChange={props.onChange[0]}/>
				</div>
				<div>
					number: <input value={props.value[1]} onChange={props.onChange[1]}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
		</form>
	);
}

export default PersonForm