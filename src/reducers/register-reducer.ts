import { IRegisterState } from "."
import { AnyAction } from "redux"
import { registerActionTypes } from "../actions/register-action"
import { User } from "../dtos/user"

const initialState: IRegisterState = {
    // @ts-ignore
    authUser: (null as User),
    errorMessage: ''
}

export const registerReducer = (state: IRegisterState = initialState, action: AnyAction) => {
 
    switch (action.type) {
        case registerActionTypes.SUCCESSFUL_REGISTER:
            return {
                ...state,
                authUser: action.payload
            }

        case registerActionTypes.BAD_REQUEST:
        case registerActionTypes.CONFLICT_ERROR:
        case registerActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}