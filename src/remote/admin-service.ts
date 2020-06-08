//Service for all the admin methods
import { Client } from './client';
import { User } from '../dtos/user';

let mockUserList: User[] = [
    new User(1, "test", "test", "ADMIN", 100, 1000, 1),
    new User(2, "test", "test", "USER", 100, 1000, 1)
]
export async function getAllUser(){
    let response = await Client.get('/users');
    return await response.data;
}

export async function deleteUserbyID(user_id: number){
    let response = await Client.delete(`/users/${user_id}`);
    return await response.data;
}