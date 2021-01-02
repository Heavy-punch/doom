import { EXPORT_CREATE_FAIL, EXPORT_CREATE_REQUEST, EXPORT_CREATE_RESET, EXPORT_CREATE_SUCCESS, EXPORT_DELETE_FAIL, EXPORT_DELETE_REQUEST, EXPORT_DELETE_RESET, EXPORT_DELETE_SUCCESS, EXPORT_DETAILS_FAIL, EXPORT_DETAILS_REQUEST, EXPORT_DETAILS_RESET, EXPORT_DETAILS_SUCCESS, EXPORT_LIST_FAIL, EXPORT_LIST_REQUEST, EXPORT_LIST_SUCCESS, EXPORT_UPDATE_FAIL, EXPORT_UPDATE_REQUEST, EXPORT_UPDATE_RESET, EXPORT_UPDATE_SUCCESS } from "../constants/exportConstants";

export const exportListReducer = (
    state = { loading: true, exports: [] },
    action
) => {
    switch (action.type) {
        case EXPORT_LIST_REQUEST:
            return { loading: true };
        case EXPORT_LIST_SUCCESS:
            return { loading: false, exports: action.payload };
        case EXPORT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const exportDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case EXPORT_DETAILS_REQUEST:
            return { loading: true };
        case EXPORT_DETAILS_SUCCESS:
            return { loading: false, _export: action.payload };
        case EXPORT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case EXPORT_DETAILS_RESET:
            return { loading: true };
        default:
            return state;
    }
};

export const exportDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPORT_DELETE_REQUEST:
            return { loading: true };
        case EXPORT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case EXPORT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case EXPORT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const exportUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPORT_UPDATE_REQUEST:
            return { loading: true };
        case EXPORT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case EXPORT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case EXPORT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const exportCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPORT_CREATE_REQUEST:
            return { loading: true };
        case EXPORT_CREATE_SUCCESS:
            return { loading: false, success: true };
        case EXPORT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case EXPORT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};