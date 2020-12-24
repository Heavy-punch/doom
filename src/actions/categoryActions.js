import Axios from "axios";
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstants";

export const listCategories = () => async (dispatch, getState) => {
    dispatch({
        type: CATEGORY_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/categories`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
};