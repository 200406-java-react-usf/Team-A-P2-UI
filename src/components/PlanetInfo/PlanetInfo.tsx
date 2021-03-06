import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Planet } from "../../dtos/planet";

import { getAllPlanets } from "../../remote/player-service"

import "../../style/planetInfo.scss";
import { User } from '../../dtos/user';

export interface IMapProps {
    authUser: User;
    //this animation is passed from spaceship.tsx, no redux required
    travelAni: any;
}

function PlanetInfo(props: IMapProps) {

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

    useEffect(() => {
        let planetDisplayList: any[] = [];
        let fetchPlanetData = async () => {
            //setPlanetCargoList(planetCargo);
            //let planetPriceMod = await getPlanetPriceMod();

            if (planetList) {
                for (let planet of planetList) {
                    //let priceMod = await getPlanetPriceModByID();
                    planetDisplayList.push(
                        <div className="city-slot-wrapper" key={"planet-" + planet.id} id={"planet-" + planet.id} onClick={selectDetail}>
                            <div className="city-slot-cell-id unselect">{planet.id}</div>
                            <div className="city-slot-cell unselect">{planet.name}</div>
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
                            <div className="SWAPIInfo-img">
                                <div className="scene">
                                    <div className="sphere">
                                        <div className="hemisphere">
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                        </div>
                                        <div className="hemisphere">
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                            <div className="face"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="SWAPIInfo-name unselect">{SWAPIPlanet.name}</div>
                            <div className="SWAPIInfo-sub unselect">CLIMATE: {SWAPIPlanet.climate}</div>
                            <div className="SWAPIInfo-sub unselect">TERRAIN: {SWAPIPlanet.terrain}</div>
                            <div className="SWAPIInfo-sub unselect">POPULATION: {SWAPIPlanet.population}</div>
                        </div>
                    </>
                setPlanetDetail(detail);
            }
        }

        // let getCurrentLoc = async () => {
        //     let iconList = document.getElementsByClassName("icon-ani");
        //     for (let i = 0; i < iconList.length; i++) {
        //         const icon = iconList[i] as HTMLElement;
        //         icon.classList.remove("icon-ani")
        //     }
        //     if (destination) {
        //         let icon = document.getElementById("map-city-" + destination) as HTMLDivElement;
        //         icon?.classList.add("icon-ani");
        //     }
        // }
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
        axios.get(SWAPIURL).then(function (response) {
            SWAPInfo = response.data.results[0];
            setSWAPIPlanet(SWAPInfo);
        });

        let iconList = document.getElementsByClassName("icon-ani");
        for (let i = 0; i < iconList.length; i++) {
            const icon = iconList[i] as HTMLElement;
            icon.classList.remove("icon-ani")
        }

        let icon = document.getElementById("map-city-" + id) as HTMLDivElement;
        icon.children[0].classList.add("icon-ani");

        setDestination(id);
    }
    let travel = async (e: any) => {
        //await travel action
        //const [currentLoc, setCurrentLoc] = useState(props.autherUser.location);
        setCurrentLoc(2);
        props.travelAni(2)
    }
    let loadData = async () => {
        let planets = await getAllPlanets();
        setPlanetList(planets);
    }
    return (
        <>
            <div className="map-wrapper-city">
                {planetDisplay}

            </div>
            <div className="map" onClick ={loadData}>
                <div className="map-inner">
                    <div id="map-city-1" className="icon-locator">
                        <div className="city-icon"></div>
                        <div className="city-title">Tatooine</div>
                    </div>
                    <div id="map-city-2" className="icon-locator">
                        <div className="city-icon"></div>
                        <div className="city-title">Alderaan</div>
                    </div>
                    <div id="map-city-3" className="icon-locator">
                        <div className="city-icon"></div>
                        <div className="city-title">Yavin IV</div>
                    </div>
                    <div id="map-city-4" className="icon-locator">
                        <div className="city-icon"></div>
                        <div className="city-title">Hoth</div>
                    </div>
                    <div id="map-city-5" className="icon-locator">
                        <div className="city-icon"></div>
                        <div className="city-title">Dagobah</div>
                    </div>
                </div>
            </div>
            <div className="map-wrapper-city-detail">
                {planetDetail}
                {planetDetail ?
                    <div className="SWAPIInfo-trvel-btn" onClick={travel}>
                        TRAVEL
                </div>
                    : null}
            </div>
        </>
    );

}

export default PlanetInfo;