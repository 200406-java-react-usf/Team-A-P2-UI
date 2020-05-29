/*Changes the state of authUser when logout action is called.*/
import { AnyAction } from "redux"
import { logoutActionTypes } from "../actions/logout-action"
import { ILogoutState } from "."

const initialState: ILogoutState = {
    // @ts-ignore
    authUser: (null as User), 
    errorMessage: ''
}

export const logoutReducer = (state: ILogoutState = initialState, action: AnyAction) => {
    switch (action.type) {
        case logoutActionTypes.SUCCESSFUL_LOGOUT:
            return {
                ...state, 
                authUser: action.payload
            }
        case logoutActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }

}