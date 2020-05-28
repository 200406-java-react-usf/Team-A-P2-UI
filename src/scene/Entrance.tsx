import React, { useState, useEffect, useCallback} from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import "../style/entrance.scss"



function Entrance() {

    const [readyState, setReadyState] = useState(false);

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const moveCameraXY = useCallback((event: any)=> {
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
        if (!readyState) {
            window.addEventListener("mousemove", moveCameraXY)
        } else {
            window.removeEventListener("mousemove", moveCameraXY)
        }
    
        return () => window.removeEventListener("mousemove", moveCameraXY)
    }, [readyState]);
    // alias for div
    let room = document.getElementById("cube") as HTMLDivElement;

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

    // function moveCameraXY(event: any) {
    //     const xGap =
    //         (((event.clientX - window.innerWidth / 2) * 100) /
    //             (window.innerWidth / 2)) *
    //         -1;
    //     const yGap =
    //         (((event.clientY - window.innerHeight / 2) * 100) /
    //             (window.innerHeight / 2)) *
    //         -1;
    //     const newPerspectiveOriginX =
    //         perspectiveOrigin.x + (xGap * perspectiveOrigin.maxXGap) / 100;
    //     const newPerspectiveOriginY =
    //         perspectiveOrigin.y + (yGap * perspectiveOrigin.maxYGap) / 100;

    //     document.documentElement.style.setProperty(
    //         "--scenePerspectiveOriginX",
    //         newPerspectiveOriginX.toString()
    //     );
    //     document.documentElement.style.setProperty(
    //         "--scenePerspectiveOriginY",
    //         newPerspectiveOriginY.toString()
    //     );
    // }
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

        console.log(e.currentTarget.id+ " in")
        roomReset();
        switch (e.currentTarget.id) {
            case "camera-btn-load":
                room.classList.add("cube-right");
                break;
            case "camera-btn-new":
                room.classList.add("cube-front");
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

    return (
        <>
            <div className="wrapper">
                <div id="viewport" className="viewport">
                    <div id="camera" className="camera">
                        <div id="camera-bar" className="camera-bar">
                            <div id="camera-btn-load" onMouseEnter={cameraMovement} className="camera-btn">
                                NEW GAME
                            </div>
                            <div id="camera-btn-new" onMouseEnter={cameraMovement} className="camera-btn">
                                LOAD GAME
                            </div>
                            <div id="camera-btn-credit"  onMouseEnter={cameraMovement} className="camera-btn">
                                CREDIT
                            </div>
                            <div id="camera-btn-setting"  onMouseEnter={cameraMovement} className="camera-btn">
                                SETTING
                            </div>
                            <div id="camera-btn-exit"  onMouseEnter={cameraMovement} className="camera-btn">
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