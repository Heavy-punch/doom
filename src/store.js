import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productListReducer } from "./reducers/productReducers";
import { categoryListReducer } from "./reducers/categoryReducers";
import { userSigninReducer } from "./reducers/userReducers";
import { shelfListReducer } from "./reducers/shelfReducers";
import { supplierListReducer } from "./reducers/supplierReducers";
import { discountListReducer } from "./reducers/discountLabelReducers";
import { invoiceListReducer } from "./reducers/invoiceReducers";

const initialstate = {};
const reducer = combineReducers({
    productList: productListReducer,
    categoryList: categoryListReducer,
    shelfList: shelfListReducer,
    supplierList: supplierListReducer,
    discountList: discountListReducer,
    invoiceList: invoiceListReducer,
    userSignin: userSigninReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));
export default store;