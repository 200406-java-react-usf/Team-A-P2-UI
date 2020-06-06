// Action to change user logged in state with the corresponding logged in user.
import { Dispatch } from "redux"
import { getCargoListbyUserId } from "../remote/player-service";
import { Cargo } from "../dtos/cargo";

export const cargoListActionTypes = {
    SUCCESSFUL_GETLIST: 'SUCCESSFUL_LOGIN',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

export const cargoListAction = (user_id: number) => async (dispatch: Dispatch) => {

    try {

        let userCargoList:Cargo[] = await getCargoListbyUserId(user_id);
        dispatch({
            type: cargoListActionTypes.SUCCESSFUL_GETLIST,
            payload: userCargoList
        });

    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: cargoListActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: cargoListActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}