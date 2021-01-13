import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

function ManagementScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Quản Lý</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-al-center mng-entity">
                    <Link to="/products"><h5>sản phẩm</h5></Link>
                    <Link to="/categories"><h5>ngành hàng</h5></Link>
                    <Link to="/shelves"><h5>kệ hàng</h5></Link>
                    <Link to="/suppliers"><h5>nhà cung cấp</h5></Link>
                    <Link to="/discounts"><h5>khuyến mãi</h5></Link>
                    <Link to="/invoices"><h5>đơn hàng</h5></Link>
                    {userInfo.managerType === "prime" ? <Link to="/users"><h5>người dùng</h5></Link> : ''}
                </div>
            </div>

        </div>


    )
}

export default ManagementScreen;






