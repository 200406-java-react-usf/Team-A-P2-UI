export class Planet{
    planet_id: number;
    planet_name: string;

    constructor (
        id: number,
        planet_name: string,
        price_mod: number,
    ){
        this.planet_id = id;
        this.planet_name = planet_name;
    }
}