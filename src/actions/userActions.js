import Axios from "axios";
import { USER_CHANGEPASSWORD_REQUEST, USER_CHANGEPASSWORD_SUCCESS, USER_CHANGEPASSWORD_FAIL, USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";

export const signin = (account, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { account, password } });
    try {
        const { data } = await Axios.post('/api/auth/login', { account, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data });
        localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const changePassword = (account, password) => async (dispatch) => {
    dispatch({ type: USER_CHANGEPASSWORD_REQUEST, payload: { account, password } });
    try {
        const { data } = await Axios.post('/api/auth/login', { account, password });
        dispatch({ type: USER_CHANGEPASSWORD_SUCCESS, payload: data.data });
        localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: USER_CHANGEPASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/signin';
};

export const profileUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_PROFILE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get('/api/managers/me',
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data.data });
        // localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    dispatch({
        type: USER_LIST_REQUEST,
    });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(
            `/api/managers`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: USER_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
    }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/managers/${userId}`,
            { headers: { 'x-access-token': `${userInfo.token}` } }
        );
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_CREATE_REQUEST, payload: user });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/managers',
            user,
            {
                headers: { 'x-access-token': `${userInfo.token}` },
            }
        );
        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_CREATE_FAIL, payload: message });
    }
};
export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`/api/managers/${user.ShID}`, user, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`
            },
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_FAIL, error: message });
    }
};
export const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.delete(`/api/managers`, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': `${userInfo.token}`,
            },
            data: { 'arrayIds': userId }
        });
        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DELETE_FAIL, payload: message });
    }
};