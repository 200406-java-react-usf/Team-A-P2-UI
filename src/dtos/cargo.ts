//Don't need to have Cargo user since that will be a state maintained with the user
export class Cargo {

    good_name: string;
    good_quantity: number;
    good_base_price: number;

    constructor(
        good_name: string,
        good_quantity: number,
        base_price: number,

    ) {
        this.good_name = good_name;
        this.good_quantity = good_quantity;
        this.good_base_price = base_price;
    }

}