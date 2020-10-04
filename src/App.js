import React, {useState, useEffect} from 'react'

export const App = () => {


  const endpoint = 'https://api.openweathermap.org/data/2.5/onecall?lat=59.334591&lon=18.063240&units=metric&appid='
  const API_KEY = '0873dd387b81dc473ae107f675063248'

  const url = endpoint + API_KEY

 
  const[loaded, setLoaded] = useState(false)
  const[data, setData] = useState({})

  //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  //api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  useEffect(()=>{

  fetch(url)
  .then(res => res.json())
  .then(json => {
    setData(json)
    setLoaded(true)
  })
  },[url])  


  return (
    <div className="wrapper">
      
      {loaded ? <div className="current"><p>Stockholm: </p>
      <p>{Math.round(data.current.temp)}°C  <img src={'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png'} alt="#" /></p>
      <p>Feels like: {Math.round(data.current.feels_like)}°C </p>
      <p>Min: {Math.round(data.daily[0].temp.min)}°C </p>
      <p>Max: {Math.round(data.daily[0].temp.max)}°C </p>
      {/* <p>Weather: {data.current.weather[0].description} </p> */}
      {data.daily.slice(0, -3).map(day => (
        <p key={day.dt}><img src={'http://openweathermap.org/img/w/' + day.weather[0].icon + '.png'} alt="#" />{Math.round(day.temp.day)}°C </p>
        ))}
  </div> : <div>not loaded yet</div> }
  
    </div>
  )
}
