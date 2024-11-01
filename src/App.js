import React, { useState } from "react";
import "./WeatherApp.css";
import WeatherCard from "./WeatherCard";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "93b65abc26154df8bb5230716240111"; 

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError("Failed to fetch weather data");
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">Loading data…</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <WeatherCard
            temp={weatherData.current.temp_c}
            humidity={weatherData.current.humidity}
            condition={weatherData.current.condition.text}
            windSpeed={weatherData.current.wind_kph}
          />
        </div>
      )}
    </div>
  );
};

export default App;
