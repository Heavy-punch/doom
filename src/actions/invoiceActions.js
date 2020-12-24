import Axios from "axios";
import { INVOICE_LIST_FAIL, INVOICE_LIST_REQUEST, INVOICE_LIST_SUCCESS } from "../constants/invoiceConstants";

export const listInvoices = () => async (dispatch, getState) => {
    dispatch({
        type: INVOICE_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/bills`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: INVOICE_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: INVOICE_LIST_FAIL, payload: error.message });
    }
};