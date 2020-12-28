import { SHELF_CREATE_FAIL, SHELF_CREATE_REQUEST, SHELF_CREATE_RESET, SHELF_CREATE_SUCCESS, SHELF_DELETE_FAIL, SHELF_DELETE_REQUEST, SHELF_DELETE_RESET, SHELF_DELETE_SUCCESS, SHELF_DETAILS_FAIL, SHELF_DETAILS_REQUEST, SHELF_DETAILS_RESET, SHELF_DETAILS_SUCCESS, SHELF_LIST_FAIL, SHELF_LIST_REQUEST, SHELF_LIST_SUCCESS, SHELF_UPDATE_FAIL, SHELF_UPDATE_REQUEST, SHELF_UPDATE_RESET, SHELF_UPDATE_SUCCESS } from "../constants/shelfConstants";

export const shelfListReducer = (
    state = { loading: true, shelves: [] },
    action
) => {
    switch (action.type) {
        case SHELF_LIST_REQUEST:
            return { loading: true };
        case SHELF_LIST_SUCCESS:
            return { loading: false, shelves: action.payload };
        case SHELF_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const shelfDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case SHELF_DETAILS_REQUEST:
            return { loading: true };
        case SHELF_DETAILS_SUCCESS:
            return { loading: false, shelf: action.payload };
        case SHELF_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case SHELF_DETAILS_RESET:
            return { loading: true };
        default:
            return state;
    }
};

export const shelfDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SHELF_DELETE_REQUEST:
            return { loading: true };
        case SHELF_DELETE_SUCCESS:
            return { loading: false, success: true };
        case SHELF_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case SHELF_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const shelfUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case SHELF_UPDATE_REQUEST:
            return { loading: true };
        case SHELF_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case SHELF_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case SHELF_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const shelfCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SHELF_CREATE_REQUEST:
            return { loading: true };
        case SHELF_CREATE_SUCCESS:
            return { loading: false, success: true, shelf: action.payload };
        case SHELF_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case SHELF_CREATE_RESET:
            return {};
        default:
            return state;
    }
};