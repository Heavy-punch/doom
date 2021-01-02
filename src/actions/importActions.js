import Axios from "axios";
import { IMPORT_CREATE_FAIL, IMPORT_CREATE_REQUEST, IMPORT_CREATE_SUCCESS, IMPORT_DELETE_FAIL, IMPORT_DELETE_REQUEST, IMPORT_DELETE_SUCCESS, IMPORT_DETAILS_FAIL, IMPORT_DETAILS_REQUEST, IMPORT_DETAILS_SUCCESS, IMPORT_LIST_FAIL, IMPORT_LIST_REQUEST, IMPORT_LIST_SUCCESS, IMPORT_UPDATE_FAIL, IMPORT_UPDATE_REQUEST, IMPORT_UPDATE_SUCCESS } from "../constants/importConstants";

export const listImports = () => async (dispatch, getState) => {
    dispatch({
        type: IMPORT_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/imports`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: IMPORT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: IMPORT_LIST_FAIL, payload: error.message });
    }
};

export const detailsImport = (importId) => async (dispatch, getState) => {
    dispatch({ type: IMPORT_DETAILS_REQUEST, payload: importId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/imports/${importId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: IMPORT_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: IMPORT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createImport = (_import) => async (dispatch, getState) => {
    dispatch({ type: IMPORT_CREATE_REQUEST, payload: _import });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/imports',
            _import,
            {
                "Content-Type": "application/json",
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: IMPORT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: IMPORT_CREATE_FAIL, payload: message });
    }
};
export const updateImport = (_import) => async (dispatch, getState) => {
    dispatch({ type: IMPORT_UPDATE_REQUEST, payload: _import });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/imports/${_import.importId}`, _import, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: IMPORT_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: IMPORT_UPDATE_FAIL, error: message });
    }
};
export const deleteImport = (importId) => async (dispatch, getState) => {
    dispatch({ type: IMPORT_DELETE_REQUEST, payload: importId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/imports`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': importId }
        });
        dispatch({ type: IMPORT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: IMPORT_DELETE_FAIL, payload: message });
    }
};