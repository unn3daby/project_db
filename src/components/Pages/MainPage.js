import React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from '@mui/material';
import veg from '../../img/vegetables.svg'
import './MainPage.scss';
import { Link } from 'react-router-dom';
import Button from '../../features/Button/Button';
import axios from 'axios';

const MainPage = () => {
    return (
        <>
            <Box sx = {{padding: {md: '20px', sm: '70px', xs: '50px', lg: '70px'}, textAlign: {xs: 'center', lg: 'left'}, display: 'table', alignItems:'stretch'}}  className='main-page' >
                <Grid container spacing={2}>
                    <Grid minHeight={'100%'} lgOffset = {2}  mdOffset = {1} xs={12} md = {5} >
                        <Box>
                            <Box fontSize={{xs: '15px'}}>
                                <h1 className='main-page__title'>Найдите лучшие цены на продукты: сравнивайте и экономьте с нашим веб-сервисом!</h1>
                            </Box>
                            <Box fontSize={{sm: '15px'}}>
                                <h2 className='main-page__subtitle'>Добро пожаловать на нашу веб-платформу, где вы можете получить актуальную информацию о ценах на различные продукты в разных магазинах! Мы поможем вам сэкономить время и деньги, позволяя сравнить цены и найти самые выгодные предложения.</h2>
                            </Box>
                            <Link to = '/products'><Button>Попробовать!</Button></Link>
                        </Box>
                    </Grid>
                    <Grid xs={0} md = {2} sx = {{display: {xs: 'none', md: 'block'}}}>
                        <Box sx = {{width: {md: '100%', sm: '50%'}}}>
                            <img className = 'woman' src={veg} alt="vegetables" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className="about" sx={{background: {xs: `#fdc400`, }}}>
                <Box className="about__text">
                    <Box>
                        <h3>Кто мы?</h3>
                    </Box>
                    <Box className= 'about__descr'>
                        <span>Цель!<br></br></span>
                        Наша цель - обеспечить вас информацией о том, где и что можно купить по наилучшей цене. Мы собираем данные о ценах на различные продукты в реальном времени из разных магазинов и предоставляем вам удобный способ сравнения.
                    </Box>

                    <Box className= 'about__descr'>
                        <span>Зачем?<br></br></span>
                        Мы убеждены, что наш сервис сэкономит ваше время и деньги, позволяя вам быстро найти лучшие предложения. Независимо от того, что вы ищете - продукты питания, электронику, одежду или другие товары - мы поможем вам найти самую выгодную цену.
                    </Box>

                    <Box className= 'about__descr'>
                        <span>Попробуйте!<br></br></span>
                        Присоединяйтесь к нам сегодня и начните экономить с помощью нашего веб-приложения!
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MainPage;