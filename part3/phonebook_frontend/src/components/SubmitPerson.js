import React from 'react'
import Notification from './Notification'

const SubmitPerson = (props) => {

	return (
		<form onSubmit={props.onSubmit}>
			<div>
				name: <input value={props.newName} onChange={props.onNameChange} />
			</div>
			<div>
				number: <input value={props.newNumber} onChange={props.onNumberChange} />
			</div>
			<Notification message={props.message} isError={props.isError} />
			<div>
				<button type="submit">add</button>
			</div>
		</form>)
}

export default SubmitPerson