export class Good {

    good_id: number;
    good_name: string;
    good_description: string;
    good_base_price: number;


    constructor(
        id: number,
        name: string,
        desc: string,
        price: number
    ) {
        this.good_id = id;
        this.good_name = name;
        this.good_description = desc;
        this.good_base_price = price;
    }

}