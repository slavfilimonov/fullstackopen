import React from 'react'


const ListItem = ({ item, show = false, onClick } = {}) => {

	const passItem = () => {
		onClick(item)
	}

	if (!show)
		return (
			<li>
				{item}
			</li>
		)

	if (show)
		return (
			<li>
				{item + ' '}
				<button onClick={passItem} item={item}>show</button>
			</li>
		)
}

export default ListItem