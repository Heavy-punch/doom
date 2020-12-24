import Axios from "axios";
import { SUPPLIER_LIST_FAIL, SUPPLIER_LIST_REQUEST, SUPPLIER_LIST_SUCCESS } from "../constants/supplierConstants";

export const listsuppliers = () => async (dispatch, getState) => {
    dispatch({
        type: SUPPLIER_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/suppliers`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: SUPPLIER_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: SUPPLIER_LIST_FAIL, payload: error.message });
    }
};