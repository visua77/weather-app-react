import React, {useState, useEffect} from 'react'
import moment from 'moment'

export const App = () => {

  const[location, setLocation] = useState('Stockholm')
  const[endpoint, setEndpoint] = useState('https://api.openweathermap.org/data/2.5/onecall?lat=59.334591&lon=18.063240&units=metric&appid=')

  const API_KEY = '0873dd387b81dc473ae107f675063248'

  const url = endpoint + API_KEY

  //setting state here
  const[loaded, setLoaded] = useState(false)
  const[data, setData] = useState({})
  const[temperature, setTemperature] = useState(false)

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

  },[url,endpoint])  

  
useEffect(()=>{

    if(loaded && data.current.temp >= 18)
      //console.log('loaded')
      setTemperature(true)
    else if(loaded && data.current.temp <=17){
      setTemperature(false)
    }
  },)


useEffect(()=> {

    if(loaded && location === 'Stockholm'){
      setEndpoint('https://api.openweathermap.org/data/2.5/onecall?lat=59.334591&lon=18.063240&units=metric&appid=')
    }
    if(loaded && location==='Schaprode'){
      setEndpoint('https://api.openweathermap.org/data/2.5/onecall?lat=54.5167&lon=13.1667&units=metric&appid=')
    }
    if(loaded && location==='Sóller'){
      setEndpoint('https://api.openweathermap.org/data/2.5/onecall?lat=39.76623&lon=2.71521&units=metric&appid=')
    }
    console.log(endpoint)
    },[location])

  const handleChange = (e) => {
    const val = e.target.value
      setLocation(val)
    }
  
  
return (
    <div className={`wrapper ${temperature ? "hot" : "cold"}`}>
      
      {loaded ? <div className="current"><p className="title">{location}: </p>

      <p>
      <select onChange={(e)=> {handleChange(e)}}>

      <option value={'Stockholm'}>Stockholm</option>
      <option value={'Schaprode'}>Schaprode</option>
      <option value={'Sóller'}>Sóller</option>
      </select></p>

      <p className="current-w">{Math.round(data.current.temp)}°C  <img src={'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png'} alt="#" /></p>
      <p className="current-w">Feels like: {Math.round(data.current.feels_like)}°C </p>
      <p className="current-w">Min: {Math.round(data.daily[0].temp.min)}°C </p>
      <p className="current-w">Max: {Math.round(data.daily[0].temp.max)}°C </p>
      {/* <p>Weather: {data.current.weather[0].description} </p> */}
      
      {data.daily.slice(1, -2).map(day => (
        <p className="forecast" key={day.dt}>{moment(day.dt*1000).format('dddd')/* {(day.dt*1000)} */}<img src={'http://openweathermap.org/img/wn/' + day.weather[0].icon + '.png'} alt="#" />{Math.round(day.temp.day)}°C </p>
        ))}
    </div> : <div>not loaded yet</div> }
    </div>
  )
}