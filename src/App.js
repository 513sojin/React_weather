import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
const API_KEY = "";
//날씨 가져오기

function App() {
  const weatherOption = {
    
  };
  const [temp, setTemp] = useState(0); // 온도
  const [weather, setWeather] = useState("Loading"); // 날씨 (Clouds Clear Rain Mist 등)
  const [city, setCity] = useState("..."); // 지역
  const [descript, setDescript] = useState("..."); // 날씨설명
  const [dt, setDt] = useState(new Date()); // 타임
  const [sun, setSun] = useState({ sunset: 0, sunrise: 0 }); // 일출, 일몰 시간
  const [loading, setLoading] = useState(true); // 로딩중

  const getPosition = (options) => {
    
  };

  const getWeather = useCallback();
  useEffect(() => {
  }, [getWeather]);
  function tick() {
  }
  if (loading) {
    return (
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="article">
          <h1>
            <span role="img" aria-label="city">
              🏙
            </span>{" "}
            We are in {city}
          </h1>
          <p>
            <span role="img" aria-label="clock">
              ⏰ {dt.toLocaleTimeString()}
            </span>
          </p>
          <p>
            <span role="img" aria-label="temper">
              🌡
            </span>{" "}
            Current Temperature is {temp}
            <span role="img">°C</span>{" "}
          </p>
          <p>
            <span role="img" aria-label="sun">
              ☀️
            </span>{" "}
            Current Weather : {descript}
          </p>
        </div>
        <div className="fullscreen-video">
          <video muted={true} autoPlay={true} loop={true} src={weatherOption[weather].videoName}></video>
        </div>
      </header>
    </div>
  );
}

export default App;
