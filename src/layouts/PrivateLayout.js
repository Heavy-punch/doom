// import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Switch } from 'react-router-dom';
import { signout } from '../actions/userActions';
import PrivateRoute from '../components/PrivateRoute';
// Category
import CategoryScreen from '../screens/CategoryScreen';
import CategoryAddScreen from '../screens/CategoryAddScreen';
import CategoryEditScreen from '../screens/CategoryEditScreen';
// Discount 
import DiscountLabelScreen from '../screens/DiscountLabelScreen';
import DiscountLabelAddScreen from '../screens/DiscountLabelAddScreen';
import DiscountLabelEditScreen from '../screens/DiscountLabelEditScreen';
// Invoice
import InvoiceScreen from '../screens/InvoiceScreen';
import InvoiceEditScreen from '../screens/InvoiceEditScreen';
// Management
import ManagementScreen from '../screens/ManagementScreen';
// Product
import ProductAddScreen from '../screens/ProductAddScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

import SellingScreen from '../screens/SellingScreen';
// Shelf
import ShelfScreen from '../screens/ShelfScreen';
import ShelfAddScreen from '../screens/ShelfAddScreen';
import ShelfEditScreen from '../screens/ShelfEditScreen';
// Supplier
import SupplierScreen from '../screens/SupplierScreen';
import SupplierAddScreen from '../screens/SupplierAddScreen';
import SupplierEditScreen from '../screens/SupplierEditScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import LoadingBox from '../components/LoadingBox';


// import { Container } from './styles';

