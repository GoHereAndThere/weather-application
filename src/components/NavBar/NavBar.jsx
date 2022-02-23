import React from 'react'
import {NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <div className={styles.nav_bar}>
        <div className={styles.logo}>
            My logo
        </div>
        <ul>
            <li><NavLink exact to='/' activeClassName={styles.active_link}>Home page</NavLink ></li>
            <li><NavLink to='/favorites' activeClassName={styles.active_link}>Favorites Page</NavLink ></li>
        </ul>
    </div>
  )
}
