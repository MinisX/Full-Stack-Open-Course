import { useEffect, useState } from 'react';
import weatherService from '../service/weatherService'

const WeatherReport = ({city}) => {
    if(city === null || city === undefined)
        return

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService.getWeather(city).then(data => {
            setWeather(data);
        })
    }, [city])

    return (
        <>
        {weather != null ?
            <div>
                <h1>Weather in {city}</h1>
                temperature {weather.temp} Celcius
                <br/>
                <img 
                    src={weather.imgUrl}
                    alt="new"
                />
                <br/>
                wind {weather.wind} m/s
            </div>
        : null}
        </>
    )
}

export default WeatherReport