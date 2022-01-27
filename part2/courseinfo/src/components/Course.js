import React from 'react'


const Subheader = ({ course }) => <h2> {course.name} </h2>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>    

const Content = ({ course }) => 
	<>
		{course.parts
			.map((part, i) => <Part part={part} key={i} />)}
	</>


const Total = ({ course }) => {
	const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
	return (
	  <strong>Number of exercises {total}</strong>
	) 
}

  
const Course = ({ course }) => 
	<>
		<Subheader course={course} />
		<Content course={course} />
		<Total course={course} />
	</>


  export default Course