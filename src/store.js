import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productListReducer } from "./reducers/productReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer, categoryUpdateReducer } from "./reducers/categoryReducers";
import { userSigninReducer } from "./reducers/userReducers";
import { shelfCreateReducer, shelfDeleteReducer, shelfDetailsReducer, shelfListReducer, shelfUpdateReducer } from "./reducers/shelfReducers";
import { supplierCreateReducer, supplierDeleteReducer, supplierDetailsReducer, supplierListReducer, supplierUpdateReducer } from "./reducers/supplierReducers";
import { discountCreateReducer, discountDeleteReducer, discountDetailsReducer, discountListReducer, discountUpdateReducer } from "./reducers/discountLabelReducers";
import { invoiceCreateReducer, invoiceDeleteReducer, invoiceDetailsReducer, invoiceListReducer, invoiceUpdateReducer } from "./reducers/invoiceReducers";

const initialstate = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};
const reducer = combineReducers({
    productList: productListReducer,

    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,

    shelfList: shelfListReducer,
    shelfDetails: shelfDetailsReducer,
    shelfDelete: shelfDeleteReducer,
    shelfCreate: shelfCreateReducer,
    shelfUpdate: shelfUpdateReducer,

    supplierList: supplierListReducer,
    supplierDetails: supplierDetailsReducer,
    supplierDelete: supplierDeleteReducer,
    supplierCreate: supplierCreateReducer,
    supplierUpdate: supplierUpdateReducer,

    discountList: discountListReducer,
    discountDetails: discountDetailsReducer,
    discountDelete: discountDeleteReducer,
    discountCreate: discountCreateReducer,
    discountUpdate: discountUpdateReducer,

    invoiceList: invoiceListReducer,
    invoiceDetails: invoiceDetailsReducer,
    invoiceDelete: invoiceDeleteReducer,
    invoiceCreate: invoiceCreateReducer,
    invoiceUpdate: invoiceUpdateReducer,

    userSignin: userSigninReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));
export default store;