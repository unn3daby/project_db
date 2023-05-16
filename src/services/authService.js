import axios from "axios";

const BASE_URL = 'http://localhost:3001'

export const loginRequest = async (username, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        const users = response.data;
        if(users != null) {
            const user = users.find((user) => user.login === username && user.password === password);
            if(user)
                return user;
            else
                return null;
        }
        else { 
            return null;
        }
    } catch (e) {
        console.error('error', e)
        throw e
    }
}