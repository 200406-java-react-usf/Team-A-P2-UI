/*Changes state of authUser's location and the then changes the state of the currentCity to the appropiate city*/
/*Changes authUser state when upgrade action is called.*/
import { IUpgradeState } from ".";
import { User } from "../dtos/user";
import { AnyAction } from "redux";
import { upgrageActionTypes } from "../actions/upgrade-action";
const initialState: IUpgradeState = {
    // @ts-ignore
    authUser: (null as User),
    errorMessage: ''
}

export const upgradeReducer = (state: IUpgradeState = initialState, action: AnyAction) => {

    switch (action.type) {

        case upgrageActionTypes.SUCCESSFUL_UPGRADE:
            return {
                ...state,
                authUser: action.payload
            }
        case upgrageActionTypes.BAD_REQUEST:
        case upgrageActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }

        default:
            return state;

    }

}
