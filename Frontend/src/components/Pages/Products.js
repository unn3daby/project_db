import React, { useState } from 'react';
import MyCard from '../Card/MyCard';
import './Products.scss';
import { useGetCardsQuery, useGetUserBookmarksQuery } from '../../api/apiSlice';
import Loader from '../../features/Loader/Loader';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';

const Products = () => {
    const {user} = useSelector(state => state.auth);
    const {data, isLoading, isError} = useGetCardsQuery();
    const [filter, setFilter] = useState('');
    let filteredData = data;
    if (!isLoading && !isError) {
        filteredData = data.filter(item => item.name.indexOf(filter) >= 0)
    }
    console.log(isError);

    return (
        <main className='products'>
            {
                isLoading?
                <Loader className = 'loader'/>
                :
                isError?
                <h1>Ошибка: backend не подключен</h1>
                :
                <>
                    <h2 className='products__title'>Найдите нужный вам товар!</h2>
                        <SearchBar placeholder={'Введите название товара'} value = {filter} setValue={setFilter}/>
                        <Box className="products__wrapper">
                        {
                            filteredData.length !== 0?
                            filteredData.map(({id, name, description, imageURL}, i) => 
                            (<Box sx = {{margin: {md: '10px', sm: '10px', xs: '10px 0 20px 0', lg: '10px'}}} key = {i}>
                                <MyCard id = {id} title = {name} descr = {description} img ={imageURL} />
                            </Box>)) : <Box className = 'products__notfound'>Товары не найдены!</Box>
                        }
                    </Box>
                </>
            }
        </main>
    );
};

export default Products;