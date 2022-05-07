import React from 'react'

const Filter = (props) =>
	<div>
		Filter by name: <input value={props.value} onChange={props.onChange} />
	</div>

export default Filter