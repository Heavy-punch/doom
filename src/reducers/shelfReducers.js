import { SHELF_LIST_FAIL, SHELF_LIST_REQUEST, SHELF_LIST_SUCCESS } from "../constants/shelfConstants";

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