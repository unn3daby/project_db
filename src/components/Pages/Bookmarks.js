import { useEffect, useState } from 'react';
import Loader from '../../features/Loader/Loader';
import MyCard from '../Card/MyCard';
import { useGetCardsQuery, useGetUserBookmarksQuery } from '../../api/apiSlice';
import { useSelector } from 'react-redux';
import './Bookmarks.scss'
import { Box } from '@mui/material';

const Bookmarks = () => {

    const {user} = useSelector(state => state.auth);
    const bookmarks = useGetUserBookmarksQuery(user.id);
    console.log(bookmarks);
    const cards = useGetCardsQuery();
    let filteredCards = [];

    if(!bookmarks.isLoading && !cards.isLoading) {
        const cardsIds = bookmarks.data.map(item =>item.cardId);
        filteredCards = cards.data.filter((card) => cardsIds.includes(card.id));
    }

    return (
        <main className='bookmarks'>
            {
                (bookmarks.isLoading || cards.isLoading)?
                <Loader/>
                :
                <>
                    <h2 className='bookmarks__title'>Ваши закладки:</h2>
                    <Box className="bookmarks__wrapper">
                    {
                        filteredCards.length !== 0?
                        filteredCards.map(({id, title, descr, img}, i) => 
                        (<Box sx = {{margin: {md: '10px', sm: '10px', xs: '10px 0 20px 0', lg: '10px'}}} key = {i}>
                            <MyCard isLiked = {true} id = {id} title = {title} descr = {descr} img ={img} />
                        </Box>)) : <Box className = 'bookmarks__notfound'>Закладки не найдены!</Box>

                    }
                    </Box>
                </>
            }
        </main>
    );
};

export default Bookmarks;