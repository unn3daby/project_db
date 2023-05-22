import axios from "axios";

export default async function markService(userId) {
    try {
        return await axios.get(`http://localhost:3001/users/${userId}`);
    } catch (error) {
        console.error(error);
    }
};
