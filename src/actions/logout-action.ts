//Action to change current user state to null.
import { Dispatch } from "redux"
import { logout } from "../remote/auth-service"
import { loginActionTypes } from "./login-action";

export const logoutActionTypes = {
    SUCCESSFUL_LOGOUT: 'SUCCESSFUL_LOGOUT',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

export const logoutAction = () => async (dispatch: Dispatch) => {

    try {
        let authUser = await logout();
        dispatch({
            type: logoutActionTypes.SUCCESSFUL_LOGOUT,
            payload: authUser
        });

        dispatch({
            type: loginActionTypes.SUCCESSFUL_LOGIN,
            payload: authUser
        })
    } catch (e) {
        dispatch({
            type: logoutActionTypes.INTERNAL_SERVER_ERROR,
            payload: e.response.data.message
        })
    }

}
