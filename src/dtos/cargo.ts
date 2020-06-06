//Don't need to have Cargo user since that will be a state maintained with the user
export class Cargo {

    good_id: number;
    good_name: string;
    good_quantity: number;
    cost_of_goods: number;

    constructor(

        good_id: number,
        good_name: string,
        good_quantity: number,
        cost_of_goods: number,

    ) {
        this.good_id = good_id;
        this.good_name = good_name;
        this.good_quantity = good_quantity;
        this.cost_of_goods = cost_of_goods;
    }

}