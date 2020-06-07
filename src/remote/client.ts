//Service to connect to API.

import axios from 'axios';

export const Client = axios.create({
    baseURL: 'http://localhost:8080/p2',
    headers: {
        'Content-Type': 'application/json'
    }
});