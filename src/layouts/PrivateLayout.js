// import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signout } from '../actions/userActions';
import PrivateRoute from '../components/PrivateRoute';
import CategoryScreen from '../screens/CategoryScreen';
import CategoryAddScreen from '../screens/CategoryAddScreen';
import DiscountLabelScreen from '../screens/DiscountLabelScreen';
import DiscountLabelAddScreen from '../screens/DiscountLabelAddScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import ManagementScreen from '../screens/ManagementScreen';
import ProductAddScreen from '../screens/ProductAddScreen';
import ProductScreen from '../screens/ProductScreen';
import SellingScreen from '../screens/SellingScreen';
import ShelfScreen from '../screens/ShelfScreen';
import ShelfAddScreen from '../screens/ShelfAddScreen';
import SupplierScreen from '../screens/SupplierScreen';
import SupplierAddScreen from '../screens/SupplierAddScreen';

// import { Container } from './styles';

function PrivateLayout() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };
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
            <div className="main">
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
                    <PrivateRoute path="/categories" exact component={CategoryScreen}></PrivateRoute>
                    <PrivateRoute path="/categories/add" component={CategoryAddScreen}></PrivateRoute>
                    <PrivateRoute path="/shelves" exact component={ShelfScreen}></PrivateRoute>
                    <PrivateRoute path="/shelves/add" component={ShelfAddScreen}></PrivateRoute>
                    <PrivateRoute path="/suppliers" exact component={SupplierScreen}></PrivateRoute>
                    <PrivateRoute path="/suppliers/add" component={SupplierAddScreen}></PrivateRoute>
                    <PrivateRoute path="/discounts" exact component={DiscountLabelScreen}></PrivateRoute>
                    <PrivateRoute path="/discounts/add" component={DiscountLabelAddScreen}></PrivateRoute>
                    <PrivateRoute path="/invoices" exact component={InvoiceScreen}></PrivateRoute>
                    <PrivateRoute path="/products/add" component={ProductAddScreen}></PrivateRoute>

                </div>
            </div>
            <div className="footer">this is footer</div>
        </div>
    );
}

export default PrivateLayout;