import Axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

export const listProducts = () => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/products`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};