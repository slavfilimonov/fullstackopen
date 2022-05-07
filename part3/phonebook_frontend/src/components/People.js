import React from 'react'
import Person from './Person'

const People = ({ people, filter, onClick }) => {

	people = people.filter(
		person => person.name.toLowerCase().includes(filter.toLowerCase())
	)

	if (people.length) {
		return (
			<ul>
				{people.map(person =>
					<Person key={person.name} person={person} onClick={onClick} />
				)}
			</ul >
		)
	} else {
		return 'no match was found'
	}
}

export default People