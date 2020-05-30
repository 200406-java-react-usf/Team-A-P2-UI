// temp, subject to change based on api and db

export class User {

    user_id: number;
    username: string;
    password: string;
    cargo_space: number;
    currency: number;
    location: string;


    constructor(
        id: number,
        un: string,
        pw: string,
        cargo_space: number,
        currency: number,
        loc: string
    ) {
        this.user_id = id;
        this.username = un;
        this.password = pw;
        this.cargo_space = cargo_space;
        this.currency = currency;
        this.location = loc;
    }

}