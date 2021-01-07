import Axios from "axios";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";

export const listProducts = ({
    name_keyword = '',
    categoryId = '',
    is_less_than_Wmin = '',
    is_less_than_Smin = '',
    sortByName = '',
    sortByCreatedAt = '',
    sortByUpdatedAt = '',
    is_almost_expired = '',
}) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/products?name_keyword=${name_keyword}&categoryId=${categoryId}&is_less_than_Wmin=${is_less_than_Wmin}&is_less_than_Smin=${is_less_than_Smin}&sortByName=${sortByName}&sortByCreatedAt=${sortByCreatedAt}&sortByUpdatedAt=${sortByUpdatedAt}&is_almost_expired=${is_almost_expired}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

export const detailsProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/products/${productId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/products',
            product,
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
};
export const updateProduct = (product, productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/products/${productId}`, product, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
};
export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/products`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': productId }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
};