import React from 'react'

const Filter = (props) => {
	return (
		<div>
			Find countries:
			<input value={props.value} onChange={props.onChange} />
			<button onClick={props.clearFilter}>clear</button>
		</div >
	)
}

export default Filter