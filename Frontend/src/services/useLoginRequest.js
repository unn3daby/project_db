import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userAdd, userError } from '../slices/userSlice';
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://25.53.18.59:5000/api';

export const useLoginRequest = (username, password) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    async function temp() {
        try {
            const response = await axios.post(`${BASE_URL}/User/login`, {login: username, password: password});
            const userId = response.data;
            console.log(response.data)
            if(typeof(userId) == 'number') {
                dispatch(userAdd({user: {name: username, id: userId}, isAuth: true, isError: null}));
                navigate('/')
            }
            else { 
                dispatch(userAdd({user: 0, isAuth: false, isError: 'not found'}))
            }
            
        } catch (e) {
            dispatch(userAdd({user: 0, isAuth: false, isError: e.response.status}))
        }   
    }
    return temp
    
}