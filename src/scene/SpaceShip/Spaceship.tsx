import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import "../../style/spaceship.scss"

import UserHolder from "../../components/UserHolder/UserHolder";
import CargoHolder from "../../components/CargoHolder/CargoHolder";
import Trade from "../../components/TradeComponent/TradeComponent";
import PlanetInfo from "../../components/PlanetInfo/PlanetInfo";

function Spaceship() {

    const [readyState, setReadyState] = useState(false);

    const [action, setAction] = useState("default");
    let history = useHistory();

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const moveCameraXY = useCallback((event: any) => {
        const xGap =
            (((event.clientX - window.innerWidth / 2) * 100) /
                (window.innerWidth / 2)) *
            -1;
        const yGap =
            (((event.clientY - window.innerHeight / 2) * 100) /
                (window.innerHeight / 2)) *
            -1;
        const newPerspectiveOriginX =
            perspectiveOrigin.x + (xGap * perspectiveOrigin.maxXGap) / 100;
        const newPerspectiveOriginY =
            perspectiveOrigin.y + (yGap * perspectiveOrigin.maxYGap) / 100;

        document.documentElement.style.setProperty(
            "--scenePerspectiveOriginX",
            newPerspectiveOriginX.toString()
        );
        document.documentElement.style.setProperty(
            "--scenePerspectiveOriginY",
            newPerspectiveOriginY.toString()
        );
    }, [setReadyState])

    useEffect(() => {
        let camera = document.getElementById("camera") as HTMLDivElement;
        // for some reason, it still create multiple instances on remove listener
        if (!readyState) {
            camera.addEventListener("mousemove", moveCameraXY)
        } else {
            camera.removeEventListener("mousemove", moveCameraXY)
        }

        return () => camera.removeEventListener("mousemove", moveCameraXY)
    }, [readyState]);


    const perspectiveOrigin = {
        x: parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--scenePerspectiveOriginX"
            )
        ),
        y: parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--scenePerspectiveOriginY"
            )
        ),
        //mouse move range -- opt 20, 10
        maxXGap: 20,
        maxYGap: 10
    };


    let roomReset = () => {
        let room = document.getElementById("cube-spaceship") as HTMLDivElement;
        room.classList.remove("cube-spaceship-front");
        room.classList.remove("cube-spaceship-left");
        room.classList.remove("cube-spaceship-right");
        room.classList.remove("cube-spaceship-back");
        room.classList.remove("cube-spaceship-floor");
    }
    let cameraMovement = async (e: any) => {
        let room = document.getElementById("cube-spaceship") as HTMLDivElement;
        roomReset();
        switch (e.currentTarget.id) {
            case "camera-btn-map":
                room.classList.add("cube-spaceship-front");
                break;
            case "camera-btn-trade":
                room.classList.add("cube-spaceship-right");
                break;
            case "camera-btn-inventory":
                room.classList.add("cube-spaceship-left");
                break;
            case "camera-btn-menu":
                room.classList.add("cube-spaceship-back");
                break;
        }
    }
    let displayfocus = async (e: any) => {
        let target = e.currentTarget.id;
        let room = document.getElementById("cube-spaceship") as HTMLDivElement;
        let camera = document.getElementById("camera") as HTMLDivElement;
        let cameraLock = document.getElementById("camera-lock") as HTMLDivElement;
        switch (target) {
            case "camera-btn-map":
                setAction("map");
                room.classList.add("cube-spaceship-map");
                break;
            case "camera-btn-trade":
                setAction("trade");
                room.classList.add("cube-spaceship-trade");
                break;
            case "camera-btn-inventory":
                setAction("inventory");
                room.classList.add("cube-spaceship-inventory");
                break;
            case "camera-btn-menu":
                setAction("menu");
                room.classList.add("cube-spaceship-menu");
                break;
        }
        camera.classList.add("hidden");
        cameraLock.classList.remove("hidden");
        await timeout(500)
        cameraLock.classList.remove("transparent");

        roomReset();
    }
    let backAction = async () => {
        let room = document.getElementById("cube-spaceship") as HTMLDivElement;
        let camera = document.getElementById("camera") as HTMLDivElement;
        let cameraLock = document.getElementById("camera-lock") as HTMLDivElement;

        camera.classList.remove("hidden");
        cameraLock.classList.add("hidden");
        cameraLock.classList.add("transparent");

        roomReset();

        switch (action) {
            case "map":
                room.classList.remove("cube-spaceship-map");
                room.classList.add("cube-spaceship-front");
                break;
            case "trade":
                room.classList.remove("cube-spaceship-trade");
                room.classList.add("cube-spaceship-right");
                break;
            case "inventory":
                room.classList.remove("cube-spaceship-inventory");
                room.classList.add("cube-spaceship-left");
                break;
            case "menu":
                room.classList.remove("cube-spaceship-menu");
                room.classList.add("cube-spaceship-back");
                break;
        }
    }

    let travel = async () => {
        let room = document.getElementById("cube-spaceship") as HTMLDivElement;
        let background = document.getElementById("background") as HTMLDivElement;
        let cameraLock = document.getElementById("camera-lock") as HTMLDivElement;

        cameraLock.classList.add("hidden");
        room.classList.remove("cube-spaceship-map");
        room.classList.add("cube-spaceship-front");
        await timeout(1000);
        room.classList.remove("cube-spaceship-front");
        room.classList.add("cube-spaceship-zoom");
        await timeout(500);
        room.classList.remove("cube-spaceship-zoom")
        room.classList.add("cube-spaceship-launch");
        await timeout(1000);

        background.classList.add("background-below");
        await timeout(2000);
        room.classList.remove("cube-spaceship-launch");
        room.classList.add("cube-spaceship-jumpPrep");
        await timeout(100);
        room.classList.remove("cube-spaceship-jumpPrep");
        room.classList.add("cube-spaceship-jump");
        await timeout(2000);
        room.classList.remove("cube-spaceship-jump");
        room.classList.add("cube-spaceship-jumpPrep");
        background.classList.remove("background-below");

        await timeout(2000);
        room.classList.remove("cube-spaceship-jumpPrep");
        room.classList.add("cube-spaceship-map");
        await timeout(500);
        background.classList.remove("background-below");
        cameraLock.classList.remove("hidden");
    }
    let [travelAni] = useState(()=>{return travel})
    let startAni = async () => {
        await timeout(1000);
        let room = document.getElementById("cube-spaceship") as HTMLDivElement;
        let camera = document.getElementById("camera") as HTMLDivElement;
        room.classList.remove("cube-spaceship-default");
        room.classList.add("cube-spaceship-front");
        camera.classList.remove("transparent");
    }
    let toMainMenu = async () => {
        history.push('/')
    }
    startAni();
    return (
        <>
            <div className="wrapper">
                <div id="viewport" className="viewport">
                    <div id="camera" className="camera transparent">
                        <div id="camera-bar" className="camera-bar">
                            <div id="camera-btn-map" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn-spaceship">
                                VIEW GALAXY MAP
                            </div>
                            <div id="camera-btn-inventory" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn-spaceship">
                                CURRENT INVENTORY
                            </div>
                            <div id="camera-btn-trade" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn-spaceship">
                                TRADE WITH CITY
                            </div>
                            <div id="camera-btn-menu" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn-spaceship">
                                BACK TO MENU
                            </div>
                        </div>
                    </div>
                    <div id="camera-lock" className="camera hidden transparent">
                        {(action === "map") ?
                            <>
                                <div className="camera-info">
                                    < PlanetInfo travelAni = {travelAni}/>
                                </div>
                                <div id="camera-lock-bar" className="camera-bar">
                                    <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                        CANCEL
                                    </div>
                                </div>
                            </>
                            : null}
                        {(action === "trade") ?
                            <>
                                <div className="camera-info">
                                    < Trade />
                                </div>
                                <div id="camera-lock-bar" className="camera-bar">

                                    <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                        CANCEL
                                    </div>
                                </div>
                            </>
                            : null}
                        {(action === "inventory") ?
                            <>
                                <div className="camera-info">
                                    < UserHolder inGame={true} />
                                    < CargoHolder />
                                </div>
                                <div id="camera-lock-bar" className="camera-bar">
                                    <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                        CANCEL
                                    </div>
                                </div>
                            </>
                            : null}
                        {(action === "menu") ?
                            <div id="camera-lock-bar" className="camera-bar">
                                <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                    CANCEL
                                    </div>
                                <div id="camera-btn-confirm" onClick={toMainMenu} className="camera-btn">
                                    MAIN MENU
                                </div>
                            </div>
                            : null}
                    </div>
                    <div id="cube-spaceship" className="cube-spaceship-default">
                        <div id="cube-face-spaceship-1-a" className="cube-face-spaceship">
                            1-a
                        </div>
                        <div id="cube-face-spaceship-1-b" className="cube-face-spaceship">
                            1-b
                        </div>
                        <div id="cube-face-spaceship-1-c" className="cube-face-spaceship">
                            1-c
                        </div>
                        <div id="cube-face-spaceship-2-a" className="cube-face-spaceship">
                            2-a
                        </div>
                        <div id="cube-face-spaceship-2-b" className="cube-face-spaceship">
                            2-b
                        </div>
                        <div id="cube-face-spaceship-2-b-door" className="cube-face-spaceship">
                            door
                        </div>
                        <div id="cube-face-spaceship-2-c" className="cube-face-spaceship">
                            2-c
                        </div>
                        <div id="cube-face-spaceship-2-d" className="cube-face-spaceship">
                            2-d
                        </div>

                        <div id="cube-face-spaceship-3-a" className="cube-face-spaceship">
                            3-a
                        </div>
                        <div id="cube-face-spaceship-3-b" className="cube-face-spaceship">
                            3-b
                        </div>
                        <div id="cube-face-spaceship-3-c" className="cube-face-spaceship">
                            3-c
                        </div>
                        <div id="cube-face-spaceship-3-d" className="cube-face-spaceship">
                            3-d
                        </div>
                        <div id="cube-face-spaceship-3-e" className="cube-face-spaceship">
                            3-e
                        </div>
                        <div id="cube-face-spaceship-3-f" className="cube-face-spaceship">
                            3-f
                        </div>
                        <div id="cube-face-spaceship-4-a" className="cube-face-spaceship">
                            4-a
                        </div>
                        <div id="cube-face-spaceship-4-b" className="cube-face-spaceship">
                            4-b
                        </div>
                        <div id="cube-face-spaceship-4-c" className="cube-face-spaceship">
                            4-c
                        </div>
                        <div id="cube-face-spaceship-4-d" className="cube-face-spaceship">
                            4-d
                        </div>
                        <div id="cube-face-spaceship-slot">
                            <div className="invent-row">
                                <div id="cube-invent-slot-1" className="cube-invent-slot"></div>
                                <div id="cube-invent-slot-2" className="cube-invent-slot"></div>
                                <div id="cube-invent-slot-3" className="cube-invent-slot"></div>
                            </div>
                            <div className="invent-row">
                                <div id="cube-invent-slot-4" className="cube-invent-slot"></div>
                                <div id="cube-invent-slot-5" className="cube-invent-slot"></div>
                                <div id="cube-invent-slot-6" className="cube-invent-slot"></div>
                            </div>
                            <div className="invent-row">
                                <div id="cube-invent-slot-7" className="cube-invent-slot"></div>
                                <div id="cube-invent-slot-8" className="cube-invent-slot"></div>
                                <div id="cube-invent-slot-9" className="cube-invent-slot"></div>
                            </div>
                        </div>
                        <div id="cube-face-spaceship-5-a" className="cube-top-spaceship">
                            5-a
                        </div>
                        <div id="cube-face-spaceship-5-b" className="cube-face-spaceship">
                            5-b
                        </div>
                        <div id="cube-face-spaceship-5-c" className="cube-face-spaceship">
                            5-c
                        </div>
                        <div id="cube-face-spaceship-6-a" className="cube-bot-spaceship">
                            FLOOR
                        </div>
                        <div id="cube-face-spaceship-6-b" className="cube-bot-spaceship">

                        </div>
                        <div id="cube-face-spaceship-6-c" className="cube-bot-spaceship">
                            table top
                        </div>
                        <div id="cube-face-spaceship-6-d" className="cube-bot-spaceship">
                            <div id="cube-wrap">
                                <div id="cube-mini-1" className="cube-face"></div>
                                <div id="cube-mini-2" className="cube-face"></div>
                                <div id="cube-mini-3" className="cube-face"></div>
                                <div id="cube-mini-4" className="cube-face"></div>
                                <div id="cube-mini-5" className="cube-face"></div>
                                <div id="cube-mini-6" className="cube-face"></div>
                            </div>
                        </div>
                    </div>
                    <div id="background" className="background" ></div>
                </div>
            </div>
        </>
    );

}

export default Spaceship;