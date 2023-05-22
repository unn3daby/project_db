import { useState } from 'react';
import Loader from '../../features/Loader/Loader';
import MyCard from '../Card/MyCard';
import { useGetCardsQuery } from '../../api/apiSlice';
import { useSelector } from 'react-redux';
import './Bookmarks.scss'
import { Box } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';

const Bookmarks = () => {

    const {user} = useSelector(store => store.auth);
    const {bookmarks, bookmarksIds} = useSelector(store => store.bookmarks);
    const [filter, setFilter] = useState('');
    const cards = useGetCardsQuery();
    let filteredCards = [];
    if(!cards.isLoading) {
		filteredCards = cards.data.filter((card) => bookmarksIds.includes(card.id)).filter(item => item.name.indexOf(filter) >= 0);
    }

    return (
        <main className='bookmarks'>
            {
                cards.isLoading?
                <Loader/>
                :
                !cards.isError?
                <>
                    <h2 className='bookmarks__title'>Ваши закладки:</h2>
                    <SearchBar placeholder={'Введите название товара'} value = {filter} setValue={setFilter}/>
                    <Box className="bookmarks__wrapper">
                    {
                        filteredCards.length !== 0?
                        filteredCards.map(({id, name, description, imageURL}, i) => 
                        (<Box sx = {{margin: {md: '10px', sm: '10px', xs: '10px 0 20px 0', lg: '10px'}}} key = {i}>
                            <MyCard id = {id} title = {name} descr = {description} img ={imageURL} bookmarks = {bookmarks}/>
                        </Box>)) : <Box className = 'bookmarks__notfound'>Закладки не найдены!</Box>

                    }
                    </Box>
                </>
                :
                console.log('error')
            }
        </main>
    );
};

export default Bookmarks;