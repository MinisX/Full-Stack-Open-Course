import { useState } from "react"
import CountryDetailedView from "./CountryDetailedView";

const Countries = ({countries, countryNameFilter}) => {
  const [countriesWithDetails, setCountriesWithDetails] = useState([])
  
    if(!countryNameFilter)
        return null

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryNameFilter.toLowerCase()))

    const toggleShow = (index) => {
      const newCountriesWithDetails = {...countriesWithDetails}
      // java treats undefined as false, so if the element at index X does not exist
      // then it is present as false and inverted to true
      newCountriesWithDetails[index] = !newCountriesWithDetails[index]
      setCountriesWithDetails(newCountriesWithDetails)
    }

    if(filteredCountries.length == 0)
      return null

    return (
      <> 
        {filteredCountries.length > 1 ? 
          filteredCountries.map((country, index) => (
            <div key={country.name.common}>
              {country.name.common} <button onClick={() => toggleShow(index)}>{countriesWithDetails[index] ? 'hide' : 'show'}</button>
              {countriesWithDetails[index] ? <CountryDetailedView country={filteredCountries[index]}></CountryDetailedView> : null}
            </div>
          ))
          : 
          <CountryDetailedView country={filteredCountries[0]}/>
        }
      </>
    );
}

export default Countries