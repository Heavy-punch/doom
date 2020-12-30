import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteShelf, listShelves } from '../actions/shelfActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SHELF_DELETE_RESET } from '../constants/shelfConstants';
import Pagination from '../components/Pagination';


// import { Container } from './styles';

function ShelfScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const shelfList = useSelector((state) => state.shelfList);
    const { loading, error, shelves } = shelfList;
    const shelfDelete = useSelector((state) => state.shelfDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = shelfDelete;

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: SHELF_DELETE_RESET });
        }
        dispatch(listShelves());
    }, [dispatch, successDelete]);
    // console.log(shelves);

    const [currentPage, setCurrentPage] = useState(1);
    const [shelvesPerPage] = useState(5);

    const indexOfLastProduct = currentPage * shelvesPerPage;
    const indexOfFirstProduct = indexOfLastProduct - shelvesPerPage;
    const currentShelves = shelves !== undefined ? shelves.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // console.log(currentShelves);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteShelf(delList));
            // console.log(delList);
        }
    };

    const editHandler = (editItem) => {
        props.history.push(`/shelves/${editItem}/edit`)
    };
    return (
        <div className="container-fluid">

            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Kệ Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
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
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {shelves.length === 0 && <MessageBox>No shelf Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>stt</th>
                                                <th>id</th>
                                                <th>tên</th>
                                                <th>loại kệ</th>
                                                <th>vị trí đặt</th>
                                                <th>trạng thái</th>
                                                <th>thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentShelves.map((shelf, index) => (
                                                <tr key={shelf.ShID}>
                                                    <td>{index + 1}</td>
                                                    <td>{shelf.ShID}</td>
                                                    <td>{shelf.name}</td>
                                                    <td>{shelf.type === "small" ? "nhỏ" : shelf.type === "medium" ? "vừa" : "lớn"}</td>
                                                    <td>{shelf.location === "store" ? "cửa hàng" : "nhà kho"}</td>
                                                    <td>{shelf.state === "full" ? "đầy" : "còn trống"}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(shelf.ShID)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger m-10"
                                                            onClick={() => deleteHandler(shelf.ShID)}
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination itemsPerPage={shelvesPerPage} totalItems={shelves.length} paginate={paginate}></Pagination>
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/shelves/add`))}>thêm kệ hàng</button>
                </div>
            </div>

        </div>
    );
}

export default ShelfScreen;