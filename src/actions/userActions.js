import Axios from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";

export const signin = (account, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { account, password } });
    try {
        const { data } = await Axios.post('/api/auth/login', { account, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data });
        localStorage.setItem('userInfo', JSON.stringify(data));
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

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/signin';
};