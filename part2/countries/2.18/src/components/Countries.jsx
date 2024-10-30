const Countries = ({countries, countryNameFilter}) => {
    if(!countryNameFilter)
        return null

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryNameFilter.toLowerCase()))

    if(filteredCountries.length == 0)
      return null

    return (
      <>
        {filteredCountries.length > 1 ? 
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
            </div>
          ))
          : 
          <div>
            <h1>{filteredCountries[0].name.common}</h1>
            capital {filteredCountries[0].capital}
            <br/>
            area {filteredCountries[0].area}
            <h2>languages:</h2>
            <ul>
              {filteredCountries[0].languages && 
                Object.values(filteredCountries[0].languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))
              }
          </ul>
          <img 
            src={filteredCountries[0].flags.png} 
            alt={filteredCountries[0].flags.alt} 
            width="100" 
          />
          </div>
        }
      </>
    );
}

export default Countries