import React from 'react';

const Header = (props) => (
	<>
		<h1>{props.header}</h1>
	</>
);

const Part = (props) => (
	<>
		<p>
			{props.part} {props.exercises}
		</p>
	</>
);

const Content = (props) => (
	<>
		<Part parts={props.parts[0].name} exercises={props.parts[0].exercises} />
		<Part parts={props.parts[1].name} exercises={props.parts[1].exercises} />
		<Part parts={props.parts[2].name} exercises={props.parts[2].exercises} />
	</>
);

const Total = (props) => {
	console.log(props);

	return (
		<>
			<p>
				Number of exercises{' '}
				{props.exercises[0] + props.exercises[1] + props.exercises[2]}
			</p>
		</>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
			},
			{
				name: 'State of a component',
				exercises: 14,
			},
		],
	};

	return (
		<>
			<Header header={course.name} />
			<Content parts={course.parts} />
			<Total exercises={course.parts.map((part) => part.exercises)} />
		</>
	);
};

export default App;
