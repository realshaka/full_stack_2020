import React from 'react'

const Filter = (props) => {
	return (
		<div>
			Find countries <input value={props.value} onChange={props.onChange}/>
		</div>
	)
}

export default Filter