// Action to change user logged in state with the corresponding logged in user.
import { Dispatch } from "redux"
import { authenticate } from "../remote/auth-service"

export const loginActionTypes = {
    SUCCESSFUL_LOGIN: 'SUCCESSFUL_LOGIN',
    BAD_REQUEST: 'BAD_REQUEST',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

export const loginAction = (username: string, password: string) => async (dispatch: Dispatch) => {

    try {

        let authUser = await authenticate(username, password);
        dispatch({
            type: loginActionTypes.SUCCESSFUL_LOGIN,
            payload: authUser
        });

    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: loginActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else if (status === 401) {
            dispatch({
                type: loginActionTypes.INVALID_CREDENTIALS,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: loginActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}