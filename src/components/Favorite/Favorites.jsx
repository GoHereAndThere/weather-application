import React from 'react'
import styles from './Favorite.module.css'
import {Link} from 'react-router-dom'

export default function Favorites ({favorite}) {
  const favorites = favorite.map((item, key) => {
    return (
      <div className={styles.favorite_block} key={key}>
        <Link to={`/${key+1}`}>
          <div>{item.cityName}</div>
          <div>{item.Temperature.Metric.Value} &deg;C</div>
          <div>{item.WeatherText}</div>
        </Link>

        
        
        

      </div>
    )
  })
  return (
    <div className={styles.favorites_outer} >
      {favorites}
    </div>
  )
}
