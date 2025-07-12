import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 8000,
});
export const pingAPI = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    }
    catch (err) {
        console.error('❌ Failed to reach API:', err.message);
        return null;
    }
};
