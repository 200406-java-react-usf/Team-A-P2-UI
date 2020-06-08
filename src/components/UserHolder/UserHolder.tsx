import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';


import "../../style/userHolder.scss"
import { Cargo } from '../../dtos/cargo';
import { Good } from '../../dtos/good';
import { User } from '../../dtos/user';
import { getCargoListbyUserId } from '../../remote/player-service';

export interface IUserProps {
    authUser: User;
    errorMessage: string;
    inGame: boolean;
}

function UserHolder(props: IUserProps) {

    const [readyState, setReadyState] = useState(false);
    const [inGame, setInGame] = useState(props.inGame);

    const [username, setusername] = useState(props.authUser.username);
    const [currency, setcurrency] = useState(props.authUser.currency);
    const [maxCargo, setMaxCargo] = useState(props.authUser.cargoSpace);
    const [currentCargo, setCurrentCargo] = useState(0);
    
    useEffect(() => {
        let getCurrentCargo = async () => {
            let result: Cargo[] = await getCargoListbyUserId(props.authUser.id);
            let sum = 0;
            for (let i = 0; i < result.length; i++) {
                sum += result[i].quantity;
            }
            setCurrentCargo(sum)
        }
        getCurrentCargo()
    }, []);

    return (
        <>
            <div className="user-wrapper unselect">
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
                {inGame ?
                    <div className="info-upgrade">
                        <div>UPGRADE</div>
                    </div>
                    : null}

            </div>
        </>
    );

}

export default UserHolder;