export class PlanetCargo{
    planet_id: number;
    good_id: number;
    price_modifier: number;

    constructor (
        id: number,
        good_id: number,
        price_mod: number,
    ){
        this.planet_id = id;
        this.good_id = good_id;
        this.price_modifier = price_mod;
    }
}