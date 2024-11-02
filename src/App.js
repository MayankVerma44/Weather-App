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
    if (!city) return; // Prevent fetch if city is empty
    setLoading(true); // Set loading to true before fetching
    setError(""); // Clear previous errors
     // Delay the fetch operation
  setTimeout(async () => {
    setError(""); // Clear previous errors
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data); // Set weather data from response
    } catch (error) {
      setError("Failed to fetch weather data: " + error.message); // Set error message
    } finally {
      setLoading(false); // Always set loading to false after fetch
    }
  }, 1000); // 1000 milliseconds (1 second) delay

  const handleSearch = () => {
    fetchWeather(); // Trigger the fetch operation
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
        />
        <button onClick={handleSearch}>Search</button> {/* Button to initiate search */}
      </div>
      {/* Display loading message right below the search bar */}
      {loading && <p className="loading">Loading data…</p>}
  
      {/* {error && <p className="error">{error}</p>} Display error message if there is an error */}
  
      {weatherData && ( // Render weather data only if available
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
