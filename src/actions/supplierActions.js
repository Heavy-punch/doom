import Axios from "axios";
import { SUPPLIER_CREATE_FAIL, SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_SUCCESS, SUPPLIER_DELETE_FAIL, SUPPLIER_DELETE_REQUEST, SUPPLIER_DELETE_SUCCESS, SUPPLIER_DETAILS_FAIL, SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_LIST_FAIL, SUPPLIER_LIST_REQUEST, SUPPLIER_LIST_SUCCESS, SUPPLIER_UPDATE_FAIL, SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS } from "../constants/supplierConstants";

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

export const detailsSupplier = (supplierId) => async (dispatch, getState) => {
    dispatch({ type: SUPPLIER_DETAILS_REQUEST, payload: supplierId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/suppliers/${supplierId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: SUPPLIER_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: SUPPLIER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createSupplier = (supplier) => async (dispatch, getState) => {
    dispatch({ type: SUPPLIER_CREATE_REQUEST, payload: supplier });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/suppliers',
            supplier,
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: SUPPLIER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SUPPLIER_CREATE_FAIL, payload: message });
    }
};
export const updateSupplier = (supplier) => async (dispatch, getState) => {
    dispatch({ type: SUPPLIER_UPDATE_REQUEST, payload: supplier });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/suppliers/${supplier.SupID}`, supplier, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: SUPPLIER_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SUPPLIER_UPDATE_FAIL, error: message });
    }
};
export const deleteSupplier = (supplierId) => async (dispatch, getState) => {
    dispatch({ type: SUPPLIER_DELETE_REQUEST, payload: supplierId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/suppliers`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': supplierId }
        });
        dispatch({ type: SUPPLIER_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SUPPLIER_DELETE_FAIL, payload: message });
    }
};