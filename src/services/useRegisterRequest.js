import axios from "axios";
import { useLoginRequest } from "./useLoginRequest";
import { useDispatch } from "react-redux";
import { userAdd } from "../slices/userSlice";

const BASE_URL = 'https://25.53.18.59:5000/api';

export const useRegisterRequest = (username, password) => {
    const auth = useLoginRequest(username, password);
    const dispatch = useDispatch()
    async function temp() {
        try {
            const response = await axios.post(`${BASE_URL}/User/register`, {login: username, password: password});
            console.log(response);
            const userCreated = response.data;
            if(userCreated === 'User created') {
                console.log(username, password);
                auth()
            }
            else { 
                console.log('error with reg')
            }
            
        } catch (e) {
            dispatch(userAdd({user: 0, isAuth: false, isError: e.response.status}))
        }   
    }
    return temp
    
}