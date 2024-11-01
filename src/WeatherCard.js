import React from "react";

const WeatherCard = ({ temp, humidity, condition, windSpeed }) => (
  <div className="weather-cards">
    <div className="weather-card">
      <p>Temperature</p>
      <h2>{temp}°C</h2>
    </div>
    <div className="weather-card">
      <p>Humidity</p>
      <h2>{humidity}%</h2>
    </div>
    <div className="weather-card">
      <p>Condition</p>
      <h2>{condition}</h2>
    </div>
    <div className="weather-card">
      <p>Wind Speed</p>
      <h2>{windSpeed} kph</h2>
    </div>
  </div>
);

export default WeatherCard;
