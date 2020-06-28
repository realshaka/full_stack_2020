import React from 'react'

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

const Country = ({country}) => {
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

export default Country