import Axios from "axios";
import { DISCOUNT_LIST_FAIL, DISCOUNT_LIST_REQUEST, DISCOUNT_LIST_SUCCESS } from "../constants/discountLabelConstants";

export const listDiscounts = () => async (dispatch, getState) => {
    dispatch({
        type: DISCOUNT_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/discounts`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: DISCOUNT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: DISCOUNT_LIST_FAIL, payload: error.message });
    }
};