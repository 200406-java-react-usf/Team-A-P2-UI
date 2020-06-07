import React, { useState, SyntheticEvent } from 'react';
import "../../style/login.scss";

import { User } from "../../dtos/user"
import UserHolder from "../../components/UserHolder/UserHolder"


export interface ILoginProps {
    authUser: User;
    errorMessage: string;
    loginAction: (username: string, password: string) => void;
}

function LoginComponent(props: ILoginProps) {
    //@ts-ignore
    const [authUser, setAuthUser] = useState(props.authUser);

    // let mockUser = new User(1, "test", "test", 20, 1000, "Aderaan")
    // const [authUser, setAuthUser] = useState(mockUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState("test error");

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async () => {
        //props.loginAction(username, password);
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

                <div className="button-container" onClick={login}>
                    LOGIN
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

export default LoginComponent;