import React from 'react'
import List from './List'
import CountryData from './CountryData'


const Countries = ({ countries = [], filter = '', onClick } = {}) => {

	const countriesNames = countries
		.map(country =>
			country.name.common)
		.filter(country =>
			country.toLowerCase()
				.includes(filter.toLowerCase())
		);

	if (countriesNames.length > 10 && filter !== '')
		return <p>Too many matches, specify another filter</p>

	if (countriesNames.length === 0)
		return <p>No matches, specify another filter</p>

	if (countriesNames.length === 1) {
		const [countryData] = countries
			.filter(country =>
				country.name.common
					.toLowerCase()
					.includes(filter.toLowerCase())
			)
		return <CountryData countryData={countryData} />
	}

	return <List list={countriesNames} show={true} onClick={onClick} />

}

export default Countries