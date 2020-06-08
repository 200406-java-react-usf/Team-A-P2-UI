//Action to change user's current location state and the state of the current city.
import { Dispatch } from "redux"
import { authenticate } from "../remote/auth-service"
import { User } from "../dtos/user";
import { getUserbyId, updateUser } from "../remote/player-service";

export const moveActionTypes = {
    SUCCESSFUL_MOVE: 'SUCCESSFUL_MOVE',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/*Would require current userID to know which user to change the locations for and the planet_name to change to
back-end would handle changing planet_name to the planet_id to assign to the user */
export const moveAction = (user_id: number, planet_id: number) => async (dispatch: Dispatch) => {

    try {
        //upgrade
        let user: User = await getUserbyId(user_id);
        user.location = planet_id;
        await updateUser(user);
        dispatch({
            type: moveActionTypes.SUCCESSFUL_MOVE,
            payload: user
        });

    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: moveActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: moveActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}