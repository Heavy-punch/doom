import { IMPORT_CREATE_FAIL, IMPORT_CREATE_REQUEST, IMPORT_CREATE_RESET, IMPORT_CREATE_SUCCESS, IMPORT_DELETE_FAIL, IMPORT_DELETE_REQUEST, IMPORT_DELETE_RESET, IMPORT_DELETE_SUCCESS, IMPORT_DETAILS_FAIL, IMPORT_DETAILS_REQUEST, IMPORT_DETAILS_RESET, IMPORT_DETAILS_SUCCESS, IMPORT_LIST_FAIL, IMPORT_LIST_REQUEST, IMPORT_LIST_SUCCESS, IMPORT_UPDATE_FAIL, IMPORT_UPDATE_REQUEST, IMPORT_UPDATE_RESET, IMPORT_UPDATE_SUCCESS } from "../constants/importConstants";

export const importListReducer = (
    state = { loading: true, imports: [] },
    action
) => {
    switch (action.type) {
        case IMPORT_LIST_REQUEST:
            return { loading: true };
        case IMPORT_LIST_SUCCESS:
            return { loading: false, imports: action.payload };
        case IMPORT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const importDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case IMPORT_DETAILS_REQUEST:
            return { loading: true };
        case IMPORT_DETAILS_SUCCESS:
            return { loading: false, _import: action.payload };
        case IMPORT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case IMPORT_DETAILS_RESET:
            return { loading: true };
        default:
            return state;
    }
};

export const importDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case IMPORT_DELETE_REQUEST:
            return { loading: true };
        case IMPORT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case IMPORT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case IMPORT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const importUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case IMPORT_UPDATE_REQUEST:
            return { loading: true };
        case IMPORT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case IMPORT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case IMPORT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const importCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case IMPORT_CREATE_REQUEST:
            return { loading: true };
        case IMPORT_CREATE_SUCCESS:
            return { loading: false, success: true, import: action.payload };
        case IMPORT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case IMPORT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};