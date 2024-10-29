import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const search = (countryName) => {
    const request = axios.get(`${baseUrl}/name/${countryName}`)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl.concat('all'))
    return request.then(response => response.data)
}

export default {search, getAll}