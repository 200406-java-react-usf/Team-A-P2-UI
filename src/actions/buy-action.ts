/*Action would change the state of the cargo and current user currency based on the quantity bought*/
import { Dispatch } from "redux"

export const buyActionTypes = {
    SUCCESSFUL_PURCHASE: 'SUCCESSFUL_PURCHASE',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/*Would require current userID to know which user to change cargo for, goodID of the purchased good to
add to cargo, the total cost of the buy action would be done in the front-end, and the planet name to find the planets buy price modifier*/
export const buyAction = (userID: number, good_id: number, planet_name: string, cost: number) => async (dispatch: Dispatch) => {

    try {
        
        // let boughtGoods = await buyBackEndFunction(userID, good_id, good_quantity, planet_name);
        dispatch({
            type: buyActionTypes.SUCCESSFUL_PURCHASE,
            // payload: authUser
        });

    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: buyActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: buyActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}