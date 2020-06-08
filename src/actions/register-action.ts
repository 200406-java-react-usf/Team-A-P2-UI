import { Dispatch } from "redux"
import { register } from "../remote/player-service"

export const registerActionTypes = {
    SUCCESSFUL_REGISTER: 'REIMB_SUCCESSFUL_REGISTER',
    BAD_REQUEST: 'REIMB_BAD_REQUEST',
    CONFLICT_ERROR: 'REIMB_CONFLICT_ERROR',
    INTERNAL_SERVER_ERROR: 'REIMB_INTERNAL_SERVER_ERROR'
}

export const registerAction = (username: string, password:string) => async (dispatch: Dispatch) => {

    try {
        let persistedUser = await register(username, password);
        dispatch({
            type: registerActionTypes.SUCCESSFUL_REGISTER,
            payload: persistedUser
        });
    } catch (e) {
        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: registerActionTypes.BAD_REQUEST,
                payload: e.response.data.reason
            });
        } else if (status === 409) {
            dispatch({
                type: registerActionTypes.CONFLICT_ERROR,
                payload: e.response.data.reason
            });
        }
        else {
            dispatch({
                type: registerActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }
    }
}