export class PlanetCargo{
    planetId: number;
    goodId: number;
    priceModifier: number;

    constructor (
        id: number,
        good_id: number,
        price_mod: number,
    ){
        this.planetId = id;
        this.goodId = good_id;
        this.priceModifier = price_mod;
    }
}