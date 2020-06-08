//Don't need to have Cargo user since that will be a state maintained with the user
export class Cargo {
    id: number;
    userId: number;
    quantity: number;
    costOfGoods: number;

    constructor(
        good_id: number,
        user_id: number,
        good_quantity: number,
        cost_of_goods: number,

    ) {
        this.id = good_id;
        this.userId = user_id;
        this.quantity = good_quantity;
        this.costOfGoods = cost_of_goods;
    }

}