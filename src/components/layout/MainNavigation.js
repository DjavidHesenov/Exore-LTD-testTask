import { NavLink } from 'react-router-dom'
import React from 'react'

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Test Task</div>
            <nav className={classes.nav}>
                <ul>
                    <li><NavLink to="/products" activeClassName={classes.active} >Products</NavLink></li>
                    <li><NavLink to="/test" activeClassName={classes.active} >Test</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
