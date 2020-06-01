//Action would change the state of the cargo and current user currency based on the upgrade bought
import { Dispatch } from "redux"
import { authenticate } from "../remote/auth-service"

export const upgrageActionTypes = {
    SUCCESSFUL_UPGRADE: 'SUCCESSFUL_UPGRADE',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/*Would require current userID to know which user to change cargo for and the cost of the upgrade*/
export const upgradeAction = (userID: number, cost: number ) => async (dispatch: Dispatch) => {

    try {

        // let soldGoods = await buyBackEndFunction(userID, good_id, good_quantity, planet_name);
        dispatch({
            type: upgrageActionTypes.SUCCESSFUL_UPGRADE,
            // payload: authUser
        });

    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: upgrageActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: upgrageActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}