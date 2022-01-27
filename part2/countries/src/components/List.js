import React from 'react'
import ListItem from './ListItem'

const List = ({ list, show, onClick }) => {

	return (
		<ul >
			{
				list.map(item =>
					<ListItem key={item} item={item} show={show} onClick={onClick} />
				)
			}
		</ul >
	)
}

export default List