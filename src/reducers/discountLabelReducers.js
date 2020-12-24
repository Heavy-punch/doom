import { DISCOUNT_LIST_FAIL, DISCOUNT_LIST_REQUEST, DISCOUNT_LIST_SUCCESS } from "../constants/discountLabelConstants";

export const discountListReducer = (
    state = { loading: true, discounts: [] },
    action
) => {
    switch (action.type) {
        case DISCOUNT_LIST_REQUEST:
            return { loading: true };
        case DISCOUNT_LIST_SUCCESS:
            return { loading: false, discounts: action.payload };
        case DISCOUNT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};