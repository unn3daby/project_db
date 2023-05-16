import React, { lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './features/navigation/Navbar';
import Products from './components/Pages/Products';
import Footer from './features/Footer/Footer';
import Item from './components/Pages/Item';
//import PrivateRoute from './features/PrivateRoute/PrivateRoute';
import Bookmarks from './components/Pages/Bookmarks';
import Login from './components/Pages/Login';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MainPage = lazy(() => import('./components/Pages/MainPage'));

function App() {
	const state = useSelector(state=> state.auth);
	const {isAuth} = state


  return (
    <div className="App">
	<Router>
		<Navbar/>
		<div className="dynamic">
			<Routes>
				<Route path="/" element={<MainPage/>} />
				<Route path="/about" element={<div />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:id" element={<Item/>}/>
				<Route path="/login" element = {<Login/>} />
				<Route path="/register" element = {<Login/>} />
				<Route path="/bookmarks" element={!isAuth?<Navigate to = {'/login'} />:<Bookmarks/>} />
			</Routes> 
		</div>
		<Footer/>
    </Router>
    </div>
  );
}

export default App;
