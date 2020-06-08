//Service for all player methods.
import { Client } from './client';
import { User } from '../dtos/user';
import { Good } from '../dtos/good';
import { Cargo } from '../dtos/cargo';
import { Planet } from '../dtos/planet';
import { PlanetCargo } from '../dtos/planetCargo';

let mockGoodList: Good[] = [
    new Good(1, "Precious Metal", 100, "It's valuable because it's shiny."),
    new Good(2, "Synth Food", 5, "Tastes like chicken. It always tastes like chicken."),
    new Good(3, "Heavy Weaponry", 1000, "Can be used to snuff out a rebellion. Or to start one."),
    new Good(4, "Stimulants", 500, "Bro, maybe the galaxy is moving AROUND us!"),
    new Good(5, "Harvested Organs", 2000, "I poured my heart out for you."),
    new Good(6, "Yavinnium Gas", 200, "Makes you talk funny. Also an important isolant in superconductors."),
    new Good(7, "Zeyd Fabric", 1500, "We have an array of vibrant color pallets, but of course black suits you, my Emperor."),
    new Good(8, "Memory Plastic", 300, "I still remeber the time when I was a young and happy dinosaur,"),
    new Good(9, "Luxious Fur Pelt", 500, "No it is not from a Wookie! When would you ask?"),
    new Good(10, "Aldarran Jewlery", 1000, "So popular that it will be out of print soon!"),
    new Good(11, "Kyber Crystal", 5000, "Perfect for creating a positive Feng Shui or light saber.")
];


let mockCargoList: Cargo[] = [
    new Cargo(1, 2, 100, 10.5),
    new Cargo(2, 2, 100, 10.5),
    new Cargo(3, 2, 100, 10.5)
]

let mockPlanetList: Planet[] = [
    new Planet(1, "Tatooine", 0),
    new Planet(1, "Alderaan", 0),
    new Planet(1, "Yavin IV", 0),
    new Planet(1, "Hoth", 4.5)
]

let mockPlanetGoods: PlanetCargo[] = [
    new PlanetCargo(1, 1, 1.5),
    new PlanetCargo(2, 1, 2)
]
let mockUserList: User[] = [
    new User(1, "test", "test", "ADMIN", 100, 1000, 1),
    new User(2, "test", "test", "USER", 100, 1000, 1)
]
//get good by id
export async function getGoodbyId(id: number) {
    let response = await Client.get(`/goods/${id}`);
    return await response.data;
    //return mockGoodList[id];
}

//get cargo list by user id
export async function getCargoListbyUserId(id: number) {
    // let response = await Client.get(`/cargos/user/${id}`); 
    // return await response.data;
    return mockCargoList;
}

//get cargo list by planet id
export async function getCargoListbyPlanetId(id: number) {
    // let response = await Client.get(`/cargos/planet/${id}`); 
    // return await response.data;
    return mockPlanetGoods;
}

//get specific cargo
export async function getCargobyUserIdAndGoodId(user_id: number, good_id: number) {
    // let response = await Client.get(`/user/${user_id}/good/${good_id}`);
    // return await response.data;
    return mockCargoList[good_id];
}

//update specific cargo
export async function updateCargobyUserIdAndGoodId(user_id: number, good_id: number) {
    // let response = await Client.post(``); not implemented yet
    // return await response.data;
}

//get user by id
export async function getUserbyId(user_id: number) {
    let response = await Client.post(`/users/${user_id}`);
    return await response.data;
    //return mockUserList[user_id-1];
}

//new user
export async function newUser(user: User) {
    let response = await Client.post(`/users`);
    return await response.data;
    //return user;
}

//update user
export async function updateUser(user: User) {
    let response = await Client.put(`/user`);
    return await response.data;
    //return user;
}

//get all planets
export async function getAllPlanets() {
    let response = await Client.get(`/planets`);
    return await response.data;
    //return mockPlanetList;
}