import React, { useState } from 'react';

const Header = (props) => <h1>{props.header}</h1>;

const StatisticLine = (props) => (
	<tr>
		<td>{props.text}</td>
		<td>{props.value}</td>
	</tr>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = (props) => {
	const { good, neutral, bad } = props;
	const all = good + neutral + bad;
	const average = (good - bad) / all;
	const positive = (good / all) * 100 + ' %';

	if (good === 0 && neutral === 0 && bad === 0) {
		return <div> No feedback given </div>;
	}

	return (
		<table>
			<tbody>
				<StatisticLine text='good' value={good} />
				<StatisticLine text='neutral' value={neutral} />
				<StatisticLine text='bad' value={bad} />
				<StatisticLine text='all' value={all} />
				<StatisticLine text='average' value={average} />
				<StatisticLine text='positive' value={positive} />
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<Header header='give feedback' />
			<Button onClick={() => setGood(good + 1)} text='good' />
			<Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
			<Button onClick={() => setBad(bad + 1)} text='bad' />
			<Header header='statistics' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
