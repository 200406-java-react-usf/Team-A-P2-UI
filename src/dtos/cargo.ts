//Don't need to have Cargo user since that will be a state maintained with the user
export class Cargo {

    good_id: number;
    good_name: string;
    good_quantity: number;
    good_avg_price: number;

    constructor(

        good_id: number,
        good_name: string,
        good_quantity: number,
        good_avg_price: number,

    ) {
        this.good_id = good_id;
        this.good_name = good_name;
        this.good_quantity = good_quantity;
        this.good_avg_price = good_avg_price;
    }

}