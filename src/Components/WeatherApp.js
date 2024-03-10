import React from "react";
import WeatherApi from "../api/WeatherApi";
import {useState} from 'react';

//Need to set up OpenWeatherMap account and get a key for this to work.
if (!process.env.REACT_APP_API_KEY) {
    console.error('API key not set. Please configure the environment variable.');
  }

const key = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
    const weatherApi = new WeatherApi('https://api.openweathermap.org/data/2.5/weather', key);
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const updateWeather = () => {

        weatherApi.getWeatherByCity(city).then(data =>
            {
                setWeather(data);
                setError('');
            })
            .catch(error => {
                setError(error);
                setWeather(null);
            });

    }

    const updateCity = (city) => {
        setCity(city);
        setError('');
    }

    return ( <div>
        <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => updateCity(e.target.value)}
      />
      <button onClick={updateWeather}>Get Weather</button>

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}

     {error !== '' && (
        <div>
          <h2>Error:</h2>
          <p>City {city} not found. {weatherApi.error}</p>
        </div>
      )}

      </div>)
    
}

export default WeatherApp;