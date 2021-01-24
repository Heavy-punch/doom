import { USER_CHANGEPASSWORD_RESET, USER_CHANGEPASSWORD_FAIL, USER_CHANGEPASSWORD_REQUEST, USER_CHANGEPASSWORD_SUCCESS, USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_RESET, USER_CREATE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_RESET, USER_PROFILE_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS, USER_UPDATE_ME_REQUEST, USER_UPDATE_ME_SUCCESS, USER_UPDATE_ME_FAIL, USER_UPDATE_ME_RESET, USER_HISTORY_REQUEST, USER_HISTORY_SUCCESS, USER_HISTORY_FAIL, USER_HISTORY_RESET } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};

export const userProfileReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true };
        case USER_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload };
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case USER_PROFILE_RESET:
            return { loading: true };
        default:
            return state;
    }
};
export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return { loading: true };
        default:
            return state;
    }
};


export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};
export const userListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case USER_DELETE_RESET:
            return {};
        default:
            return state;
    }
};


export const userCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return { loading: true };
        case USER_CREATE_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case USER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const userChangePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CHANGEPASSWORD_REQUEST:
            return { loading: true };
        case USER_CHANGEPASSWORD_SUCCESS:
            return { loading: false, success: true };
        case USER_CHANGEPASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_CHANGEPASSWORD_RESET:
            return {};
        default:
            return state;
    }
};

export const userUpdateMeReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_ME_REQUEST:
            return { loading: true };
        case USER_UPDATE_ME_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_ME_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_ME_RESET:
            return {};
        default:
            return state;
    }
};

export const userHistoryReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_HISTORY_REQUEST:
            return { loading: true };
        case USER_HISTORY_SUCCESS:
            return { loading: false, histories: action.payload };
        case USER_HISTORY_FAIL:
            return { loading: false, error: action.payload };
        case USER_HISTORY_RESET:
            return { loading: true };
        default:
            return state;
    }
};