import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from "./reducers/productReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer, categoryUpdateReducer } from "./reducers/categoryReducers";
import { userChangePasswordReducer, userCreateReducer, userDeleteReducer, userDetailsReducer, userHistoryReducer, userListReducer, userProfileReducer, userSigninReducer, userUpdateMeReducer, userUpdateReducer } from "./reducers/userReducers";
import { shelfCreateReducer, shelfDeleteReducer, shelfDetailsReducer, shelfListReducer, shelfUpdateReducer } from "./reducers/shelfReducers";
import { supplierCreateReducer, supplierDeleteReducer, supplierDetailsReducer, supplierListReducer, supplierUpdateReducer } from "./reducers/supplierReducers";
import { discountCreateReducer, discountDeleteReducer, discountDetailsReducer, discountListReducer, discountUpdateReducer } from "./reducers/discountLabelReducers";
import { invoiceCreateReducer, invoiceDeleteReducer, invoiceDetailsReducer, invoiceListReducer, invoiceUpdateReducer } from "./reducers/invoiceReducers";
import { exportCreateReducer, exportDeleteReducer, exportDetailsReducer, exportListReducer, exportUpdateReducer } from "./reducers/exportReducers";
import { importCreateReducer, importDeleteReducer, importDetailsReducer, importListReducer, importUpdateReducer } from "./reducers/importReducers";

const initialstate = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,

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

    importList: importListReducer,
    importDetails: importDetailsReducer,
    importDelete: importDeleteReducer,
    importCreate: importCreateReducer,
    importUpdate: importUpdateReducer,

    exportList: exportListReducer,
    exportDetails: exportDetailsReducer,
    exportDelete: exportDeleteReducer,
    exportCreate: exportCreateReducer,
    exportUpdate: exportUpdateReducer,

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
    userProfile: userProfileReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userCreate: userCreateReducer,
    userChangePassword: userChangePasswordReducer,
    userUpdateMe: userUpdateMeReducer,
    userHistory: userHistoryReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));
export default store;