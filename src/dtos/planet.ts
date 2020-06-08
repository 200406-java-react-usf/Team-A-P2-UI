export class Planet{
    planet_id: number;
    planet_name: string;
    priceModifier: number;
    constructor (
        id: number,
        planet_name: string,
        price_mod: number,
    ){
        this.planet_id = id;
        this.planet_name = planet_name;
        this.priceModifier= price_mod;
    }
}