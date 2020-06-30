import React, {useState} from 'react'


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

const MultiCountry = (props) => {
	const country = props.country
	const [ show, setShow ] = useState(props.show)

	const api_key = process.env.REACT_APP_API_KEY

	const handleShowClick =(event) => {
		setShow(true)
		event.preventDefault()
	}
	

	if (show===false) {
		return (
			<div>
				{props.country.name} 
				<button onClick={handleShowClick}>show</button>
			</div>
		)
	} 
	
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
		</div>
			
	)

}
export default MultiCountry