import Axios from "axios";
import { SHELF_CREATE_FAIL, SHELF_CREATE_REQUEST, SHELF_CREATE_SUCCESS, SHELF_DELETE_FAIL, SHELF_DELETE_REQUEST, SHELF_DELETE_SUCCESS, SHELF_DETAILS_FAIL, SHELF_DETAILS_REQUEST, SHELF_DETAILS_SUCCESS, SHELF_LIST_FAIL, SHELF_LIST_REQUEST, SHELF_LIST_SUCCESS, SHELF_UPDATE_FAIL, SHELF_UPDATE_REQUEST, SHELF_UPDATE_SUCCESS } from "../constants/shelfConstants";

export const listShelves = () => async (dispatch, getState) => {
    dispatch({
        type: SHELF_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/shelves`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: SHELF_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: SHELF_LIST_FAIL, payload: error.message });
    }
};

export const detailsShelf = (shelfId) => async (dispatch, getState) => {
    dispatch({ type: SHELF_DETAILS_REQUEST, payload: shelfId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/shelves/${shelfId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: SHELF_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: SHELF_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createShelf = (shelf) => async (dispatch, getState) => {
    dispatch({ type: SHELF_CREATE_REQUEST, payload: shelf });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/shelves',
            shelf,
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: SHELF_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SHELF_CREATE_FAIL, payload: message });
    }
};
export const updateShelf = (shelf) => async (dispatch, getState) => {
    dispatch({ type: SHELF_UPDATE_REQUEST, payload: shelf });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/shelves/${shelf.ShID}`, shelf, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: SHELF_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SHELF_UPDATE_FAIL, error: message });
    }
};
export const deleteShelf = (shelfId) => async (dispatch, getState) => {
    dispatch({ type: SHELF_DELETE_REQUEST, payload: shelfId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/shelves`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': shelfId }
        });
        dispatch({ type: SHELF_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SHELF_DELETE_FAIL, payload: message });
    }
};