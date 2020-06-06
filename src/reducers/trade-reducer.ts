/*Changes authUser state when trade action is called.*/
import { ITradeState } from ".";
import { User } from "../dtos/user";
import { AnyAction } from "redux";
import { tradeActionTypes } from "../actions/trade-action";
const initialState: ITradeState = {
    // @ts-ignore
    authUser: (null as User),
    errorMessage: ''
}

export const tradeReducer = (state: ITradeState = initialState, action: AnyAction) => {

    switch (action.type) {

        case tradeActionTypes.SUCCESSFUL_PURCHASE:
            return {
                ...state,
                authUser: action.payload
            }
        case tradeActionTypes.BAD_REQUEST:
        case tradeActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }

        default:
            return state;

    }

}
