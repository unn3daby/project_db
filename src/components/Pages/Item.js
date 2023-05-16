import  Grid  from '@mui/material/Grid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import './Item.scss'
import { useGetOneCardQuery, useGetShopsQuery } from '../../api/apiSlice';
import Loader from '../../features/Loader/Loader';
import Button from '../../features/Button/Button';
const Item = () => {
    const params = useParams();
    const {isLoading, data} = useGetOneCardQuery(params.id);
    const shops = useGetShopsQuery();
    const [shopsActive, setShopsActive] = useState(false);
    let vShops = [];
    if(!isLoading && !shops.isLoading)
        vShops = shops.data.filter((shop) => data.shops.includes(shop.id));
        console.log(vShops);
    return (
        <div className='product'>
           {    
           isLoading?
                <Loader/>
                :
                <Grid container columnSpacing={2} alignItems={'center'}>
                    <Grid item md= {6} sm = {12} xs= {12} lg = {6}>
                        <Box sx = {{width: {md: '400px', sm: '400px', xs: '400px', lg: '500px'}, height: 'auto', margin: '0 auto'}}>
                            <img src={data.img} alt="" className='product__img'/>
                        </Box>
                    </Grid>
                    <Grid item md= {6} sm = {12} xs= {12} lg = {6} sx = {{textAlign: {md: 'left', sm: 'center', xs: 'center', lg: 'left'}}}>
                        <Box className = 'product__title' sx = {{mt:{md: '0', sm: '0', xs: '40px', lg: '0'}}}><h2>{data.title}</h2></Box>
                        <Box className = 'product__descr' sx = {{mt:{md: '10px', sm: '10px', xs: '40px', lg: '10px'}, fontSize: {md: '25px', sm: '25px', xs: '30px', lg: '30px'}}}>
                        {data.descr}
                        </Box>
                    </Grid>
                    <Grid item xs = {12} textAlign={'center'} mt = {15}>
                        {   
                            shopsActive?
                            <Box>{vShops.map(item=> <div>{item.name}</div>)}</Box>
                            :
                            <Button onClick = {() => {setShopsActive(true)}}>Проверить наличие в магазинах</Button>
                        }
                    </Grid>
                </Grid>
           }
        </div>
    );
};

export default Item;