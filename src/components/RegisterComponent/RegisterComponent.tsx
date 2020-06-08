import React, { useState, SyntheticEvent } from 'react';
import "../../style/login.scss";

import { User } from "../../dtos/user"
import UserHolder from "../UserHolder/UserHolderContainer"


export interface IRegisterProps {
    authUser: User;
    errorMessage: string;
}

function RegisterComponent(props: IRegisterProps) {
    const [authUser, setAuthUser] = useState(props.authUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState("");

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let Register = async () => {
       // props.RegisterAction(username, password);
    }


    return (
        <>
            <form className="login-wrapper">
                <div className="form-title">USERNAME</div>
                <input className="form-input"
                    onChange={updateUsername}
                    value={username}
                    id="username" type="text"
                    placeholder="Enter Your Username" />

                <div className="form-title">PASSWORD</div>
                <input className="form-input"
                    onChange={updatePassword}
                    value={password}
                    id="password" type="password"
                    placeholder="Enter Your Password" />

                <div className="button-container" onClick={Register}>
                    REGISTER
                    </div>
                {errorMessage ?
                    <div className="form-error">{errorMessage}</div>
                    : null
                }
            </form>
            {authUser ?
                <div className="login-wrapper-user">
                    <UserHolder inGame={false} />
                </div>
                : null
            }
        </>
    );

}

export default RegisterComponent;