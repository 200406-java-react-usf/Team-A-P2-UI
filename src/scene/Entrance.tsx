import React, { useState } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import "../style/entrance.scss"



function Entrance() {

    const [readyState, setReadyState] = useState(false);

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    return (
        <>
            <div className="wrapper">
                <div id="viewport-cube" className="viewport neon">
                    <div id="cube-inner" className="cube-inner  cube-ani-2">
                        <div id="cube-face-1-a" className="cube-face-inner neon">

                        </div>
                        <div id="cube-face-2-a" className="cube-face-inner neon">

                        </div>
                        <div id="cube-face-3-a" className="cube-face-inner neon">
                            Login
                        </div>
                        <div id="cube-face-4-a" className="cube-face-inner neon">

                        </div>
                        <div id="cube-face-5-a" className="cube-face-inner neon">

                        </div>
                        <div id="cube-face-6-a" className="cube-face-inner neon">

                        </div>
                    </div>
                    <div id="cube" className="cube cube-ani-1">
                        <div id="cube-face-1" className="cube-face">
                            <div id='face1' className="cube-title hidden">ADMIN</div>
                            <div className="loginWrapper-ready hidden">
                            </div>
                        </div>
                        <div id="cube-face-2" className="cube-face neon">
                            <div id='face2' className="cube-title hidden">MANAGER</div>
                            <div className="loginWrapper-ready hidden">
                            </div>
                        </div>
                        <div id="cube-face-3" className="cube-face neon">

                        </div>
                        <div id="cube-face-4" className="cube-face neon">

                        </div>
                        <div id="cube-face-5" className="cube-face neon">
                            <div id='face6' className="cube-title special-employee hidden">EMPLOYEE</div>
                            <div className="loginWrapper-ready hidden  neon">
                            </div>
                        </div>
                        <div id="cube-face-6" className="cube-face neon">

                        </div>
                    </div>

                </div>
                

            </div>
            <div className="scanlines"></div>

        </>
    );

}

export default Entrance;