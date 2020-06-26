import React from 'react'

const Filter = (props) => {
	return (
		<div>
			filter show with <input value={props.value} onChange={props.onChange}/>
		</div>
	)
}

export default Filter