import React, { useState } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import "../style/entrance.scss"



function Entrance() {

    const [readyState, setReadyState] = useState(false);

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }



    let films = [];

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
        //mouse move range -- opt 15
        maxGap: 30
    };

    function moveCameraXY(event: any) {
        const xGap =
            (((event.clientX - window.innerWidth / 2) * 100) /
                (window.innerWidth / 2)) *
            -1;
        const yGap =
            (((event.clientY - window.innerHeight / 2) * 100) /
                (window.innerHeight / 2)) *
            -1;
        const newPerspectiveOriginX =
            perspectiveOrigin.x + (xGap * perspectiveOrigin.maxGap) / 100;
        const newPerspectiveOriginY =
            perspectiveOrigin.y + (yGap * perspectiveOrigin.maxGap) / 100;

        document.documentElement.style.setProperty(
            "--scenePerspectiveOriginX",
            newPerspectiveOriginX.toString()
        );
        document.documentElement.style.setProperty(
            "--scenePerspectiveOriginY",
            newPerspectiveOriginY.toString()
        );
    }
    //z
    function moveCameraZ() {
        document.documentElement.style.setProperty("--cameraZ", window.pageYOffset.toString());
    }
    window.addEventListener("mousemove", moveCameraXY);

    return (
        <>
            <div className="wrapper">
                <div id="viewport" className="viewport">
                    CAMERA

                    <div id="cube" className="cube">
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
                            3-d
                        </div>
                        <div id="cube-face-3-f" className="cube-face">
                            3-f
                        </div>
                        <div id="cube-face-3-e" className="cube-face">
                            3-e
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
                            6
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Entrance;