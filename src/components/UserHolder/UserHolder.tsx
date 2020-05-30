import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';


import "../../style/userHolder.scss"

export interface IUserProps {
    //authUser: User;
    //location: Planet;
    //currentCargoSize: number;
    //errorMessage: string;
    inGame: boolean;
}

function UserHolder(props: IUserProps) {

    const [readyState, setReadyState] = useState(false);
    const [inGame, setInGame] = useState(props.inGame);

    //const [username, setusername] = useState(props.authUser.username);
    // const [currency, setcurrency] = useState(props.authUser.currency);
    // const [maxCargo, setMaxCargo] = useState(props.authUser.cargo);
    // const [currentCargo, setCurrentCargo] = useState(props.currentCargoSize);

    const [username, setusername] = useState("Test");
    const [currency, setcurrency] = useState(1000);
    const [maxCargo, setMaxCargo] = useState(20);
    const [currentCargo, setCurrentCargo] = useState(10);

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="user-wrapper">
                <div className="username-row">
                    <div id="username">{username}</div>
                </div>
                <div className="info-row">
                    <div id="currency">{currency} CREDITS</div>
                </div>
                <div className="info-row">
                    <div id="cargo">CARGO: {currentCargo}/{maxCargo}</div>
                </div>
                <div className="info-filler">
                </div>
                {inGame?                 
                <div className="info-upgrade">
                    <div>UPGRADE</div>
                </div>
                : null}

            </div>
        </>
    );

}

export default UserHolder;