function PrivateLayout() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };
    // console.log(userInfo);
    return (
        <div className="grid-container">
            <div className="header">
                <div className="logo">
                    <Link to="/">
                        <img src="./images/logo.png" alt="mng" />
                    </Link>
                </div>
                <div className="logout" onClick={signoutHandler}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                </div>
            </div>
            {userInfo ? (<div className="main">
                <div className="sidebar">
                    <div className="user">
                        <Link to="/profile">
                            {(userInfo.avt_url !== null) ? <img src={userInfo.avt_url} alt={userInfo.FName} /> : <img src="./images/user1.png" alt="asfas" />}
                        </Link>
                        <Link to="/profile">
                            {userInfo.FName + " " + userInfo.LName}
                        </Link>
                        {/* {(userInfo.avt_url !== null) ? <img src={userInfo.avt_url} alt={userInfo.FName} /> : <img src="./images/user1.png" alt="asfas" />}
                        {userInfo.FName + " " + userInfo.LName} */}
                    </div>
                    <div className="menu">
                        <NavLink to="/" exact activeClassName="active">Trang Chủ</NavLink>
                        <NavLink to="/statistic" activeClassName="active">Thống Kê</NavLink>
                        <NavLink to="/export" activeClassName="active">Xuất Hàng</NavLink>
                        <NavLink to="/import" activeClassName="active">Nhập Hàng</NavLink>
                        <NavLink to="/management" activeClassName="active">Quản Lý</NavLink>
                    </div>
                </div>
                <div className="content-wraper">
                    <PrivateRoute path="/" exact component={SellingScreen}></PrivateRoute>
                    <PrivateRoute path="/profile" exact component={ProfileScreen}></PrivateRoute>
                    <PrivateRoute path="/statistic" component={SellingScreen}></PrivateRoute>

                    <PrivateRoute path="/management" component={ManagementScreen}></PrivateRoute>

                    <Switch>
                        <PrivateRoute path="/products" exact component={ProductScreen}></PrivateRoute>
                        <PrivateRoute path="/products/add" exact component={ProductAddScreen}></PrivateRoute>
                        <PrivateRoute path="/products/:id/edit" exact component={ProductEditScreen}></PrivateRoute>
                        <PrivateRoute path="/products/:id" exact component={ProductDetailScreen}></PrivateRoute>
                    </Switch>


                    <PrivateRoute path="/users" exact component={ProductScreen}></PrivateRoute>
                    <PrivateRoute path="/users/add" exact component={ProductAddScreen}></PrivateRoute>
                    <PrivateRoute path="/users/:id/edit" exact component={ProductEditScreen}></PrivateRoute>
                    {/* <PrivateRoute path="/users/:id" exact component={ProductDetailScreen}></PrivateRoute> */}


                    <PrivateRoute path="/categories" exact component={CategoryScreen}></PrivateRoute>
                    <PrivateRoute path="/categories/add" component={CategoryAddScreen}></PrivateRoute>
                    <PrivateRoute path="/categories/:id/edit" component={CategoryEditScreen}></PrivateRoute>

                    <PrivateRoute path="/shelves" exact component={ShelfScreen}></PrivateRoute>
                    <PrivateRoute path="/shelves/add" component={ShelfAddScreen}></PrivateRoute>
                    <PrivateRoute path="/shelves/:id/edit" component={ShelfEditScreen}></PrivateRoute>

                    <PrivateRoute path="/suppliers" exact component={SupplierScreen}></PrivateRoute>
                    <PrivateRoute path="/suppliers/add" component={SupplierAddScreen}></PrivateRoute>
                    <PrivateRoute path="/suppliers/:id/edit" component={SupplierEditScreen}></PrivateRoute>

                    <PrivateRoute path="/discounts" exact component={DiscountLabelScreen}></PrivateRoute>
                    <PrivateRoute path="/discounts/add" component={DiscountLabelAddScreen}></PrivateRoute>
                    <PrivateRoute path="/discounts/:id/edit" component={DiscountLabelEditScreen}></PrivateRoute>

                    <PrivateRoute path="/invoices" exact component={InvoiceScreen}></PrivateRoute>
                    <PrivateRoute path="/invoices/:id/edit" exact component={InvoiceEditScreen}></PrivateRoute>

                </div>
            </div>)
                :
                (dispatch(signout()))
            }
            {/* <div className="main">
                <div className="sidebar">
                    <div className="user">
                        {(userInfo.avt_url !== null) ? <img src={userInfo.avt_url} alt={userInfo.FName} /> : <img src="./images/user1.png" alt="asfas" />}
                        {userInfo.FName + " " + userInfo.LName}
                    </div>
                    <div className="menu">
                        <NavLink to="/" exact activeClassName="active">Trang Chủ</NavLink>
                        <NavLink to="/statistic" activeClassName="active">Thống Kê</NavLink>
                        <NavLink to="/export" activeClassName="active">Xuất Hàng</NavLink>
                        <NavLink to="/import" activeClassName="active">Nhập Hàng</NavLink>
                        <NavLink to="/management" activeClassName="active">Quản Lý</NavLink>
                    </div>
                </div>
                <div className="content-wraper">
                    <PrivateRoute path="/" exact component={SellingScreen}></PrivateRoute>
                    <PrivateRoute path="/statistic" component={SellingScreen}></PrivateRoute>

                    <PrivateRoute path="/management" component={ManagementScreen}></PrivateRoute>

                    <PrivateRoute path="/products" exact component={ProductScreen}></PrivateRoute>
                    <PrivateRoute path="/products/add" component={ProductAddScreen}></PrivateRoute>

                    <PrivateRoute path="/categories" exact component={CategoryScreen}></PrivateRoute>
                    <PrivateRoute path="/categories/add" component={CategoryAddScreen}></PrivateRoute>
                    <PrivateRoute path="/categories/:id/edit" component={CategoryEditScreen}></PrivateRoute>

                    <PrivateRoute path="/shelves" exact component={ShelfScreen}></PrivateRoute>
                    <PrivateRoute path="/shelves/add" component={ShelfAddScreen}></PrivateRoute>
                    <PrivateRoute path="/shelves/:id/edit" component={ShelfEditScreen}></PrivateRoute>

                    <PrivateRoute path="/suppliers" exact component={SupplierScreen}></PrivateRoute>
                    <PrivateRoute path="/suppliers/add" component={SupplierAddScreen}></PrivateRoute>
                    <PrivateRoute path="/suppliers/:id/edit" component={SupplierEditScreen}></PrivateRoute>

                    <PrivateRoute path="/discounts" exact component={DiscountLabelScreen}></PrivateRoute>
                    <PrivateRoute path="/discounts/add" component={DiscountLabelAddScreen}></PrivateRoute>

                    <PrivateRoute path="/invoices" exact component={InvoiceScreen}></PrivateRoute>

                </div>
            </div> */}
            <div className="footer">this is footer</div>
        </div>
    );
}

export default PrivateLayout;