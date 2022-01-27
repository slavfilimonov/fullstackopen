import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, onClick }) => {
	persons = persons.filter(
		person => person.name.toLowerCase().includes(filter.toLowerCase())
	)
	if (persons.length) {
		return (
			<ul>
				{persons.map(person =>
					<Person key={person.name} person={person} onClick={onClick} />
				)}
			</ul >
		)
	} else { return 'no match was found' }
}

export default Persons