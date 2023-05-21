import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import './Register.scss';
import Button from '../../features/Button/Button';
import { useRegisterRequest } from '../../services/useRegisterRequest';
import { useSelector } from 'react-redux';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {isError} = useSelector(state => state.auth);

    const validatePassword = () => {
        if (password.length < 8) {
          // Если пароль не соответствует требованиям, вы можете выполнить необходимые действия, например, отобразить сообщение об ошибке или выполнить другую обработку.
          setError('invalidPassword')
          console.log('Пароль должен содержать минимум 8 символов');
          return;
        }
      
        setError('');
        authFunc();
      };
      const validateLogin = () => {
        // Паттерн для проверки логина по нынешним стандартам
        const loginPattern = /^[a-zA-Z0-9_-]{3,16}$/;
      
        if (!loginPattern.test(username)) {
            setError('invalidLogin')
            console.log('Логин должен содержать от 3 до 16 символов и может содержать только буквы латинского алфавита (верхнего и нижнего регистра), цифры, символы "-" и "_".');
            return;
        }
      
        // Если логин прошел проверку, вы можете вызвать функцию validatePassword() для проверки пароля.
        validatePassword();
      };

    const reg = useRegisterRequest(username, password);

    const authFunc = () => {
        reg();
    }
    const renderError = (error) => {
        switch(error) {
            case 'invalidPassword': {
                return <h2 style={{color: 'red'}}>Пароль должен содержать не менее 8-ми символов</h2>;
            }
            case 'invalidLogin': {
                return <h2 style={{color: 'red'}}>Логин должен содержать от 3 до 16 символов и может содержать только буквы латинского алфавита</h2>;
            }
            default: {
                return <h2 style={{color: 'red'}}>Неизвестная ошибка! Попробуйте еще раз</h2>
            }
        }
    }

    return (
       <form action="auth" onSubmit={(e) => {e.preventDefault(); validateLogin()}}>
         <Box className='auth'>
            <h2>Регистрация</h2>
            {error?renderError(error):isError?<h2 style={{color: 'red'}}>Пользовтель по данным именем уже зарегистрирован</h2>:null}
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
            <Box mb={5}>
                <Button style = {{borderRadius: '5px', height: '56px', fontSize: '20px'}}>
                    Зарегистрироваться
                </Button>
            </Box>
        </Box>
       </form>
    );
};

export default Register;