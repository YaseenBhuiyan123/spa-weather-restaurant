import React, { useState } from "react";
import Weather from "./Weather";
import HourlyDaily from "./HourlyDaily";
const API_KEY = process.env.REACT_APP_api_key;

function WeatherApp( {latitude, longitude} ) {
  const [weather, setWeather] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [cityName, setCityName] = useState(null);
  const fetchWeather = () => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", API_KEY);
    if(zipCode!==null){
      url.searchParams.append("zip", zipCode);
    }else if(cityName!==null){
      url.searchParams.append("q", cityName);
    }else{
      url.searchParams.append("lat", latitude);
      url.searchParams.append("lon", longitude);
    }
    url.searchParams.append("units", "imperial");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        // also important to check html error codes
        // 200 means no errors
        if (obj.cod === 200) {
          setWeather(obj);
        } else {
          setWeather(false);
        }
      });
  };
  const handleZipChange = (e) => {
    setZipCode(e.target.value);
  };
  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };
  if (weather === null) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Weather App</h1>
        <p>Enter zip code or city name</p>
        <input placeholder="Enter zip code" onChange={handleZipChange}></input>
        <input placeholder="Enter city name" onChange={handleCityChange}></input>
        <button onClick={fetchWeather}>Go!</button>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      <Weather
        weather = {weather}
      />
      <HourlyDaily
        weather = {weather}
      />
    </div>
  );
}
export default WeatherApp;