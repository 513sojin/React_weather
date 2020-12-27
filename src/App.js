import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
import {API_KEY} from './config';

function App() {
  const [temp, setTemp] = useState(0); // 온도
  const [weather, setWeather] = useState("Loading"); // 날씨 (Clouds Clear Rain Mist 등)
  const [city, setCity] = useState("..."); // 지역
  const [descript, setDescript] = useState("..."); // 날씨설명
  const [dt, setDt] = useState(new Date()); // 타임
  const [sun, setSun] = useState({ sunset: 0, sunrise: 0 }); // 일출, 일몰 시간
  const [loading, setLoading] = useState(true); // 로딩중
  
  const getWeather=useCallback(async ()=>{
    const resp=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${API_KEY}`);
    setLoading(false);
    setTemp(String(resp.data.main.temp-273).substring(0,4));
    setWeather(resp.data.weather[0].main);
    setDescript(resp.data.weather[0].description);
    setCity(resp.data.name);
    setSun({
      sunset:resp.data.sys.sunset,
      sunrise:resp.data.sys.sunrise
    });
  },[]);

  useEffect(()=>{
    getWeather(); 
    console.log("Get Api");
    const timer=setInterval(()=>{
      setDt(new Date())
    },1000);
  },[])

  useEffect(()=>{
    setInterval(()=>{
      getWeather();
      console.log("page loading......");
    },60000);
  },[]);

  //뒷배경
  const [timeset,setTimeset]=useState("");
  let [videoName,setVideoName]=useState("");

  useEffect(()=>{
    dt.getHours()>6 && dt.getHours()<18 ? setTimeset("day") : setTimeset("night");
    if(weather==="Clouds"){
      setWeather("cloudy");
    }
    setVideoName(timeset+"_"+weather);
  },[timeset,weather])

  //loading page
  if (loading===true) {
    return (
      <body className="loading">
        <div className="loading_font">Loading...</div>
      </body>
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
          <video muted={true} autoPlay={true} loop={true} src={'../weather_source/'+videoName+'.mp4'}></video>
        </div>
        
      </header>
    </div>
  );
}

export default App;
