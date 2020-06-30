import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Languages = ({languages}) => {
	return (
		<div>
			<h2>Languages</h2>
			<ul>
				{languages.map(language => 
					<li key={language.name}>{language.name}</li>
				)}
			</ul>
		</div>
	)
}



const SingleCountry = (props) => {
	const country = props.country

	const api_key = process.env.REACT_APP_API_KEY
	const [ weather, setWeather ] = useState({current:{
		temperature: 0,
		weather_icon: '',
		wind_speed: 0,
		wind_dir:''
	}})

	useEffect(() => {
		async function fetchAPI () {
			const result = await axios
				.get('http://api.weatherstack.com/current', {
						params: {
								access_key: api_key,
								query: country.capital
						}
				})
				console.log(result)
				setWeather(result.data)
		}
		fetchAPI()
	}, [])

	return (	
	<div>
			<div>
				<h1>{country.name}</h1>
			</div>
			<div>
				<p>capital {country.capital}</p>
				<p>population {country.population}</p>
			</div>
			<div>
				<Languages languages = {country.languages}/>
			</div>
			<div>
				<img src={country.flag} width='120' height='90' alt='logo'/>
			</div>
			<div>{weather.current.temperature}</div>
			<div>
				<h2>Weather in {country.capital}</h2>
				<p><b>Temperature:</b> {weather.current.temperature} Celcius</p>
				<img src={weather.current.weather_icons}  alt='weather_icon'/>
				<p><b>Wind:</b> {weather.current.wind_speed} km/h direction: {weather.current.wind_dir}</p>
			</div> 
	</div>			
	)
}

export default SingleCountry