import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import './Login.scss';
import Button from '../../features/Button/Button';
import { loginRequest } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { userAdd, userError } from '../../slices/userSlice';
import  { useNavigate }  from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {isError} = useSelector(state => state.auth);

    const authFunc = async() => {
        const user = await loginRequest(username, password);
        if(user) {
            dispatch(userAdd(user));
            navigate('/');
        }
        else {
            dispatch(userError());
        }
    }

    return (
        <Box className='auth'>
            {isError?<h2 style={{color: 'red'}}>Неверный логин или пароль</h2>:null}
            <Box mb={5}>
                <TextField
                    autoComplete='off'
                    label="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Box>
            <Box mb={5}>
                <TextField
                    autoComplete='off'
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box mb={5}>
                <Button style = {{borderRadius: '5px', height: '56px'}} onClick={authFunc}>
                    Войти
                </Button>
            </Box>
        </Box>
    );
};

export default Login;