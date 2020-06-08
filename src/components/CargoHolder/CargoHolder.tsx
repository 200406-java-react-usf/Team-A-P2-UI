import React, { useState, useEffect, useCallback } from 'react';

import { User } from "../../dtos/user";
import { Good } from "../../dtos/good";
import { Cargo } from "../../dtos/cargo";

import { getGoodbyId, getCargoListbyUserId } from "../../remote/player-service"

import GoodHolder from "../partials/GoodHolder/GoodHolder";

import "../../style/cargoHolder.scss";

export interface ICargoProps {
    authUser: User;
    userCargo: Cargo[];
    errorMessage: string;
}

function CargoHolder(props: ICargoProps) {

    let mockCargoList: Cargo[] = [
        new Cargo(1, 1, 1, 100),
    ];

    let mockGoodList: Good[] = [
        new Good(1, "Precious Metal", 100, "It's valuable because it's shiny."),
        new Good(2, "Synth Food", 5, "Tastes like chicken. It always tastes like chicken."),
        new Good(3, "Heavy Weaponry", 1000, "Can be used to snuff out a rebellion. Or to start one."),
        new Good(4, "Stimulants", 500, "Bro, maybe the galaxy is moving AROUND us!"),
        new Good(5, "Harvested Organs", 2000, "I poured my heart out for you."),
        new Good(6, "Yavinnium Gas",200, "Makes you talk funny. Also an important isolant in superconductors."),
        new Good(7, "Zeyd Fabric", 1500, "We have an array of vibrant color pallets, but of course black suits you, my Emperor."),
        new Good(8, "Memory Plastic", 300, "I still remeber the time when I was a young and happy dinosaur,"),
        new Good(9, "Luxious Fur Pelt", 500, "No it is not from a Wookie! When would you ask?"),
        new Good(10, "Aldarran Jewlery", 1000, "So popular that it will be out of print soon!"),
        new Good(11, "Kyber Crystal", 5000, "Perfect for creating a positive Feng Shui or light saber.")
    ];
    //@ts-ignore
    const [cargoList, setCargoList] = useState(null as Cargo[]);


    //@ts-ignore
    const [cargoListDisplay, setCargoListDisplay] = useState(null as any[]);
    //@ts-ignore
    const [selectedCargo, setSelectedCargo] = useState(null as Good);

    const [goodName, setGoodName] = useState("");
    const [goodDesc, setGoodDesc] = useState("");

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        let cargoArr: any[] = [];
        let fetchData = async () => {
            let userCargoList = await getCargoListbyUserId(props.authUser.id);
            setCargoList(userCargoList)
            if (cargoList) {
                for (let cargo of cargoList) {
                    let result = await getGoodbyId(cargo.good_id);
                    let name = result.name;

                    cargoArr.push(
                        <div className="good-wrapper unselect" key={"invent-"+cargo.good_id} id={"invent-"+cargo.good_id} onClick={selectDetail} >
                            <GoodHolder good_name={name} good_qauntity={cargo.good_quantity.toString()} cost_of_goods={cargo.cost_of_goods} />
                        </div>
                    )
                }
                setCargoListDisplay(cargoArr)
            }
        }
        let readDetail = async () => {
            if (selectedCargo) {
                setGoodName(selectedCargo.name);
                setGoodDesc(selectedCargo.description);
            }
        }
        readDetail()
        fetchData()
    }, [cargoList, selectedCargo]);


    let selectDetail = async (e: any) => {
        let id = e.currentTarget.id.split("-")[1];
        let result = await getGoodbyId(id)
        setSelectedCargo(result.data);

        let cargoList = document.getElementsByClassName("good-wrapper-selected");
        for (let i = 0; i < cargoList.length; i++) {
            const slot = cargoList[i] as HTMLElement;
            slot.classList.remove("good-wrapper-selected")
        }
        let selected = document.getElementById("invent-" + id) as HTMLDivElement;
        selected.classList.add("good-wrapper-selected");
    }
    return (
        <>
            <div className="cargo-wrapper unselect">
                <div className="good-wrapper-header">
                    <div className="good-img-slot-header"> </div>
                    <div className="good-name-slot-header unselect">NAME</div>
                    <div className="good-quantity-slot-header unselect">QTY</div>
                    <div className="good-price-slot-header unselect">PRICE</div>
                </div>
                {cargoListDisplay}
            </div>
            <div id="cargo-good-detail" className="detail-wrapper unselect">
                {/* <div className="good-img-slot-detail" style ={ { backgroundImage: "" } } ></div> */}
                <div className="good-img-slot-detail"> </div>
                <div className="good-name-slot-detail">{goodName}</div>
                <div className="good-desc-slot-detail">{goodDesc}</div>
            </div>
        </>
    );

}

export default CargoHolder;