import { NavLink } from 'react-router-dom'
import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useSelector } from 'react-redux';

import classes from './MainNavigation.module.css'

const MainNavigation = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuthenticated)

    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(authActions.logout())
    }


    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data === 'true') {
            dispatch(authActions.login())
        }
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(isAuth))
    })


    return (
        <header className={classes.header}>
            {isAuth && <button className="btn--flat" onClick={logoutHandler} >Log Out</button>}
            <div className={classes.logo}>Test Task</div>
            <nav className={classes.nav}>
                <ul>
                    <li><NavLink to="/products" activeClassName={classes.active} >Products</NavLink></li>
                    <li><NavLink to="/create-product" activeClassName={classes.active} >Create Product</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
