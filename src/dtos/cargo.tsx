export class Cargo {

    good_name: string;
    good_quantity: number;
    good_avg_price: number;

    constructor(
        name: string,
        quantity: number,
        price: number,
    ) {
        this.good_name = name;
        this.good_quantity = quantity;
        this.good_avg_price = price;
    }

}