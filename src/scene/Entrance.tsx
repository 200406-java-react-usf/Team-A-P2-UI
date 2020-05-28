import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import "../style/entrance.scss"



function Entrance() {
    const [readyLogin, setReadyLogin] = useState(false);

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
        //mouse move range -- opt 45, 30
        maxXGap: 45,
        maxYGap: 30
    };


    // useEffect(() => {


    //     window.addEventListener("mousemove", cameraXY);
    //     return () => window.removeEventListener("mousemove", cameraXY);

    //     // let cameraRoamCheck = async () => {
    //     //     const cameraXY = (event: any) => {
    //     //         const xGap =
    //     //             (((event.clientX - window.innerWidth / 2) * 100) /
    //     //                 (window.innerWidth / 2)) *
    //     //             -1;
    //     //         const yGap =
    //     //             (((event.clientY - window.innerHeight / 2) * 100) /
    //     //                 (window.innerHeight / 2)) *
    //     //             -1;
    //     //         const newPerspectiveOriginX =
    //     //             perspectiveOrigin.x + (xGap * perspectiveOrigin.maxXGap) / 100;
    //     //         const newPerspectiveOriginY =
    //     //             perspectiveOrigin.y + (yGap * perspectiveOrigin.maxYGap) / 100;

    //     //         document.documentElement.style.setProperty(
    //     //             "--scenePerspectiveOriginX",
    //     //             newPerspectiveOriginX.toString()
    //     //         );
    //     //         document.documentElement.style.setProperty(
    //     //             "--scenePerspectiveOriginY",
    //     //             newPerspectiveOriginY.toString()
    //     //         );
    //     //     }
    //     //     if (readyLogin) {
    //     //         return () => window.removeEventListener("mousemove", cameraXY);
    //     //     } else if (!readyLogin) {
    //     //         window.addEventListener("mousemove", cameraXY);
    //     //     }
    //     // }
    //     //cameraRoamCheck()
    // }, [readyLogin]);

    // Event handler utilizing useCallback ...
    // ... so that reference never changes.
    const cameraXY = useCallback(
        (event: any) => {
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
        },
        [setReadyLogin]
    );




// Hook
    // Create a ref that stores handler
    const savedHandler = useRef();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On 
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // Create event listener that calls handler function stored in ref
            const eventListener = event => savedHandler.current(event);

            // Add event listener
            element.addEventListener(eventName, eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element] // Re-run if eventName or element changes
    );
    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    //z
    function moveCameraZ() {
        document.documentElement.style.setProperty("--cameraZ", window.pageYOffset.toString());
    }

    let roomReset = () => {
        let room = document.getElementById("cube") as HTMLDivElement;

        room.classList.remove("cube-front");
        room.classList.remove("cube-left");
        room.classList.remove("cube-right");
        room.classList.remove("cube-back");
        room.classList.remove("cube-floor");
    }
    let cameraMovement = async (e: any) => {
        let room = document.getElementById("cube") as HTMLDivElement;
        roomReset();
        switch (e.currentTarget.id) {
            case "camera-btn-load":
                room.classList.add("cube-front");
                break;
            case "camera-btn-new":
                room.classList.add("cube-right");
                break;
            case "camera-btn-credit":
                room.classList.add("cube-left");
                break;
            case "camera-btn-setting":
                room.classList.add("cube-floor");
                break;
            case "camera-btn-exit":
                room.classList.add("cube-back");
                break;
        }
    }

    let displayLogin = async () => {
        let room = document.getElementById("cube") as HTMLDivElement;
        roomReset();
        setReadyLogin(true);
        room.classList.add("cube-login");
    }

    return (
        <>
            <div className="wrapper">
                <div id="viewport" className="viewport">
                    <div id="camera" className="camera">
                        <div id="camera-bar" className="camera-bar">
                            <div id="camera-btn-load" onMouseEnter={cameraMovement} onClick={displayLogin} className="camera-btn">
                                LOAD GAME
                            </div>
                            <div id="camera-btn-new" onMouseEnter={cameraMovement} className="camera-btn">
                                NEW GAME
                            </div>
                            <div id="camera-btn-credit" onMouseEnter={cameraMovement} className="camera-btn">
                                CREDIT
                            </div>
                            <div id="camera-btn-setting" onMouseEnter={cameraMovement} className="camera-btn">
                                SETTING
                            </div>
                            <div id="camera-btn-exit" onMouseEnter={cameraMovement} className="camera-btn">
                                EXIT
                            </div>

                        </div>
                    </div>
                    <div id="cube" className="cube-front">
                        <div id="cube-face-1-a" className="cube-face">
                            1-a
                        </div>
                        <div id="cube-face-1-b" className="cube-face">
                            1-b
                        </div>
                        <div id="cube-face-1-c" className="cube-face">
                            1-c
                        </div>
                        <div id="cube-face-1-d" className="cube-face-door">
                            1-d
                        </div>
                        <div id="cube-face-1-e" className="cube-face-door">
                            1-e
                        </div>
                        <div id="cube-face-1-a" className="cube-face">
                            2-a
                        </div>
                        <div id="cube-face-2-b" className="cube-face">
                            2-b
                        </div>
                        <div id="cube-face-2-c" className="cube-face">
                            2-c
                        </div>
                        <div id="cube-face-2-d" className="cube-face">
                            2-d
                        </div>

                        <div id="cube-face-3-a" className="cube-face">
                            3-a
                        </div>
                        <div id="cube-face-3-b" className="cube-face">
                            3-b
                        </div>
                        <div id="cube-face-3-c" className="cube-face">
                            3-c
                        </div>
                        <div id="cube-face-3-d" className="cube-face">
                            <div id="entrance-menu" className="cube-face">

                            </div>
                        </div>
                        <div id="cube-face-3-f" className="cube-face">
                            seat top
                        </div>
                        <div id="cube-face-3-e" className="cube-face">
                            seat back
                        </div>
                        <div id="cube-face-3-g" className="cube-face">
                            seat side
                        </div>
                        <div id="cube-face-4-a" className="cube-face">
                            4
                        </div>
                        <div id="cube-face-4-b" className="cube-face">
                            4-b
                        </div>
                        <div id="cube-face-4-c" className="cube-face">
                            4-c
                        </div>
                        <div id="cube-face-4-d" className="cube-face">
                            4-d
                        </div>
                        <div id="cube-face-5-a" className="cube-top">
                            5-a
                        </div>
                        <div id="cube-face-5-b" className="cube-face">
                            5-b
                        </div>
                        <div id="cube-face-5-c" className="cube-face">
                            5-c
                        </div>
                        <div id="cube-face-6-a" className="cube-bot">
                            FLOOR
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Entrance;