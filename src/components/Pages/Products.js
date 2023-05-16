import React from 'react';
import MyCard from '../Card/MyCard';
import './Products.scss';
import { useGetCardsQuery, useGetUserBookmarksQuery } from '../../api/apiSlice';
import Loader from '../../features/Loader/Loader';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Products = () => {
    const {user} = useSelector(state => state.auth);
    const {data, isLoading} = useGetCardsQuery();
    const filteredData = data

    return (
        <main className='products'>
            {
                isLoading?
                <Loader className = 'loader'/>
                :
                <>
                    <h2 className='products__title'>Найдите нужный вам товар!</h2>
                        <Box className="products__wrapper">
                        {
                            filteredData.length !== 0?
                            filteredData.map(({id, title, descr, img, isLiked}, i) => 
                            (<Box sx = {{margin: {md: '10px', sm: '10px', xs: '10px 0 20px 0', lg: '10px'}}} key = {i}>
                                <MyCard isLiked = {isLiked} id = {id} title = {title} descr = {descr} img ={img} />
                            </Box>)) : <Box className = 'products__notfound'>Товары не найдены!</Box>
                        }
                    </Box>
                </>
            }
        </main>
    );
};

export default Products;