const CountryDetailedView = ({country}) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            capital {country.capital}
            <br/>
            area {country.area}
            <h2>languages:</h2>
            <ul>
              {country.languages && 
                Object.values(country.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))
              }
          </ul>
          <img 
            src={country.flags.png} 
            alt={country.flags.alt} 
            width="100" 
          />
        </>
    )
}

export default CountryDetailedView