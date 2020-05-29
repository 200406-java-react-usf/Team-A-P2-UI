import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import "../../style/entrance.scss"



function Entrance() {

    const [readyState, setReadyState] = useState(false);

    const [action, setAction] = useState("default");

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
            case "camera-btn-addnew":
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
    let displayfocus = async (e: any) => {
        let target = e.currentTarget.id;
        let room = document.getElementById("cube") as HTMLDivElement;
        let camera = document.getElementById("camera") as HTMLDivElement;
        let cameraLock = document.getElementById("camera-lock") as HTMLDivElement;
        switch (target) {
            case "camera-btn-load":
                setAction("login");
                room.classList.add("cube-login");
                break;
            case "camera-btn-addnew":
                setAction("addnew");
                room.classList.add("cube-addnew");
                break;
            case "camera-btn-credit":
                setAction("credit");
                room.classList.add("cube-credit");
                break;
            case "camera-btn-exit":
                setAction("exit");
                room.classList.add("cube-exit");
                break;
            case "camera-btn-setting":
                setAction("setting");
                room.classList.add("cube-setting");
                break;
        }
        camera.classList.add("hidden");
        cameraLock.classList.remove("hidden");
        roomReset();
    }
    let backAction = async () => {
        let room = document.getElementById("cube") as HTMLDivElement;
        let camera = document.getElementById("camera") as HTMLDivElement;
        let cameraLock = document.getElementById("camera-lock") as HTMLDivElement;

        camera.classList.remove("hidden");
        cameraLock.classList.add("hidden");
        //roomReset();

        switch (action) {
            case "login":
                room.classList.remove("cube-login");
                room.classList.add("cube-front");
                break;
            case "addnew":
                room.classList.remove("cube-addnew");
                room.classList.add("cube-right");
                break;
            case "credit":
                room.classList.remove("cube-credit");
                room.classList.add("cube-left");
                break;
            case "exit":
                room.classList.remove("cube-exit");
                room.classList.add("cube-back");
                break;
            case "setting":
                room.classList.remove("cube-setting");
                room.classList.add("cube-floor");
                break;
        }
    }
    let fwdAction = async() => {
        let room = document.getElementById("cube") as HTMLDivElement;
        let cameraLock = document.getElementById("camera-lock") as HTMLDivElement;
        room.classList.remove("cube-login");
        room.classList.remove("cube-addnew");
        cameraLock.classList.add("hidden");
        room.classList.add("cube-top");
        await timeout(1000);
        room.classList.remove("cube-top");
        room.classList.add("cube-top-ani");
        await timeout(2000);
        // redirect here
    }
    return (
        <>
            <div className="wrapper">
                <div id="viewport" className="viewport">
                    <div id="camera" className="camera">
                        <div id="camera-bar" className="camera-bar">
                            <div id="camera-btn-load" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn">
                                LOAD GAME
                            </div>
                            <div id="camera-btn-addnew" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn">
                                NEW GAME
                            </div>
                            <div id="camera-btn-credit" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn">
                                CREDIT
                            </div>
                            <div id="camera-btn-setting" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn">
                                SETTING
                            </div>
                            <div id="camera-btn-exit" onMouseEnter={cameraMovement} onClick={displayfocus} className="camera-btn">
                                EXIT
                            </div>
                        </div>
                    </div>
                    <div id="camera-lock" className="camera hidden">
                        {(action === "login" || action === "addnew") ?
                            <div id="camera-lock-bar" className="camera-bar">
                                <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                    CANCEL
                                    </div>
                                <div id="camera-btn-confirm" onClick={fwdAction} className="camera-btn">
                                    CONFIRM
                            </div>
                            </div>
                            : null}
                        {(action === "exit") ?
                            <div id="camera-lock-bar" className="camera-bar">
                                <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                    CANCEL
                                    </div>
                                <div id="camera-btn-confirm"  className="camera-btn">
                                    EXIT
                                </div>
                            </div>
                            : null}
                        {(action === "setting") ?
                            <div id="camera-lock-bar" className="camera-bar">
                                <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                    CANCEL
                                    </div>
                                <div id="camera-btn-confirm" className="camera-btn">
                                    SUBMIT
                                </div>
                            </div>
                            : null}
                        {(action === "credit") ?
                            <div id="camera-lock-bar" className="camera-bar">
                                <div id="camera-btn-back" onClick={backAction} className="camera-btn">
                                    CANCEL
                                    </div>
                                <div id="camera-btn-confirm" className="camera-btn">
                                    DETAILS
                                </div>
                            </div>
                            : null}
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
                        <div id="cube-face-2-a" className="cube-face">
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
                        <div id="cube-face-5-d" className="cube-top">
                            5-d
                        </div>
                        <div id="cube-face-5-e" className="cube-face">
                            5-e
                        </div>
                        <div id="cube-face-5-f" className="cube-face">
                            5-f
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