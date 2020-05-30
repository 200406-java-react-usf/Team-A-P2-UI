export class Cargo {
    good_id: number;
    good_name: string;
    good_quantity: number;
    good_avg_price: number;

    constructor(
        id: number,
        name: string,
        quantity: number,
        price: number
    ) {
        this.good_id = id;
        this.good_name = name;
        this.good_quantity = quantity;
        this.good_avg_price = price;
    }
}