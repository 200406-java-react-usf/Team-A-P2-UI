/*Action would change the state of the cargo and current user currency based on the quantity bought*/
import { Dispatch } from "redux"
import { getCargobyUserIdAndGoodId, getCargoListbyUserId, updateCargobyUserIdAndGoodId, getUserbyId, updateUser } from "../remote/player-service";
import { cargoListActionTypes } from "../actions/cargo-list-action"
import { Cargo } from "../dtos/cargo";
import { User } from "../dtos/user";

export const tradeActionTypes = {
    SUCCESSFUL_PURCHASE: 'SUCCESSFUL_PURCHASE',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/*Would require current userID to know which user to change cargo for, goodID of the purchased good to
add to cargo, the total cost of the trade action would be done in the front-end, and the planet name to find the planets trade price modifier*/
export const tradeAction = (user_id: number, good_id: number, cost: number, amount: number) => async (dispatch: Dispatch) => {
    try {
        // // get the cargo record
        // let originalCargo: Cargo = await getCargobyUserIdAndGoodId(user_id, good_id)

        // // update the cargo
        // let sum: number = originalCargo.quantity * originalCargo.costOfGoods;
        // let newSum: number = sum + cost;
        // originalCargo.quantity += amount;
        // //update avg cost
        // let newCost: number = newSum / originalCargo.quantity;
        console.log(user_id, good_id, cost, amount);
        await updateCargobyUserIdAndGoodId(user_id, good_id, cost*amount, amount)
        let userCargoList: Cargo[] = await getCargoListbyUserId(user_id);
        //currency
        let user: User = await getUserbyId(user_id);
        user.currency -= amount * cost;

        //        await updateUser(user);

        // dispatch({
        //     type: cargoListActionTypes.SUCCESSFUL_GETLIST,
        //     payload: userCargoList
        // });
        // dispatch({
        //     type: tradeActionTypes.SUCCESSFUL_PURCHASE,
        //     payload: user
        // });
    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: tradeActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: tradeActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}