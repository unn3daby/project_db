import  Grid  from '@mui/material/Grid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import './Item.scss'
import { useGetOneCardQuery, useGetShopsQuery } from '../../api/apiSlice';
import Loader from '../../features/Loader/Loader';
import { shopsService } from '../../services/shopsServiсe';
import Tabs from '../../features/Tabs/Tabs';
const Item = () => {
    const params = useParams();
    const {isLoading, data} = useGetOneCardQuery(params.id);
    const shops = useGetShopsQuery();

    let objPrices = {};
    let minPrice = 0;
    let shopWithMinPrice = 0;
    let minPriceStoreId = 0; 
    let shopObj = {};
    if(!isLoading && !shops.isLoading){
        objPrices = shopsService(data.productHasPrices);
        minPrice = Math.min(...Object.keys(objPrices).map(item => objPrices[item].prices).map(item => item[item.length - 1]));
        for (const storeId in objPrices) {
          const prices = objPrices[storeId].prices;
          if (prices.includes(minPrice)) {
            minPriceStoreId = storeId;
            break; // Выходим из цикла, как только найден магазин с минимальной ценой
          }
        }
        shopObj = shops.data.filter(item => `${item.id}` === minPriceStoreId);
    };

    
    return (
        <div className='product'>
           {    
            isLoading?
                <Loader/>
                :
                <Grid container columnSpacing={2} alignItems={'center'}>
                    <Grid item md= {6} sm = {12} xs= {12} lg = {6}>
                        <Box sx = {{width: {md: '300px', sm: '300px', xs: '200px', lg: '300px'}, height: 'auto', margin: '0 auto'}}>
                            <img src={data.imageURL} alt="" className='product__img'/>
                        </Box>
                    </Grid>
                    <Grid item md= {6} sm = {12} xs= {12} lg = {6} sx = {{textAlign: {md: 'left', sm: 'center', xs: 'center', lg: 'left'}}}>
                        <Box className = 'product__title' sx = {{mt:{md: '0', sm: '0', xs: '40px', lg: '0'}, fontSize: {md: '20px', sm: '30px', xs: '17px', lg: '40px'}}}><h2>{data.name}</h2></Box>
                        <Box className = 'product__descr' sx = {{mt:{md: '10px', sm: '10px', xs: '40px', lg: '10px'}, fontSize: {md: '20px', sm: '25px', xs: '15px', lg: '30px'}, width: {}}}>
                            {data.description}
                        </Box>
                        <Box className="product__min-price">
                            <h3>Минимальная Цена: {minPrice}₽</h3>
                            <Box className = 'product__min-price__container'>
                                <img className = 'product__min-price__logo' src={!isLoading && !shops.isLoading?shopObj[0].webURL : null} alt="" />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs = {12} textAlign={'center'} mt = {15}>
                        <Box className = 'product__shops'>
                            <Tabs tabsData={objPrices} shops = {shops.data} isLoadingTabs={isLoading}/>
                        </Box>
                    </Grid>
                </Grid>
           }
        </div>
    );
};

export default Item;