import React from 'react'

const PersonForm = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
				<div>
					name: <input value={props.value} onChange={props.onChange}/>
				</div>
				<div>number: <input /></div>
				<div>
					<button type="submit">add</button>
				</div>
		</form>
	);
}

export default PersonForm