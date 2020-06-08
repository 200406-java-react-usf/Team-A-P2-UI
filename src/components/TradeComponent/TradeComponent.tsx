import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { Good } from "../../dtos/good";
import { Cargo } from "../../dtos/cargo";
import { PlanetCargo } from "../../dtos/planetCargo";

import { getGoodbyId } from "../../remote/player-service"

import GoodHolder from "../partials/GoodHolder/GoodHolder";

import "../../style/tradeComponent.scss";
import { User } from '../../dtos/user';
import { Planet } from '../../dtos/planet';

export interface ICargoProps {
    authUser: User;
    errorMessage: string;
}

function TradeComponent(props: ICargoProps) {

    //const [user, setUser] = useState(props.authUser);
    const [user, setUser] = useState(new User(1, "test", "test", "user", 20, 1000, 1));
    // const [cargoList, setCurrentCargo] = useState(props.currentCargoSize);

    let mockCargoList: Cargo[] = [
        new Cargo(1, 1, 1, 100)
    ];
    let mockCityCargoList: PlanetCargo[] = [
        new PlanetCargo(1, 1, 1.5)
    ];
    let mockGoodList: Good[] = [
        new Good(1, "Precious Metal", 100, "It's valuable because it's shiny."),
        new Good(2, "Synth Food", 5, "Tastes like chicken. It always tastes like chicken."),
        new Good(3, "Heavy Weaponry", 1000, "Can be used to snuff out a rebellion. Or to start one."),
        new Good(4, "Stimulants", 500, "Bro, maybe the galaxy is moving AROUND us!"),
        new Good(5, "Harvested Organs", 2000, "I poured my heart out for you."),
        new Good(6, "Yavinnium Gas", 200, "Makes you talk funny. Also an important isolant in superconductors."),
        new Good(7, "Zeyd Fabric", 1500, "We have an array of vibrant color pallets, but of course black suits you, my Emperor."),
        new Good(8, "Memory Plastic", 300, "I still remeber the time when I was a young and happy dinosaur,"),
        new Good(9, "Luxious Fur Pelt", 500, "No it is not from a Wookie! When would you ask?"),
        new Good(10, "Aldarran Jewlery", 1000, "So popular that it will be out of print soon!"),
        new Good(11, "Kyber Crystal", 5000, "Perfect for creating a positive Feng Shui or light saber.")
    ];
    //@ts-ignore
    //const [cargoList, setCargoList] = useState(null as Good[]);
    const [userCargoList, setUserCargoList] = useState(mockCargoList);

    //@ts-ignore
    //const [cargoList, setCargoList] = useState(null as Good[]);
    const [cityCargoList, setCityCargoList] = useState(mockCityCargoList);


    //@ts-ignore
    const [cargoListDisplay, setCargoListDisplay] = useState(null as any[]);
    //@ts-ignore
    const [cityCargoDisplay, setCityCargoDisplay] = useState(null as any[]);


    //@ts-ignore
    const [selectedCargo, setSelectedCargo] = useState(null as Car);

    const [goodName, setGoodName] = useState("");
    const [goodDesc, setGoodDesc] = useState("");

    // const [currency, setcurrency] = useState(props.authUser.currency);
    // const [maxCargo, setMaxCargo] = useState(props.authUser.cargo);

    const [currency, setcurrency] = useState(1000);
    const [maxCargo, setMaxCargo] = useState(20);
    const [currentCargo, setCurrentCargo] = useState(0);


    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        let cargoArrUser: any[] = [];
        let fetchUserData = async () => {
            //let userCargo = await getUserCargo();
            //setUserCargoList(userCargo);
            if (userCargoList) {
                for (let cargo of userCargoList) {
                    //let name = await getGoodById(cargo.good_id);
                    let name = "test"
                    cargoArrUser.push(
                        <div className="good-wrapper unselect" key={"user-" + cargo.good_id} id={"user-" + cargo.good_id} onClick={selectDetail} >
                            <GoodHolder good_name={name} good_qauntity={cargo.good_quantity.toString()} cost_of_goods={cargo.cost_of_goods} />
                        </div>
                    )
                }
                setCargoListDisplay(cargoArrUser)
            }
        }
        let cargoArrCity: any[] = [];
        let fetchCityData = async () => {
            //let cityCargo = await getCityCargo();
            //setCityCargoList(cityCargo);
            //let cityPriceMod = await getCityPriceMod();

            if (cityCargoList) {
                for (let planetCargo of cityCargoList) {

                    //let good = await getGoodbyId(planetCargo.good_id);
                    let good = new Good(1, "test", 10, "desc");
                    let name = good.name;
                    let price = good.price;

                    cargoArrCity.push(
                        <div className="good-wrapper unselect" key={"city-" + planetCargo.good_id} id={"city-" + planetCargo.good_id} onClick={selectDetail} >
                            <GoodHolder good_name={name} good_qauntity={"--"} cost_of_goods={price * planetCargo.price_modifier} />
                        </div>
                    )
                }
                setCityCargoDisplay(cargoArrCity)
            }
        }
        let readDetail = async () => {
            if (selectedCargo) {
                setGoodName(selectedCargo.good_name);
                setGoodDesc(selectedCargo.good_description);
            }
        }
        let getCurrentCargo = async () => {
            //let result: Cargo[] = await getAllUserCargo();
            let result: Cargo[] = mockCargoList;
            let sum = 0;
            for (let i = 0; i < result.length; i++) {
                sum += result[i].good_quantity;
            }
            setCurrentCargo(sum)
        }
        getCurrentCargo()
        readDetail();
        fetchUserData();
        fetchCityData();

    }, [cityCargoList, userCargoList, selectedCargo]);


    let selectDetail = async (e: any) => {
        let id = e.currentTarget.id.split("-")[1];
        //let result = await getGoodById(id)
        //setSelectedCargo(result.data);
        setSelectedCargo(mockGoodList[id - 1])

        let userlist = document.getElementById("cargo-wrapper-user") as HTMLDivElement;
        for (let i = 0; i < userlist.children.length; i++) {
            const slot = userlist.children[i] as HTMLElement;
            console.log(slot)
            slot.classList.remove("good-wrapper-selected")
        }

        let citylist = document.getElementById("cargo-wrapper-city") as HTMLDivElement;
        for (let i = 0; i < citylist.children.length; i++) {
            const slot = citylist.children[i] as HTMLElement;
            console.log(slot)
            slot.classList.remove("good-wrapper-selected")
        }
        let selectedUserCargo = document.getElementById("user-" + id) as HTMLDivElement;
        selectedUserCargo.classList.add("good-wrapper-selected");
        let selectedCityCargo = document.getElementById("city-" + id) as HTMLDivElement;
        selectedCityCargo.classList.add("good-wrapper-selected");
    }
    let buyGood = async (e: any) => {
        if (selectedCargo) {
            let id = selectedCargo.good_id;
            let selectedCityPriceSlot = document.getElementById("city-" + id)?.children[3] as HTMLDivElement;
            //@ts-ignore
            let cityPrice = parseInt(selectedCityPriceSlot.textContent);

            //buyaction(goodID, cityprice)
            console.log("buy")

        }
    }
    let sellGood = async (e: any) => {
        if (selectedCargo) {
            let id = selectedCargo.good_id;
            let selectedCityPriceSlot = document.getElementById("city-" + id)?.children[3] as HTMLDivElement;
            //@ts-ignore
            let cityPrice = parseInt(selectedCityPriceSlot.textContent);
            //sellaction(goodID, cityprice)
        }
    }
    return (
        <>
            <div id="cargo-wrapper-user" className="cargo-wrapper-user">
                <div className="good-wrapper-header">
                    <div className="good-img-slot-header"> </div>
                    <div className="good-name-slot-header unselect">NAME</div>
                    <div className="good-quantity-slot-header unselect">QTY</div>
                    <div className="good-price-slot-header unselect">PRICE</div>
                </div>
                {cargoListDisplay}
            </div>
            <div id="trade-user-currency">
                {user.currency} CREDITS
            </div>
            <div id="trade-interface" className="trade-interface">
                <div className="good-img-slot-detail" style ={ { backgroundImage: `url("${goodName}.png")` } } ></div> 
                <div className="good-img-slot-trade"> </div>
                <div className="good-name-slot-trade unselect">{goodName}</div>
                <div className="good-desc-slot-trade unselect">{goodDesc}</div>
                <div className="good-btnBar-slot-trade unselect">
                    <div id="good-btn-buy unselect" className="good-btn-slot-trade-buy" onClick={buyGood}>
                        BUY
                    </div>
                    <div id="good-btn-sell unselect" className="good-btn-slot-trade-sell" onClick={sellGood}>
                        SELL
                    </div>
                </div>
            </div>
            <div id="cargo-wrapper-city" className="cargo-wrapper-city">
                <div className="good-wrapper-header">
                    <div className="good-img-slot-header"> </div>
                    <div className="good-name-slot-header unselect">NAME</div>
                    <div className="good-quantity-slot-header unselect">QTY</div>
                    <div className="good-price-slot-header unselect">PRICE</div>
                </div>
                {cityCargoDisplay}
            </div>
        </>
    );

}

export default TradeComponent;