import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import './Login.scss';
import Button from '../../features/Button/Button';
import { useLoginRequest } from '../../services/useLoginRequest';
import { useDispatch, useSelector } from 'react-redux';
import { userAdd, userError } from '../../slices/userSlice';
import  { Link, useNavigate }  from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {isError} = useSelector(state => state.auth);
    const auth = useLoginRequest(username, password);
    const renderError = (error) => {
        switch(error) {
            case 404: {
                return <h2 style={{color: 'red'}}>Неверный логин</h2>;
            }
            case 500: {
                return <h2 style={{color: 'red'}}>Неверный пароль</h2>
            }
            case 400: {
                return <h2 style={{color: 'red'}}>Неверный пароль</h2>
            }
            case false: {
                return null
            }
            default: {
                return <h2 style={{color: 'red'}}>Неизвестная ошибка! Попробуйте еще раз</h2>
            }
        }
    }

    const authFunc = () => {
        auth();
    }

    return (
       <form action="auth" onSubmit={(e) => {e.preventDefault(); authFunc()}}>
         <Box className='auth'>
            <h2>Вход</h2>
            {renderError(isError)}
            <Box mb={5}>
                <TextField
                    required
                    autoComplete='off'
                    label="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Box>
            <Box mb={5}>
                <TextField
                    required
                    autoComplete='off'
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box className = 'auth__buttons' mb={5}>
                <Button style = {{borderRadius: '5px', height: '56px'}}>
                    Войти
                </Button>
                <Link className = 'auth__link'to = '/register'>Зарегистрироваться</Link>
            </Box>
        </Box>
       </form>
    );
};

export default Login;