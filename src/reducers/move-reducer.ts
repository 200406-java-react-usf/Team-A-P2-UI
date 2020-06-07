/*Changes state of authUser's location and the then changes the state of the currentCity to the appropiate city*/
/*Changes authUser state when move action is called.*/
import { IMoveState } from ".";
import { User } from "../dtos/user";
import { AnyAction } from "redux";
import { moveActionTypes } from "../actions/move-action";
const initialState: IMoveState = {
    // @ts-ignore
    authUser: (null as User),
    errorMessage: ''
}

export const moveReducer = (state: IMoveState = initialState, action: AnyAction) => {

    switch (action.type) {

        case moveActionTypes.SUCCESSFUL_MOVE:
            return {
                ...state,
                authUser: action.payload
            }
        case moveActionTypes.BAD_REQUEST:
        case moveActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }

        default:
            return state;

    }

}
