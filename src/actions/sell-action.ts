//Action would change the state of the cargo and current user currency based on the quantity sold
import { Dispatch } from "redux"
import { authenticate } from "../remote/auth-service"

export const sellActionTypes = {
    SUCCESSFUL_SALE: 'SUCCESSFUL_SALE',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/*Would require current userID to know which user to change cargo for, goodID of the purchased good to
add to cargo, the total cost of the buy action would be done in the front-end, and the planet name to find the planets buy price modifier*/
export const sellAction = (userID: number, good_id: number, planet_name: string, cost: number ) => async (dispatch: Dispatch) => {

    try {

        // let boughtGoods = await buyBackEndFunction(userID, good_id, good_quantity, planet_name);
        dispatch({
            type: sellActionTypes.SUCCESSFUL_SALE,
            // payload: authUser
        });

    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: sellActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: sellActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}