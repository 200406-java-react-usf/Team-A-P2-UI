import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';


import "../../style/userHolder.scss"
import { Cargo } from '../../dtos/cargo';
import { Good } from '../../dtos/good';
import { User } from '../../dtos/user';

export interface IUserProps {
    authUser: User;
    errorMessage: string;
    inGame: boolean;
}

function UserHolder(props: IUserProps) {

    const [readyState, setReadyState] = useState(false);
    const [inGame, setInGame] = useState(props.inGame);

    //const [username, setusername] = useState(props.authUser.username);
    // const [currency, setcurrency] = useState(props.authUser.currency);
    // const [maxCargo, setMaxCargo] = useState(props.authUser.cargo);



    const [username, setusername] = useState(props.authUser.username);
    const [currency, setcurrency] = useState(props.authUser.currency);
    const [maxCargo, setMaxCargo] = useState(props.authUser.cargoSpace);
    const [currentCargo, setCurrentCargo] = useState(0);


    let mockCargoList: Cargo[] = [
        new Cargo(1, 1, 1, 100),
    ];

    let mockGoodList: Good[] = [
        new Good(1, "Precious Metal", 100, "It's valuable because it's shiny."),
        new Good(2, "Synth Food", 5, "Tastes like chicken. It always tastes like chicken."),
        new Good(3, "Heavy Weaponry", 1000, "Can be used to snuff out a rebellion. Or to start one."),
        new Good(4, "Stimulants", 500, "Bro, maybe the galaxy is moving AROUND us!"),
        new Good(5, "Harvested Organs", 2000, "I poured my heart out for you."),
        new Good(6, "Yavinnium Gas",200, "Makes you talk funny. Also an important isolant in superconductors."),
        new Good(7, "Zeyd Fabric", 1500, "We have an array of vibrant color pallets, but of course black suits you, my Emperor."),
        new Good(8, "Memory Plastic", 300, "I still remeber the time when I was a young and happy dinosaur,"),
        new Good(9, "Luxious Fur Pelt", 500, "No it is not from a Wookie! When would you ask?"),
        new Good(10, "Aldarran Jewlery", 1000, "So popular that it will be out of print soon!"),
        new Good(11, "Kyber Crystal", 5000, "Perfect for creating a positive Feng Shui or light saber")
    ];
    
    useEffect(() => {
        let getCurrentCargo = async () => {
            //let result: Cargo[] = await getAllUserCargo();
            let result =mockCargoList
            let sum = 0;
            for (let i = 0; i < result.length; i++) {
                sum += result[i].good_quantity;
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