import Axios from "axios";
import { DISCOUNT_CREATE_FAIL, DISCOUNT_CREATE_REQUEST, DISCOUNT_CREATE_SUCCESS, DISCOUNT_DELETE_FAIL, DISCOUNT_DELETE_REQUEST, DISCOUNT_DELETE_SUCCESS, DISCOUNT_DETAILS_FAIL, DISCOUNT_DETAILS_REQUEST, DISCOUNT_DETAILS_SUCCESS, DISCOUNT_LIST_FAIL, DISCOUNT_LIST_REQUEST, DISCOUNT_LIST_SUCCESS, DISCOUNT_UPDATE_FAIL, DISCOUNT_UPDATE_REQUEST, DISCOUNT_UPDATE_SUCCESS } from "../constants/discountLabelConstants";

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

export const detailsDiscount = (discountId) => async (dispatch, getState) => {
    dispatch({ type: DISCOUNT_DETAILS_REQUEST, payload: discountId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/discounts/${discountId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: DISCOUNT_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: DISCOUNT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createDiscount = (discount) => async (dispatch, getState) => {
    dispatch({ type: DISCOUNT_CREATE_REQUEST, payload: discount });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/discounts',
            discount,
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: DISCOUNT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DISCOUNT_CREATE_FAIL, payload: message });
    }
};
export const updateDiscount = (discount) => async (dispatch, getState) => {
    dispatch({ type: DISCOUNT_UPDATE_REQUEST, payload: discount });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/discounts/${discount.discountId}`, discount, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: DISCOUNT_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DISCOUNT_UPDATE_FAIL, error: message });
    }
};
export const deleteDiscount = (discountId) => async (dispatch, getState) => {
    dispatch({ type: DISCOUNT_DELETE_REQUEST, payload: discountId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/discounts`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': discountId }
        });
        dispatch({ type: DISCOUNT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DISCOUNT_DELETE_FAIL, payload: message });
    }
};