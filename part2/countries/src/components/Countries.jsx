const Countries = ({countries, countryNameFilter}) => {
    console.log(countryNameFilter)
    if(!countryNameFilter)
        return null

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryNameFilter.toLowerCase()))
    return (
    <>
        {filteredCountries.map((country) => (
        <div key ={country.name.common}>
          {country.name.common}
        </div>
      ))}
     </>
    )
}

export default Countries