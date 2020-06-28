import React, {useState, useEffect} from 'react' 
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'
const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ filter, setFilter ] = useState('')
	const countriesToShow = countries.filter(country => country.name.toLowerCase().trim().includes(filter.trim().toLowerCase()) === true)
	const hook = () => {
		console.log('effect')
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
				console.log(countries)
			})
	}
	useEffect(hook, [])

	const handleFilter = (event) =>{
		setFilter(event.target.value)
	}


  return (
		<div>
			<Filter value={filter} onChange={handleFilter}/>
			<Countries countries={countriesToShow}/>
		</div>
  )
}

export default App