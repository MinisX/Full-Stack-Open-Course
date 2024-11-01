import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = (cityName) => {
    return axios.get(`${baseUrl}${cityName}&appid=${api_key}`)
    .then(response => {
        const data = response.data
        console.log(data)
        return { 
            temp: convertKelvinToCelsius(data.main.temp), 
            wind: data.wind.speed,
            imgUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        }
    })
    .catch(error => {
        console.error("Error fetching the weather: ", error)
        return null
    })
}

const convertKelvinToCelsius = (kelvinTemp) => {
    return (kelvinTemp - 273.15).toFixed(2);
}

export default {getWeather}