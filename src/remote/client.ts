//Service to connect to API.

import axios from 'axios';

export const Client = axios.create({
    // baseURL: 'http://localhost:8080/p2',
    baseURL : 'http://team-a-p2.us-east-2.elasticbeanstalk.com/',
    headers: {
        'Content-Type': 'application/json'
    }
});