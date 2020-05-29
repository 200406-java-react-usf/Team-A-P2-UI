export class City{

    good_name: string;
    buy_price_mod: number;
    sell_price_mod: number;
    good_quantity: number;

    constructor (
        good_name: string,
        buy_price_mod: number,
        sell_price_mod: number,
        good_quantity: number,
    ){
        this.good_name = good_name;
        this.buy_price_mod = buy_price_mod;
        this.sell_price_mod = sell_price_mod;
        this.good_quantity = good_quantity;
    }
}