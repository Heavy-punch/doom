import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function UserDetailScreen(props) {
    // const history = useHistory();
    const dispatch = useDispatch();
    const userId = props.match.params.id;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    useEffect(() => {
        dispatch(detailsUser(userId))
    },
        [dispatch, userId]
    );
    // console.log(user);




    return (

        <div className="container-fluid">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <>
                            <div className="row center">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h2>thông tin người dùng</h2>
                                </div>
                            </div>
                            <hr></hr>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => props.history.goBack()}
                            >
                                Quay lại
                            </button>

                            <div className="row">
                                <div className="col-xs-0 col-sm-0 col-md-3 col-lg-3">
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <ul className="list-no-style lh-2">
                                        <li className="avatar-large center">
                                            {(user.avt_url !== null) ? <img src={user.avt_url} alt={user.FName} /> : <img src="./images/user1.png" alt="asfas" />}
                                        </li>
                                        {/* <li>tên: {user.LName + " " + user.FName}</li>
                                        <li>accountName: {user.accountName}</li>
                                        <li>địa chỉ: {user.Address}</li>
                                        <li>email: {user.email}</li>
                                        <li>số điện thoại: {user.telephoneNumber}</li>
                                        <li>loại người dùng: {user.managerType}</li>
                                        <li>ngày bắt đầu làm việc: {(user.date_start_working).split("-").reverse().join("-")}</li> */}
                                    </ul>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <tbody>
                                                <tr>
                                                    <td className="col-md-3">họ và tên:</td>
                                                    <td className="col-md-8">{user.LName + " " + user.FName}</td>
                                                </tr>
                                                <tr>
                                                    <td>mã số:</td>
                                                    <td>{user.MngID}</td>
                                                </tr>
                                                <tr>
                                                    <td>tên tài khoản:</td>
                                                    <td>{user.accountName}</td>
                                                </tr>
                                                <tr>
                                                    <td>địa chỉ:</td>
                                                    <td>{user.Address}</td>
                                                </tr>
                                                <tr>
                                                    <td>ngày sinh:</td>
                                                    <td>{user.BDay}</td>
                                                </tr>
                                                <tr>
                                                    <td>email:</td>
                                                    <td>{user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>số điện thoại:</td>
                                                    <td>{user.telephoneNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>giới tính:</td>
                                                    <td>{user.gender === "male" ? "nam" : user.gender === "female" ? "nữ" : "khác"}</td>
                                                </tr>
                                                <tr>
                                                    <td>ngày bắt đầu làm việc:</td>
                                                    <td>{user.date_start_working.split("-").reverse().join("-")}</td>
                                                </tr>
                                                <tr>
                                                    <td>loại người dùng:</td>
                                                    <td>{user.managerType === "prime" ? "nâng cao" : "bình thường"}</td>
                                                </tr>
                                                <tr>
                                                    <td>lương:</td>
                                                    <td>{user.salary}</td>
                                                </tr>
                                                <tr>
                                                    <td>trạng thái:</td>
                                                    <td>{user.is_active ? "đang kích hoạt" : "vô hiệu hóa"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }

        </div>
    );
}

export default UserDetailScreen;












