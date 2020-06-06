//Service for all player methods.
import { Client } from './client';
import { User } from '../dtos/user';


//get good by id
export async function getGoodbyId(id: number){
    let response = await Client.get(``);
    return await response.data;
}

//get cargo list by user id
export async function getCargoListbyUserId(id: number){
    let response = await Client.post(``);
    return await response.data;
}

//get cargo list by planet id
export async function getCargoListbyPlanetId(id: number){
    let response = await Client.post(``);
    return await response.data;
}

//get specific cargo
export async function getCargoByUserIdAndGoodId (user_id: number, good_id:number){
    let response = await Client.post(``);
    return await response.data;
}

//update specific cargo
export async function updateCargoByUserIdAndGoodId (user_id: number, good_id:number){
    let response = await Client.post(``);
    return await response.data;
}

//get user by id
export async function getUserById (user_id: number){
    let response = await Client.post(``);
    return await response.data;
}

//new user
export async function newUser (user: User){
    let response = await Client.post(``);
    return await response.data;
}
//update user
export async function updateUser (user:User){
    let response = await Client.post(``);
    return await response.data;
}