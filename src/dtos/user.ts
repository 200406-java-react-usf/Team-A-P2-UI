export class User {

    id: number;
    username: string;
    password: string;
    user_role: string;
    cargoSpace: number;
    currency: number;
    location: number;

    constructor(
        id: number,
        un: string,
        pw: string,
        user_role: string,
        cargo_space: number,
        currency: number,
        location: number
    ) {
        this.id = id;
        this.username = un;
        this.password = pw;
        this.user_role= user_role;
        this.cargoSpace = cargo_space;
        this.currency = currency;
        this.location = location;
    }

}