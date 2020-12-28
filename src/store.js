import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productListReducer } from "./reducers/productReducers";
import { categoryDeleteReducer, categoryListReducer } from "./reducers/categoryReducers";
import { userSigninReducer } from "./reducers/userReducers";
import { shelfCreateReducer, shelfDeleteReducer, shelfDetailsReducer, shelfListReducer, shelfUpdateReducer } from "./reducers/shelfReducers";
import { supplierListReducer } from "./reducers/supplierReducers";
import { discountListReducer } from "./reducers/discountLabelReducers";
import { invoiceListReducer } from "./reducers/invoiceReducers";

const initialstate = {
    // userSignin: {
    //     userInfo: localStorage.getItem('userInfo')
    //         ? JSON.parse(localStorage.getItem('userInfo'))
    //         : null,
    // },
};
const reducer = combineReducers({
    productList: productListReducer,
    categoryList: categoryListReducer,
    categoryDelete: categoryDeleteReducer,
    shelfList: shelfListReducer,
    shelfDetails: shelfDetailsReducer,
    shelfDelete: shelfDeleteReducer,
    shelfCreate: shelfCreateReducer,
    shelfUpdate: shelfUpdateReducer,
    supplierList: supplierListReducer,
    discountList: discountListReducer,
    invoiceList: invoiceListReducer,
    userSignin: userSigninReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));
export default store;