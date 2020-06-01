export class Planet {
    planet_id: number;
    planet_name: string;

    constructor(
        id: number,
        name: string,
    ) {
        this.planet_id = id;
        this.planet_name = name;
    }
}