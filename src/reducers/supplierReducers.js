import { SUPPLIER_LIST_FAIL, SUPPLIER_LIST_REQUEST, SUPPLIER_LIST_SUCCESS } from "../constants/supplierConstants";

export const supplierListReducer = (
    state = { loading: true, suppliers: [] },
    action
) => {
    switch (action.type) {
        case SUPPLIER_LIST_REQUEST:
            return { loading: true };
        case SUPPLIER_LIST_SUCCESS:
            return { loading: false, suppliers: action.payload };
        case SUPPLIER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};