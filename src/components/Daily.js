import React from "react";
import "./Daily.css";
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
export default function Daily ({daily}) {
    return (
        <div>
            <div>
                {daily.map((day,i) => (
                    <div className="daily">
                        <p className="day">{i} Day(s) From Today</p>
                        <p className="high">High: {day.temp.max}°F</p>
                        <p className="low">Low: {day.temp.min}°F</p>
                        <p className="forecast">Forecast: {day.weather[0].description} {getIcon(day.weather[0].main)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}