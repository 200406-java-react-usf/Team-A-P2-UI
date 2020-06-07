import { User } from "../dtos/user";
import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { logoutReducer } from "./logout-reducer";
import { Cargo } from "../dtos/cargo";
import { tradeReducer } from "./trade-reducer";
import { moveReducer } from "./move-reducer";
import { upgradeReducer } from "./upgrade-reducer";

export interface ILoginState {
    authUser: User;
    errorMessage: string;
}
export interface ILogoutState {
    errorMessage: string;
}
export interface ITradeState{
    userCargoList: Cargo[];
    errorMessage: string;
}
export interface IMoveState{
    userLocation: number;
    errorMessage: string;
}
export interface IUpgradeState{
    userLocation: number;
    errorMessage: string;
}
export interface IState {
    login: ILoginState;
    logout: ILogoutState;
    trade: ITradeState;
    move: IMoveState;
    upgrade:IUpgradeState;
}

export const state = combineReducers<IState>({
    login: loginReducer,
    logout: logoutReducer,
    trade: tradeReducer,
    move: moveReducer,
    upgrade: upgradeReducer
});