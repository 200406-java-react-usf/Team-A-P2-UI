export class Planet{
    id: number;
    name: string;
    priceModifier: number;
    constructor (
        id: number,
        name: string,
        price_mod: number,
    ){
        this.id = id;
        this.name = name;
        this.priceModifier= price_mod;
    }
}