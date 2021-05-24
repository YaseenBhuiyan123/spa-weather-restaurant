import React from "react";
import "./Hourly.css";
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
export default function Hourly ({hourly}) {
    return (
        <div>
            <div>
                {hourly.map((hour,i) => (
                    <div className="hourly">
                        <p className="hour">{i} Hours(s) From Now</p>
                        <p className="temp">Temp: {hour.temp}°F</p>
                        <p className="temp">Feels Like: {hour.feels_like}°F</p>
                        <p className="forecast">Forecast: {hour.weather[0].description} {getIcon(hour.weather[0].main)}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}