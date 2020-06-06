import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Planet } from "../../dtos/planet";

import GoodHolder from "../partials/GoodHolder/GoodHolder";

import "../../style/planetInfo.scss";

export interface IMapProps {
    //authUser: User;
    //location: Planet;

    //this animation is passed from spaceship.tsx, no redux required
    travelAni: any;
}

function Trade(props: IMapProps) {

    const [readyState, setReadyState] = useState(false);

    //@ts-ignore
    const [planetList, setPlanetList] = useState(null as Planet[]);
    //@ts-ignore
    const [planetDisplay, setPlanetDisplay] = useState(null as any);

    const [SWAPIPlanet, setSWAPIPlanet] = useState(null as any);

    //@ts-ignore
    const [planetDetail, setPlanetDetail] = useState(null as any);
    //@ts-ignore
    const [destination, setDestination] = useState(null as number);

    //const [currentLoc, setCurrentLoc] = useState(props.autherUser.location);
    const [currentLoc, setCurrentLoc] = useState(1);

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        let planetDisplayList: any[] = [];
        let fetchPlanetData = async () => {
            //let planet = await getAllPlanet();
            //setPlanetCargoList(planetCargo);
            //let planetPriceMod = await getPlanetPriceMod();
            let mockPlanetList = [
                new Planet(1, "Tatooine", 1.5)
            ];

            if (mockPlanetList) {
                for (let planet of mockPlanetList) {
                    //let priceMod = await getPlanetPriceModByID();
                    planetDisplayList.push(
                        <div className="city-slot-wrapper" key={"planet-" + planet.planet_id} id={"planet-" + planet.planet_id} onClick={selectDetail}>
                            <div className="city-slot-cell-id">{planet.planet_id}</div>
                            <div className="city-slot-cell">{planet.planet_name}</div>
                        </div>
                    )
                }
                setPlanetDisplay(planetDisplayList)
            }
        }
        let readDetail = async () => {
            if (SWAPIPlanet) {
                setPlanetDetail(SWAPIPlanet);
                let detail =
                    <>
                        <div className="SWAPIInfo" key={SWAPIPlanet.name}>
                            <div className="SWAPIInfo-img"></div>
                            <div className="SWAPIInfo-name">{SWAPIPlanet.name}</div>
                            <div className="SWAPIInfo-sub">CLIMATE: {SWAPIPlanet.climate}</div>
                            <div className="SWAPIInfo-sub">TERRAIN: {SWAPIPlanet.terrain}</div>
                            <div className="SWAPIInfo-sub">POPULATION: {SWAPIPlanet.population}</div>
                        </div>
                    </>
                setPlanetDetail(detail);
            }
        }
        
        let getCurrentLoc = async () => {
            let iconList = document.getElementsByClassName("icon-ani");
            for (let i = 0; i < iconList.length; i++) {
                const icon = iconList[i] as HTMLElement;
                icon.classList.remove("icon-ani")
            }
            if (destination) {
                let icon = document.getElementById("map-city-" + destination) as HTMLDivElement;
                icon?.classList.add("icon-ani");
            }
        }
        readDetail();
        fetchPlanetData();
    }, [planetList, SWAPIPlanet]);


    let selectDetail = async (e: any) => {
        let element = e.currentTarget as HTMLDivElement;
        let name = element.children[1].textContent;
        //@ts-ignore
        let id = parseInt(element.children[0].textContent);
        let SWAPIURL = `https://swapi.dev/api/planets/?search=${name}`;
        let SWAPInfo;
        axios.get(SWAPIURL).then(function(response) {
            SWAPInfo = response.data;
        });

        let iconList = document.getElementsByClassName("icon-ani");
        for (let i = 0; i < iconList.length; i++) {
            const icon = iconList[i] as HTMLElement;
            icon.classList.remove("icon-ani")
        }

        let icon = document.getElementById("map-city-" + id) as HTMLDivElement;
        console.log(icon);
        icon.children[0].classList.add("icon-ani");
        setSWAPIPlanet(SWAPInfo);
        setDestination(id);
    }
    let travel = async (e: any) => {
        //await travel action
        //const [currentLoc, setCurrentLoc] = useState(props.autherUser.location);
        setCurrentLoc(2);
        props.travelAni(1)
    }
    return (
        <>
            <div className="map-wrapper-city">
                {planetDisplay}

            </div>
            <div className="map">
                <div className="map-inner">
                    <div id="map-city-1" className="icon-locator">
                        <div className="city-icon"></div>
                        <div className="city-title">Tatooine</div>
                    </div>
                    <div id="map-city-2" className="icon-locator">
                        <div className="city-icon"></div>
                        <div className="city-title">Alderaan</div>
                    </div>
                </div>
            </div>
            <div className="map-wrapper-city-detail">
                {planetDetail}
                {planetDetail?               
                 <div className="SWAPIInfo-trvel-btn" onClick={travel}>
                    TRAVEL
                </div>
                :null}
            </div>
        </>
    );

}

export default Trade;