export class Good {

    id: number;
    name: string;
    description: string;
    price: number;


    constructor(
        id: number,
        name: string,
        price: number,
        desc: string,

    ) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.price = price;
    }

}