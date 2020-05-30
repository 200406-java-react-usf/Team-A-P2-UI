import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { Good } from "../../dtos/good";
import { Cargo } from "../../dtos/cargo";

import GoodHolder from "../partials/GoodHolder/GoodHolder";

import "../../style/cargoHolder.scss";

export interface ICargoProps {
    //authUser: User;
    //location: Planet;
    //currentCargoSize: number;
    //errorMessage: string;
}

function CargoHolder(props: ICargoProps) {

    const [readyState, setReadyState] = useState(false);

    // const [cargoList, setCurrentCargo] = useState(props.currentCargoSize);

    let mockCargoList: Cargo[] = [
        new Cargo("Precious Metal", 10, 100),
        new Cargo("Dehydrated Food", 100, 5),
        new Cargo("Heavy Weaponry", 5, 2000)
    ]
    //@ts-ignore
    //const [cargoList, setCargoList] = useState(null as Good[]);
    const [cargoList, setCargoList] = useState(mockCargoList);
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
            if (cargoList) {
                for (let cargo of cargoList) {
                    cargoArr.push(
                        <div className="good-wrapper" key={cargo.good_name} id={cargo.good_name} onClick={selectDetail} >
                            <GoodHolder good_name={cargo.good_name} good_qauntity={cargo.good_quantity} good_avg_price={cargo.good_avg_price} />
                        </div>
                    )
                }
                setCargoListDisplay(cargoArr)
            }
        }
        let readDetail = async () => {
            if (selectedCargo) {
                setGoodName(selectedCargo.good_name);
                setGoodDesc(selectedCargo.good_description);
            }
        }
        readDetail()
        fetchData()
    }, [cargoList, selectedCargo]);


    let selectDetail = async (e: any) => {
        let name = e.currentTarget.id;
        //let result = await getGoodByName(name)
        //setSelectedCargo(result.data);
        setSelectedCargo(new Good(1, "test", "test desc", 100))

        let cargoList = document.getElementsByClassName("good-wrapper-selected");
        for (let i = 0; i < cargoList.length; i++) {
            const slot = cargoList[i] as HTMLElement;
            slot.classList.remove("good-wrapper-selected")
        }
        let selected = document.getElementById(name) as HTMLDivElement;
        selected.classList.add("good-wrapper-selected");
    }
    return (
        <>
            <div className="cargo-wrapper">
                <div className="good-wrapper-header">
                    <div className="good-img-slot-header"> </div>
                    <div className="good-name-slot-header">NAME</div>
                    <div className="good-quantity-slot-header">QTY</div>
                    <div className="good-price-slot-header">PRICE</div>
                </div>
                {cargoListDisplay}
            </div>
            <div id="cargo-good-detail" className="detail-wrapper">
                {/* <div className="good-img-slot-detail" style ={ { backgroundImage: "" } } ></div> */}
                <div className="good-img-slot-detail"> </div>
                <div className="good-name-slot-detail">{goodName}</div>
                <div className="good-desc-slot-detail">{goodDesc}</div>
            </div>
        </>
    );

}

export default CargoHolder;