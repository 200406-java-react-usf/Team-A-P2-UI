//Action would change the state of the cargo and current user currency based on the upgrade bought
import { Dispatch } from "redux"
import { authenticate } from "../remote/auth-service"
import { User } from "../dtos/user";
import { getUserbyId, updateUser } from "../remote/player-service";

export const upgrageActionTypes = {
    SUCCESSFUL_UPGRADE: 'SUCCESSFUL_UPGRADE',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/*Would require current userID to know which user to change cargo for and the cost of the upgrade*/
export const upgradeAction = (user_id: number) => async (dispatch: Dispatch) => {

    try {
        //upgrade
        let user: User = await getUserbyId(user_id);
        user.currency -= 1000;
        user.cargoSpace += 10;
        await updateUser(user);
        dispatch({
            type: upgrageActionTypes.SUCCESSFUL_UPGRADE,
            payload: user
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