import React from 'react';
import './Navbar.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../img/logo.svg'
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {isAuth} = useSelector(state => state.auth);
    const {pathname} = useLocation();

    return (
        <Box className='wrapper' sx={{justifyContent: {sm: 'right', md: 'right', lg: 'center', xs: 'right'}}}>
            <img src={logo} alt="logo" />
            <ul className='navbar'>
                <li className='navbar__item'><NavLink to = '/' active = 'active'>Главная</NavLink></li>
                <li className='navbar__item'><NavLink to = '/products' active = 'active'>Товары</NavLink></li>
                {isAuth?<li className='navbar__item'><NavLink to = '/bookmarks' active = 'active'>Закладки</NavLink></li>:null}
                <li className='navbar__item'><NavLink to = '/about' active = 'active'>О нас</NavLink></li>
            </ul>
            {!isAuth && pathname !== '/login'?<button className = 'login-button'><Link to = '/login'>Войти</Link></button>: null}
        </Box>
    );
};

export default Navbar;