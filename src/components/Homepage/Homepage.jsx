import React, {useEffect, useState} from 'react'
import styles from './Homepage.module.css'
import { fetch_data } from '../../functions'

export default function Homepage({code, favorite, setFavorite}) {
    const defaultKey = code ? favorite[code-1].key : 215854
    const defaultName = code ? favorite[code-1].cityName : 'Tel Aviv'
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const [hints, setHints] = useState([])
    const [clickedHint, setClickedHint] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})
    const [fiveDaysWeather, setFiveDaysWeather] = useState([])
    const [inputData, setInputData] = useState(defaultName)    

    useEffect(() => {
        parseData(defaultKey, defaultName)
    }, [])

    const parseData = (key, name) => {
        const five_days = fetch_data(`forecasts/v1/daily/5day/${key}`)
            five_days.then(data => {
                setFiveDaysWeather(data.DailyForecasts)
                const current = fetch_data(`currentconditions/v1/${key}`)
                current.then(data2 => {
                    setCurrentWeather(data2[0])
                    setClickedHint([{name: name, key:key}])
                })
            }).catch(function(error){console.log(error)});
    }

    const handleChange = (event) => {
        const res =  fetch_data('locations/v1/cities/autocomplete',
        {q: event.target.value, countryCode: "IL"}).catch(function(error){console.log(error)});

        res.then(data => setHints(data))
        setInputData(event.target.value)
    }

    const hintClick = (item) => {
        parseData(item.Key, item.LocalizedName)
        setHints([])
        setInputData(item.LocalizedName)
    }

    const setFavoriteBtn = () => {
        setFavorite([...favorite, {...currentWeather, cityName: clickedHint[0].name, key: clickedHint[0].key}])
    }

    const five_days_weather = fiveDaysWeather.map((item, key) => {
        let average = (item.Temperature.Maximum.Value + item.Temperature.Minimum.Value) /2
        let celsium = Math.round((average - 32) * 5 / 9)
        let day = new Date(item.Date)
        return (
            <div className={styles.daily_container} key={key}>
                <div>{days[day.getDay()]}</div>
                <div>{celsium} &deg;C</div>
            </div>
        )
    })

    const input_hints = hints.map((item, key) => <li onClick={() => hintClick(item)} key={key}>{item.LocalizedName}</li>)
  
    return (
    <>
      <div className={styles.search_block}>
          <form action="">
              <input type="text" onChange={handleChange} value={inputData} placeholder='Enter city'/>
              <div className="autocomplete">
                  <ul>
                    {input_hints}
                  </ul>
              </div>
          </form>

      </div>
      {clickedHint.length !== 0 && (
      <div className={styles.weather_block}>
          <div className={styles.main_info}>
              <div className={styles.left_part}>
                  <div>
                      {clickedHint[0].name}
                  </div>
                  <div>
                      {currentWeather.Temperature.Metric.Value} &deg;C
                  </div>
              </div>
              <div className={styles.right_part}>
                  <button onClick={() => setFavoriteBtn()}>Add to favorites</button>
              </div>
          </div>
          <div className={styles.current_weather}>
              {currentWeather.WeatherText}
          </div>
          <div className={styles.weather_daily}>
              {five_days_weather}
          </div>
      </div>
      )}
    </>
  )
}
