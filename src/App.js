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
     await delay(1000); // Wait for 1 second
     try {
       const response = await fetch(
         `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
       );
       if (!response.ok) {
         throw new Error("Failed to fetch weather data"); // Throw an error if response is not ok
       }
       const data = await response.json();
       setWeatherData(data); // Set weather data from response
     } catch (error) {
       setError("Failed to fetch weather data"); // Set error state with a fixed message
       alert("Failed to fetch weather data"); // Alert the user with the simplified error message
     } finally {
       setLoading(false); // Always set loading to false after fetch
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
        <button onClick={handleSearch}>Search</button> {/* Button to initiate search */}
      </div>


      {/* Display loading message right below the search bar */}
      {loading && <p className="loading">Loading data…</p>}
      
      {error && <p className="error">{error}</p>}  {/* Display error message if there is an error */}

  
      {/* Display loading message right below the search bar */}
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
