import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from './List'
import Weather from './Weather'

const CountryData = ({ countryData }) => {
	const [weather, setWeather] = useState()

	const apiKey = process.env.REACT_APP_API_KEY
	const name = countryData.name.common
	const capital = countryData.capital
	const population = countryData.population
	const maps = countryData.maps.googleMaps
	const languages = Object.values(countryData.languages)
	const img = countryData.flags.png
	const countryCode = countryData.cca2.toLowerCase()

	useEffect(() => {
		axios
			.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${apiKey}&units=metric`)
			.then(response => {
				setWeather(response.data)
			})
	}, [capital, countryCode, apiKey])

	return (
		<>
			<h2>{name}</h2>
			<p>Capital: {capital}</p>
			<p>Population: {population}</p>
			<a href={maps} target="_blank" rel="noreferrer noopener">Google Maps</a>
			<h3>Languages</h3>
			<List list={languages} />
			<img src={img} alt={'Flag of ' + name} />
			<h3>Weather in {capital}</h3>
			<Weather weather={weather} />
		</>
	)
}

export default CountryData
