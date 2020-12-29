import Axios from "axios";
import { INVOICE_CREATE_FAIL, INVOICE_CREATE_REQUEST, INVOICE_CREATE_SUCCESS, INVOICE_DELETE_FAIL, INVOICE_DELETE_REQUEST, INVOICE_DELETE_SUCCESS, INVOICE_DETAILS_FAIL, INVOICE_DETAILS_REQUEST, INVOICE_DETAILS_SUCCESS, INVOICE_LIST_FAIL, INVOICE_LIST_REQUEST, INVOICE_LIST_SUCCESS, INVOICE_UPDATE_FAIL, INVOICE_UPDATE_REQUEST, INVOICE_UPDATE_SUCCESS } from "../constants/invoiceConstants";

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

export const detailsInvoice = (invoiceId) => async (dispatch, getState) => {
    dispatch({ type: INVOICE_DETAILS_REQUEST, payload: invoiceId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/bills/${invoiceId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: INVOICE_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: INVOICE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createInvoice = (invoice) => async (dispatch, getState) => {
    dispatch({ type: INVOICE_CREATE_REQUEST, payload: invoice });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/bills',
            invoice,
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: INVOICE_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: INVOICE_CREATE_FAIL, payload: message });
    }
};
export const updateInvoice = (invoice) => async (dispatch, getState) => {
    dispatch({ type: INVOICE_UPDATE_REQUEST, payload: invoice });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/bills/${invoice.BID}`, invoice, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: INVOICE_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: INVOICE_UPDATE_FAIL, error: message });
    }
};
export const deleteInvoice = (invoiceId) => async (dispatch, getState) => {
    dispatch({ type: INVOICE_DELETE_REQUEST, payload: invoiceId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/bills`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': invoiceId }
        });
        dispatch({ type: INVOICE_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: INVOICE_DELETE_FAIL, payload: message });
    }
};