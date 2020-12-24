import Axios from "axios";
import { SHELF_LIST_FAIL, SHELF_LIST_REQUEST, SHELF_LIST_SUCCESS } from "../constants/shelfConstants";

export const listShelves = () => async (dispatch, getState) => {
    dispatch({
        type: SHELF_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/shelves`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: SHELF_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: SHELF_LIST_FAIL, payload: error.message });
    }
};