//Don't need to have Cargo user since that will be a state maintained with the user
export class Cargo {

    good: string;
    quantity: number;
    avgPrice: number;

    constructor(
        good: string,
        quantity: number,
        avgPrice: number,

    ) {
        this.good = good;
        this.quantity = quantity;
        this.avgPrice = avgPrice;
    }

}