import { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import './MyCard.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useSetBookMarkMutation, useGetCardsQuery, useGetUserBookmarksQuery, useDeleteBookmarkMutation } from '../../api/apiSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { uid } from 'uid';

export default function MyCard({img, title, descr, id}) {
	//const [like, setLike] = useState(false);
	
	const {user, isAuth} = useSelector(state=> state.auth);
	const [sendBookmark, sendStatus] = useSetBookMarkMutation();
	const bookmarks = useGetUserBookmarksQuery(user.id);
	const [deleteBookmark, deleteStatus] = useDeleteBookmarkMutation();
    const cards = useGetCardsQuery();
    let cardsIds = [];
	let bookmarkIds = [];
	let isBookmarked = null;
    if(!bookmarks.isLoading && !cards.isLoading) {
		bookmarkIds = bookmarks.data.map(item =>({bookmarkId: item.id, cardId: item.cardId}));
        cardsIds = bookmarks.data.map(item =>item.cardId);
		isBookmarked = cardsIds.includes(id);
    }
	console.log(bookmarkIds);


	const setBookMark = async (bookmark) => {
		if(isBookmarked) {
			deleteBookmark(bookmarkIds.find(item => {
				return item.cardId === id 
			}).bookmarkId);
			//deleteBookmark(bookmarkIds.find(item => item === bookmark.id));
		}else {
			sendBookmark(bookmark);
		}

	}
	const createBookmark = () => ({id: uid(), userId: user.id, cardId: id})

  	return (
    <div className = 'mycard'>
		<Card sx={{ width: '250px', height: '380px', position: 'relative' }} className='mycard'>
			<Box
			visibility={isAuth?'visible':'hidden'}
			onClick = {async () => {
				setBookMark(createBookmark());
			}}
			className = 'mycard__like' 
			sx={{position: 'absolute', right: '0px', top: '0px', zIndex: '99', width: '50px', height: '50px'}}>
				{isBookmarked?<FavoriteIcon style={{ color: 'red' }}/>:<FavoriteBorderIcon/>}
			</Box>
		<Link to = {`${id}`}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="200"
					image={img}
					alt={title}
				/>
				<CardContent sx={{ height: '150px' }}>
					<Typography gutterBottom variant="h5" component="div" fontSize={'20px'}>
					{title}
					</Typography>
					<Typography variant="body2" color="text.secondary" fontSize={'12px'}>
					{`${descr.substr(0,150)}...`}
					</Typography>
				</CardContent>
			</CardActionArea>
			</Link>
		</Card>
    </div>
  );
}