import React, { useState } from "react";
import Hourly from "./Hourly";
import Daily from "./Daily";
const API_KEY = process.env.REACT_APP_api_key;

export default function HourlyDaily ({weather}) {
    const [oneCall, setOneCall] = useState(null);
    const [hourlyDaily, setHourlyDaily] = useState(false);
    const fetchOneCall = () => {
      const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
      url.searchParams.append("appid", API_KEY)
      url.searchParams.append("lon", weather.coord.lon)
      url.searchParams.append("lat", weather.coord.lat)
      url.searchParams.append("exclude", "current,minutely,alerts")
      url.searchParams.append("units", "imperial")
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          setOneCall(obj);
        });
    };
    const disableButton = (id1, id2) => {
      var element = document.getElementById(id1);
      element.disabled = true;
      element = document.getElementById(id2);
      element.disabled = false;
    }
    if(oneCall === null){
      return(
        <div>
          <button id="hour" onClick = {()=>{setHourlyDaily(false); disableButton("hour", "day"); fetchOneCall();}}>Display Hourly Data</button>
          <button id="day" onClick = {()=>{setHourlyDaily(true); disableButton("day", "hour"); fetchOneCall();}}>Display Daily Data</button>
        </div>
      )   
    }else{
      return(
        <div>
          <button id="hour" onClick = {()=>{setHourlyDaily(false); disableButton("hour", "day"); fetchOneCall();}}>Display Hourly Data</button>
          <button id="day" onClick = {()=>{setHourlyDaily(true); disableButton("day", "hour"); fetchOneCall();}}>Display Daily Data</button>
          <div>
            {hourlyDaily ? (<Daily daily={oneCall.daily} />) : (<Hourly hourly={oneCall.hourly} />)}
          </div>
        </div>
      )
    }
}