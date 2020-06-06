export class Planet{
    planet_id: number;
    planet_name: string;
    price_modifier: number;

    constructor (
        id: number,
        planet_name: string,
        price_mod: number,
    ){
        this.planet_id = id;
        this.planet_name = planet_name;
        this.price_modifier = price_mod;
    }
}