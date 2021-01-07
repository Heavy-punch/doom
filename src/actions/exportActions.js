import Axios from "axios";
import { EXPORT_CREATE_FAIL, EXPORT_CREATE_REQUEST, EXPORT_CREATE_SUCCESS, EXPORT_DELETE_FAIL, EXPORT_DELETE_REQUEST, EXPORT_DELETE_SUCCESS, EXPORT_DETAILS_FAIL, EXPORT_DETAILS_REQUEST, EXPORT_DETAILS_SUCCESS, EXPORT_LIST_FAIL, EXPORT_LIST_REQUEST, EXPORT_LIST_SUCCESS, EXPORT_UPDATE_FAIL, EXPORT_UPDATE_REQUEST, EXPORT_UPDATE_SUCCESS } from "../constants/exportConstants";

export const listExports = () => async (dispatch, getState) => {
    dispatch({
        type: EXPORT_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/exports`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: EXPORT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: EXPORT_LIST_FAIL, payload: error.message });
    }
};

export const detailsExport = (exportId) => async (dispatch, getState) => {
    dispatch({ type: EXPORT_DETAILS_REQUEST, payload: exportId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/exports/${exportId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: EXPORT_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: EXPORT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createExport = (_export) => async (dispatch, getState) => {
    dispatch({ type: EXPORT_CREATE_REQUEST, payload: _export });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/exports',
            _export,
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: EXPORT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: EXPORT_CREATE_FAIL, payload: message });
    }
};
export const updateExport = (_export) => async (dispatch, getState) => {
    dispatch({ type: EXPORT_UPDATE_REQUEST, payload: _export });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/exports/${_export.exportId}`, _export, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: EXPORT_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: EXPORT_UPDATE_FAIL, error: message });
    }
};
export const deleteExport = (exportId) => async (dispatch, getState) => {
    dispatch({ type: EXPORT_DELETE_REQUEST, payload: exportId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/exports`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': exportId }
        });
        dispatch({ type: EXPORT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: EXPORT_DELETE_FAIL, payload: message });
    }
};