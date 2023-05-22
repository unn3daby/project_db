import React, { useState } from 'react';
import './Navbar.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../img/logo.svg'
import { Avatar, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Hamburger from '../Hamburger/Hamburger';
import LogoutIcon from '@mui/icons-material/Logout';
import { userExit } from '../../slices/userSlice';

const Navbar = () => {
    const {user,isAuth} = useSelector(state => state.auth);
    const {pathname} = useLocation();
    const [burger, setBurger] = useState(false);
    const dispatch = useDispatch();


    return (
        <Box className='wrapper' sx={{justifyContent: {sm: 'space-between', md: 'space-between', lg: 'space-between', xs: 'space-between'}}}>
            <Box className = 'fixed' width={'200px'} height={'60px'} >
                <Link to = '/'>
                    <img src={logo} alt="logo" />
                </Link>
            </Box>
            <Box sx={{display: {sm: 'none', md: 'block', lg: 'block', xs: 'none'}}}>
                <ul className='navbar'>
                    <li className='navbar__item'><NavLink to = '/' active = 'active'>Главная</NavLink></li>
                    <li className='navbar__item'><NavLink to = '/products' active = 'active'>Товары</NavLink></li>
                    {isAuth?<li className='navbar__item'><NavLink to = '/bookmarks' active = 'active'>Закладки</NavLink></li>:null}
                    <li className='navbar__item'><NavLink to = '/about' active = 'active'>О нас</NavLink></li>
                </ul>
            </Box>
            {
                !isAuth && pathname !== '/login'?
                <Box sx={{display: {sm: 'none', md: 'block', lg: 'block', xs: 'none'}}} width={'200px'} height={'60px'} className = 'fixed'>
                    <button className = 'login-button'>
                        <Link to = '/login'>Войти</Link>
                    </button>
                </Box>
                : 
                null
            }
            {
                isAuth?
                <Box className="navbar__logged" sx={{display: {sm: 'none', md: 'flex', lg: 'flex', xs: 'none'}}}>
                    <Avatar>{user.name[0].toUpperCase()}</Avatar>
                    <LogoutIcon className = 'exit' onClick = {() => {dispatch(userExit())}} />
                </Box>
                :
                null
            }
            <Box className='hamburger-lines' sx={{display: {sm: 'block', md: 'none', lg: 'none', xs: 'block'}}} onClick = {() => {
                setBurger(state => !state)
            }}>
                <Hamburger/>
            </Box>
        </Box>
    );
};

export default Navbar;