import axios from 'axios';

export const PUBLIC_API = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
});
