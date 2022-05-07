import React from 'react';

const Notification = ({ message, isError }) => {
	const errorStyle = {
		color: 'red',
		fontWeight: 600
	}
	const successStyle = {
		color: 'green',
		fontWeight: 600
	}
	const style = isError ? errorStyle : successStyle

	if (message === null) {
		return null
	}

	return (
		<div style={style}>
			{message}
		</div>
	)
}

export default Notification
