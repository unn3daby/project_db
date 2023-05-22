import React, { lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './features/navigation/Navbar';
import Products from './components/Pages/Products';
import Footer from './features/Footer/Footer';
import Item from './components/Pages/Item';
import Bookmarks from './components/Pages/Bookmarks';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import MainPage from './components/Pages/MainPage'
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserBookmarksQuery } from './api/apiSlice';
import { bookmarksAdd } from './slices/bookmarksSlice';
import About from './components/Pages/About';

function App() {
	const state = useSelector(state=> state.auth);
	const dispatch = useDispatch();
	const {isAuth} = state;
	const {data, isLoading} = useGetUserBookmarksQuery(state.user.id, {skip: !isAuth });
	useEffect(() => {
		if(isAuth && !isLoading)
			dispatch(bookmarksAdd(data))
	}, [data])
  return (
    <div className="App">
	<Router>
		<Navbar/>
		<div className="dynamic">
			<Routes>
				<Route path="/" element={<MainPage/>} />
				<Route path="/about" element={<About />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:id" element={<Item/>}/>
				<Route path="/login" element = {isAuth?<Navigate to = {'/'} />:<Login/>} />
				<Route path="/register" element = {isAuth?<Navigate to = {'/'} />:<Register/>} />
				<Route path="/bookmarks" element={!isAuth?<Navigate to = {'/login'} />:<Bookmarks/>} />
			</Routes> 
		</div>
		<Footer/>
    </Router>
    </div>
  );
}

export default App;
