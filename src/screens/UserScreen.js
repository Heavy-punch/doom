import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../constants/userConstants';
import Pagination from '../components/Pagination';


// import { Container } from './styles';

function UserScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const userDelete = useSelector((state) => state.userDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = userDelete;

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: USER_DELETE_RESET });
        }
        dispatch(listUsers());
    }, [dispatch, successDelete]);
    // console.log(users);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    const indexOfLastProduct = currentPage * usersPerPage;
    const indexOfFirstProduct = indexOfLastProduct - usersPerPage;
    const currentUserdeleteUsers = users !== undefined ? users.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // console.log(currentUserdeleteUsers);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // console.log(userDelete);

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteUser(delList));
            console.log(delList);
        }
    };

    const editHandler = (editItem) => {
        props.history.push(`/users/${editItem}/edit`)
    };


    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Người dùng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                {/* <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            name="search-bar"
                            className="form-control"
                        />
                        <span className="input-group-btn">
                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                <i className="fa fa-search mr-3" aria-hidden="true"></i>
                                tìm kiếm
                            </button>
                        </span>
                    </div>
                </div> */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {users.length === 0 && <MessageBox>No user Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>stt</th>
                                                <th>id</th>
                                                <th>avatar</th>
                                                <th>tên</th>
                                                <th>email</th>
                                                <th>địa chỉ</th>
                                                <th>số điện thoại</th>
                                                <th>loại người dùng</th>
                                                <th>thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentUserdeleteUsers.map((user, index) => (
                                                <tr key={user.MngID}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.MngID}</td>
                                                    <td><img src={user.avt_url} alt={user.name} className="product-img"></img></td>
                                                    <td>{user.LName + " " + user.FName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.Address}</td>
                                                    <td>{user.telephoneNumber}</td>
                                                    <td>{user.managerType}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(user.MngID)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger m-10"
                                                            onClick={() => deleteHandler(user.MngID)}
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination itemsPerPage={usersPerPage} totalItems={users.length} paginate={paginate}></Pagination>
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/users/add`))}>thêm người dùng</button>
                </div>
            </div>
        </div>
    );
}

export default UserScreen;