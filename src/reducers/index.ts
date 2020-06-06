import { User } from "../dtos/user";
import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { logoutReducer } from "./logout-reducer";
import { Planet } from "../dtos/planet";

export interface ILoginState {
    authUser: User;
    errorMessage: string;
}
export interface ILogoutState {
    errorMessage: string;
}
export interface IPlanetState{
    currentlocation: Planet;
    errorMessage: string;
}
export interface IState {
    login: ILoginState;
    logout: ILogoutState;
}

export const state = combineReducers<IState>({
    login: loginReducer,
    logout: logoutReducer
});