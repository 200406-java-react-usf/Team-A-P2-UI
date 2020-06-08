//Service to authorize user
import { Client } from './client';

// export async function Oldauthenticate(username: string, password: string) {
//     let response = await Client.post('/auth', { username, password });
//     return await response.data;
// }

export async function authenticate(username: string, password: string) {
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    let response = await Client.post('/auth', {
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    return await response.data;
}

export async function logout() {
    let response = await Client.get('/auth');
    return await response.data;
}