import React, { useState, SyntheticEvent } from 'react';
import "../../style/login.scss";
import { Alert } from '@material-ui/lab';


export interface ILoginProps {
    //authUser: User;
    errorMessage: string;
    loginAction: (username: string, password: string) => void;
    resetFunction: any;
    transitFunction: any;
}

function LoginComponet(props: ILoginProps) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async (e: any) => {
        props.transitFunction(e);
        props.loginAction(username, password);
    }


    return (
        <>
            <div >
                <form className="form-body neon-inner">
                    <div className="form-title">USERNAME</div>
                    <input className="form-input"
                        onChange={updateUsername}
                        value={username}
                        id="username" type="text"
                        placeholder="Enter your username" />

                    <div className="form-title">PASSWORD</div>
                    <input className="form-input"
                        onChange={updatePassword}
                        value={password}
                        id="password" type="password"
                        placeholder="Enter your password" />
                    <div className="button-container form-title">
                        <span id="submit-button" className="login-botton neon" onClick={login}>LOGIN</span>
                        <span id="reset-button" className="login-botton neon" onClick={props.resetFunction}>CANCEL</span>
                    </div>
                </form>
            </div>
        </>
    );

}

export default LoginComponet;