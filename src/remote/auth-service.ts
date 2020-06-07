//Service to authorize user
import { Client } from './client';

export async function authenticate(username: string, password: string){
    let response = await Client.post('/auth', {username, password});
    return await response.data;
}

export async function logout(){
    let response = await Client.get('/auth');
    return await response.data;
}