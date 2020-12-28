import { CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_RESET, CATEGORY_DELETE_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_RESET, CATEGORY_UPDATE_SUCCESS } from "../constants/categoryConstants";

export const categoryListReducer = (
    state = { loading: true, categories: [] },
    action
) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true };
        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const categoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true };
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};