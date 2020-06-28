import React from 'react'
import Country from './Country'
const Countries = ({countries}) => {
  if (countries.length===250){
    return(
      <div>
        Start to search
      </div>
    )
  } else if(countries.length>10) {
    return (
      <div>
        Too many result
      </div>
    )
  } else if(countries.length>1) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.alpha2Code}>{country.name}</div>)}
      </div>
    )
  } else {
    return (
      <div>
        {countries.map(country =>
            <Country key={country.alpha2Code} country={country}/>
          )}
      </div>
    )
  }  
}

export default Countries