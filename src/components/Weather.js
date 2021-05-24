import React from "react";
import "./Weather.css";
import { WiRain, WiCloud, WiDaySunny } from "react-icons/wi";

const getIcon = (forecast) => {
    if (forecast === "Clear"){
        return (<WiDaySunny />)
    } else if (forecast === "Rain"){
        return (<WiRain />)
    }else{
        return (<WiCloud />)
    }
}
export default function Weather ({weather}) {
    console.log(JSON.stringify(weather, undefined, 4))
    return (
        <div>
          <h1> Weather App </h1>
          <h3>{weather.name}</h3>
          <div className="weather">
              <p>Temp: {weather.main.temp}°F</p>
              <p>Feels Like: {weather.main.feels_like}°F</p>
              <p>High: {weather.main.temp_max}°F</p>
              <p>Low: {weather.main.temp_min}°F</p>
              <p>Forecast: {weather.weather[0].description} {getIcon(weather.weather[0].main)}</p>
          </div>
        </div>
    );
}