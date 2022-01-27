import React from 'react'

const Weather = ({ weather }) => {

	if (weather) {
		const temperature = weather.main.temp
		const windSpeed = weather.wind.speed
		const icon = weather.weather[0].icon
		const iconAlt = weather.weather[0].description
		const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
		const windDirName = (d = weather.wind.deg) => {
			switch (true) {
				case d === 0:
				case d === 360:
					return "N";
				case d === 90:
					return "E";
				case d === 180:
					return "S";
				case d === 270:
					return "W";
				case (d > 0 && d < 90):
					return "NE";
				case (d > 90 && d < 180):
					return "SE";
				case (d > 180 && d < 270):
					return "SW";
				case (d > 270 && d < 360):
					return "NW";
				default:
					return "";
			}
		}

		return (
			<>
				<p>Temperature: {temperature} ºC</p>
				<p>Wind: {windSpeed} meter/sec, direction {windDirName()}</p>
				<img src={iconUrl} alt={iconAlt} />
			</>
		)
	}

	return 'Loading weather...'
}

export default Weather