import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

export interface IUserProps {
    //authUser: User;
    //location: Planet;
    //currentCargoSize: number;
    errorMessage: string;
    loginAction: (username: string, password: string) => void;
}

function UserHolder(props: IUserProps) {

    const [readyState, setReadyState] = useState(false);
    const [ingameState, setIngame] = useState(false);


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
                <div className="usernameRow">
                    <div id="username">{username}</div>
                </div>
                <div className="infoRow">
                    <div id="currency">{currency}</div>
                </div>
                <div className="infoRow">
                    <div id="cargo">{currentCargo}/{maxCargo}</div>
                </div>
            </div>
        </>
    );

}

export default UserHolder;