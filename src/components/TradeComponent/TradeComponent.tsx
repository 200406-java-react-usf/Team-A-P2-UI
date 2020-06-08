import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { Good } from "../../dtos/good";
import { Cargo } from "../../dtos/cargo";
import { PlanetCargo } from "../../dtos/planetCargo";

import { getGoodbyId, getCargoListbyUserId, getCargoListbyPlanetId, updateCargobyUserIdAndGoodId } from "../../remote/player-service"

import GoodHolder from "../partials/GoodHolder/GoodHolder";

import "../../style/tradeComponent.scss";
import { User } from '../../dtos/user';
import { Planet } from '../../dtos/planet';

import { cargoListAction } from "../../actions/cargo-list-action"

export interface ICargoProps {
    authUser: User;
    userCargoList: Cargo[];
    errorMessage: string;
    tradeAction: (user_id: number, good_id: number, cost: number, amount: number)  => void;
}

function TradeComponent(props: ICargoProps) {

    const [cargoListDisplay, setCargoListDisplay] = useState(props.userCargoList);
    //@ts-ignore
    const [cityCargoDisplay, setCityCargoDisplay] = useState(null as any[]);


    //@ts-ignore
    const [selectedGood, setSelectedGood] = useState(null as Good);

    const [goodName, setGoodName] = useState("");
    const [goodDesc, setGoodDesc] = useState("");

    const [loaded, setLoaded] = useState(false);


    const [currency, setcurrency] = useState(props.authUser.currency);
    const [maxCargo, setMaxCargo] = useState(props.authUser.cargoSpace);
    const [currentCargo, setCurrentCargo] = useState(0);
    //@ts-ignore
    const [userCargoList, setUserCargoList] = useState(null as Cargo[])
    //@ts-ignore
    const [cityCargoList, setCityCargoList] = useState(null as PlanetCargo[])


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

    useEffect(() => {
        let cargoArrUser: any[] = [];
        let fetchUserData = async () => {
            if (userCargoList) {
                for (let cargo of userCargoList) {
                    //let result = await getGoodbyId(cargo.id);
                    let result = mockGoodList[cargo.id-1];
                    let name = result.name;
                    cargoArrUser.push(
                        <div className="good-wrapper unselect" key={"user-" + cargo.id} id={"user-" + cargo.id} onClick={selectDetail} >
                            <GoodHolder good_name={name} good_qauntity={cargo.quantity.toString()} cost_of_goods={cargo.costOfGoods} />
                        </div>
                    )
                }
                setCargoListDisplay(cargoArrUser)
            }
        };
        let cargoArrCity: any[] = [];
        let fetchCityData = async () => {
            if (cityCargoList) {
                for (let planetCargo of cityCargoList) {
                    //let result = await getGoodbyId(planetCargo.goodId);
                    let result = mockGoodList[planetCargo.goodId-1]
                    let price = result.price;
                    let name = result.name;

                    cargoArrCity.push(
                        <div className="good-wrapper unselect" key={"city-" + planetCargo.goodId} id={"city-" + planetCargo.goodId} onClick={selectDetail} >
                            <GoodHolder good_name={name} good_qauntity={"--"} cost_of_goods={Math.floor(price * planetCargo.priceModifier)} />
                        </div>
                    )
                }
                setCityCargoDisplay(cargoArrCity)
            }
        }
        let readDetail = async () => {
            if (selectedGood) {
                setGoodName(selectedGood.name);
                setGoodDesc(selectedGood.description);
            }
        }
        let getCurrentCargo = async () => {
            if (userCargoList) {
                let result: Cargo[] = userCargoList;
                let sum = 0;
                for (let i = 0; i < result.length; i++) {
                    sum += result[i].quantity;
                }
                setCurrentCargo(sum)
            }
        }
        getCurrentCargo()
        readDetail();
        fetchUserData();
        fetchCityData();
    }, [cityCargoList, userCargoList, selectedGood]);

    useEffect(() => {
        return () => {
          console.log("cleaned up");
        };
      }, []);

    let selectDetail = async (e: any) => {
        let id = e.currentTarget.id.split("-")[1];
        let result = await getGoodbyId(id)
        setSelectedGood(result);

        let userlist = document.getElementById("cargo-wrapper-user") as HTMLDivElement;
        for (let i = 0; i < userlist.children.length; i++) {
            const slot = userlist.children[i] as HTMLElement;
            slot.classList.remove("good-wrapper-selected")
        }

        let citylist = document.getElementById("cargo-wrapper-city") as HTMLDivElement;
        for (let i = 0; i < citylist.children.length; i++) {
            const slot = citylist.children[i] as HTMLElement;
            slot.classList.remove("good-wrapper-selected")
        }
        let selectedUserCargo = document.getElementById("user-" + id) as HTMLDivElement;
        selectedUserCargo.classList.add("good-wrapper-selected");
        let selectedCityCargo = document.getElementById("city-" + id) as HTMLDivElement;
        selectedCityCargo.classList.add("good-wrapper-selected");
    }
    let buyGood = async (e: any) => {
        if (selectedGood) {
            let id = selectedGood.id;
            let selectedCityPriceSlot = document.getElementById("city-" + id)?.children[3] as HTMLDivElement;
            //@ts-ignore
            let cityPrice = parseInt(selectedCityPriceSlot.textContent);
            console.log(props.authUser.id, id, cityPrice, 1);
            props.tradeAction(props.authUser.id, id, cityPrice, 1);
            cargoListAction(props.authUser.id);
            setUserCargoList(props.userCargoList);
            //updateCargobyUserIdAndGoodId(props.authUser.id, id, cityPrice, 1);
        }
    }
    let sellGood = async (e: any) => {
        if (selectedGood) {
            let id = selectedGood.id;
            let selectedCityPriceSlot = document.getElementById("city-" + id)?.children[3] as HTMLDivElement;
            //@ts-ignore
            let cityPrice = parseInt(selectedCityPriceSlot.textContent);
            props.tradeAction(props.authUser.id, id, cityPrice, -1);
            cargoListAction(props.authUser.id);
            setUserCargoList(props.userCargoList);
        }
    }
    let loadData = async () => {
        let userCargo = await getCargoListbyUserId(props.authUser.id);
        let cityCargo = await getCargoListbyPlanetId(props.authUser.location);
        setUserCargoList(userCargo);
        setCityCargoList(cityCargo);
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
                {currency} CREDITS
            </div>
            <div id="trade-interface" className="trade-interface">
                <div className="good-img-slot-trade"  onClick ={loadData}> </div>
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