import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import './MyCard.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useSetBookMarkMutation, useGetCardsQuery, useGetUserBookmarksQuery, useDeleteBookmarkMutation } from '../../api/apiSlice';
import { useSelector } from 'react-redux';

export default function MyCard({img, title, descr, id}) {
	const [like, setLike] = useState(false);
	const {user, isAuth} = useSelector(state => state.auth);
	const [postBookmark, postStatus] = useSetBookMarkMutation();
	const [deleteBookmark, deleteStatus] = useDeleteBookmarkMutation()
	const {bookmarks, bookmarksIds} = useSelector(store => store.bookmarks);
	const navigate = useNavigate();

	useEffect(() => {
		if(isAuth) {
			if(bookmarksIds.includes(id))
				setLike(true)
		}
	}, [bookmarks])

	async function sendBookmark() {
		if(like) {
			await deleteBookmark({userId:user.id, id:id});
			setLike(false);
		} else {
			setLike(true);
			postBookmark({userId:user.id, id:id})
		}
	}
	const handleProductClick = (productId) => {
		navigate(`/products/${productId}`);
	  };
  	return (
    <div className = 'mycard'>
		<Card sx={{ width: '250px', height: '380px', position: 'relative' }} className='mycard'>
			<Box
			visibility={isAuth?'visible':'hidden'}
			onClick = {() => {
				sendBookmark();
			}}
			className = 'mycard__like' 
			sx={{position: 'absolute', right: '0px', top: '0px', zIndex: '99', width: '50px', height: '50px'}}>
				{like?<FavoriteIcon style={{ color: 'red' }}/>:<FavoriteBorderIcon/>}
			</Box>
		<Box className = 'mycard__link' onClick = {() => handleProductClick(id)}>
			<CardActionArea>
				<div className='mycard__wrapper'>
					<CardMedia
						component='img'
						height="auto"
						width='auto'
						image={img}
						alt={title}
					/>
				</div>
				<CardContent sx={{ height: '150px' }}>
					<Typography gutterBottom variant="h5" component="div" fontSize={'20px'}>
					{title}
					</Typography>
					<Typography variant="body2" color="text.secondary" fontSize={'12px'}>
					{`${descr.length > 75?descr.substr(0,72)+'...':descr}`}
					</Typography>
				</CardContent>
			</CardActionArea>
			</Box>
		</Card>
    </div>
  );
}