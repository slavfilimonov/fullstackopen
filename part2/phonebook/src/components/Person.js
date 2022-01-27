import React from 'react'

const Person = ({ person, onClick }) =>
	<li>
		{person.name} {person.number + ' '}
		<button onClick={() => onClick(person.id)}>
			Delete
		</button>
	</li>

export default Person