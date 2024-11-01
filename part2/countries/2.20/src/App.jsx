import { useEffect, useState } from "react"
import countriesService from './service/countriesService'
import Countries from './components/Countries'

function App() {
  const [searchString, setSearchString] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService.getAll()
    .then(countries => {
      setCountries(countries)
    })
  }, [])

  const handleChange = (event) => {
    setSearchString(event.target.value)
  }

  return (
    <div>
      find countries: <input value={searchString} onChange={handleChange}/>
      <Countries  countries={countries} countryNameFilter={searchString}/>
    </div>
  )
}

export default App
