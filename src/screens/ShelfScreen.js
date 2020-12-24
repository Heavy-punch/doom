import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listShelves } from '../actions/shelfActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function ShelfScreen() {
    const history = useHistory();
    const dispatch = useDispatch();
    const shelfList = useSelector((state) => state.shelfList);
    const { loading, error, shelves } = shelfList;
    useEffect(() => {
        dispatch(listShelves());
    }, [dispatch]);
    // console.log(shelves);
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
                                            {shelves.map((shelf, index) => (
                                                <tr key={shelf.ShID}>
                                                    <td>{index + 1}</td>
                                                    <td>{shelf.ShID}</td>
                                                    <td>{shelf.name}</td>
                                                    <td>{shelf.type}</td>
                                                    <td>{shelf.location}</td>
                                                    <td>{shelf.state}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-warning m-10">sửa</button>
                                                        <button type="button" className="btn btn-danger m-10">xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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