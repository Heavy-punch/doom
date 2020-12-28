import Axios from "axios";
import { CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS } from "../constants/categoryConstants";

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

export const detailsCategory = (categoryId) => async (dispatch) => {
    dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: categoryId });
    try {
        const { data } = await Axios.get(`/api/categories/${categoryId}`);
        dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createcategory = () => async (dispatch, getState) => {
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/categories',
            {},
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data.category,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATEGORY_CREATE_FAIL, payload: message });
    }
};
export const updatecategory = (category) => async (dispatch, getState) => {
    dispatch({ type: CATEGORY_UPDATE_REQUEST, payload: category });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/categories/${category._id}`, category, {
            headers: { 'x-access-token': `${userInfo.token}` },
        });
        dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATEGORY_UPDATE_FAIL, error: message });
    }
};
export const deleteCategory = (categoryId) => async (dispatch, getState) => {
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/categories`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': categoryId }
        });
        dispatch({ type: CATEGORY_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATEGORY_DELETE_FAIL, payload: message });
    }
};